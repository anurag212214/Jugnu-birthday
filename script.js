/* =========================
   OPEN SURPRISE
========================= */

function openSurprise() {

  const opening = document.getElementById("opening");
  const mainContent = document.getElementById("mainContent");

  opening.style.transition = "opacity 1.2s ease";
  opening.style.opacity = "0";

  setTimeout(() => {

    opening.classList.add("hidden");
    mainContent.classList.remove("hidden");

    const bgMusic = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicBtn");

    if (bgMusic) {
      bgMusic.play().catch(() => {
        console.log("Music needs user interaction.");
      });
    }

    if (musicBtn) {
      musicBtn.innerHTML = "🔊";
      musicBtn.classList.add("playing");
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    createHearts();

  }, 1200);
}


/* =========================
   FLOATING HEARTS
========================= */

function createHearts() {

  for (let i = 0; i < 22; i++) {

    const heart = document.createElement("div");

    heart.innerHTML = "♥";

    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-30px";
    heart.style.fontSize =
      (10 + Math.random() * 18) + "px";

    heart.style.color =
      "rgba(233,166,197,0.7)";

    heart.style.pointerEvents = "none";
    heart.style.zIndex = "9999";

    document.body.appendChild(heart);

    const duration = 4 + Math.random() * 4;

    heart.animate(
      [
        {
          transform: "translateY(0) rotate(0deg)",
          opacity: 0
        },
        {
          transform: "translateY(-40vh) rotate(30deg)",
          opacity: 1
        },
        {
          transform: "translateY(-110vh) rotate(-30deg)",
          opacity: 0
        }
      ],
      {
        duration: duration * 1000,
        easing: "ease-out"
      }
    );

    setTimeout(() => {
      heart.remove();
    }, duration * 1000);
  }
}


/* =========================
   CINEMATIC SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
  ".story-card, .photo-card, .reason, .letter"
);

if ("IntersectionObserver" in window) {

  const revealObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.style.opacity = "1";
          entry.target.style.transform +=
            " translateY(0)";

          revealObserver.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.15
    }
  );

  revealElements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transition =
      "opacity 1s ease, transform 1s ease";

    revealObserver.observe(element);

  });

}


/* =========================
   SECTION FADE
========================= */

const sections =
  document.querySelectorAll("section");

if ("IntersectionObserver" in window) {

  const sectionObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

          }

        });

      },
      {
        threshold: 0.15
      }
    );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

}


/* =========================
   MUSIC
========================= */

function toggleMusic() {

  const bgMusic =
    document.getElementById("bgMusic");

  const musicBtn =
    document.getElementById("musicBtn");

  if (!bgMusic) return;

  if (bgMusic.paused) {

    bgMusic.play().catch(() => {});

    if (musicBtn) {
      musicBtn.innerHTML = "🔊";
      musicBtn.classList.add("playing");
    }

  } else {

    bgMusic.pause();

    if (musicBtn) {
      musicBtn.innerHTML = "🎵";
      musicBtn.classList.remove("playing");
    }

  }
}


/* =========================
   RAIN EFFECT
========================= */

function createRain() {

  const rainLayer =
    document.querySelector(".rain-layer");

  if (!rainLayer) return;

  rainLayer.innerHTML = "";

  for (let i = 0; i < 90; i++) {

    const drop =
      document.createElement("span");

    drop.className = "rain-drop";

    drop.style.left =
      Math.random() * 100 + "%";

    drop.style.animationDuration =
      (0.5 + Math.random() * 0.7) + "s";

    drop.style.animationDelay =
      Math.random() * 1.5 + "s";

    drop.style.opacity =
      0.3 + Math.random() * 0.6;

    rainLayer.appendChild(drop);
  }
}


/* =========================
   OPEN ROMANTIC LETTER
========================= */

function openLetter() {

  const envelope =
    document.querySelector(".envelope-wrapper");

  if (!envelope) return;

  envelope.classList.toggle("open");

}


/* =========================
   START RAIN
========================= */

createRain();
