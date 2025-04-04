//code to start and stop audio in the webpage

const soundCtx = new AudioContext();

const gainGate = soundCtx.createGain();
gainGate.gain.value = 1.0;

let sourceMM;
let analyserMM;
const loadPlayAudioMM = async function () {
  const file1 = await fetch("Memory Machine.wav");
  const arrayBufferMM = await file1.arrayBuffer();
  const audioBufferMM = await soundCtx.decodeAudioData(arrayBufferMM);
  sourceMM = soundCtx.createBufferSource();
  sourceMM.buffer = audioBufferMM;

  analyserMM = soundCtx.createAnalyser();
  analyserMM.fftSize = 2048;
  const bufferLengthMM = analyserMM.frequencyBinCount;
  const dataArrayMM = new Uint8Array(bufferLengthMM);

  sourceMM.connect(gainGate);
  gainGate.connect(analyserMM);
  gainGate.connect(soundCtx.destination);

  const updateAnalyserMM = function () {
    analyserMM.getByteFrequencyData(dataArrayMM);
    console.log(dataArrayMM);
    requestAnimationFrame(updateAnalyserMM);
  };
  updateAnalyserMM();
};

let sourceB;
let analyserB;
const loadPlayAudioB = async function () {
  const file2 = await fetch("Being.wav");
  const arrayBufferB = await file2.arrayBuffer();
  const audioBufferB = await soundCtx.decodeAudioData(arrayBufferB);
  sourceB = soundCtx.createBufferSource();
  sourceB.buffer = audioBufferB;

  analyserB = soundCtx.createAnalyser();
  analyserB.fftSize = 512;
  const bufferLengthB = analyserB.frequencyBinCount;
  const dataArrayB = new Uint8Array(bufferLengthB);
  sourceB.connect(gainGate);
  gainGate.connect(analyserB);
  gainGate.connect(soundCtx.destination);

  const detectBeats = function () {
    analyserB.getByteTimeDomainData(dataArrayB);

    let sum = 0;
    for (let i = 0; i < bufferLengthB, i++; ) {
      let normalized = dataArrayB[i] / 128.0 - 1.0;
      sum += normalized * normalized;
    }

    let energy = sum / bufferLengthB;
    console.log("Energy:", energy);

    if (energy > 0.02) {
      console.log("Beat detected");
    }
    requestAnimationFrame(detectBeats);
  };
  detectBeats();
};

let sourceOMW;
const loadPlayAudioOMW = async function () {
  const file3 = await fetch("On My Way Home.wav");
  const arrayBufferOMW = await file3.arrayBuffer();
  const audioBufferOMW = await soundCtx.decodeAudioData(arrayBufferOMW);
  sourceOMW = soundCtx.createBufferSource();
  sourceOMW.buffer = audioBufferOMW;
  sourceOMW.connect(gainGate);
  gainGate.connect(soundCtx.destination);
};

let sourceE;
const loadPlayAudioE = async function () {
  const file3 = await fetch("Everlasting.wav");
  const arrayBufferE = await file3.arrayBuffer();
  const audioBufferE = await soundCtx.decodeAudioData(arrayBufferE);
  sourceE = soundCtx.createBufferSource();
  sourceE.buffer = audioBufferE;
  sourceE.connect(gainGate);
  gainGate.connect(soundCtx.destination);
};

let onOffMM = false;

document.addEventListener("DOMContentLoaded", () => {
  loadPlayAudioMM();
});

document
  .getElementById("start/stop memory machine")
  .addEventListener("click", (event) => {
    if (soundCtx.state == "suspended") {
      soundCtx.resume();
      sourceMM.start();
    }

    let now = soundCtx.currentTime;

    if (!onOffMM) {
      gainGate.gain.setValueAtTime(gainGate.gain.value, now);
      gainGate.gain.linearRampToValueAtTime(1, now + 0.05);

      event.target.style.backgroundColor = "aqua";
      event.target.innerText = "stop memory machine";
      onOffMM = true;
    } else {
      gainGate.gain.setValueAtTime(gainGate.gain.value, now);
      gainGate.gain.linearRampToValueAtTime(0, now + 0.05);

      event.target.style.backgroundColor = "pink";
      event.target.innerText = "start memory machine";
      onOffMM = false;
    }
  });

let onOffB = false;

document.addEventListener("DOMContentLoaded", () => {
  loadPlayAudioB();
});

document
  .getElementById("start/stop being")
  .addEventListener("click", (event) => {
    if (soundCtx.state == "suspended") {
      soundCtx.resume();
      sourceB.start();
    }
    let now = soundCtx.currentTime;

    if (!onOffB) {
      gainGate.gain.setValueAtTime(gainGate.gain.value, now);
      gainGate.gain.linearRampToValueAtTime(1, now + 0.05);

      event.target.style.backgroundColor = "aqua";
      event.target.innerText = "stop being";
      onOffB = true;
    } else {
      gainGate.gain.setValueAtTime(gainGate.gain.value, now);
      gainGate.gain.linearRampToValueAtTime(0, now + 0.05);

      event.target.style.backgroundColor = "pink";
      event.target.innerText = "start being";
      onOffB = false;
    }
  });

let onOffOMW = false;

document.addEventListener("DOMContentLoaded", () => {
  loadPlayAudioOMW();
});

document
  .getElementById("start/stop on my way home")
  .addEventListener("click", (event) => {
    if (soundCtx.state == "suspended") {
      soundCtx.resume();
      sourceOMW.start();
    }
    let now = soundCtx.currentTime;

    if (!onOffOMW) {
      gainGate.gain.setValueAtTime(gainGate.gain.value, now);
      gainGate.gain.linearRampToValueAtTime(1, now + 0.05);

      event.target.style.backgroundColor = "aqua";
      event.target.innerText = "stop on my way home";
      onOffOMW = true;
    } else {
      gainGate.gain.setValueAtTime(gainGate.gain.value, now);
      gainGate.gain.linearRampToValueAtTime(0, now + 0.05);

      event.target.style.backgroundColor = "pink";
      event.target.innerText = "start on my way home";
      onOffOMW = false;
    }
  });

let onOffE = false;

document.addEventListener("DOMContentLoaded", () => {
  loadPlayAudioE();
});

document
  .getElementById("start/stop everlasting")
  .addEventListener("click", (event) => {
    if (soundCtx.state == "suspended") {
      soundCtx.resume();
      sourceE.start();
    }
    let now = soundCtx.currentTime;

    if (!onOffE) {
      gainGate.gain.setValueAtTime(gainGate.gain.value, now);
      gainGate.gain.linearRampToValueAtTime(1, now + 0.05);

      event.target.style.backgroundColor = "aqua";
      event.target.innerText = "stop everlasting";
      onOffE = true;
    } else {
      gainGate.gain.setValueAtTime(gainGate.gain.value, now);
      gainGate.gain.linearRampToValueAtTime(0, now + 0.05);

      event.target.style.backgroundColor = "pink";
      event.target.innerText = "start everlasting";
      onOffE = false;
    }
  });
