
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
  this.delay = audioCtx.createDelay();
  this.wetgain = audioCtx.createGain();
  this.drygain = audioCtx.createGain();
  this.feedback = audioCtx.createGain();
  //this.output = audioCtx.createMediaStreamDestination();

  //var bypass = document.getElementById("bypass").checked;
  //delay.delayTime.value = parseFloat(document.getElementById("time").value);
  //feedback.gain.value = parseFloat(document.getElementById("feedback").value);
  this.delay.delayTime.value = 0.3;
  this.feedback.gain.value = 0.4;
}
SpeechJammer.setupFilter = function(audioStream){
  //var mix = parseFloat(document.getElementById("mix").value);
  this.mic = audioCtx.createMediaStreamSource(audioStream);
  this.mic.connect(this.delay);

  //input.connect(delay);

  this.delay.connect(this.wetgain);
  this.delay.connect(this.feedback);
  this.feedback.connect(this.delay);
  this.wetgain.connect(audioCtx.destination);


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
    this.wetgain.connect(audioCtx.destination);
  } else {
    this.mic.connect(audioCtx.destination);
  }
}
