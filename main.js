song="";

function preload() {
    song = loadSound("music.mp3")
}
rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;


function setup () {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('posenet initialised');

}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("leftwristscore = "+scoreLeftWrist + " right wrist score = " + scoreRightWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log('right wrist x = ' + rightWristX + ' right wrist y = ' + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log('left wrist x = ' + leftWristX + ' left wrist y = ' + leftWristY);
    }

}

function draw() {

    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");


    

    circle(rightWristX, rightWristY, 20);

    if (rightWristY>0 && rightWristY<=100)
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }
    else if (rightWristY>100 && rightWristY<=200)
    {
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }
    else if (rightWristY>200 && rightWristY<=300)
    {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }
    else if (rightWristY>300 && rightWristY<=400)
    {
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
    else if (rightWristY>400 && rightWristY<=500)
    {
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }




    

    circle(leftWristX, leftWristY, 20);
    IntNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(IntNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "volume = " +volume;
    song.setVolume(volume);
    
    
    
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}