// ==========================================
// 1. NAVBAR VISIBILITY MANAGEMENT
// ==========================================
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

// ==========================================
// 2. INTERSECTION OBSERVERS (REVEAL ON SCROLL)
// ==========================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
});

document.querySelectorAll('.reveal-on-scroll').forEach(el => revealObserver.observe(el));
document.querySelectorAll('.achievement-card').forEach(card => revealObserver.observe(card));

// ==========================================
// 3. CORE VIDEO & CINEMATIC SLIDER ENGINE
// ==========================================
const galleryVideo = document.getElementById("galleryVideo");
const videoBox = document.getElementById("videoBox");
const nextVideoBtn = document.getElementById("nextVideoBtn");
const prevVideoBtn = document.getElementById("prevVideoBtn");
const playPauseBtn = document.getElementById("playPauseBtn");
const videoControls = document.querySelector(".video-controls");

const videos = [
    "images/my-edit.mp4",
    "images/tutorial.mp4"
];
let currentVideo = 0;
let controlsVisible = true;

// FUNCTION: Safe Unmuted Video Playback
function playDynamicVideo() {
    if (!galleryVideo) return;
    
    // Pinipilit nating i-set na may tunog dahil nanggaling ito sa click event ng user
    galleryVideo.muted = false; 
    
    galleryVideo.play().catch(err => {
        console.log("Browser policy blocked unmuted autoplay, falling back to muted:", err);
        galleryVideo.muted = true; // Backup strategy kung sobrang higpit ng browser configuration
        galleryVideo.play();
    });

    if (playPauseBtn) playPauseBtn.innerText = "PAUSE";
}

// FUNCTION: Update Slide Track Source
function updateVideoSource() {
    if (!galleryVideo) return;
    const source = galleryVideo.querySelector("source");
    if (source) {
        source.src = videos[currentVideo];
        galleryVideo.load();
        playDynamicVideo();
    }
}

// Slider Controls Triggers
if (nextVideoBtn) {
    nextVideoBtn.addEventListener("click", () => {
        currentVideo = (currentVideo + 1) % videos.length;
        updateVideoSource();
    });
}

if (prevVideoBtn) {
    prevVideoBtn.addEventListener("click", () => {
        currentVideo = (currentVideo - 1 + videos.length) % videos.length;
        updateVideoSource();
    });
}

if (playPauseBtn && galleryVideo) {
    playPauseBtn.addEventListener("click", () => {
        if (galleryVideo.paused) {
            playDynamicVideo();
        } else {
            galleryVideo.pause();
            playPauseBtn.innerText = "PLAY";
        }
    });
}

// Hide/Show Layout Panel Controls
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

// ==========================================
// 4. THUMBNAIL SYSTEM & PROJECT OVERLAY SWITCH
// ==========================================
const thumbs = document.querySelectorAll('.thumb-item');
const overlay = document.getElementById('projectOverlay');
const back = document.getElementById('backButton');

thumbs.forEach(t => {
    t.addEventListener('click', function (e) {
        e.preventDefault();
        const project = t.dataset.project;

        thumbs.forEach(x => x.classList.remove('active'));
        t.classList.add('active');

        const img = document.getElementById("mainProjectImage");
        const title = document.getElementById("projectTitle");
        const year = document.getElementById("projectYear");
        const role = document.getElementById("projectRole");
        const client = document.getElementById("projectClient");
        const desc = document.getElementById("projectDescription");

        // Open Overlay Section
        if (overlay) {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Change video source inside timeline overlay dynamically
        if (galleryVideo && t.dataset.video) {
            const source = galleryVideo.querySelector('source');
            if (source) {
                source.src = t.dataset.video;
                galleryVideo.load();
                playDynamicVideo();
            }
        }

        if (!img || !title || !year || !role || !client || !desc) return;

        // Dynamic Texts Routing Engine
        if (project === "minimal") {
            img.src = "images/imalu.jpg";
            title.innerText = "Minimalist Design";
            year.innerText = "2026";
            role.innerText = "Designer";
            client.innerText = "Nelyr Studio";
            desc.innerText = "A cinematic minimalist interface focused on modern interaction systems. This project explores high-contrast visual storytelling, utilizing deep shadows and rich crimson tones to create a moody, immersive digital experience. It is designed to minimize cognitive load, ensuring seamless user navigation through a curated, high-end gallery framework that redefines dynamic content presentation.";
        } else if (project === "aesthetic") {
            img.src = "images/imali.png";
            title.innerText = "Aesthetic Concept";
            year.innerText = "2026";
            role.innerText = "Motion Designer";
            client.innerText = "Nelyr Studio";
            desc.innerText = "A smooth aesthetic-driven concept focused on mood and storytelling. The interface leverages an organic sage green color palette and sophisticated layout to evoke a sense of calm sophistication. Every animation is purposeful, designed to guide the user's focus naturally. This design prioritizes the synergy between delicate imagery and clean UI structures, creating a deeply tactile digital experience for modern users.";
        } else if (project === "layouts") {
            img.src = "images/mululu.png";
            title.innerText = "Clean Layouts";
            year.innerText = "2026";
            role.innerText = "UI Designer";
            client.innerText = "Nelyr Studio";
            desc.innerText = "A structured layout system focused on spacing and readability. This layout engineering maximizes functional clarity while maintaining a strict premium aesthetic. It utilizes a powerful underlying grid to harmonize complex content, focusing on generous white space and optimal typographic hierarchy. The resulting system is scalable and intuitive, allowing images and data to breathe while providing users with an effortlessly digestible information flow.";
        }
    });
});

if (back && overlay) {
    back.addEventListener('click', () => {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        if (galleryVideo) galleryVideo.pause(); // Kusa nating i-pause ang unmuted playback pagka-close
    });
}

// ==========================================
// 5. CINEMATIC & FULLSCREEN CONTROLLER ENGINE
// ==========================================
function enterCinematic() {
    if (!videoBox) return;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    playDynamicVideo(); // Siguruhing umaandar nang may tunog pagkapasok
}

function exitCinematic() {
    if (!videoBox) return;
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
}

// Safe Fullscreen Click Listener Integration
document.addEventListener("DOMContentLoaded", () => {
    const expandVideoBtn = document.getElementById("expandVideoBtn");
    const closeExpandBtn = document.getElementById("closeExpandBtn");

    if (expandVideoBtn) {
        expandVideoBtn.addEventListener("click", (e) => {
            e.preventDefault();
            enterCinematic();
        });
    }
    if (closeExpandBtn) {
        closeExpandBtn.addEventListener("click", () => {
            exitCinematic();
        });
    }
});

// ESC Key Global Listener
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        exitCinematic();
    }
});

// ==========================================
// 6. CONTACT INTERFACE INTERACTION MODAL
// ==========================================
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