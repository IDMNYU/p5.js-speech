# p5.js-speech
Web Audio Speech Synthesis Implementation for p5.js

R. Luke DuBois (dubois@nyu.edu)

This is a simple p5 extension to provide Web Speech API functionality.  It consists of a single unified object class (p5.Speech) along with accessor functions to speak text, change synthesis voices and parameters, and retrieve callbacks from the system.

##Simple Example

var foo = new P5.Speech();

foo.speak('hi there');
