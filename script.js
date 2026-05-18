// =========================
// NAV HIDE
// =========================
const navbar = document.querySelector('.navbar');

let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (!navbar) return;

    if (window.scrollY > lastScrollY && window.scrollY > 100) {
        navbar.classList.add('navbar-hidden');
    } else {
        navbar.classList.remove('navbar-hidden');
    }

    lastScrollY = window.scrollY;
});


// =========================
// REVEAL ON SCROLL
// =========================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
});

document.querySelectorAll('.reveal-on-scroll')
.forEach(el => revealObserver.observe(el));


// =========================
// GALLERY SYSTEM
// =========================
const thumbs = document.querySelectorAll('.thumb-item');

thumbs.forEach(t => {

    t.addEventListener('click', function (e) {
        e.preventDefault();

        const project = t.dataset.project;

        thumbs.forEach(x => x.classList.remove('active'));
        t.classList.add('active');

        const overlay = document.getElementById('projectOverlay');

        const img = document.getElementById("mainProjectImage");
        const title = document.getElementById("projectTitle");
        const year = document.getElementById("projectYear");
        const role = document.getElementById("projectRole");
        const client = document.getElementById("projectClient");
        const desc = document.getElementById("projectDescription");

        const videoEl = document.querySelector('.framer-main-video');

        // OPEN OVERLAY
        if (overlay) {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // CHANGE VIDEO
        if (videoEl) {
            const source = videoEl.querySelector('source');

            if (source) {
                source.src = t.dataset.video;
                videoEl.load();

                videoEl.play().catch(err => {
                    console.log("Video play blocked:", err);
                });
            }
        }

        if (!img || !title || !year || !role || !client || !desc) return;

        // PROJECT SWITCH
        if (project === "minimal") {

            img.src = "images/imalu.jpg";
            title.innerText = "Minimalist Design";
            year.innerText = "2026";
            role.innerText = "Designer";
            client.innerText = "Nelyr Studio";
            desc.innerText = "A cinematic minimalist interface focused on modern interaction systems.";

        } else if (project === "aesthetic") {

            img.src = "images/imali.png";
            title.innerText = "Aesthetic Concept";
            year.innerText = "2026";
            role.innerText = "Motion Designer";
            client.innerText = "Nelyr Studio";
            desc.innerText = "A smooth aesthetic-driven concept focused on mood and storytelling.";

        } else if (project === "layouts") {

            img.src = "images/mululu.png";
            title.innerText = "Clean Layouts";
            year.innerText = "2026";
            role.innerText = "UI Designer";
            client.innerText = "Nelyr Studio";
            desc.innerText = "A structured layout system focused on spacing and readability.";
        }

    });

});


// =========================
// PROJECT OVERLAY CLOSE
// =========================
const overlay = document.getElementById('projectOverlay');
const back = document.getElementById('backButton');

if (back && overlay) {
    back.addEventListener('click', () => {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}


// =========================
// ACHIEVEMENTS REVEAL
// =========================
const achievementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
});

document.querySelectorAll('.achievement-card')
.forEach(card => achievementObserver.observe(card));


// =========================
// CONTACT MODAL
// =========================
const contactTrigger = document.getElementById('contactTrigger');
const contactModal = document.getElementById('contactModal');
const closeContactModal = document.getElementById('closeContactModal');

if (contactTrigger && contactModal && closeContactModal) {

    contactTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeContactModal.addEventListener('click', () => {
        contactModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            contactModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// =========================
// TERMS MODAL
// =========================
const termsTrigger = document.getElementById('termsTriggerBtn');
const termsModal = document.getElementById('termsModalWrapper');
const closeTermsBtn = document.getElementById('closeTermsBtn');

if (termsTrigger && termsModal && closeTermsBtn) {

    termsTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        termsModal.classList.add('modal-active');
        document.body.style.overflow = 'hidden';
    });

    closeTermsBtn.addEventListener('click', () => {
        termsModal.classList.remove('modal-active');
        document.body.style.overflow = 'auto';
    });

    termsModal.addEventListener('click', (e) => {
        if (e.target === termsModal) {
            termsModal.classList.remove('modal-active');
            document.body.style.overflow = 'auto';
        }
    });
} // ✅ IMPORTANT FIX: missing brace added here


// =========================
// VIDEO SLIDER + CINEMATIC MODE
// =========================

const galleryVideo = document.getElementById("galleryVideo");
const videoBox = document.getElementById("videoBox");

const nextVideoBtn = document.getElementById("nextVideoBtn");
const prevVideoBtn = document.getElementById("prevVideoBtn");
const playPauseBtn = document.getElementById("playPauseBtn");

const expandVideoBtn = document.getElementById("expandVideoBtn");
const closeExpandBtn = document.getElementById("closeExpandBtn");

const videoControls = document.querySelector(".video-controls");

const videos = [
    "images/my-edit.mp4",
    "images/tutorial.mp4"
];

let currentVideo = 0;
let controlsVisible = true;


// =========================
// UPDATE VIDEO
// =========================
function updateVideo() {
    if (!galleryVideo) return;

    const source = galleryVideo.querySelector("source");

    if (source) {
        source.src = videos[currentVideo];
        galleryVideo.load();

        galleryVideo.play().catch(err => {
            console.log("Video play error:", err);
        });
    }
}


// =========================
// NEXT / PREV
// =========================
if (nextVideoBtn) {
    nextVideoBtn.addEventListener("click", () => {
        currentVideo = (currentVideo + 1) % videos.length;
        updateVideo();
    });
}

if (prevVideoBtn) {
    prevVideoBtn.addEventListener("click", () => {
        currentVideo = (currentVideo - 1 + videos.length) % videos.length;
        updateVideo();
    });
}


// =========================
// PLAY / PAUSE
// =========================
if (playPauseBtn && galleryVideo) {
    playPauseBtn.addEventListener("click", () => {
        if (galleryVideo.paused) {
            galleryVideo.play();
            playPauseBtn.innerText = "PAUSE";
        } else {
            galleryVideo.pause();
            playPauseBtn.innerText = "PLAY";
        }
    });
}


// =========================
// FULLSCREEN / CINEMATIC MODE (FIXED)
// =========================

function enterCinematic() {
    if (!videoBox) return;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
}

function exitCinematic() {
    if (!videoBox) return;

    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
}

if (expandVideoBtn) {
    expandVideoBtn.addEventListener("click", () => {
        enterCinematic();
    });
}

// =========================
// FULLSCREEN BUTTON CLICK (FIXED)
// =========================
document.addEventListener("DOMContentLoaded", () => {
    const expandVideoBtn = document.getElementById("expandVideoBtn");

    if (expandVideoBtn) {
        expandVideoBtn.addEventListener("click", (e) => {
            e.preventDefault();
            enterCinematic();
        });
    } else {
        console.log("expandVideoBtn NOT FOUND");
    }
});


// CLOSE FULLSCREEN
if (closeExpandBtn) {
    closeExpandBtn.addEventListener("click", () => {
        exitCinematic();
    });
}


// ESC KEY EXIT
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        exitCinematic();
    }
});


// =========================
// VIDEO CONTROLS TOGGLE
// =========================
if (galleryVideo && videoControls) {
    galleryVideo.addEventListener("click", () => {
        controlsVisible = !controlsVisible;

        if (controlsVisible) {
            videoControls.style.opacity = "1";
            videoControls.style.transform = "translateY(0)";
        } else {
            videoControls.style.opacity = "0";
            videoControls.style.transform = "translateY(20px)";
        }
    });
}

