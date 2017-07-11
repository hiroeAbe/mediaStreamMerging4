var audioctx = new AudioContext();

var buffer = null;
var src = null;

setupChangePich = function(audioStream){

/*const LoadSample = (ctx, url) => {
  fetch(url).then( response => {
    return response.arrayBuffer();
  }).then( arrayBuffer => {
    ctx.decodeAudioData(arrayBuffer, (b) => {buffer=b;}, () => {});
    document.querySelector("button#playsound").removeAttribute("disabled");
  });
}
LoadSample(audioctx, "./loop.wav");*/

var mode = 0;
var timerId;
var analyser = audioctx.createAnalyser();
analyser.fftSize = 1024;
document.getElementById("min").value = analyser.minDecibels;
document.getElementById("max").value = analyser.maxDecibels;
var ctx = document.getElementById("graph").getContext("2d");

const DrawGraph = () => {
    ctx.fillStyle = "rgba(34, 34, 34, 1.0)";
    ctx.fillRect(0, 0, 512, 256);
    ctx.strokeStyle="rgba(255, 255, 255, 1)";
    var data = new Uint8Array(512);
    if(mode == 0) analyser.getByteFrequencyData(data); //Spectrum Data
    else analyser.getByteTimeDomainData(data); //Waveform Data
    if(mode!=0) ctx.beginPath();
    for(var i = 0; i < 256; ++i) {
        if(mode==0) {
            ctx.fillStyle = "rgba(204, 204, 204, 0.8)";
            ctx.fillRect(i*2, 256 - data[i], 1, data[i]);
        } else {
            ctx.lineTo(i*2, 256 - data[i]);
        }
    }
    if(mode!=0) {
        ctx.stroke();
    }
    requestAnimationFrame(DrawGraph);
}
timerId=requestAnimationFrame(DrawGraph);

const Setup = () => {
    mode = document.getElementById("mode").selectedIndex;
    analyser.minDecibels = parseFloat(document.getElementById("min").value);
    analyser.maxDecibels = parseFloat(document.getElementById("max").value);
    analyser.smoothingTimeConstant = parseFloat(document.getElementById("smoothing").value);
}
Setup();

/*document.querySelector("button#playsound").addEventListener("click", (event) => {
    var label;
    if(event.target.innerHTML=="Stop") {
        src.stop(0);
        cancelAnimationFrame(timerId);
        label="Start";
    } else {
        src = audioctx.createBufferSource();
        src.buffer = buffer;
        src.loop = true;
        src.connect(audioctx.destination);
        src.connect(analyser);
        src.start(0);
        label="Stop";
    }
    event.target.innerHTML=label;
});*/
document.querySelector("select#mode").addEventListener("change", Setup);
document.querySelector("input#smoothing").addEventListener("change", Setup);
document.querySelector("input#min").addEventListener("change", Setup);
document.querySelector("input#max").addEventListener("change", Setup);


  this.mic = audioctx.createMediaStreamSource(audioStream);
  // エフェクトを掛けて(ローパス)
  this.mic.connect(analyser);
  this.mic.connect(this.output);

}
