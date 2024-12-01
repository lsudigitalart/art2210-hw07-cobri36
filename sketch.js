et sound;
let fft;
let amplitude;
let soundPlayed = false;

function preload() {
    sound = loadSound('themeoflaura.mp3');
}

function setup() {
    createCanvas(800, 600);
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(255); // White text color

    fft = new p5.FFT();
    amplitude = new p5.Amplitude();

    let button = createButton('Start');
    button.mousePressed(playSound);
}

function playSound() {
    if (!soundPlayed) {
        sound.play();
        soundPlayed = true;
    }
}

function draw() {
    background(0);

    //bass visualizer
    let bass = fft.getEnergy("bass");
    let bassRadius = map(bass, 0, 255, 100, 300);
    stroke(255, 0, 0, 150);
    noFill();
    ellipse(width / 2, height / 2, bassRadius * 2, bassRadius * 2);

    //amplitude visualizer
    let level = amplitude.getLevel();
    let amplitudeRadius = map(level, 0, 1, 50, 150);
    stroke(0, 255, 0, 150);
    ellipse(width / 2, height / 2, amplitudeRadius * 2, amplitudeRadius * 2); //volume

    //frequency visualizer
    let spectrum = fft.analyze();
    for (let i = 0; i < spectrum.length; i++) {
        let angle = map(i, 0, spectrum.length, 0, TWO_PI);
        let radius = map(spectrum[i], 0, 255, 150, 300);
        let x = width / 2 + radius * cos(angle); 
        let y = height / 2 + radius * sin(angle);

        let colorVal = map(i, 0, spectrum.length, 0, 255);
        stroke(colorVal, 0, 255);
        line(width / 2, height / 2, x, y);  // 
    }
}