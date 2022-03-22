Status="";

bigObjects3=[];

function preload()
{
    plant=loadImage("plantIdentification.png");
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

    objectDetector.detect(palnt, gotResult);
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
        bigObjects3=results
    }
}

function draw()
{
    image(plant, 0, 0, 400, 400);
    if(Status != "")
    {
        for(i = 0 ; i < bigObjects3.length ; i++)
        {
            document.getElementById("status").innerHTML="Staus: Objects Detected";
            fill("#AB8E7C");
            percent=floor(bigObjects3[i].confidence * 100);
            text(bigObjects3[i].label + " " + percent + "%", bigObjects3[i].x, bigObjects3[i].y);
            noFill();
            stroke("Skyblue");
            rect(bigObjects3[i].x, bigObjects3[i].y, bigObjects3[i].width, bigObjects3[i].height);
        }
    }
}