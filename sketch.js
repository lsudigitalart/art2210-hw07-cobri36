let sound;

function preload() {
    sound = loadSound('audio.mp3', 
        () => { console.log('Sound loaded successfully!'); }, // Success callback
        () => { console.log('Error loading sound.'); }       // Error callback
    );
}

function setup() {
    createCanvas(600, 600);
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(0);
    text("Loading sound...", width / 2, height / 2);  // Display message while sound is loading
}

function soundLoaded() {
    console.log("Sound loaded successfully!");
    // Display a message once the sound is loaded
    background(57, 225, 20);  // Change background color to indicate success
    text("Sound Loaded!", width / 2, height / 2);
}
