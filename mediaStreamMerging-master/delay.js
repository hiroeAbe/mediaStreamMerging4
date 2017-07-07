
$(function(){
  //audioCtx = new AudioContext();
  console.log("audioCtx init");

});

var Delay = {
  FREQ_MUL: 7000,
  QUAL_MUL: 30,
};

Delay.setupDelay = function(audioStream) {
  // WebAudio API 関係の初期化
  console.log("delay setup");
  var audioCtx = new AudioContext();;
  var input = audioCtx.createGain();
  var delay = audioCtx.createDelay();
  var wetgain = audioCtx.createGain();
  var drygain = audioCtx.createGain();
  var feedback = audioCtx.createGain();
  this.output = audioCtx.createMediaStreamDestination();

  /*var bypass = document.getElementById("bypass").checked;
  delay.delayTime.value = parseFloat(document.getElementById("time").value);
  feedback.gain.value = parseFloat(document.getElementById("feedback").value);
  var mix = parseFloat(document.getElementById("mix").value);*/
  this.mic = audioCtx.createMediaStreamSource(audioStream);
  this.mic.connect(input);

  input.connect(delay);
  input.connect(drygain);
  delay.connect(wetgain);
  delay.connect(feedback);
  feedback.connect(delay);
  wetgain.connect(this.output);
  drygain.connect(this.output);

  /*  if(bypass) mix = 0;
    wetgain.gain.value = mix;
    drygain.gain.value = 1 - mix;*/

  /*  const Setup = () => {
      var bypass = document.getElementById("bypass").checked;
      delay.delayTime.value = parseFloat(document.getElementById("time").value);
      feedback.gain.value = parseFloat(document.getElementById("feedback").value);
      var mix = parseFloat(document.getElementById("mix").value);
      if(bypass) mix = 0;
        wetgain.gain.value = mix;
        drygain.gain.value = 1 - mix;
    }
  document.querySelector("input#bypass").addEventListener("change", Setup);
  document.querySelector("input#time").addEventListener("change", Setup);
  document.querySelector("input#feedback").addEventListener("change", Setup);
  document.querySelector("input#mix").addEventListener("change", Setup);

  Setup();*/
}

Delay.Setupp = function(){
  const Setup = () => {
    var bypass = document.getElementById("bypass").checked;
    var delay = audioCtx.createDelay();
    var wetgain = audioCtx.createGain();
    var drygain = audioCtx.createGain();
    var feedback = audioCtx.createGain();
    delay.delayTime.value = parseFloat(document.getElementById("time").value);
    feedback.gain.value = parseFloat(document.getElementById("feedback").value);
    var mix = parseFloat(document.getElementById("mix").value);
    if(bypass) mix = 0;
      wetgain.gain.value = mix;
      drygain.gain.value = 1 - mix;
  }
  document.querySelector("input#bypass").addEventListener("change", Setup);
  document.querySelector("input#time").addEventListener("change", Setup);
  document.querySelector("input#feedback").addEventListener("change", Setup);
  document.querySelector("input#mix").addEventListener("change", Setup);

  Setup();

}
