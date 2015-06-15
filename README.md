# p5.js-speech
Web Audio Speech Synthesis and Speech Recognition Implementation for p5.js (http://p5js.org)

R. Luke DuBois (dubois@nyu.edu)

This is a simple p5 extension to provide Web Speech (Synthesis and Recognition) API functionality.  It consists of two object classes (p5.Speech and p5.SpeechRec) along with accessor functions to speak and listen for text, change parameters (synthesis voices, recognition models, etc.), and retrieve callbacks from the system.

##Simple Example (Synthesis)
```
var foo = new P5.Speech();
foo.speak('hi there');
```
##Simple Example (Recognition)
```
var foo = new P5.SpeechRec();
foo.onResult = showResult;
foo.start();

function onResult()
{
  console.log(foo.resultString);
}
```
