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
    mySound.amp(0.2);
}

function draw () {
    background(0);
    fftCollector();
}

function fftCollector() {
    let waveform = fft.analyze(32);
    fft.smooth(0.6);
    let energy = [];
    for (i=0; i<waveform.length; i++) {
        energy[i] = fft.getEnergy(i);
    }
    visualiser(energy);
}

function visualiser(data) {
    strokeWeight(10);
    stroke(255,255,255);
    for (i=0; i<data.length; i++) {
      line(15*i, 350 - map(Math.abs(sqrt(data[i])), 0 ,1, 1, 20), 15*i, 350);
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