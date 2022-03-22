Status="";

bigObjects1=[];

function preload()
{
    clock=loadImage("clockIdentification.png");
}

function setup()
{
    canvas=createCanvas(400, 400);
    canvas.center();

    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Staus: Detecting objects..."
}

function modelLoaded()
{
    console.log("Model Loaded!");
    
    Status=true;

    objectDetector.detect(clock, gotResult);
}

function gotResult(error,results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        bigObjects1=results
    }
}

function draw()
{
    image(clock, 0, 0, 400, 400);
    if(Status != "")
    {
        for(i = 0 ; i < bigObjects1.length ; i++)
        {
            document.getElementById("status").innerHTML="Staus: Objects Detected";
            fill("#AB8E7C");
            percent=floor(bigObjects1[i].confidence * 100);
            text(bigObjects1[i].label + " " + percent + "%", bigObjects1[i].x, bigObjects1[i].y);
            noFill();
            stroke("Skyblue");
            rect(bigObjects1[i].x, bigObjects1[i].y, bigObjects1[i].width, bigObjects1[i].height);
        }
    }
}