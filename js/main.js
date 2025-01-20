const paraTxt = document.getElementById("sentence");
const landingPage = document.getElementById("landing-page");
const gearBtn = document.getElementById("gear");
const gearIcon = document.querySelector("#gear i");
const settingBox = document.getElementById("setting-box");
const colorsSet = document.getElementById("colors");
const root = document.querySelector(":root");
const circles = document.querySelectorAll(".circle");
const randomBgYesBtn = document.querySelector(".ra-yes");
const randomBgNoBtn = document.querySelector(".ra-no");
const bullets = document.getElementById("bullets");
const Labels = document.querySelectorAll(".labels");
const showBulYesBtn = document.querySelector(".sh-yes");
const showBulNoBtn = document.querySelector(".sh-no");
const resetBtn = document.getElementById("reset");
const FillLabels = document.querySelectorAll(".fill");
const skillSec = document.getElementById("skills");
const galleryImages = document.querySelector(".images");
const pageScrollProgress = document.querySelector(".page-scroll-progress");

// Type writer effect
const sentence = "have an idea or project? we can transform this idea to real.";
let i = 0;
let typeEffect = setInterval(() => {
    paraTxt.innerHTML += sentence[i];
    i++;
    if (i === sentence.length) {
        clearInterval(typeEffect);        
    }
}, 100);

// Random background image for landing page
// let images = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
// let changeImg = setInterval(() => {
//     landingPage.style.backgroundImage = `url("../images/${images[Math.floor(Math.random() * images.length)]}")`;
// }, 5000);

// Navigation icon
let navigationIcon = document.querySelector(".navigation-icon");
let navigationPopup = document.querySelector(".navigation-popup");
navigationIcon.addEventListener("click", () => {
    navigationPopup.classList.toggle("show");
});

// Open setting box
let show = false;
gearBtn.addEventListener("click", () => {
    if (show) {
        settingBox.style.animationName = "hide";
        gearIcon.classList.remove("active");
        show = false;
    } else {
        settingBox.style.animationName = "display";
        gearIcon.classList.add("active");
        show = true;
    }
});

// Edit colors 
circles.forEach(circle => {
    circle.style.backgroundColor = `${circle.dataset.color}`;
});
if (window.localStorage.getItem("color")) {
    circles.forEach(circle => {
        if (circle.dataset.color === localStorage.getItem("color")) {
            circle.classList.add("active");
            root.style.setProperty("--mainColor", `${circle.dataset.color}`);
        } else {
            circle.classList.remove("active");
        }
    });  
}
colorsSet.addEventListener("click", (e) => {
    if (e.target.nodeName.toLowerCase() === "span") {
        circles.forEach(circle => {
            circle.classList.remove("active");
        });
        e.target.classList.add("active");
        root.style.setProperty("--mainColor", `${e.target.dataset.color}`);
        window.localStorage.setItem("color", `${e.target.dataset.color}`);
    }
});

// Random background image for landing page
let images = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
let changeImg;
// Random background setting
if (localStorage.getItem("randomBg")) {
    if (localStorage.getItem("randomBg") === "yes") {
        handleRandomBgYesBtn();
    } else {
        handleRandomBgNoBtn();
    }
} else {
    handleRandomBgYesBtn();
}
// Handle no button in random background
randomBgNoBtn.addEventListener("click", handleRandomBgNoBtn);
function handleRandomBgNoBtn() {
    randomBgNoBtn.classList.add("active");
    randomBgYesBtn.classList.remove("active");
    clearInterval(changeImg); 
    window.localStorage.setItem("randomBg", "no");      
}
// Handle yes button in random background
randomBgYesBtn.addEventListener("click", handleRandomBgYesBtn);
function handleRandomBgYesBtn() {
    randomBgNoBtn.classList.remove("active");
    randomBgYesBtn.classList.add("active");
    changeImg = setInterval(() => {
        landingPage.style.backgroundImage = `url("../images/${images[Math.floor(Math.random() * images.length)]}")`;
    }, 5000);
    window.localStorage.setItem("randomBg", "yes");    
}

// Show / hide Bullets
if (window.localStorage.getItem("bullets")) {
    if (window.localStorage.getItem("bullets") === "yes") {
        handleShowBulYesBtn();
    } else {
        handleShowBulNoBtn();
    }
}
showBulYesBtn.addEventListener("click", handleShowBulYesBtn);
function handleShowBulYesBtn() {
    showBulYesBtn.classList.add("active");
    showBulNoBtn.classList.remove("active");
    bullets.style.display = "block";
    window.localStorage.setItem("bullets", "yes");
}
showBulNoBtn.addEventListener("click", handleShowBulNoBtn);
function handleShowBulNoBtn() {
    showBulYesBtn.classList.remove("active");
    showBulNoBtn.classList.add("active");
    bullets.style.display = "none";
    window.localStorage.setItem("bullets", "no");
}

// Bullets labels
bullets.addEventListener("mouseover", e => {
    if (e.target.nodeName.toLowerCase() === "a") {
        e.target.previousElementSibling.style.visibility = "visible";
    }
});
bullets.addEventListener("mouseout", e => {
    if (e.target.nodeName.toLowerCase() === "a") {
        e.target.previousElementSibling.style.visibility = "hidden";
    }
});

// Reset button
resetBtn.addEventListener("click", () => {
    circles[0].click();
    randomBgYesBtn.click();
    showBulYesBtn.click();
})

// Our skills section
window.onscroll = () => {
    // Page scroll progress
    pageScrollProgress.style.width = `${window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100}%`;
    if (window.scrollY >= (skillSec.getBoundingClientRect().y + window.scrollY) - skillSec.scrollHeight) {
        let FillLabels = document.querySelectorAll(".fill");
        FillLabels.forEach(fill => {
            fill.style.width = fill.dataset.fill;
        });
    } else {
        FillLabels.forEach(fill => {
            fill.style.width = "0";
        });
    }
    // Go to top button
    let goToTopBtn = document.querySelector(".go-to-top");
    if (window.scrollY >= 200) {
        goToTopBtn.style.display = "block";
        goToTopBtn.onclick = () => {
            scrollTo({
                top: 0
            });
        }
    } else {
        goToTopBtn.style.display = "none";
    }
}
// Show images in gallery section
let popup = document.querySelector(".popup");
let galleryPopupPar = document.querySelector("#gallery-popup p");
let galleryPopupImg = document.querySelector("#gallery-popup img");
galleryImages.addEventListener("click", e => {
    if (e.target.nodeName.toLowerCase() === "img") {
        popup.style.display = "block";
        galleryPopupPar.innerHTML = e.target.alt;
        galleryPopupImg.src = e.target.src;
    }
});
// Zoom in and out
let cursorS = "in";
galleryPopupImg.addEventListener("click", (e) => {
    if (cursorS === "in") {
        e.target.style.transform = "scale(2)";
        e.target.style.cursor = "zoom-out";   
        cursorS = "out";     
    } else {
        e.target.style.transform = "scale(1)";
        e.target.style.cursor = "zoom-in";
        cursorS = "in"; 
    } 
});
window.onclick = (e) => {
    if (e.target.classList.value === "dark-overlay") {
        galleryPopupImg.style.transform = "scale(1)";
        popup.style.display = "none";
    }
}

// footer date
let year = new Date().getFullYear();
let dateSpan = document.querySelector(".date");
dateSpan.innerHTML = year;
