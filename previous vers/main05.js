/// <reference path="p5js/TSDef/p5.global-mode.d.ts" />


new p5();


let mySound;
let startButton;
let fft;

function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound("music01.ogg");
}

function setup () {
    createCanvas(windowWidth / 3.5, windowHeight);
    startButton = document.getElementById("startButton");
    startButton.onclick = togglePlay;
    fft = new p5.FFT();
    amplitude = new p5.Amplitude();
    // amplitude.connect(fft);
}

function draw () {
    background(0);
    fftCollector();
}

function fftCollector() {
    amplitude.smooth(1);
    let waveform = fft.analyze(128);
    fft.smooth(0.9);
    let octaves = fft.getOctaveBands(8, 3);
    waveform = fft.logAverages(octaves);
    visualiser(waveform);
}

function visualiser(data) {
    strokeWeight(3);
    stroke(255,255,255);
    for (i=0; i<data.length; i++) {
        if (data[i] < 10) continue;
      line(5*i, 350 - map(sqrt(Math.abs(data[i] - fft.getEnergy(i))) - 5 - i*0.05, 0 ,1, 0, 20), 5*i, 350);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

}

function togglePlay() {
    if (mySound.isPlaying()) {
        mySound.pause();
    } else {
        mySound.loop();
    }
  }