var audioCtx = null;


$(function(){
  audioCtx = new AudioContext();
  audioCtx.createScriptProcessor = audioCtx.createScriptProcessor || audioCtx.createJavaScriptNode;
  console.log("audioCtx init");
});

var PichShift = {
  FREQ_MUL: 7000,
  QUAL_MUL: 30,
};

PichShift.setup = function(audioStream) {

  console.log("pichshift setup");
  const processor = audioCtx.createScriptProcessor(1024, 2, 2);
  this.output = audioCtx.createMediaStreamDestination();
  this.mic = audioCtx.createMediaStreamSource(audioStream);

  this.mic.connect(processor);
  processor.connect(this.output);

  　const frequency = 800;
    const fs = audioCtx.sampleRate;  // Sampling frequency
    const t0 = fs / frequency;


    processor.onaudioprocess = (event) => {
      const inputLs  = event.inputBuffer.getChannelData(0);
      const inputRs  = event.inputBuffer.getChannelData(1);
      const outputLs = event.outputBuffer.getChannelData(0);
      const outputRs = event.outputBuffer.getChannelData(1);

      for (let i = 0; i < 1024; i++) {
        outputLs[i] = 2*(Math.random() - 0.5);
        outputRs[i] = 2*(Math.random() - 0.5);


      }
    };

    //const outputLs = ;
    //const outputRs = ;

    /*const pich = 5.0;
    const n = 128;
    let t = pich*i;
    let ta = parseInt(t);
    if(t == ta){
      tb = ta;
    }else{
      tb = ta + 1;
    }
    for(let m = tb - n / 2; m <= ta + n ; m ++){
      if(m >= 0 && m < 1024){
        outputLs[i] += outputRs[m] * Math.sin(Math.PI*(t - m)) * (0.5 + 0.5 * Math.cos(2.0 * Math.PI * (t - m) / (n * 2 + 1)));
      }

    outputLs[i] = outputL;  // ピッチシフターが適用された音声データ
    outputRs[i] = outputR;  // ピッチシフターが適用された音声データ
*/



};


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
