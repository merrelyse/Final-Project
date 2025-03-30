//code to start and stop audio in the webpage

const soundCtx = new AudioContext();

const masterGain = soundCtx.createGain();
masterGain.gain.value = 1.0;

masterGain.connect(soundCtx.destination);
let sourceMM;
const loadPlayAudioMM = async function () {
  const file1 = await fetch("Memory Machine.wav");
  const arrayBufferMM = await file1.arrayBuffer();
  const audioBufferMM = await soundCtx.decodeAudioData(arrayBufferMM);
  sourceMM = soundCtx.createBufferSource();
  sourceMM.buffer = audioBufferMM;
  sourceMM.connect(masterGain);
  sourceMM.start();
};

const stopAudioMM = function () {
  sourceMM.stop();
};

masterGain.connect(soundCtx.destination);
let sourceB;
const loadPlayAudioB = async function () {
  const file2 = await fetch("Being.wav");
  const arrayBufferB = await file2.arrayBuffer();
  const audioBufferB = await soundCtx.decodeAudioData(arrayBufferB);
  sourceB = soundCtx.createBufferSource();
  sourceB.buffer = audioBufferB;
  sourceB.connect(masterGain);
  sourceB.start();
};

const stopAudioB = function () {
  sourceB.stop();
};

masterGain.connect(soundCtx.destination);
let sourceOMW;
const loadPlayAudioOMW = async function () {
  const file3 = await fetch("On My Way Home.wav");
  const arrayBufferOMW = await file3.arrayBuffer();
  const audioBufferOMW = await soundCtx.decodeAudioData(arrayBufferOMW);
  sourceOMW = soundCtx.createBufferSource();
  sourceOMW.buffer = audioBufferOMW;
  sourceOMW.connect(masterGain);
  sourceOMW.start();
};

const stopAudioOMW = function () {
  sourceOMW.stop();
};

masterGain.connect(soundCtx.destination);
let sourceE;
const loadPlayAudioE = async function () {
  const file3 = await fetch("Everlasting.wav");
  const arrayBufferE = await file3.arrayBuffer();
  const audioBufferE = await soundCtx.decodeAudioData(arrayBufferE);
  sourceE = soundCtx.createBufferSource();
  sourceE.buffer = audioBufferE;
  sourceE.connect(masterGain);
  sourceE.start();
};

const stopAudioE = function () {
  sourceE.stop();
};

document
  .getElementById("start memory machine")
  .addEventListener("click", loadPlayAudioMM);
document
  .getElementById("stop memory machine")
  .addEventListener("click", stopAudioMM);

document
  .getElementById("start being")
  .addEventListener("click", loadPlayAudioB);
document.getElementById("stop being").addEventListener("click", stopAudioB);

document
  .getElementById("start on my way home")
  .addEventListener("click", loadPlayAudioOMW);
document
  .getElementById("stop on my way home")
  .addEventListener("click", stopAudioOMW);

document
  .getElementById("start everlasting")
  .addEventListener("click", loadPlayAudioE);
document
  .getElementById("stop everlasting")
  .addEventListener("click", stopAudioE);
