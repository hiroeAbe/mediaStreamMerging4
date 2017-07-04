var audioCtx = null;

$(function(){
  audioCtx = new AudioContext();
  console.log("audioCtx init");
});

var HighFrequency = {
  FREQ_MUL: 7000,
  QUAL_MUL: 30,
};

HighFrequency.setup = function() {
  // WebAudio API 関係の初期化
  console.log("HighFrequency setup");
  this.output = audioCtx.createMediaStreamDestination();
  this.highfrequencyNode = audioCtx.createGain();
  this.highfrequencyNode.frequency.value = 440;
}

HighFrequency.setupFilter = function(audioStream) {
  this.mic = audioCtx.createMediaStreamSource(audioStream);
  // エフェクトを掛けて(ローパス)
  this.mic.connect(this.highfrequencyNode);
  this.highfrequencyNode.frequency.value = this.highfrequencyNode.frequency.value * 5;
  this.highfrequencyNode.connect(this.output);
}

HighFrequency.toggleFilter = function(element) {
  this.mic.disconnect(0);
  this.highfrequencyNode.disconnect(0);
  if(element.checked) {
    this.mic.connect(this.highfrequencyNode);
    this.highfrequencyNode.connect(this.output);
  } else {
    this.mic.connect(this.output);
  }
}

Highpass.changeQuality = function(element) {
  this.highfrequencyNode.Q.value = element.value * this.QUAL_MUL;
}
