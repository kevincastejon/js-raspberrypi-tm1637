const wpi = require('node-wiring-pi');
wpi.setup("gpio");

//
//      A
//     ---
//  F |   | B
//     -G-
//  E |   | C
//     ---
//      D
var allowedChars=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","h","i","j","l","o","p","q","s","t","u","y"];
codigitToSegment = [
    // XGFEDCBA
    0b00111111, // 0
    0b00000110, // 1
    0b01011011, // 2
    0b01001111, // 3
    0b01100110, // 4
    0b01101101, // 5
    0b01111101, // 6
    0b00000111, // 7
    0b01111111, // 8
    0b01101111, // 9
    0b01110111, // A
    0b01111100, // b
    0b00111001, // C
    0b01011110, // d
    0b01111001, // E
    0b01110001, // F
    0b01110110, // H
    0b00000110, // I
    0b00011110, // J
    0b00111000, // L
    0b01011100, // o
    0b01110011, // P
    0b01100111, // q
    0b01101101, // S
    0b01111000, // t
    0b00111110, // U
    0b01100110 //y
];

const sleep = () => new Promise((r) => setTimeout(r, 1));

module.exports = class TM1637Display {

    constructor(pinClk, pinDIO, trueValue = 1) {
        this.pinClk = pinClk;
        this.pinDIO = pinDIO;
        this.trueValue = trueValue;

        // 默认高电位
        wpi.pinMode(this.pinClk, wpi.OUTPUT);
        wpi.pinMode(this.pinDIO, wpi.OUTPUT);
        wpi.digitalWrite(this.pinClk, this.trueValue);
        wpi.digitalWrite(this.pinDIO, this.trueValue);
        // this.high(this.pinClk);
        // this.high(this.pinDIO);

    }

     high(pin) {
        wpi.digitalWrite(pin, this.trueValue);
         sleep();
    }

     low(pin) {
        wpi.digitalWrite(pin, 1 - this.trueValue);
         sleep();
    }

    // clock high in, high out
     start() {
        // pinDIO  high -> low when clock is high
        // this.high(this.pinDIO);
        // this.high(this.pinClk);
         this.low(this.pinDIO);
    }

    // clock high in, high out
     writeBit(value) {
        // 一个上升沿
         this.low(this.pinClk);
        // change the value when clock is low
        if (value)
             this.high(this.pinDIO);
        else
             this.low(this.pinDIO);

         this.high(this.pinClk);
    }
     readAck() {
        // 8号下降沿
         this.low(this.pinClk);
        wpi.pinMode(this.pinDIO, wpi.INPUT);
        // 9号上升沿
         this.high(this.pinClk);
        const ack = wpi.digitalRead(this.pinDIO);
        // if(ack === 0)  scucces, low
        wpi.pinMode(this.pinDIO, wpi.OUTPUT);
        // 9号下降沿
         this.low(this.pinClk);
        // console.log(ack);
        return ack;
    }

    // clock high in, low out
     writeByte(byte) { // 0b00000000
        let b = byte;
        for (let i = 0; i < 8; i++) {
             this.writeBit(b & 0x01);
            b >>= 1;
        }
        return  this.readAck();
}

    // clock low in, high out
     stop() {
        // pinDIO  low -> high  when clock is high
         this.low(this.pinDIO);
         this.high(this.pinClk);
         this.high(this.pinDIO);
    }

    show(message, split=false, callback=null){
      var msg=(message+"").substring(0,4).toLowerCase();
      var m=[null,null,null,null];
      for (let i = msg.length; i >= 0 ; i--) {
        var ind = allowedChars.indexOf(msg[i]);
        if(ind>-1)
        m[(4-msg.length)+i]=ind;
      }
      this.sendData(m,split,()=>{if(callback)callback();});
    }

     sendData(nums, split = false, cb=null) {
        let numsEncoded = [0, 0, 0, 0].map((u, i) => codigitToSegment[nums[i]] || 0);
        if (split) numsEncoded[1] = numsEncoded[1] | 0b10000000; // the x of 2nd pos

         this.start(); // 数据命令设置
         this.writeByte(0b01000000); // 普通模式, 自动地址增加, 写数据到显示寄存器
         this.stop();

         this.start(); // 地址命令设置
         this.writeByte(0b11000000); // 地址起始位 从0开始
        for (let i = 0; i < numsEncoded.length; i++) {
             this.writeByte(numsEncoded[i]);
        }
         this.stop();

         this.start(); // 地址命令设置
         this.writeByte(0b10001111); // 显示控制命令设置, 开, 亮度为 111
         this.stop();
        if(cb)cb();
    }
}
