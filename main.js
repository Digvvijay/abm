status = "";
object = [];
var audio;

function preload()
{
    audio = loadSound('alert.mp3');
}

function setup()
{
    cv=createCanvas(350,350);
    cv.center();
    video=createCapture(VIDEO);
    video.size(350,350);
    video.hide();
}

function start()
{
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Something";
}

function modelLoaded()
{
    console.log("cocossd status == Initialised.");
    status=true;
}

function gotResult(error,results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results);
    object = results;
}

function draw()
{
    image(video,0,0,350,350);

    if(status!="")
    {
        objectDetector.detect(video,gotResult);

        r = random(255);
        g = random(255);
        b = random(255);

        for(i = 0;i < object.length;i++)
        {
            if(object[i].label=="person")
            {
                document.getElementById("status").innerHTML="Status of baby: Baby is safe";
                audio.stop;
            }
            else
            {
                document.getElementById("status").innerHTML="Status of baby: Baby not to be found";
                audio.play;
            }
            fill(r,g,b);
            p = Math.floor(object[i].confidence * 100);
            text(object[i].label + " " + p + "%",object[i].x + 20,object[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
}