leftwristX=0;
rightwristX=0;
leftwristY=0;
rightwristY=0;
scoreleftwrist=0;
scorerightwrist=0;
song1="";
song2="";
function preload(){
song1=loadSound("song1.mp3");
song2=loadSound("song2.mp3");
}

function setup(){
    canvas=createCanvas(600,450);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(600,450)
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);

}
function modelLoaded(){
    console.log("Model Loaded");
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftwristX=results[0].pose.leftWrist.x;
        leftwristY=results[0].pose.leftWrist.y;
        rightwristX=results[0].pose.rightWrist.x;
        rightwristY=results[0].pose.rightWrist.y;
        scoreleftwrist=results[0].pose.keypoints[9].score;
        scorerightwrist=results[0].pose.keypoints[10].score;
    }
}
function draw(){
    image(video,0,0,600,450); 
    fill("red");
    stroke("red");
    if(scorerightwrist>0.2){
        circle(rightwristX,rightwristY,30);
        song2.stop();
        song1.play();
        song1.rate(1);
    }
    if(scoreleftwrist>0.2){
        circle(leftwristX,leftwristY,30);
        song1.stop();
        song2.play();
        song2.rate(1);
    }
}
