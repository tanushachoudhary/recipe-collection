document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     1. CARD TOGGLE LOGIC (Ingredients/Steps)
     ========================================= */
  const recipeCards = document.querySelectorAll(".recipe-card");

  recipeCards.forEach((card) => {
    const ingredientsBtn = card.querySelector(".toggle-ingredients");
    const stepsBtn = card.querySelector(".toggle-steps");
    const ingredientsList = card.querySelector(".ingredients");
    const stepsList = card.querySelector(".steps");

    // --- Ingredients Button Logic ---
    if (ingredientsBtn && ingredientsList) {
      ingredientsBtn.addEventListener("click", () => {
        // 1. Toggle visibility
        const isNowVisible = !ingredientsList.classList.toggle("hidden");

        // 2. Update Text & Icon
        if (isNowVisible) {
          ingredientsBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg> 
            Hide Ingredients`;
            
          // Close Steps if open
          stepsList.classList.add("hidden");
          resetStepsButton(stepsBtn);
        } else {
          resetIngredientsButton(ingredientsBtn);
        }
      });
    }

    // --- Steps Button Logic ---
    if (stepsBtn && stepsList) {
      stepsBtn.addEventListener("click", () => {
        // 1. Toggle visibility
        const isNowVisible = !stepsList.classList.toggle("hidden");

        // 2. Update Text & Icon
        if (isNowVisible) {
          stepsBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg> 
            Hide Steps`;

          // Close Ingredients if open
          ingredientsList.classList.add("hidden");
          resetIngredientsButton(ingredientsBtn);
        } else {
          resetStepsButton(stepsBtn);
        }
      });
    }
  });

  // --- Helper Functions to Reset Button Text ---
  function resetIngredientsButton(btn) {
    if(!btn) return;
    btn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
      </svg>
      Ingredients`;
  }

  function resetStepsButton(btn) {
    if(!btn) return;
    btn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="8" y1="6" x2="21" y2="6"></line>
        <line x1="8" y1="12" x2="21" y2="12"></line>
        <line x1="8" y1="18" x2="21" y2="18"></line>
        <line x1="3" y1="6" x2="3.01" y2="6"></line>
        <line x1="3" y1="12" x2="3.01" y2="12"></line>
        <line x1="3" y1="18" x2="3.01" y2="18"></line>
      </svg>
      Steps`;
  }

  /* =========================================
     2. MODAL POPUP LOGIC (Cooking Mode)
     ========================================= */
  const modal = document.getElementById("cooking-modal");
  const closeModalBtn = document.getElementById("close-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalStepNumber = document.getElementById("modal-step-number");
  const modalStepText = document.getElementById("modal-step-text");
  const modalProgressBar = document.getElementById("modal-progress-bar");
  const nextBtn = document.getElementById("modal-next-btn");
  const prevBtn = document.getElementById("modal-prev-btn");

  let currentSteps = []; 
  let currentStepIndex = 0; 

  // --- Open Modal ---
  document.querySelectorAll(".start-cooking").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".recipe-card");

      // Get Data
      const title = card.querySelector("h1").innerText;
      const stepElements = card.querySelectorAll(".steps li");
      
      modalTitle.innerText = title;
      currentSteps = Array.from(stepElements).map((li) => li.innerText);

      // Reset & Show
      currentStepIndex = 0;
      updateModalUI();
      modal.classList.remove("hidden");
    });
  });

  // --- Update Modal Content ---
  function updateModalUI() {
    // Finished State
    if (currentStepIndex >= currentSteps.length) {
      modalStepNumber.innerText = "All Done!";
      modalStepText.innerText = "Enjoy your meal! 🍽️";
      modalProgressBar.style.width = "100%";
      
      prevBtn.disabled = false;
      nextBtn.innerText = "Finish";
      nextBtn.onclick = closeModal;
      return;
    }

    // Active State
    modalStepNumber.innerText = `Step ${currentStepIndex + 1} of ${currentSteps.length}`;
    modalStepText.innerText = currentSteps[currentStepIndex];

    const progress = ((currentStepIndex) / currentSteps.length) * 100;
    modalProgressBar.style.width = `${progress}%`;

    nextBtn.innerText = "Next Step";
    nextBtn.onclick = nextStep; 
    prevBtn.disabled = currentStepIndex === 0;
  }

  // --- Navigation ---
  function nextStep() {
    if (currentStepIndex < currentSteps.length) {
      currentStepIndex++;
      updateModalUI();
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentStepIndex > 0) {
        currentStepIndex--;
        updateModalUI();
      } else if (nextBtn.innerText === "Finish") {
        currentStepIndex = currentSteps.length - 1;
        updateModalUI();
      }
    });
  }

  // --- Close Modal ---
  function closeModal() {
    modal.classList.add("hidden");
    currentSteps = [];
    currentStepIndex = 0;
  }

  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);

  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
});