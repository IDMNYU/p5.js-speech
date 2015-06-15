/*! p5.speech.js v0.0.1 2015-06-12 */
/**
 * @module p5.speech
 * @submodule p5.speech
 * @for p5.speech
 * @main
 */
/**
 *  p5.speech
 *  R. Luke DuBois (dubois@nyu.edu)
 *  ABILITY Lab
 *  New York University.
 *  The MIT License (MIT).
 *  
 *  https://github.com/IDMNYU/p5.js-speech
 *
 *  Web Speech API: https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html
 *  WebKit Speech Recognition API: https://www.google.com/intl/en/chrome/demos/speech.html
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define('p5.Speech', ['p5'], function (p5) { (factory(p5));});
  else if (typeof exports === 'object')
    factory(require('../p5'));
  else
    factory(root['p5']);
}(this, function (p5) {
// =============================================================================
//                         p5.Speech
// =============================================================================


  /**
   * Base class for a file
   * Using this for createFileInput
   *
   * @class p5.Speech
   * @constructor
   */
  p5.Speech = function(_dv) {

  	// make a synth and poll its voices.
 	  this.synth = window.speechSynthesis;

 	  this.isLoaded = 0; // do we have voices?

  	this.utterance = new SpeechSynthesisUtterance();

    // callback properties:
    this.onLoad;
    this.onStart;
    this.onPause;
    this.onResume;
    this.onEnd;

  	this.voices = [];

    // first parameter is an initial voice selector
    this.initvoice;
    if(_dv !== undefined) this.initvoice=_dv;

   	var that = this; // some bullshit

    //
    // CALLBACKS:
    //

   	// are we loaded?
  	window.speechSynthesis.onvoiceschanged = function() {
  		if(that.isLoaded==0) { // run once
	    	that.voices = window.speechSynthesis.getVoices();
	    	that.isLoaded = 1;
	    	console.log("p5.Speech: voices loaded!");

        if(that.initvoice!=undefined) {
          that.setVoice(that.initvoice);
          console.log("p5.Speech: initial voice: " + that.initvoice);
        }
        if(that.onLoad!=undefined) that.onLoad();

        that.utterance.onstart = function(e) {
          //console.log("STARTED");
          if(that.onStart!=undefined) that.onStart(e);        
        };
        that.utterance.onpause = function(e) {
          //console.log("PAUSED");
          if(that.onPause!=undefined) that.onPause(e);        
        };
       that.utterance.onresume = function(e) {
          //console.log("RESUMED");
          if(that.onResume!=undefined) that.onResume(e);        
        };
        that.utterance.onend = function(e) {
          //console.log("ENDED");
          if(that.onEnd!=undefined) that.onEnd(e);        
        };
   		}
    };


  };     // end p5.Speech constructor


	p5.Speech.prototype.listVoices = function() {
		if(this.isLoaded)
		{
			for(var i = 0;i<this.voices.length;i++)
			{
				console.log(this.voices[i].name);
			}
		}
		else
		{
			console.log("p5.Speech: voices not loaded yet!")
		}
	};

	p5.Speech.prototype.setVoice = function(_v) {
    // type check so you can set by label or by index:
		if(typeof(_v)=='string') this.utterance.voice = this.voices.filter(function(v) { return v.name == _v; })[0];
		else if(typeof(_v)=='number') this.utterance.voice = this.voices[constrain(_v, 0, this.voices.length-1)];

	};

  p5.Speech.prototype.setVolume = function(_v) {
    this.utterance.volume = _v;
  };

  p5.Speech.prototype.setRate = function(_v) {
    this.utterance.rate = _v;
    console.log(_v);
  };

  p5.Speech.prototype.setPitch = function(_v) {
    this.utterance.pitch = _v;
  };

	p5.Speech.prototype.speak = function(_phrase) {
		this.utterance.text = _phrase;
		this.synth.speak(this.utterance); 		
	};

  // not working...
  p5.Speech.prototype.pause = function() {
    this.synth.pause();
  };

  // not working...
  p5.Speech.prototype.resume = function() {
    this.synth.resume();
  };

  p5.Speech.prototype.stop = function() {
    // not working...
    //this.synth.stop();
    this.synth.cancel();
  };

  p5.Speech.prototype.cancel = function() {
    this.synth.cancel(); // KILL SYNTH
  };

// =============================================================================
//                         p5.SpeechRec
// =============================================================================


  /**
   * Base class for a file
   * Using this for createFileInput
   *
   * @class p5.SpeechRec
   * @constructor
   */
  p5.SpeechRec = function(_lang) {

    // make a recognizer object.
    this.rec = new webkitSpeechRecognition();

    // first parameter is language model (defaults to empty=U.S. English)
    if(_lang !== undefined) this.rec.lang=_lang;

    // callback properties:
    this.onResult;
    this.onStart;
    this.onError;
    this.onEnd;

    // recognizer properties
    this.continuous = false;
    this.interimResults = false;

    // result data
    this.resultJSON;
    this.resultValue;
    this.resultString;
    this.resultConfidence;

    var that = this; // some bullshit

    //
    // CALLBACKS:
    //

    this.rec.onresult = function(e) { 
      that.resultJSON = e; // full JSON of callback event
      that.resultValue = e.returnValue; // was successful?
      // store latest result in top-level object struct
      that.resultString = e.results[e.results.length-1][0].transcript.trim();
      that.resultConfidence = e.results[e.results.length-1][0].confidence;
      if(that.onResult!=undefined) that.onResult();
    };

    this.rec.onstart = function(e) {
      if(that.onStart!=undefined) that.onStart(e);
    };
    this.rec.onerror = function(e) {
      if(that.onError!=undefined) that.onError(e);
    };
    this.rec.onend = function() {
      if(that.onEnd!=undefined) that.onEnd();
    };

  }; // end p5.SpeechRec constructor


  p5.SpeechRec.prototype.start = function() {
    this.rec.continuous = this.continuous;
    this.rec.interimResults = this.interimResults;
    this.rec.start();
  };


}));



