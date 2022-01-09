# [p5.speech](https://idmnyu.github.io/p5.js-speech/)
Web Audio Speech Synthesis and Speech Recognition Implementation for p5.js (http://p5js.org)

R. Luke DuBois (dubois@nyu.edu)   
[ABILITY Project](http://ability.nyu.edu) / [Integrated Design & Media](http://idm.engineering.nyu.edu)   
NYU

**p5.speech** is a simple p5 extension to provide Web Speech (Synthesis and Recognition) API functionality.  It consists of two object classes (p5.Speech and p5.SpeechRec) along with accessor functions to speak and listen for text, change parameters (synthesis voices, recognition models, etc.), and retrieve callbacks from the system.

Speech recognition requires launching from a server using HTTPS (e.g. using a python server on a local machine... a 'file' URI won't work).

## Download
* [Library only](https://raw.githubusercontent.com/IDMNYU/p5.js-speech/master/lib/p5.speech.js)

## Include from a CDN
```
<script src="https://cdn.jsdelivr.net/gh/IDMNYU/p5.js-speech@0.0.3/lib/p5.speech.js"></script>
```

## Examples

### Simple Example (Synthesis)
```
var foo = new p5.Speech(); // speech synthesis object
foo.speak('hi there'); // say something
```
### Simple Example (Recognition)
```
var foo = new p5.SpeechRec(); // speech recognition object (will prompt for mic access)
foo.onResult = showResult; // bind callback function to trigger when speech is recognized
foo.start(); // start listening

function showResult()
{
  console.log(foo.resultString); // log the result
}
```
### More Examples

* [p5.Speech() Simple](https://idmnyu.github.io/p5.js-speech/examples/01simple.html) [(source)](https://github.com/IDMNYU/p5.js-speech/blob/master/examples/01simple.html)
* [p5.Speech() Speech Box](https://idmnyu.github.io/p5.js-speech/examples/02speechbox.html) [(source)](https://github.com/IDMNYU/p5.js-speech/blob/master/examples/02speechbox.html)
* [p5.Speech() Callbacks](https://idmnyu.github.io/p5.js-speech/examples/03callbacks.html) [(source)](https://github.com/IDMNYU/p5.js-speech/blob/master/examples/03callbacks.html)
* [p5.SpeechRec() Simple](https://idmnyu.github.io/p5.js-speech/examples/04simplerecognition.html) [(source)](https://github.com/IDMNYU/p5.js-speech/blob/master/examples/04simplerecognition.html)
* [p5.SpeechRec() Continuous](https://idmnyu.github.io/p5.js-speech/examples/05continuousrecognition.html) [(source)](https://github.com/IDMNYU/p5.js-speech/blob/master/examples/05continuousrecognition.html)

## Reference

### p5.Speech

*constructor*
* **default_voice**: optional argument to set the default synthesizer voice by number (see *listVoices()*) or by name.

*methods*
* **cancel()**: silently cancels the current utterance and clears any queued utterances.
* **listVoices()**: debugging statement. Lists available synthesis voices to the JavaScript console.
* **pause()**: pause the current utterance. The *onPause()* callback will fire.
* **resume()**: resumes the current utterance. The *onResume()* callback will fire.
* **setLang(language)**: sets the language interpreter for the synthesizer voice. Argument is BCP-47; Default is 'en-US'.
* **setPitch(pitch)**: sets playback pitch of synthesized speech from 0.01 (very low) to 2.0 (very high). Default is 1.0; not supported by all browser / OS combinations.
* **setRate(rate)**: sets rate of speech production from 0.1 (very slow) to 2.0 (very fast). Default is 1.0; not supported by all browser / OS combinations.
* **setVoice(voice)**: sets synthesizer voice by number (see listVoices()) or by name; equivalent to the default_voice parameter passed with the constructor.
* **setVolume(volume)**: sets synthesizer volume in the range of 0.0 (silent) to 1.0 (default=max volume).
* **speak(utterance)**: instructs the synthesizer to speak the string encoded in utterance. Depending on the interrupt property, additional calls to *speak()* will queue after or interrupt speech actively being synthesized. When synthesis begins, the *onStart()* callback will fire; when synthesis ends, the *onEnd()* callback will fire.
* **stop()**: stops the current utterance. The *onEnd()* callback will fire.

*properties*
* **interrupt**: boolean to set whether the *speak()* method will interrupt (true) or queue after (false = default) existing speech currently being synthesized.
* **onEnd**: function sets callback to fire when an utterance is finished.
* **onLoad**: function sets callback to fire when synthesis voices are loaded.
* **onPause**: function sets callback to fire when an utterance is paused.
* **onResume**: function sets callback to fire when an utterance is resumed.
* **onStart**: function sets callback to fire when synthesis is begun.

### p5.SpeechRec

*constructor*
* **default_language**: optional argument to set the default BCP-47 language / region to for the speech recognition system.
  * n.b. p5.SpeechRec() won't work unless using a secure (HTTPS) server. if you never get a prompt from the browser to allow access to your microphone, that should be the first thing you troubleshoot.

*methods*
* **start()**: instructs the speech recognition system to begin listening. use continuous mode rather than multiple calls to *start()* for multiple recognition tokens within the same site.

*properties*
* **continuous**: boolean to set whether the speech recognition engine will give results continuously (true) or just once (false = default). 
  * **p.s. *continuous* is set to 'false' by default to protect your users' privacy: setting continuous to 'true' creates a persistent open mic between your users' browsing device and the cloud-based speech recognition engine for their browser (i.e. Google).**
  * p.p.s. as an aside, besides being potentially a bad call from an ethical standpoint, *continous* mode is unreliable - the audio pipe between the browser and the recognition server breaks pretty easily, especially with non-Chrome browsers. if you really want something that will continuously recognize speech, set a meta-refresh on your page to reload every couple of minutes.
* **interimResults**: boolean to set whether the speech recognition engine will give faster, partial results (true) or wait for the speaker to pause (false = default).
* **onEnd**: function sets callback to fire when speech recognition ends.
* **onError**: function sets callback to fire when an error occurs on the client side in recording and transmitting the speech.
* **onResult**: function sets callback to fire when synthesis engine has reported a result.
* **onStart**: function sets callback to fire when speech recognition has begun.
* **resultConfidence**: float value (0.0-1.0) representing the confidence level of the speech synthesizer that resultString is what was actually spoken by the user.
* **resultJSON**: JSON object containing a full set of data returned by the speech recognition system.
* **resultString**: String containing the most recently detected speech.
* **resultValue**: boolean value containing a status flag reported by the server (true = speech successfully recognized).

