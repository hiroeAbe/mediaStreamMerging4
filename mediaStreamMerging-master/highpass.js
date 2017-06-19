var audioCtx = null;

$(function(){
  audioCtx = new AudioContext();
  console.log("audioCtx init");
});

var Highpass = {
  FREQ_MUL: 7000,
  QUAL_MUL: 30,
};

Highpass.setup = function() {
  // WebAudio API 関係の初期化
  console.log("highpass setup");
  this.output = audioCtx.createMediaStreamDestination();
  this.highpassNode = audioCtx.createBiquadFilter();
  this.highpassNode.type = 1;
  this.highpassNode.frequency.value = 440;
}

Highpass.setupFilter = function(audioStream) {
  this.mic = audioCtx.createMediaStreamSource(audioStream);
  // エフェクトを掛けて(ローパス)
  this.mic.connect(this.highpassNode);
  this.highpassNode.connect(this.output);
}

Highpass.toggleFilter = function(element) {
  this.mic.disconnect(0);
  this.highpassNode.disconnect(0);
  if(element.checked) {
    this.mic.connect(this.highpassNode);
    this.highpassNode.connect(this.output);
  } else {
    this.mic.connect(this.output);
  }
}

Highpass.changeFrequency = function(element) {
  // Clamp the frequency between the minimum value (40 Hz) and half of the
  // sampling rate.
  var minValue = 40;
  var maxValue = audioCtx.sampleRate / 2;
  // Logarithm (base 2) to compute how many octaves fall in the range.
  var numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;
  // Compute a multiplier from 0 to 1 based on an exponential scale.
  var multiplier = Math.pow(2, numberOfOctaves * (element.value - 1.0));
  // Get back to the frequency value between min and max.
  this.highpassNode.frequency.value = maxValue * multiplier;
};

Highpass.changeQuality = function(element) {
  this.highpassNode.Q.value = element.value * this.QUAL_MUL;
}
