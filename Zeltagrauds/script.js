function toggleGame() {
    var gameContainer = document.getElementById("game-container");
    var button = document.querySelector(".start-game-btn");

    if (gameContainer.style.display === "none") {
        gameContainer.style.display = "block";
        button.textContent = "Slēpt spēli";
    } else {
        gameContainer.style.display = "none";
        button.textContent = "Spēlēt spēli";
    }
}

function showProduct(id) {
    const products = ["hanteles", "diski", "apgerbs"];
    products.forEach(product => {
        document.getElementById(product).style.display = "none";
    });
    document.getElementById(id).style.display = "block";
}

// Spēles loģika
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var arm_x = 0;
var arm_y = 0;
var score = 0;
var time_remaining = 30;

var ArmImg = new Image();
ArmImg.src = "https://img.icons8.com/?size=100&id=FBL0HZDWJ06G&format=png&color=000000";

var protein_x = 0;
var protein_y = 0;
var ProteinImg = new Image();
ProteinImg.src = "https://img.icons8.com/?size=100&id=97440&format=png&color=000000";

function MyKeyDownHandler(MyEvent) {
    if (MyEvent.keyCode == 37 && arm_x > 0) arm_x -= 10;
    if (MyEvent.keyCode == 39 && arm_x + ArmImg.width < canvas.width) arm_x += 10;
}

addEventListener("keydown", MyKeyDownHandler);

function ImagesTouching(x1, y1, img1, x2, y2, img2) {
    if (x1 >= x2 + img2.width || x1 + img1.width <= x2) return false;
    if (y1 >= y2 + img2.height || y1 + img1.height <= y2) return false;
    return true;
}

function Do_a_Frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Punkti: " + score, 10, 30);
    ctx.fillText("Atlikušais laiks: " + Math.round(time_remaining), 10, 50);

    arm_y = canvas.height - ArmImg.height;
    ctx.drawImage(ArmImg, arm_x, arm_y);

    if (time_remaining <= 0) {
        ctx.fillStyle = "red";
        ctx.font = "bold 50px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Spēle beigusies", canvas.width / 2, canvas.height / 2);
        ctx.textAlign = "left";
    } else {
        time_remaining -= 1 / 40;
        protein_y += 3;

        if (protein_y > canvas.height) {
            protein_y = 0;
            protein_x = Math.random() * (canvas.width - ProteinImg.width);
        }
    }

    ctx.drawImage(ProteinImg, protein_x, protein_y);

    if (ImagesTouching(arm_x, arm_y, ArmImg, protein_x, protein_y, ProteinImg)) {
        score++;
        protein_x = -ProteinImg.width;
    }
}

setInterval(Do_a_Frame, 15);

  