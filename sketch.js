let maleSlider, femaleSlider;
let maleFreq = 600;
let femaleFreq = 450;
let qdpOsc, cdpOsc;
let qdpCheckbox, cdpCheckbox;

function setup() {
  createCanvas(600, 320);
  textSize(16);

  maleSlider = createSlider(100, 1000, maleFreq);
  maleSlider.position(20, 40);
  femaleSlider = createSlider(100, 1000, femaleFreq);
  femaleSlider.position(20, 100);

  qdpCheckbox = createCheckbox('Play QDP sound', true);
  qdpCheckbox.position(20, 140);

  cdpCheckbox = createCheckbox('Play CDP sound', true);
  cdpCheckbox.position(20, 170);

  qdpOsc = new p5.Oscillator('sine');
  cdpOsc = new p5.Oscillator('sine');
  qdpOsc.start();
  cdpOsc.start();
}

function draw() {
  background(255);

  maleFreq = maleSlider.value();
  femaleFreq = femaleSlider.value();

  let qdp = maleFreq - femaleFreq;
  let cdp = 2 * femaleFreq - maleFreq;

  fill(0);
  text(`Male Wingbeat Frequency: ${maleFreq} Hz`, 200, 45);
  text(`Female Wingbeat Frequency: ${femaleFreq} Hz`, 200, 105);
  text(`Quadratic Distortion Product (QDP = M - F): ${qdp} Hz`, 20, 230);
  text(`Cubic Distortion Product (CDP = 2F - M): ${cdp} Hz`, 20, 260);

  if (qdpCheckbox.checked() && qdp >= 370 && qdp <= 430) {
    let qdpVol = 1 - abs(qdp - 400) / 30;
    qdpOsc.freq(qdp);
    qdpOsc.amp(qdpVol * 0.5, 0.1);
  } else {
    qdpOsc.amp(0, 0.1);
  }

  if (cdpCheckbox.checked() && cdp >= 100 && cdp <= 220) {
    let cdpVol = 1 - abs(cdp - 160) / 60;
    cdpOsc.freq(cdp);
    cdpOsc.amp(cdpVol * 0.5, 0.1);
  } else {
    cdpOsc.amp(0, 0.1);
  }
}
