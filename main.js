/// <reference path="p5js/TSDef/p5.global-mode.d.ts" />


new p5();


let mySound;
let startButton;
let fft;
let amplitude;

function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound("music03.mp3");
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
    amplitude.smooth(0.9);
    let waveform = fft.analyze(128); // 5: 256
    fft.smooth(0.9);
    // let octaves = fft.getOctaveBands(8, 3); // 5: 16,3
    // waveform = fft.logAverages(octaves);
    visualiser02(waveform);
}

function visualiser10(data) {
    translate(190, 300);
    strokeWeight(3);
    fill(0,0,0,0)
    stroke(255);
    beginShape(QUAD_STRIP);
    console.log(data);
    angleMode(DEGREES);
    range = 500;
    if (data[50] <= 0) return; 
    background(0);
    for (i=0; i<range; i++) {
        if (data[i] < -0.9) continue;
        theta = (i/range) * 360;
        // if (i % 2 !== 0) {
        //     vertex((100)*cos(theta) - 0*sin(theta), (100)*sin(theta) + 0*cos(theta))
        // }
        r = data[i] * 50;
        x = (100 + r)*cos(theta) - 0*sin(theta);
        y = (100 + r)*sin(theta) + 0*cos(theta);
        vertex(x, y); 
    }
    vertex((100 + data[range-1] * 20)*cos(1) - 0*sin(1), (100 + data[range-1] * 20)*sin(1) + 0*cos(1))
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
      line(10*j, 350 - map(sqrt(Math.abs(data[i] - fft.getEnergy(i))) - 5 - i*0.1, 0 ,1, 0, 20), 10*j, 350);
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
            stroke(data[i] * (i/data.length*2), 0, 0);
        }
        else {
            stroke(150,0, (i/data.length* 2) * 255);
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
        angleMode(RADIANS);
        rotate(data[i]);
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

// Opengl mode

function visualiser05(data) {
    translate(190, 300);
    strokeWeight(5);
    stroke(255);
    beginShape(POINTS);
    for (i=0; i<data.length; i++) {
        color = [cos(i*2) * data[i] + sin(i) * 255, sin(i*2) * data[i] - cos(i) * 255, sin(i) * sin(i) * data[i]];
        if (data[i] < 150) {
            color[0] += 100; color[1] += 100; color[2] += 100;
        }
        // fill(color[0],color[1],color[2]);
        stroke(color[0],color[1],color[2], 255);
        vertex((data[i] * cos(i) + sin(i) * data[i] )/2 ,(data[i] * sin(i) - cos(i) * data[i] )/ 2,data[i] * cos(i) * sin(i));
    }
    endShape();
}


function visualiser06(data) {
    translate(0, 150);
    strokeWeight(2);
    fill(0,0,0,0)
    stroke(255);
    d = 20;
    for (i=0; i<20; i++) {
        if (i<4 || i>16) continue
        for( j=0; j<14; j++) {
            stroke(data[i],data[j], (data[j]+ data[i])/2);
            line(i*d, j* d, i*d + (data[j] - fft.getEnergy(i)) + 50, j*d + (data[i] - fft.getEnergy(i)) + 50);
        }
    }
}


function visualiser07(data) {
    translate(0, 150);
    strokeWeight(2);
    fill(0,0,0,0)
    stroke(255);
    d = 20;
    for (i=0; i<20; i++) {
        if (i<4 || i>16) continue
        for( j=0; j<14; j++) {
            stroke(data[j],data[i], (data[j]+ data[i])/2);
            line(i*d, j* d, (i*d + 0.5 *((data[j + 20] % 128) - 100)), j*d + 0.5* ((data[i + 40] % 64) - 80));
        }
    }
}


function visualiser08(data) {
    translate(190, 300);
    strokeWeight(3);
    fill(0,0,0,0)
    stroke(255);
    if (data[50] <= 0) return; 
    background(0);
    for (i=0; i<data.length; i++) {
        r = data[i] * 200;
        theta = i * 10;
        stroke(data[i] * 255, i / 255, data[i] * 255)
        x1 = 10*cos(theta) - 0*sin(theta);
        x2 = (10+r)*cos(theta) - 0*sin(theta);
        y1 = 10*sin(theta) + 0*cos(theta);
        y2 = (10+r)*sin(theta) + 0*cos(theta);
        line(x1, y1, x2, y2); 
    }
}


function visualiser09(data) {
    translate(190, 300);
    strokeWeight(3);
    fill(0,0,0,0)
    stroke(255);
    beginShape();
    if (data[50] <= 0) return; 
    background(0);
    for (i=0; i<data.length; i++) {
        if (data[i] < -0.9) continue;
        r = data[i] * 200;
        theta = i * 10;
        stroke(data[i] * 500, random() * 200, random() * 255);
        x2 = (1+r)*cos(theta) - 0*sin(theta);
        y2 = (1+r)*sin(theta) + 0*cos(theta);
        vertex(x2, y2); 
    }
    endShape();
}


