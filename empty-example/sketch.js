
let fft;
function preload(){
  sound = loadSound('Universes.mp3');
}

function setup() {
  createCanvas(1200, 400, WEBGL); // Start a 3D Canvas
  noFill();
  perspective(PI / 3.0, width / height, 0.1, 400); // Place the camera
  
  fft = new p5.FFT(); // Fast Fourier Transform from p5.sound library
  sound.amp(0.5);
  sound.loop();
}

function draw() {
  orbitControl(0.5,0.5); // Apply the ability to move the camera with mouse
  colorMode(HSL, 360) // Set colours to Hue Saturation Lightness mode
  clear();
  let spectrum = fft.analyze(); // get audio data points
  translate(0,0,100)

  beginShape();
  strokeWeight(1);
  for (i = 0; i < spectrum.length; i+=1) {
    stroke(map(spectrum[i], 0, 255, 70, 360),200,200) // colorize the spectrum
    let x = map(i, 0, spectrum.length, -width/2,width/2); 
    //line(x, height, x, map(spectrum[i], 0, 255, height/2, -height/2))
    push();
    translate(x, 0); // Move box placement for each audio frequency
    // Draw box at a size relating to the volume of the current frequency:
    box(1, map(-spectrum[i], 0, 255, 0, height/2)); 
    pop();
  }
  endShape();
}