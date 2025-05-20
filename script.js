document.addEventListener("DOMContentLoaded", function () {
  // Toggle ingredients and steps
  document.querySelectorAll(".toggle-ingredients").forEach((button) => {
    button.addEventListener("click", function () {
      const ingredientsList =
        this.closest(".recipe-content").querySelector(".ingredients");
      ingredientsList.classList.toggle("hidden");
      ingredientsList.classList.toggle("active");
      this.textContent = ingredientsList.classList.contains("hidden")
        ? "Show Ingredients"
        : "Hide Ingredients";

      // Add the SVG back
      this.innerHTML = `
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
              </svg>
              ${
                ingredientsList.classList.contains("hidden")
                  ? "Ingredients"
                  : "Hide Ingredients"
              }
            `;
    });
  });

  document.querySelectorAll(".toggle-steps").forEach((button) => {
    button.addEventListener("click", function () {
      const stepsList = this.closest(".recipe-content").querySelector(".steps");
      stepsList.classList.toggle("hidden");
      stepsList.classList.toggle("active");
      this.textContent = stepsList.classList.contains("hidden")
        ? "Show Steps"
        : "Hide Steps";

      // Add the SVG back
      this.innerHTML = `
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
              ${stepsList.classList.contains("hidden") ? "Steps" : "Hide Steps"}
            `;
    });
  });

  document.querySelectorAll(".recipe-card").forEach((card) => {
    const startButton = card.querySelector(".start-cooking");
    const nextButton = card.querySelector(".next-step");
    const stepsList = card.querySelector(".steps");
    const steps = stepsList.querySelectorAll("li");
    const progressBar = card.querySelector(".progress-bar");
    const timer = card.querySelector(".timer");

    let currentStep = 0;
    let timerInterval;
    let seconds = 0;

    startButton.addEventListener("click", function () {
      stepsList.classList.remove("hidden");
      stepsList.classList.add("active");
      timer.classList.remove("hidden");

      startButton.classList.add("hidden");
      nextButton.classList.remove("hidden");
      nextButton.disabled = false;

      currentStep = 0;
      steps.forEach((step) => step.classList.remove("highlight"));
      steps[0].classList.add("highlight");

      clearInterval(timerInterval);
      seconds = 0;
      startTimer();
    });

    nextButton.addEventListener("click", function () {
      steps[currentStep].classList.remove("highlight");
      currentStep++;

      const progress = (currentStep / steps.length) * 100;
      progressBar.style.width = `${progress}%`;

      if (currentStep < steps.length) {
        steps[currentStep].classList.add("highlight");
      } else {
        nextButton.disabled = true;
        clearInterval(timerInterval);
        alert("Cooking completed! Enjoy your meal.");
      }
    });

    function startTimer() {
      timerInterval = setInterval(function () {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timer.textContent = `⏱ ${minutes
          .toString()
          .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
      }, 1000);
    }
  });
});
