var audioCtx = null;

$(function(){
  audioCtx = new AudioContext();
  console.log("audioCtx init");
});

var ChangePich = {
  FREQ_MUL: 7000,
  QUAL_MUL: 30,
};

ChangePich.setup = function() {
  // WebAudio API 関係の初期化
  console.log("ChangePich setup");
  this.output = audioCtx.createMediaStreamDestination();
  this.allpassNode = audioCtx.createBiquadFilter();
  this.allpassNode.type = 7;
  this.allpassNode.frequency.value = this.allpassNode.frequency.value * 2;
  //this.allpassNode.frequency.value = 440;
}

ChangePich.setupFilter = function(audioStream) {
  this.mic = audioCtx.createMediaStreamSource(audioStream);
  // エフェクトを掛けて(ローパス)
  this.mic.connect(this.allpassNode);
  this.allpassNode.connect(this.output);
}

ChangePich.toggleFilter = function(element) {
  this.mic.disconnect(0);
  this.allpassNode.disconnect(0);
  if(element.checked) {
    this.mic.connect(this.allpassNode);
    this.allpassNode.connect(this.output);
  } else {
    this.mic.connect(this.output);
  }
}
