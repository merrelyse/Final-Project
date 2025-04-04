//code to start and stop audio in the webpage

const soundCtx = new AudioContext();

const gainGate = soundCtx.createGain();
gainGate.gain.value = 1.0;

gainGate.connect(soundCtx.destination);
let sourceMM;
const loadPlayAudioMM = async function () {
  const file1 = await fetch("Memory Machine.wav");
  const arrayBufferMM = await file1.arrayBuffer();
  const audioBufferMM = await soundCtx.decodeAudioData(arrayBufferMM);
  sourceMM = soundCtx.createBufferSource();
  sourceMM.buffer = audioBufferMM;
  //sourceMM.connect(gainGate);
  sourceMM.start();
};

gainGate.connect(soundCtx.destination);
let sourceB;
const loadPlayAudioB = async function () {
  const file2 = await fetch("Being.wav");
  const arrayBufferB = await file2.arrayBuffer();
  const audioBufferB = await soundCtx.decodeAudioData(arrayBufferB);
  sourceB = soundCtx.createBufferSource();
  sourceB.buffer = audioBufferB;
  //sourceB.connect(gainGate);
  sourceB.start();
};

gainGate.connect(soundCtx.destination);
let sourceOMW;
const loadPlayAudioOMW = async function () {
  const file3 = await fetch("On My Way Home.wav");
  const arrayBufferOMW = await file3.arrayBuffer();
  const audioBufferOMW = await soundCtx.decodeAudioData(arrayBufferOMW);
  sourceOMW = soundCtx.createBufferSource();
  sourceOMW.buffer = audioBufferOMW;
  //sourceOMW.connect(gainGate);
  sourceOMW.start();
};

gainGate.connect(soundCtx.destination);
let sourceE;
const loadPlayAudioE = async function () {
  const file3 = await fetch("Everlasting.wav");
  const arrayBufferE = await file3.arrayBuffer();
  const audioBufferE = await soundCtx.decodeAudioData(arrayBufferE);
  sourceE = soundCtx.createBufferSource();
  sourceE.buffer = audioBufferE;
  //sourceE.connect(gainGate);
  sourceE.start();
};

let onOffMM = false;

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
      event.target.innerText = "stop";
      onOffMM = true;
    } else {
      gainGate.gain.setValueAtTime(gainGate.gain.value, now);
      gainGate.gain.linearRampToValueAtTime(0, now + 0.05);

      event.target.style.backgroundColor = "pink";
      event.target.innerText = "start";
      onOffMM = false;
    }
  });

let onOffB = false;

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
      event.target.innerText = "stop";
      onOffB = true;
    } else {
      gainGate.gain.setValueAtTime(gainGate.gain.value, now);
      gainGate.gain.linearRampToValueAtTime(0, now + 0.05);

      event.target.style.backgroundColor = "pink";
      event.target.innerText = "start";
      onOffB = false;
    }
  });

let onOffOMW = false;

document
  .getElementById("start/stop memory machine")
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
      event.target.innerText = "stop";
      onOffOMW = true;
    } else {
      gainGate.gain.setValueAtTime(gainGate.gain.value, now);
      gainGate.gain.linearRampToValueAtTime(0, now + 0.05);

      event.target.style.backgroundColor = "pink";
      event.target.innerText = "start";
      onOffOMW = false;
    }
  });

let onOffE = false;

document
  .getElementById("start/stop memory machine")
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
      event.target.innerText = "stop";
      onOffE = true;
    } else {
      gainGate.gain.setValueAtTime(gainGate.gain.value, now);
      gainGate.gain.linearRampToValueAtTime(0, now + 0.05);

      event.target.style.backgroundColor = "pink";
      event.target.innerText = "start";
      onOffE = false;
    }
  });
