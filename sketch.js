// named all variables
let analyserData = [];
let currentAnalyzer = null;
let isPlaying = false;
let sensitivity;
let sens;
let audioHistory = new Array(360).fill(0);
let activeTrack = "";
let smoothingFactor = 0.85;
let updateFrequency = 3;
let frameCount = 0;
let prevAudioLevel = 0;

function setup() {
  let canvas = createCanvas(700, 600);
  canvas.style("display", "block");
  canvas.style("margin", "0 auto");
  clear();

  //creates "random" values for each visualizer, but uses the same ones each time it's run
  noiseSeed(42);

  //initialize audio history
  for (let i = 0; i < 360; i++) {
    audioHistory[i] = 0;
  }

  //sensitivity slider
  if (!document.querySelector("#sensitivity")) {
    const sliderContainer = document.createElement("div");
    sliderContainer.style.textAlign = "center";
    sliderContainer.style.margin = "10px auto";
    sliderContainer.style.width = "200px";

    const sensitivityLabel = document.createElement("label");
    sensitivityLabel.htmlFor = "sensitivity";
    sensitivityLabel.textContent = "sensitivity";
    sensitivityLabel.style.display = "block";
    sensitivityLabel.style.marginBottom = "5px";
    sensitivityLabel.style.fontFamily = "cursive";
    sensitivityLabel.style.fontSize = "18px";

    const sensitivitySlider = document.createElement("input");
    sensitivitySlider.type = "range";
    sensitivitySlider.id = "sensitivity";
    sensitivitySlider.min = "0.5";
    sensitivitySlider.max = "1.09";
    sensitivitySlider.step = "0.01";
    sensitivitySlider.value = "0.5";
    sensitivitySlider.style.width = "100%";

    sliderContainer.appendChild(sensitivityLabel);
    sliderContainer.appendChild(sensitivitySlider);
    document.body.appendChild(sliderContainer);
  }
}

function draw() {
  clear();
  //map sensitivity slider value to affect intensity
  sensitivity = document.querySelector("#sensitivity").value;
  sens = map(sensitivity, 0, 1, 0.5, 0.05);

  //make visualization smoother by wrapping it in modules
  frameCount = (frameCount + 1) % updateFrequency;
  let newAudioValue = 0;

  //only analyze audio if it's playing and update frames are running
  if (isPlaying && currentAnalyzer && frameCount === 0) {
    const bufferLength = currentAnalyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    //analyze frequency data for these tracks only
    if (activeTrack === "memory-machine" || activeTrack === "on-my-way-home") {
      currentAnalyzer.getByteFrequencyData(dataArray);

      //average frequencies
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }

      let avgLevel = sum / bufferLength / 255;

      //smooth audio level exponentially
      newAudioValue =
        prevAudioLevel * smoothingFactor + avgLevel * (1 - smoothingFactor);

      //store value in audio history array
      audioHistory.push(newAudioValue);
      if (audioHistory.length > 360) {
        audioHistory.shift();
      }

      //analyze "rhythm" (waveform over time)
    } else if (activeTrack === "being" || activeTrack === "everlasting") {
      currentAnalyzer.getByteTimeDomainData(dataArray);

      let sum = 0;

      //convert waveform into energy
      for (let i = 0; i < bufferLength; i++) {
        let normalized = dataArray[i] / 128.0 - 1.0;
        sum += normalized * normalized;
      }

      let energy = sum / bufferLength;

      //further slow down visualizer for rhythm
      const rhythmSmoothingFactor = 0.95;

      //reduce amplification to further slow down
      newAudioValue =
        prevAudioLevel * rhythmSmoothingFactor +
        energy * 1.5 * (1 - rhythmSmoothingFactor);

      //save value in audio history
      audioHistory.push(newAudioValue);
      if (audioHistory.length > 360) {
        audioHistory.shift();
      }
    }
  }

  //draw circular visualizer
  strokeWeight(3);
  translate(width / 2, height / 2);
  beginShape();

  //use last value twice to smooth
  let lastIndex = 359;
  let r_last = map(audioHistory[lastIndex], 0, sens, 50, 180);
  let x_last = r_last * cos(lastIndex);
  let y_last = r_last * sin(lastIndex);
  curveVertex(x_last, y_last);

  //loop history and plot points
  for (let i = 0; i < 360; i++) {
    let r = map(audioHistory[i], 0, sens, 50, 200);

    //add subtle noise for smoother motion
    let noiseValue = noise(i * 0.05, frameCount, 0.005) * 5;
    r += noiseValue;

    let x = r * cos(i);
    let y = r * sin(i);

    //match audio level to stroke color
    let colorMap = map(audioHistory[i], 0, sens, 270, 180);
    colorMode(HSL);
    stroke(colorMap, 85, 60);

    //plot curve vertex to calculated points
    curveVertex(x, y);

    //smooth corners with occasional duplicate vertices
    if (i % 45 === 0) {
      curveVertex(x, y);
    }
  }

  //add more points to close curves
  for (let i = 0; i < 3; i++) {
    let r = map(audioHistory[i], 0, sens, 50, 180);
    let x = r * cos(i);
    let y = r * sin(i);
    curveVertex(x, y);
  }

  endShape(CLOSE);
}
//start visualizing given analyzer from audio webpage
window.setCurrentAnalyzer = function (analyzer, trackName) {
  currentAnalyzer = analyzer;
  activeTrack = trackName;
  isPlaying = true;

  audioHistory = new Array(360).fill(0);
  prevAudioLevel = 0;
};

//stop visualizing given analyzer from audio webpage
window.stopVisualization = function () {
  isPlaying = false;
  currentAnalyzer = null;
  activeTrack = "";

  //slow fade out
  let fadeInterval = setInterval(() => {
    for (let i = 0; i < audioHistory.length; i++) {
      audioHistory[i] *= 0.9;
    }

    //stop fading
    if (Math.max(...audioHistory) < 0.01) {
      clearInterval(fadeInterval);
      audioHistory = new Array(360).fill(0); //full reset
    }
  }, 50);
};

//used Claude AI for help with debugging (more accurate than ChatGPT)
//visualizer adapted from Austin Zhang
