//code to start and stop audio in the webpage

const soundCtx = new AudioContext();

let audioBufferMM;
let audioBufferB;
let audioBufferOMW;
let audioBufferE;

let sourceMM;
let analyserMM;
let gainGateMM;
const loadPlayAudioMM = async function () {
  const file1 = await fetch("Memory Machine.wav");
  const arrayBufferMM = await file1.arrayBuffer();
  audioBufferMM = await soundCtx.decodeAudioData(arrayBufferMM);
  sourceMM = soundCtx.createBufferSource();
  sourceMM.buffer = audioBufferMM;

  gainGateMM = soundCtx.createGain();
  gainGateMM.gain.value = 1.0;

  analyserMM = soundCtx.createAnalyser();
  analyserMM.fftSize = 2048;
  const bufferLengthMM = analyserMM.frequencyBinCount;
  const dataArrayMM = new Uint8Array(bufferLengthMM);

  sourceMM.connect(gainGateMM);
  gainGateMM.connect(analyserMM);
  gainGateMM.connect(soundCtx.destination);

  const updateAnalyserMM = function () {
    analyserMM.getByteFrequencyData(dataArrayMM);
    console.log(dataArrayMM);
    requestAnimationFrame(updateAnalyserMM);
  };
  updateAnalyserMM();
};

let sourceB;
let analyserB;
let gainGateB;
const loadPlayAudioB = async function () {
  const file2 = await fetch("Being.wav");
  const arrayBufferB = await file2.arrayBuffer();
  audioBufferB = await soundCtx.decodeAudioData(arrayBufferB);
  sourceB = soundCtx.createBufferSource();
  sourceB.buffer = audioBufferB;

  gainGateB = soundCtx.createGain();
  gainGateB.gain.value = 1.0;

  analyserB = soundCtx.createAnalyser();
  analyserB.fftSize = 512;
  const bufferLengthB = analyserB.frequencyBinCount;
  const dataArrayB = new Uint8Array(bufferLengthB);

  sourceB.connect(gainGateB);
  gainGateB.connect(analyserB);
  gainGateB.connect(soundCtx.destination);

  const detectBeatsB = function () {
    analyserB.getByteTimeDomainData(dataArrayB);
    let sum = 0;
    for (let i = 0; i < bufferLengthB; i++) {
      let normalized = dataArrayB[i] / 128.0 - 1.0;
      sum += normalized * normalized;
    }

    let energy = sum / bufferLengthB;
    console.log("Energy:", energy);

    if (energy > 0.02) {
      console.log("Beat detected");
    }
    requestAnimationFrame(detectBeatsB);
  };
  detectBeatsB();
};

let sourceOMW;
let analyserOMW;
let gainGateOMW;
const loadPlayAudioOMW = async function () {
  const file3 = await fetch("On My Way Home.wav");
  const arrayBufferOMW = await file3.arrayBuffer();
  audioBufferOMW = await soundCtx.decodeAudioData(arrayBufferOMW);
  sourceOMW = soundCtx.createBufferSource();
  sourceOMW.buffer = audioBufferOMW;

  gainGateOMW = soundCtx.createGain();
  gainGateOMW.gain.value = 1.0;

  analyserOMW = soundCtx.createAnalyser();
  analyserOMW.fftSize = 2048;
  const bufferLengthOMW = analyserOMW.frequencyBinCount;
  const dataArrayOMW = new Uint8Array(bufferLengthOMW);
  sourceOMW.connect(gainGateOMW);
  gainGateOMW.connect(analyserOMW);
  gainGateOMW.connect(soundCtx.destination);

  const updateAnalyserOMW = function () {
    analyserOMW.getByteFrequencyData(dataArrayOMW);
    console.log(dataArrayOMW);
    requestAnimationFrame(updateAnalyserOMW);
  };
  updateAnalyserOMW();
};

let sourceE;
let analyserE;
let gainGateE;
const loadPlayAudioE = async function () {
  const file3 = await fetch("Everlasting.wav");
  const arrayBufferE = await file3.arrayBuffer();
  audioBufferE = await soundCtx.decodeAudioData(arrayBufferE);
  sourceE = soundCtx.createBufferSource();
  sourceE.buffer = audioBufferE;

  gainGateE = soundCtx.createGain();
  gainGateE.gain.value = 1.0;

  analyserE = soundCtx.createAnalyser();
  analyserE.fftSize = 512;
  const bufferLengthE = analyserE.frequencyBinCount;
  const dataArrayE = new Uint8Array(bufferLengthE);

  sourceE.connect(gainGateE);
  gainGateE.connect(analyserE);
  gainGateE.connect(soundCtx.destination);

  const detectBeatsE = function () {
    analyserE.getByteTimeDomainData(dataArrayE);
    let sum = 0;
    for (let i = 0; i < bufferLengthE; i++) {
      let normalized = dataArrayE[i] / 128.0 - 1.0;
      sum += normalized * normalized;
    }

    let energy = sum / bufferLengthE;
    console.log("Energy:", energy);

    if (energy > 0.02) {
      console.log("Beat detected");
    }
    requestAnimationFrame(detectBeatsE);
  };
  detectBeatsE();
};

let onOffMM = false;

document.addEventListener("DOMContentLoaded", () => {
  loadPlayAudioMM();
  loadPlayAudioB();
  loadPlayAudioOMW();
  loadPlayAudioE();
});

document
  .getElementById("start/stop memory machine")
  .addEventListener("click", (event) => {
    if (soundCtx.state == "suspended") {
      soundCtx.resume();
    }

    let now = soundCtx.currentTime;

    if (!onOffMM) {
      sourceMM = soundCtx.createBufferSource();
      sourceMM.buffer = audioBufferMM;
      sourceMM.connect(gainGateMM);
      gainGateMM.connect(soundCtx.destination);

      sourceMM.start();

      gainGateMM.gain.setValueAtTime(gainGateMM.gain.value, now);
      gainGateMM.gain.linearRampToValueAtTime(1, now + 0.05);

      event.target.style.backgroundColor = "aqua";
      event.target.innerText = "stop memory machine";
      onOffMM = true;
    } else {
      gainGateMM.gain.setValueAtTime(gainGateMM.gain.value, now);
      gainGateMM.gain.linearRampToValueAtTime(0, now + 0.05);

      event.target.style.backgroundColor = "pink";
      event.target.innerText = "start memory machine";
      onOffMM = false;

      sourceMM.stop();
      sourceMM.disconnect();
    }
  });

let onOffB = false;

document
  .getElementById("start/stop being")
  .addEventListener("click", (event) => {
    if (soundCtx.state == "suspended") {
      soundCtx.resume();
    }
    let now = soundCtx.currentTime;

    if (!onOffB) {
      sourceB = soundCtx.createBufferSource();
      sourceB.buffer = audioBufferB;
      sourceB.connect(gainGateB);
      gainGateB.connect(soundCtx.destination);

      sourceB.start();

      gainGateB.gain.setValueAtTime(gainGateB.gain.value, now);
      gainGateB.gain.linearRampToValueAtTime(1, now + 0.05);

      event.target.style.backgroundColor = "aqua";
      event.target.innerText = "stop being";
      onOffB = true;
    } else {
      gainGateB.gain.setValueAtTime(gainGateB.gain.value, now);
      gainGateB.gain.linearRampToValueAtTime(0, now + 0.05);

      event.target.style.backgroundColor = "pink";
      event.target.innerText = "start being";
      onOffB = false;

      sourceB.stop();
      sourceB.disconnect();
    }
  });

let onOffOMW = false;

document
  .getElementById("start/stop on my way home")
  .addEventListener("click", (event) => {
    if (soundCtx.state == "suspended") {
      soundCtx.resume();
    }
    let now = soundCtx.currentTime;

    if (!onOffOMW) {
      sourceOMW = soundCtx.createBufferSource();
      sourceOMW.buffer = audioBufferOMW;
      sourceOMW.connect(gainGateOMW);
      gainGateOMW.connect(soundCtx.destination);

      sourceOMW.start();

      gainGateOMW.gain.setValueAtTime(gainGateOMW.gain.value, now);
      gainGateOMW.gain.linearRampToValueAtTime(1, now + 0.05);

      event.target.style.backgroundColor = "aqua";
      event.target.innerText = "stop on my way home";
      onOffOMW = true;
    } else {
      gainGateOMW.gain.setValueAtTime(gainGateOMW.gain.value, now);
      gainGateOMW.gain.linearRampToValueAtTime(0, now + 0.05);

      event.target.style.backgroundColor = "pink";
      event.target.innerText = "start on my way home";
      onOffOMW = false;

      sourceOMW.stop();
      sourceOMW.disconnect();
    }
  });

let onOffE = false;

document
  .getElementById("start/stop everlasting")
  .addEventListener("click", (event) => {
    if (soundCtx.state == "suspended") {
      soundCtx.resume();
    }
    let now = soundCtx.currentTime;

    if (!onOffE) {
      sourceE = soundCtx.createBufferSource();
      sourceE.buffer = audioBufferE;
      sourceE.connect(gainGateE);
      gainGateE.connect(soundCtx.destination);

      sourceE.start();

      gainGateE.gain.setValueAtTime(gainGateE.gain.value, now);
      gainGateE.gain.linearRampToValueAtTime(1, now + 0.05);

      event.target.style.backgroundColor = "aqua";
      event.target.innerText = "stop everlasting";
      onOffE = true;
    } else {
      gainGateE.gain.setValueAtTime(gainGateE.gain.value, now);
      gainGateE.gain.linearRampToValueAtTime(0, now + 0.05);

      event.target.style.backgroundColor = "pink";
      event.target.innerText = "start everlasting";
      onOffE = false;

      sourceE.stop();
      sourceE.disconnect();
    }
  });
