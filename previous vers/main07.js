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
    visualiser05(waveform);
}

function visualiser05(data) {
    translate(190, 300);
    strokeWeight(3);
    stroke(255,255,255);
    beginShape(TRIANGLES);
    for (i=0; i<data.length; i++) {
        color = [cos(i*2) * data[i] + sin(i) * 255, sin(i*2) * data[i] - cos(i) * 255, sin(i) * sin(i) * data[i]];
        if (data[i] < 150) {
            color[0] += 100; color[1] += 100; color[2] += 100;
        }
        fill(color[0],color[1],color[2]);
        stroke(color[0],color[1],color[2]);
        vertex((data[i] * cos(i) + sin(i) * data[i] )/2 ,(data[i] * sin(i) - cos(i) * data[i] )/ 2,data[i] * cos(i) * sin(i));
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




  function visualiser01(data) {
    strokeWeight(3);
    stroke(255,255,255);
    let j = 0;
    for (i=0; i<data.length; i++) {
        if (data[i] < 10) continue;
        if (i<10) continue;
        if (i>data.length - 10) continue;
        stroke(data[j],100,data[i]);
      line(10*j, 350 - map(sqrt(Math.abs(data[i] - fft.getEnergy(i))) - 5 - i*0.05, 0 ,1, 0, 20), 10*j, 350);
      j++;
    }
}


function visualiser02(data) {
    translate(190, 300);
    strokeWeight(3);
    stroke(255,255,255);
    for (i=0; i<data.length; i++) {
        if (data[i] < 10) continue;
        if (i<10) continue;
        if (i>data.length - 10) continue;
        if (data[i] > 175) {
            stroke(255 *data[i], 255 - data[i], 0);
        }
        else {
            stroke(0,1, 150 + data[i]);
        }   
        r = data[i] /2;
        theta = i * 0.1;
        x1 = 10*cos(theta) - 0*sin(theta);
        x2 = (10+r)*cos(theta) - 0*sin(theta);
        y1 = 10*sin(theta) + 0*cos(theta);
        y2 = (10+r)*sin(theta) + 0*cos(theta);
        line(x1, y1, x2, y2); 
    }
}


function visualiser03(data) {
    translate(190, 300);
    strokeWeight(3);
    stroke(255,255,255);
    for (i=0; i<data.length; i++) {
        if (data[i] < 10) continue;
        if (i<10) continue;
        if (i>data.length - 10) continue;
        if (data[i] % 2 == 0) {
            stroke(255 *data[i], 255 - data[i], 0);
        }
        else {
            stroke(0,1, 150 + data[i]);
        }   
        r = data[i] /2 - (data[70] / 2);
        offset = data[70] / 2;
        theta = i * 0.1;
        x1 = offset*cos(theta) - 0*sin(theta);
        x2 = (offset+r)*cos(theta) - 0*sin(theta);
        y1 = offset*sin(theta) + 0*cos(theta);
        y2 = (offset+r)*sin(theta) + 0*cos(theta);
        line(x1, y1, x2, y2); 
    }
}


function visualiser04(data) {
    translate(190, 300);
    strokeWeight(3);
    stroke(255,255,255);
    beginShape(TRIANGLES);
    for (i=0; i<data.length; i++) {
        color = [cos(i*2) * data[i], sin(i*2) * data[i], sin(i) * sin(i) * data[i]];
        if (data[i] < 150) {
            color[0] += 100; color[1] += 100; color[2] += 100;
        }
        fill(color[0],color[1],color[2]);
        stroke(color[0],color[1],color[2]);
        vertex(data[i] * cos(i) /2 ,data[i] * sin(i) / 2,data[i] * cos(i) * sin(i));
    }
    endShape();
}
