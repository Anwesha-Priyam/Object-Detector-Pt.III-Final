Status="";

bigObjects4=[];

function preload()
{
    ruler=loadImage("rulerIdentification.png");
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

    objectDetector.detect(ruler, gotResult);
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
        bigObjects4=results;
    }
}

function draw()
{
    image(ruler, 0, 0, 400, 400);
    if(Status != "")
    {
        for(i = 0 ; i < bigObjects4.length ; i++)
        {
            document.getElementById("status").innerHTML="Staus: Objects Detected";
            fill("#AB8E7C");
            percent=floor(bigObjects4[i].confidence * 100);
            text(bigObjects4[i].label + " " + percent + "%", bigObjects4[i].x, bigObjects4[i].y);
            noFill();
            stroke("Skyblue");
            rect(bigObjects4[i].x, bigObjects4[i].y, bigObjects4[i].width, bigObjects4[i].height);
        }
    }
}