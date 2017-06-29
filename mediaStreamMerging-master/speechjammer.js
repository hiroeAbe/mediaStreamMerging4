
$(function(){
  //audioCtx = new AudioContext();
  console.log("audioCtx init");

});

var SpeechJammer = {
  FREQ_MUL: 7000,
  QUAL_MUL: 30,
};


SpeechJammer.setupSJ = function() {
  // WebAudio API 関係の初期化
  console.log("sj setup");
  var audioCtx = new AudioContext();;
  var input = audioCtx.createGain();
  var delay = audioCtx.createDelay();
  var wetgain = audioCtx.createGain();
  var drygain = audioCtx.createGain();
  var feedback = audioCtx.createGain();
  //this.output = audioCtx.createMediaStreamDestination();
  this.output = audioCtx.destination();
  //var bypass = document.getElementById("bypass").checked;
  //delay.delayTime.value = parseFloat(document.getElementById("time").value);
  //feedback.gain.value = parseFloat(document.getElementById("feedback").value);
  delay.delayTime.value = 0.3;
  feedback.gain.value = 0.4;
}
SpeechJammer.setupFilter = function(audioStream){
  //var mix = parseFloat(document.getElementById("mix").value);
  this.mic = audioCtx.createMediaStreamSource(audioStream);
  this.mic.connect(delay);

  //input.connect(delay);

  delay.connect(wetgain);
  delay.connect(feedback);
  feedback.connect(delay);
  wetgain.connect(this.output);


  //if(bypass) mix = 0;
  //  wetgain.gain.value = mix;
  //  drygain.gain.value = 1 - mix;
}

SpeechJammer.toggleFilter = function(element) {
  this.mic.disconnect(0);
  this.delay.disconnect(0);
  this.wetgain.disconnect(0);
  if(element.checked) {
    this.mic.connect(this.delay);
    this.delay.connect(this.wetgain);
    this.wetgain.connect(this.output);
  } else {
    this.mic.connect(this.output);
  }
}
