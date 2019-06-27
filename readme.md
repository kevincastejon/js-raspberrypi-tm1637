# js-raspberrypi-tm1637

## Control LCD display tm1637 from a raspberry pi

Original work from [https://github.com/thesadabc/raspberrypi-tm1637-4display](https://github.com/thesadabc/raspberrypi-tm1637-4display)

You can control a LCD tm1637 with facultative semi-colon separator  

Allowed characters : [aA-zZ],[0-9], ,°,-,=,[,],(,)

## Dependencies

You need [WiringPi](http://wiringpi.com/download-and-install/) library installed on your raspberry pi.
```
    sudo apt-get install python-dev python-pip
    sudo pip install wiringpi

```

## Installation

Then install this module that way:
```
    npm install raspberrypi-tm1637
```

## Usage

Warning !! Using WIRINNGPI pin numerotation !
Please see : https://fr.pinout.xyz/pinout/wiringpi#
```
    const TM1637 = require('raspberrypi-tm1637');
    const CLKPIN = 29;
    const DIOPIN = 28;
    const tm = new TM1637(CLKPIN, DIOPIN);

    // 4 characters max. Extra characters will be ignored

    tm.text="helo";     // Shows "helo"

    tm.text="2130";     // Shows "21:30"
    tm.split=true;      //

    tm.text="foo";      //
    tm.alignLeft=false; // Shows " foo"
    tm.alignLeft=true;  // Shows "foo "

```

## API

### Methods

  - constructor(pinClk, pinDIO)
    - pinClk : int. The clock pin number using WIRINGPI pin numerotation
    - pinDIO : int. The data pin number using WIRINGPI pin numerotation

### Properties

  - text : string. Four characters max. Extra chars will be ignored.
  - split : boolean. Default false. Will display the semi-colon separator based on that value. (good for clock or time usage)
  - alignLeft : boolean. Default false. Will align the text, if less than four characters, on the left if true, on the right if false.

[Github sources](https://github.com/lePioo/TM1637)
