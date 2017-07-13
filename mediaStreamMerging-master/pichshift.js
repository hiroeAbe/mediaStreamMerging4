var audioCtx = null;


$(function(){
  audioCtx = new AudioContext();
  audioCtx.createScriptProcessor = audioCtx.createScriptProcessor ||
                                  audioCtx.createJavaScriptNode;
  console.log("audioCtx init");
});



setupPich = function(audioStream) {
  console.log("pichshift setup");
  var processor = audioCtx.createScriptProcessor(1024, 2, 2);
  this.output = audioCtx.createMediaStreamDestination();
  this.mic = audioCtx.createMediaStreamSource(audioStream);
  
  this.mic.connect(processor);
  processor.connect(this.output);
  processor.onaudioprocess = (event) => {
  const inputLs  = event.inputBuffer.getChannelData(0);
  const inputRs  = event.inputBuffer.getChannelData(1);
  const outputLs = event.outputBuffer.getChannelData(0);
  const outputRs = event.outputBuffer.getChannelData(1);

  for (let i = 0; i < 1024; i++) {
    //const outputLs = ;
    //const outputRs = ;

    var pich = 2.0;
    var n = 128;
    var t = pich*i;
    for(int m = t - n / 2; m <= t + n ; m ++){
      if(m >= 0 && m < 1024){
        outputLs[i] += outputRs[i] * Math.sin(Math.PI*(t - m)) * (0.5 + 0.5 * Math.cos(2.0 * Math.PI * (t - m) / (n * 2 + 1)));
      }

    outputLs[i] = outputL;  // ピッチシフターが適用された音声データ
    outputRs[i] = outputR;  // ピッチシフターが適用された音声データ
  }
};
}).catch((error) => {
console.error(error);
});

}


/*PichShift.toggleFilter = function(element) {
  this.mic.disconnect(0);
  processor.disconnect(0);
  if(element.checked) {
    this.mic.connect(processor);
    processor.connect(this.output);
  } else {
    this.mic.connect(this.output);
  }
}

PichShift.changeFrequency = function(element) {
  // Clamp the frequency between the minimum value (40 Hz) and half of the
  // sampling rate.
  var minValue = 40;
  var maxValue = audioCtx.sampleRate / 2;
  // Logarithm (base 2) to compute how many octaves fall in the range.
  var numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;
  // Compute a multiplier from 0 to 1 based on an exponential scale.
  var multiplier = Math.pow(2, numberOfOctaves * (element.value - 1.0));
  // Get back to the frequency value between min and max.
  processor.frequency.value = maxValue * multiplier;
};

PichShift.changeQuality = function(element) {
  this.processor.Q.value = element.value * this.QUAL_MUL;
}*/
