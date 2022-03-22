Status="";

bigObjects2=[];

function preload()
{
    fountain=loadImage("fountainIdentification.png");
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

    objectDetector.detect(fountain, gotResult);
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
        bigObjects2=results
    }
}

function draw()
{
    image(fountain, 0, 0, 400, 400);
    if(Status != "")
    {
        for(i = 0 ; i < bigObjects2.length ; i++)
        {
            document.getElementById("status").innerHTML="Staus: Objects Detected";
            fill("#AB8E7C");
            percent=floor(bigObjects2[i].confidence * 100);
            text(bigObjects2[i].label + " " + percent + "%", bigObjects2[i].x, bigObjects2[i].y);
            noFill();
            stroke("Skyblue");
            rect(bigObjects2[i].x, bigObjects2[i].y, bigObjects2[i].width, bigObjects2[i].height);
        }
    }
}