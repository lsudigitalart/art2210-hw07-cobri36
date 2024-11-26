let sound;
let soundPlayed = false;
let startTime;
let amplitude;
let fft;
let lyrics = [
    {time: 950, text: "The"},
    {time: 980, text: "People"},
    {time: 1100, text: "of"},
    {time: 1200, text: "the"},
    {time: 1300, text: "underground"},
    {time: 2300, text: "deserve"},
    {time: 2800, text: "to"},
    {time: 3000, text: "breathe."}
];
let customFont;

function preload()
{
    sound = loadSound('audio.mp3'); //setting a variable
}

function setup()
{
    createCanvas(600,600);

    let button = createButton('Start');
    button.mousePressed(playSound);

    fft = new p5.FFT();
    amplitude = new p5.Amplitude();
    amplitude.setInput(sound);

    textAlign(CENTER,CENTER);
    textSize(32);
}

function draw()
{
    background(57, 225, 20);
    
    if (soundPlayed)
    {
        let currentTime = millis() - startTime;

        //Display lyrics based on timing
        for (let lyric of lyrics) {
            if (currentTime > lyric.time && currentTime < lyric.time + 800) {
                fill(0);
                text(lyric.text, width/2, height/2);
            }
        }
        
        //Draw audio visualizer after lyrics display
        if (currentTime > lyrics[lyrics.length - 1].time + 1000) {
            drawVisualizer();
        }
    }
}

function playSound() {
    if (!soundPlayed) {
        sound.play();
        startTime = millis();
        soundPlayed = true;
    }
}

function drawVisualizer() {
    let spectrum = fft.analyze();
    noStroke();
    fill(0, 0, 0, 150);

    for (let i = 0; i < spectrum.length; i++) {
        let x = map(i, 0, spectrum.length, 0, width);
        let h = -height + map(spectrum[i], 0, 255, height, 0);
        rect(x, height, width/spectrum.length, h);
    }
}