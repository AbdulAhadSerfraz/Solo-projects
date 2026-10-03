let homeScore = document.getElementById("home-score");
let guestScore = document.getElementById("guest-score");

let result = 0
function add1() {
    console.log("add1 function called");
    result = result + 1;
    homeScore.textContent = result;
}

function add2() { 
    result = result + 2;
    homeScore.textContent = result;
}

function add3() { 
    result = result + 3;
    homeScore.textContent = result;
}

let resultGuest = 0
function add1guest() {
    console.log("add1 function called");
    resultGuest = resultGuest + 1;
    guestScore.textContent = resultGuest;
}

function add2guest() { 
    resultGuest = resultGuest + 2;
    guestScore.textContent = resultGuest;
}

function add3guests() { 
    resultGuest = resultGuest + 3;
    guestScore.textContent = resultGuest;
}

document.getElementById("home-increment").addEventListener("click", add1);
document.getElementById("home-increment2").addEventListener("click", add2);
document.getElementById("home-increment3").addEventListener("click", add3);
document.getElementById("guest-increment").addEventListener("click", add1guest);
document.getElementById("guest-increment2").addEventListener("click", add2guest);
document.getElementById("guest-increment3").addEventListener("click", add3guests);