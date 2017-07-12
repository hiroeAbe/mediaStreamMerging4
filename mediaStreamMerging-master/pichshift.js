var audioCtx = null;


$(function(){
  audioCtx = new AudioContext();
  audioCtx.createScriptProcessor = audioCtx.createScriptProcessor ||
                                  audioCtx.createJavaScriptNode;
  console.log("audioCtx init");
});

var PichShift = {
  FREQ_MUL: 7000,
  QUAL_MUL: 30,
};

PichShift.setupFilter = function(audioStream) {
  console.log("highpass setup");
  var processor = audioCtx.createScriptProcessor(1024, 2, 2);

  const Process(ev) => {
    var buf0 = ev.outputBuffer.getChannelData(0);
    var buf1 = ev.outputBuffer.getChannelData(1);
    //var fs = audioCtx.sampleRate;  // Sampling frequency

    for(var i = 0; i < bufsize; ++i)
    buf0[i] = buf1[i] = (Math.random() - 0.5) * play;
  }

  processor.onaudioprocess = Process();
  this.output = audioCtx.createMediaStreamDestination();
  this.mic = audioCtx.createMediaStreamSource(audioStream);
  // エフェクトを掛けて(ローパス)
  this.mic.connect(processor);
  processor.connect(this.output);


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
