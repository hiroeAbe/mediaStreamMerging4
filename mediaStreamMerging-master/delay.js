var audioCtx = null;

$(function(){
  audioCtx = new AudioContext();
  console.log("audioCtx init");

});

/*var input = audioCtx.createGain();
var delay = audioCtx.createDelay();
var wetgain = audioCtx.createGain();
var drygain = audioCtx.createGain();
var feedback = audioCtx.createGain();
this.output = audioCtx.createMediaStreamDestination();*/

setupDelay = function(audioStream) {
  // WebAudio API 関係の初期化
  console.log("delay setup");

  var input = audioCtx.createGain();
  var delay = audioCtx.createDelay();
  var wetgain = audioCtx.createGain();
  var drygain = audioCtx.createGain();
  var feedback = audioCtx.createGain();
  this.output = audioCtx.createMediaStreamDestination();
  
  var bypass = document.getElementById("bypass").checked;
  delay.delayTime.value = parseFloat(document.getElementById("time").value);
  feedback.gain.value = parseFloat(document.getElementById("feedback").value);
  var mix = parseFloat(document.getElementById("mix").value);
  this.mic = audioCtx.createMediaStreamSource(audioStream);
  this.mic.connect(input);
  if(bypass) mix = 0;
    wetgain.gain.value = mix;
    drygain.gain.value = 1 - mix;
}

setupFilterDelay = function(audioStream) {

  input.connect(delay);
  input.connect(drygain);
  delay.connect(wetgain);
  delay.connect(feedback);
  feedback.connect(delay);
  wetgain.connect(this.output);
  drygain.connect(this.output);

  //wetgain.connect(audioctx.destination);
  //drygain.connect(audioctx.destination);
}
