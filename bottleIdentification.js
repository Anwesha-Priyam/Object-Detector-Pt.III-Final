Status="";

bigObjects=[];

function preload()
{
    bottle=loadImage("bottleIdentification.png");
}

function setup()
{
    canvas=createCanvas(400, 400);
    canvas.center();

    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting objects..."
}

function modelLoaded()
{
    console.log("Model Loaded!");
    
    Status=true;

    objectDetector.detect(bottle, gotResult);
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
        Objects=results
    }
}

function draw()
{
    image(bottle, 0, 0, 400, 400);
    if(Status != "")
    {
        for(i = 0 ; i < bigObjects.length ; i++)
        {
            document.getElementById("status").innerHTML="Staus: Objects Detected";
            fill("#AB8E7C");
            percent=floor(bigObjects[i].confidence * 100);
            text(bigObjects[i].label + " " + percent + "%", bigObjects[i].x, bigObjects[i].y);
            noFill();
            stroke("Skyblue");
            rect(bigObjects[i].x, bigObjects[i].y, bigObjects[i].width, bigObjects[i].height);
        }
    }
}