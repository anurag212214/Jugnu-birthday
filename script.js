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

      createHearts(20);
      createRain();
      startAtmosphere();
      revealOnScroll();

      const music = document.getElementById("bgMusic");

      if (music) {
        music.volume = 0.35;
        music.play().catch(() => {});
      }

      setTimeout(() => {
        main.classList.remove("main-reveal");
      }, 1800);

    }, 1000);
  };


  // MUSIC
  window.toggleMusic = function () {
    const music = document.getElementById("bgMusic");
    const button = document.getElementById("musicBtn");

    if (!music) return;

    if (music.paused) {
      music.play().then(() => {
        if (button) button.innerHTML = "🔊";
      }).catch(() => {});
    } else {
      music.pause();
      if (button) button.innerHTML = "🎵";
    }
  };


  // HEARTS
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
            {
              transform: "translateY(0) rotate(0)",
              opacity: 0
            },
            {
              transform: "translateY(-45vh) rotate(20deg)",
              opacity: 0.7
            },
            {
              transform: "translateY(-110vh) rotate(-20deg)",
              opacity: 0
            }
          ],
          {
            duration: duration,
            easing: "ease-out",
            fill: "forwards"
          }
        );

        setTimeout(() => heart.remove(), duration + 100);

      }, i * 120);
    }
  }


  // LOVE PARTICLES
  function startAtmosphere() {

    if (document.querySelector(".love-particles")) return;

    const box = document.createElement("div");

    box.className = "love-particles";

    const symbols = ["♡", "♥", "✦", "✧"];

    for (let i = 0; i < 30; i++) {

      const particle = document.createElement("span");

      particle.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";
      particle.style.animationDelay =
        Math.random() * 5 + "s";

      box.appendChild(particle);
    }

    document.body.appendChild(box);
  }


  // RAIN
  function createRain() {

    const rain = document.querySelector(".rain-layer");

    if (!rain) return;

    rain.innerHTML = "";

    for (let i = 0; i < 70; i++) {

      const drop = document.createElement("span");

      drop.className = "rain-drop";

      drop.style.left =
        Math.random() * 100 + "%";

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

    items.forEach(item =>
      item.classList.add("memory-reveal")
    );

    if (!("IntersectionObserver" in window)) {

      items.forEach(item =>
        item.classList.add("is-visible")
      );

      return;
    }

    const observer =
      new IntersectionObserver(entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "is-visible"
            );

            observer.unobserve(entry.target);
          }
        });

      }, {
        threshold: 0.12
      });

    items.forEach(item =>
      observer.observe(item)
    );
  }


  // ENVELOPE
  window.openLetter = function () {

    const envelope =
      document.querySelector(".envelope-wrapper");

    if (!envelope) return;

    envelope.classList.toggle("open");

    // CLOSE ENVELOPE → CAKE
    if (!envelope.classList.contains("open")) {

      setTimeout(() => {

        document.querySelector("#cakeSection")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

      }, 700);
    }
  };


  // 🎂 MAKE A WISH
  window.makeWish = function () {

    const flames =
      document.querySelectorAll(".cake .flame");

    const hint =
      document.querySelector(".cake-tap-hint");

    const message =
      document.getElementById("wishMessage");

    // Candles OFF
    flames.forEach(flame => {
      flame.classList.add("blown");
    });

    // Text change
    if (hint) {
      hint.textContent =
        "Wish sent into the stars ✨❤️";

      hint.classList.add("wish-made");
    }

    if (message) {
      message.textContent =
        "May your wish find its way to you. ❤️";

      message.classList.add("wish-made");
    }

    // Celebration
    createHearts(15);
    createConfetti(60);

    // Go to final automatically
    setTimeout(() => {

      document.querySelector(".final")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

    }, 2800);
  };


  // CONFETTI
  function createConfetti(amount = 50) {

    const box =
      document.createElement("div");

    box.className =
      "confetti-container";

    const shapes =
      ["●", "■", "♥", "✦"];

    for (let i = 0; i < amount; i++) {

      const piece =
        document.createElement("span");

      piece.textContent =
        shapes[Math.floor(
          Math.random() * shapes.length
        )];

      piece.style.left =
        Math.random() * 100 + "vw";

      piece.style.top = "-20px";

      box.appendChild(piece);

      const duration =
        1800 + Math.random() * 2500;

      piece.animate(
        [
          {
            transform:
              "translateY(0) rotate(0)",
            opacity: 1
          },
          {
            transform:
              `translateY(110vh) translateX(${Math.random() * 160 - 80}px) rotate(720deg)`,
            opacity: 0
          }
        ],
        {
          duration: duration,
          easing: "ease-out",
          fill: "forwards"
        }
      );
    }

    document.body.appendChild(box);

    setTimeout(() => box.remove(), 5000);
  }


  // SECTION VISIBILITY
  const sections =
    document.querySelectorAll("main section");

  if ("IntersectionObserver" in window) {

    const sectionObserver =
      new IntersectionObserver(entries => {

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

});
