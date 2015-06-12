/*! p5.speech.js v0.0.1 2015-06-12 */
/**
 * @module p5.speech
 * @submodule p5.speech
 * @for p5.speech
 * @main
 */
/**
 *  p5.speech
 *  R. Luke DuBois
 *  ABILITY Lab
 *  New York University.
 *  The MIT License (MIT).
 *  
 *  https://github.com/IDMNYU/p5.js-speech
 *
 *   Web Speech API: https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html
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
  p5.Speech = function() {

  	// make a synth and poll its voices.
 	this.synth = window.speechSynthesis;

 	this.isLoaded = 0; // do we have voices?

  	this.utterance = new SpeechSynthesisUtterance();

  	this.voices = [];

   	var that = this; // some bullshit
   	// are we loaded?
  	window.speechSynthesis.onvoiceschanged = function() {
  		if(that.isLoaded==0) { // run once
	    	that.voices = window.speechSynthesis.getVoices();
	    	that.isLoaded = 1;
	    	console.log("p5.Speech: voices loaded!");
   		}
	};


  };


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











}));