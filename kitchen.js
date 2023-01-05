status = "";
objects = [];
img = "";

function preload() {
    img = loadImage("kitchen.jpg");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!!!!");
    status = true;
    objectDetector.detect(img, gotResults);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
    }
    objects = results;
}

function draw() {
    image(img, 0, 0, 380, 380);
    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";


            fill("#FF0000")
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percentage + "%", objects[i].x + 15, objects[i].y + 15);
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            noFill();

        }
    }
}