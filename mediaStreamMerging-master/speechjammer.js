
$(function(){
  //audioCtx = new AudioContext();
  console.log("audioCtx init");

});

var SpeechJammer = {
  FREQ_MUL: 7000,
  QUAL_MUL: 30,
};


SpeechJammer.setupSJ = function(audioStream) {
  // WebAudio API 関係の初期化
  console.log("sj setup");
  var audioCtx = new AudioContext();;
  var input = audioCtx.createGain();
  var delay = audioCtx.createDelay();
  var wetgain = audioCtx.createGain();
  var drygain = audioCtx.createGain();
  var feedback = audioCtx.createGain();
  //this.output = audioCtx.createMediaStreamDestination();

  //var bypass = document.getElementById("bypass").checked;
  //delay.delayTime.value = parseFloat(document.getElementById("time").value);
  //feedback.gain.value = parseFloat(document.getElementById("feedback").value);
  delay.delayTime.value = 0.2;
  feedback.gain.value = 0.4;
  //var mix = parseFloat(document.getElementById("mix").value);
  this.mic = audioCtx.createMediaStreamSource(audioStream);
  this.mic.connect(input);

  input.connect(delay);
  input.connect(drygain);
  delay.connect(wetgain);
  delay.connect(feedback);
  feedback.connect(delay);
  wetgain.connect(audioCtx.destination);
  drygain.connect(audioCtx.destination);

  //if(bypass) mix = 0;
  //  wetgain.gain.value = mix;
  //  drygain.gain.value = 1 - mix;
}

SpeechJammer.toggleFilter = function(element) {
  this.input.disconnect(0);
  this.delay.disconnect(0);
  this.wetgain.disconnect(0);
  if(element.checked) {
    this.input.connect(this.delay);
    this.delay.connect(this.wetgain);
    this.wetgain.connect(audioCtx.destination);
  } else {
    this.input.connect(audioCtx.destination);
  }
}
