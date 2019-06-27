const TM1637 = require('../TM1637');
const CLKPIN = 29;    // Warning !! Using WIRINNGPI pin numerotation
const DIOPIN = 28;    // Please see : https://fr.pinout.xyz/pinout/wiringpi#
const tm = new TM1637(CLKPIN, DIOPIN);

// 4 characters max. Extra characters will be ignored

tm.text="helo";     // Shows "helo"

tm.text="2130";     // Shows "21:30"
tm.split=true;      //

tm.text="foo";      //
tm.alignLeft=false; // Shows " foo"
tm.alignLeft=true;  // Shows "foo "
