/*Start Global Variables*/
let settingsOptions = document.querySelector(".settings");
let settingsIconContainer = document.querySelector(".icon");
let colors = document.querySelectorAll(".color");
let rbNoBtn = document.querySelector(".rbButtons .no");
let rbYesBtn = document.querySelector(".rbButtons .yes");
let random;
let landing = document.getElementById("landing");
let sbYesBtn = document.querySelector(".sbButtons .yes");
let sbNoBtn = document.querySelector(".sbButtons .no");
let bullets = document.querySelector(".bulletsContainer");
let resetBtn = document.querySelector(".reset");
/*End Global Variables*/

/*Start Functions*/
function restoreLocalStorageValues() {
    restoreColor();
    restoreSelectedButtons();
}

function restoreColor() {
    let color = window.localStorage.getItem("Color");
    if(color) {
        document.documentElement.style.setProperty("--mainColor", color);
        //set selected class
        removeSelectedClass();
        let target = document.querySelector(`li[data-color="${color}"]`);
        target.classList.add("selected");
    }
}

function removeSelectedClass(){
    for(let i = 0; i < colors.length; i++) {
        colors[i].classList.remove("selected");
    }
}

function restoreSelectedButtons() {
    //restore random backgrounds buttons
    let randomBgBtn = window.localStorage.getItem("rbBtn");
    if(randomBgBtn) {
        if(randomBgBtn === "yes"){
            rbYesBtn.classList.add("active");
            rbNoBtn.classList.remove("active");
        }
        else if(randomBgBtn === "no") {
            rbNoBtn.classList.add("active");
            rbYesBtn.classList.remove("active");
        }
    }

    //restore bullets buttons
    let showBulletsBtn = window.localStorage.getItem("sbBtn");
    if(showBulletsBtn) {
        if(showBulletsBtn === "yes"){
            sbYesBtn.classList.add("active");
            sbNoBtn.classList.remove("active");
        }
        else if(showBulletsBtn === "no") {
            sbNoBtn.classList.add("active");
            sbYesBtn.classList.remove("active");
        }
    }
}

function startRandomBackgrounds(){
    let images = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
    random = setInterval(() => {
        let randomNumber = Math.floor(Math.random() * images.length);
        landing.style.backgroundImage = 'url("images/' + images[randomNumber] + '")';
    }, 10000);
}
/*End Functions*/

/*Start Event Listeners*/
//Show or Hide settings-box when icon is clicked & spin the settings icon
settingsIconContainer.addEventListener("click", () => {
    if(settingsOptions.classList.contains("close")) {
        settingsOptions.classList.remove("close");
        settingsOptions.classList.add("open");
        settingsIconContainer.classList.add("spin");
    }
    else if (settingsOptions.classList.contains("open")) {
        settingsOptions.classList.remove("open");
        settingsOptions.classList.add("close");
        settingsIconContainer.classList.remove("spin");
    }
});

//Apply selected color to design
document.addEventListener("click", (e) => {
    if(e.target.classList.contains("color")) {
        removeSelectedClass();
        e.target.classList.add("selected");
        let color = e.target.dataset.color;
        document.documentElement.style.setProperty("--mainColor", color);
        //Save color to Local Storage
        window.localStorage.setItem("Color", color);
    }
});

//Set active class and Start random background
rbYesBtn.addEventListener("click", () => {
    rbYesBtn.classList.add("active");
    rbNoBtn.classList.remove("active");
    startRandomBackgrounds();
    window.localStorage.setItem("rbBtn", "yes");
});

//Set active class and Stop random background
rbNoBtn.addEventListener("click", () => {
    rbNoBtn.classList.add("active");
    rbYesBtn.classList.remove("active");
    clearInterval(random);
    window.localStorage.setItem("rbBtn", "no");
});

//Set active class and Show or hide bullets
sbYesBtn.addEventListener("click", () => {
    sbYesBtn.classList.add("active");
    sbNoBtn.classList.remove("active");
    bullets.style.display = "block";
    window.localStorage.setItem("sbBtn", "yes");
});
sbNoBtn.addEventListener("click", () => {
    sbNoBtn.classList.add("active");
    sbYesBtn.classList.remove("active");
    bullets.style.display = "none";
    window.localStorage.setItem("sbBtn", "no");
});

//Reset Button
resetBtn.addEventListener("click", ()=>{
    window.localStorage.removeItem("Color");
    window.localStorage.removeItem("rbBtn");
    window.localStorage.removeItem("sbBtn");
    window.location.reload();
});
/*End Event Listeners*/

//restore Local Storage
restoreLocalStorageValues();

//Set Random Background for Landing Page
if(rbYesBtn.classList.contains("active")){
    startRandomBackgrounds();
}
else if (rbNoBtn.classList.contains("active")) {
    clearInterval(random);
}

//show or hide bullets
if(sbYesBtn.classList.contains("active")){
    bullets.style.display = "block";
}
else if(sbNoBtn.classList.contains("active")){
    bullets.style.display = "none";
}
