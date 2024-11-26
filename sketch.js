let sound;
let soundPlayed = false;
let startTime;
let amplitude;
let fft

function preload()
{
    sound = loadSound('audio.mp3'); //setting a variable
}

function setup()
{
    createCanvas(600,600);
    startTime = millis();
    print(startTime)

    let button = createButton('Start');
    button.mousePressed(playSound);

    fft = new p5.FFT();

    amplitude = new p5.Amplitude();
    amplitude.setInput(sound);
}

function draw()
{
    background(220);
    
    if (!soundPlayed)
    {
        sound.play();
        soundPlayed = true;

    }

    if(triggerAnimation)
    {
        background(random(255), random(255), random(255))
    }

    if (millis() = startTime > 3000)
    {
        ellipse(width/2, heigh/2, 50);
    }

    //print(sound.getLevel())
    let level = amplitude.getLevel()
    let threshold = 0.05; //adjust value for bass

    if (level > threshold) 
    {
        fill (0, 0, 0);
        ellipse(width / 2, height /2, 50, 50);
    }
}