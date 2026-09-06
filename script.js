document.addEventListener("DOMContentLoaded", () => {

  // OPEN SURPRISE
  window.openSurprise = function () {
    const opening = document.getElementById("opening");
    const main = document.getElementById("mainContent");

    if (!opening || !main) return;

    opening.classList.add("opening-exit");

    setTimeout(() => {
      opening.style.display = "none";
      main.classList.remove("hidden");
      main.classList.add("main-reveal");

      startAtmosphere();
      createRain();
      revealOnScroll();

      const music = document.getElementById("bgMusic");

      if (music) {
        music.volume = 0.35;
        music.play()
          .then(() => updateMusic(true))
          .catch(() => updateMusic(false));
      }

      createHearts(20);

      setTimeout(() => {
        main.classList.remove("main-reveal");
      }, 1800);

    }, 1000);
  };


  // MUSIC
  window.toggleMusic = function () {
    const music = document.getElementById("bgMusic");
    if (!music) return;

    if (music.paused) {
      music.play()
        .then(() => updateMusic(true))
        .catch(() => {});
    } else {
      music.pause();
      updateMusic(false);
    }
  };

  function updateMusic(playing) {
    const btn = document.getElementById("musicBtn");
    if (!btn) return;

    btn.innerHTML = playing ? "🔊" : "🎵";
    btn.classList.toggle("playing", playing);
  }


  // FLOATING HEARTS
  function createHearts(amount = 15) {
    for (let i = 0; i < amount; i++) {
      setTimeout(() => {
        const heart = document.createElement("div");

        heart.className = "floating-heart";
        heart.innerHTML = Math.random() > 0.5 ? "♥" : "♡";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.bottom = "-30px";
        heart.style.fontSize = 10 + Math.random() * 16 + "px";

        document.body.appendChild(heart);

        const duration = 5000 + Math.random() * 4000;

        heart.animate(
          [
            { transform: "translateY(0) rotate(0)", opacity: 0 },
            { transform: "translateY(-45vh) rotate(20deg)", opacity: 0.7 },
            { transform: "translateY(-110vh) rotate(-20deg)", opacity: 0 }
          ],
          {
            duration,
            easing: "ease-out",
            fill: "forwards"
          }
        );

        setTimeout(() => heart.remove(), duration + 100);
      }, i * 150);
    }
  }


  // LOVE PARTICLES
  function startAtmosphere() {
    if (document.querySelector(".love-particles")) return;

    const box = document.createElement("div");
    box.className = "love-particles";

    const symbols = ["♡", "♥", "✦", "✧"];

    for (let i = 0; i < 30; i++) {
      const p = document.createElement("span");

      p.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

      p.style.left = Math.random() * 100 + "%";
      p.style.top = Math.random() * 100 + "%";
      p.style.animationDelay = Math.random() * 5 + "s";

      box.appendChild(p);
    }

    document.body.appendChild(box);
  }


  // MEMORY RAIN
  function createRain() {
    const rain = document.querySelector(".rain-layer");
    if (!rain) return;

    rain.innerHTML = "";

    for (let i = 0; i < 70; i++) {
      const drop = document.createElement("span");

      drop.className = "rain-drop";
      drop.style.left = Math.random() * 100 + "%";
      drop.style.animationDuration =
        0.5 + Math.random() * 0.7 + "s";
      drop.style.animationDelay =
        Math.random() * 1.5 + "s";

      rain.appendChild(drop);
    }
  }


  // SCROLL REVEAL
  function revealOnScroll() {
    const items = document.querySelectorAll(
      ".story-card, .photo-card, .reason"
    );

    if (!items.length) return;

    items.forEach(item => item.classList.add("memory-reveal"));

    if (!("IntersectionObserver" in window)) {
      items.forEach(item => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    items.forEach(item => observer.observe(item));
  }


  // ENVELOPE
  window.openLetter = function () {
    const envelope = document.querySelector(".envelope-wrapper");
    if (!envelope) return;

    envelope.classList.toggle("open");

    if (envelope.classList.contains("open")) {
      createHearts(8);
    } else {
      setTimeout(() => {
        document.querySelector(".final")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
      }, 600);
    }
  };


  // FINAL CONFETTI
  const finalSection = document.querySelector(".final");

  if (finalSection && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        createHearts(18);
        createConfetti(50);
        observer.disconnect();
      }
    }, {
      threshold: 0.35
    });

    observer.observe(finalSection);
  }


  function createConfetti(amount = 40) {
    const box = document.createElement("div");
    box.className = "confetti-container";

    const shapes = ["●", "■", "♥", "✦"];

    for (let i = 0; i < amount; i++) {
      const piece = document.createElement("span");

      piece.textContent =
        shapes[Math.floor(Math.random() * shapes.length)];

      piece.style.left = Math.random() * 100 + "vw";
      piece.style.top = "-20px";

      box.appendChild(piece);

      const duration = 1800 + Math.random() * 2500;

      piece.animate(
        [
          { transform: "translateY(0) rotate(0)", opacity: 1 },
          {
            transform:
              `translateY(110vh) translateX(${Math.random() * 160 - 80}px) rotate(720deg)`,
            opacity: 0
          }
        ],
        {
          duration,
          easing: "ease-out",
          fill: "forwards"
        }
      );
    }

    document.body.appendChild(box);

    setTimeout(() => box.remove(), 5000);
  }


  // SECTION VISIBILITY
  const sections = document.querySelectorAll("main section");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, {
      threshold: 0.08
    });

    sections.forEach(section =>
      sectionObserver.observe(section)
    );
  }


  // MUSIC INITIAL STATE
  updateMusic(false);

});
window.makeWish = function () {
  const flames = document.querySelectorAll(".cake .flame");
  const hint = document.querySelector(".cake-tap-hint");
  const message = document.getElementById("wishMessage");

  flames.forEach(flame => {
    flame.classList.add("blown");
  });

  if (hint) {
    hint.textContent = "Wish sent into the stars ✨❤️";
    hint.classList.add("wish-made");
  }

  if (message) {
    message.textContent = "May your wish find its way to you. ❤️";
    message.classList.add("wish-made");
  }

  createHearts(15);
  createConfetti(60);

  setTimeout(() => {
    document.querySelector(".final")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
  }, 2800);
};
