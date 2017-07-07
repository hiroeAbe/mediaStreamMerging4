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
  var changepichNode = audioCtx.createBufferSource();
  changepichNode.playbackRate.value = 2;
}

ChangePich.setupFilter = function(audioStream) {
  this.mic = audioCtx.createMediaStreamSource(audioStream);
  // エフェクトを掛けて(ローパス)
  this.mic.connect(this.changepichNode);
  this.changepichNode.connect(this.output);
}

ChangePich.toggleFilter = function(element) {
  this.mic.disconnect(0);
  this.changepichNode.disconnect(0);
  if(element.checked) {
    this.mic.connect(this.changepichNode);
    this.changepichNode.connect(this.output);
  } else {
    this.mic.connect(this.output);
  }
}
