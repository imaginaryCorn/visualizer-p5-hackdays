let mic, fft, hue;

function setup() {
  createCanvas(710, 400);
  noFill();

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  hue = 0;
}

function draw() {
  colorMode(HSL, 360) // Set to Hue mode
  background(0,0,0,270) // Slightly ghost the spectrum
  let spectrum = fft.analyze(); // get the current microphone data points
  beginShape();
  strokeWeight(1);
  for (i = 0; i < spectrum.length; i+=20) {
    if (hue > 360) { // rotate through hue values, reset to 0 at 360
      hue = 0;
    } else {
      hue++;
    }
    stroke(hue,200,200) // colorize the spectrum
    curveVertex(i, map(spectrum[i], 0, 255, height, 0));
  }
  endShape();
}