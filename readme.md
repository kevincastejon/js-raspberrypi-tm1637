# lepioo.tm1637

## Control LCD display tm1637 from a raspberry pi

Original work from [https://github.com/thesadabc/raspberrypi-tm1637-4display](https://github.com/thesadabc/raspberrypi-tm1637-4display)

You can control a LCD tm1637 with facultative semi-colon separator  

Allowed characters : [aA-zZ],[0-9], ,°,-,=,[,],(,)

You need [WiringPi](http://wiringpi.com/download-and-install/) library installed on your raspberry pi.

You can install it that way:
```
    sudo apt-get install wiringpi
```
Then install this module that way:
```
    npm install lepioo.tm1637
```

Usage:
```
    const TM1637 = require('lepioo.tm1637');
    const CLKPIN=21;
    const DIOPIN=20;
    var tm=new TM1637(CLKPIN,DIOPIN);
    tm.show("PI00");
```

You can feed the second parameter with a boolean to enable the semi-colon separator (default is false)
```
    tm.show("1337",true);   // 13:37
```

You can add a callback function as a third parameter to be called when the LCD has displayed the message
```
    tm.show("1337",true,()=>{console.log("done")});
```

[Github sources](https://github.com/lePioo/TM1637)
