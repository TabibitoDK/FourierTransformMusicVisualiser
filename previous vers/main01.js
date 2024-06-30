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
    let waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(255);
  for (let i = 0; i < waveform.length; i++){
    let x = map(i, 0, sqrt(waveform.length), 0, width);
    let y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
  }
  endShape();
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