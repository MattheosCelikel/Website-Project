/**
 * All of the modals used in the journal page will be placed here
 * 
 */

  function init_journal_modal(){
    init_breakfast_modal();
    init_lunch_modal();
    init_dinner_modal();
    init_snack_modal();
  }

  function init_breakfast_modal() {
    // Create modal container
    const modalContainer = document.createElement('div');
  
    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
  
    const modalTitle = document.createElement('h5');
    modalTitle.classList.add('modal-title');
    modalTitle.textContent = 'Add Breakfast Item';
  
    const closeButton = document.createElement('button');
    closeButton.setAttribute('type', 'button');
    closeButton.classList.add('btn-close');
    closeButton.setAttribute('data-bs-dismiss', 'modal');
    closeButton.setAttribute('aria-label', 'Close');
  
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);
  
    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
  
    const journalFormContainer = document.createElement('form');
    journalFormContainer.setAttribute('id', 'breakfastForm');
  
    const breakfastNameLabel = document.createElement('label');
    breakfastNameLabel.setAttribute('for', 'breakfastNameInput');
    breakfastNameLabel.textContent = 'Breakfast Name:';
  
    const breakfastNameInput = document.createElement('input');
    breakfastNameInput.setAttribute('type', 'text');
    breakfastNameInput.setAttribute('id', 'breakfastNameInput');
    breakfastNameInput.classList.add('form-control');
    breakfastNameInput.setAttribute('required', 'true');
  
    const breakfastCalorieLabel = document.createElement('label');
    breakfastCalorieLabel.setAttribute('for', 'breakfastCalorieInput');
    breakfastCalorieLabel.textContent = 'Calories:';
  
    const breakfastCalorieInput = document.createElement('input');
    breakfastCalorieInput.setAttribute('type', 'number');
    breakfastCalorieInput.setAttribute('id', 'breakfastCalorieInput');
    breakfastCalorieInput.classList.add('form-control');
    breakfastCalorieInput.setAttribute('required', 'true');
  
    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.classList.add('btn', 'btn-primary');
    submitButton.textContent = 'Submit';
    
    journalFormContainer.appendChild(breakfastNameLabel);
    journalFormContainer.appendChild(breakfastNameInput);
    journalFormContainer.appendChild(breakfastCalorieLabel);
    journalFormContainer.appendChild(breakfastCalorieInput);
    journalFormContainer.appendChild(submitButton);
  
    modalBody.appendChild(journalFormContainer);
  
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
  
    const modalDialog = document.createElement('div');
    modalDialog.classList.add('modal-dialog');
    modalDialog.appendChild(modalContent);
  
    const journalModal = document.createElement('div');
    journalModal.classList.add('modal', 'fade');
    journalModal.setAttribute('id', 'breakfastModal');
    journalModal.setAttribute('tabindex', '-1');
    journalModal.setAttribute('aria-labelledby', 'exampleModalLabel');
    journalModal.setAttribute('aria-hidden', 'true');
    journalModal.appendChild(modalDialog);
  
    modalContainer.appendChild(journalModal);
  
    // Append modal container to the body
    document.body.appendChild(modalContainer);
  
    // Get the journal form and add submit event listener
    const journalForm = document.getElementById('breakfastForm');
    const currentModal = new bootstrap.Modal(journalModal);
    journalForm.addEventListener('submit', function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();
  
        // Check if the form is valid
        if (journalForm.checkValidity()) {
            // Form is valid, you can proceed with journal logic here
            const breakfastName = breakfastNameInput.value;
            const breakfastCalorie = breakfastCalorieInput.value;
  
            console.log('Breakfast Name:', breakfastName);
            console.log('Breakfast Calories:', breakfastCalorie);
            

            breakfastNameInput.value = '';
            breakfastCalorieInput.value = '';
            currentModal.hide();
            // Additional logic for handling the journal
        } else {
            // Form is invalid, display specific feedback messages
            // ... (similar to the existing logic for loginForm)
        }
    });
  }

  function init_lunch_modal() {
    // Create modal container
    const modalContainer = document.createElement('div');
  
    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
  
    const modalTitle = document.createElement('h5');
    modalTitle.classList.add('modal-title');
    modalTitle.textContent = 'Add Lunch Item';
  
    const closeButton = document.createElement('button');
    closeButton.setAttribute('type', 'button');
    closeButton.classList.add('btn-close');
    closeButton.setAttribute('data-bs-dismiss', 'modal');
    closeButton.setAttribute('aria-label', 'Close');
  
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);
  
    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
  
    const journalFormContainer = document.createElement('form');
    journalFormContainer.setAttribute('id', 'lunchForm');
  
    const lunchNameLabel = document.createElement('label');
    lunchNameLabel.setAttribute('for', 'lunchNameInput');
    lunchNameLabel.textContent = 'Lunch Name:';
  
    const lunchNameInput = document.createElement('input');
    lunchNameInput.setAttribute('type', 'text');
    lunchNameInput.setAttribute('id', 'lunchNameInput');
    lunchNameInput.classList.add('form-control');
    lunchNameInput.setAttribute('required', 'true');
  
    const lunchCalorieLabel = document.createElement('label');
    lunchCalorieLabel.setAttribute('for', 'lunchCalorieInput');
    lunchCalorieLabel.textContent = 'Calories:';
  
    const lunchCalorieInput = document.createElement('input');
    lunchCalorieInput.setAttribute('type', 'number');
    lunchCalorieInput.setAttribute('id', 'lunchCalorieInput');
    lunchCalorieInput.classList.add('form-control');
    lunchCalorieInput.setAttribute('required', 'true');
  
    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.classList.add('btn', 'btn-primary');
    submitButton.textContent = 'Submit';
    
    journalFormContainer.appendChild(lunchNameLabel);
    journalFormContainer.appendChild(lunchNameInput);
    journalFormContainer.appendChild(lunchCalorieLabel);
    journalFormContainer.appendChild(lunchCalorieInput);
    journalFormContainer.appendChild(submitButton);
  
    modalBody.appendChild(journalFormContainer);
  
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
  
    const modalDialog = document.createElement('div');
    modalDialog.classList.add('modal-dialog');
    modalDialog.appendChild(modalContent);
  
    const journalModal = document.createElement('div');
    journalModal.classList.add('modal', 'fade');
    journalModal.setAttribute('id', 'lunchModal');
    journalModal.setAttribute('tabindex', '-1');
    journalModal.setAttribute('aria-labelledby', 'exampleModalLabel');
    journalModal.setAttribute('aria-hidden', 'true');
    journalModal.appendChild(modalDialog);
  
    modalContainer.appendChild(journalModal);
  
    // Append modal container to the body
    document.body.appendChild(modalContainer);
  
    // Get the journal form and add submit event listener
    const journalForm = document.getElementById('lunchForm');
    const currentModal = new bootstrap.Modal(journalModal);
    journalForm.addEventListener('submit', function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();
  
        // Check if the form is valid
        if (journalForm.checkValidity()) {
            // Form is valid, you can proceed with journal logic here
            const lunchName = lunchNameInput.value;
            const lunchCalorie = lunchCalorieInput.value;
  
            console.log('Lunch Name:', lunchName);
            console.log('Lunch Calories:', lunchCalorie);
            

            lunchNameInput.value = '';
            lunchCalorieInput.value = '';
            currentModal.hide();
            // Additional logic for handling the journal
        } else {
            // Form is invalid, display specific feedback messages
            // ... (similar to the existing logic for loginForm)
        }
    });
  }

  function init_dinner_modal() {
    // Create modal container
    const modalContainer = document.createElement('div');
  
    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
  
    const modalTitle = document.createElement('h5');
    modalTitle.classList.add('modal-title');
    modalTitle.textContent = 'Add Dinner Item';
  
    const closeButton = document.createElement('button');
    closeButton.setAttribute('type', 'button');
    closeButton.classList.add('btn-close');
    closeButton.setAttribute('data-bs-dismiss', 'modal');
    closeButton.setAttribute('aria-label', 'Close');
  
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);
  
    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
  
    const journalFormContainer = document.createElement('form');
    journalFormContainer.setAttribute('id', 'dinnerForm');
  
    const dinnerNameLabel = document.createElement('label');
    dinnerNameLabel.setAttribute('for', 'dinnerNameInput');
    dinnerNameLabel.textContent = 'Dinner Name:';
  
    const dinnerNameInput = document.createElement('input');
    dinnerNameInput.setAttribute('type', 'text');
    dinnerNameInput.setAttribute('id', 'dinnerNameInput');
    dinnerNameInput.classList.add('form-control');
    dinnerNameInput.setAttribute('required', 'true');
  
    const dinnerCalorieLabel = document.createElement('label');
    dinnerCalorieLabel.setAttribute('for', 'dinnerCalorieInput');
    dinnerCalorieLabel.textContent = 'Calories:';
  
    const dinnerCalorieInput = document.createElement('input');
    dinnerCalorieInput.setAttribute('type', 'number');
    dinnerCalorieInput.setAttribute('id', 'dinnerCalorieInput');
    dinnerCalorieInput.classList.add('form-control');
    dinnerCalorieInput.setAttribute('required', 'true');
  
    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.classList.add('btn', 'btn-primary');
    submitButton.textContent = 'Submit';
    
    journalFormContainer.appendChild(dinnerNameLabel);
    journalFormContainer.appendChild(dinnerNameInput);
    journalFormContainer.appendChild(dinnerCalorieLabel);
    journalFormContainer.appendChild(dinnerCalorieInput);
    journalFormContainer.appendChild(submitButton);
  
    modalBody.appendChild(journalFormContainer);
  
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
  
    const modalDialog = document.createElement('div');
    modalDialog.classList.add('modal-dialog');
    modalDialog.appendChild(modalContent);
  
    const journalModal = document.createElement('div');
    journalModal.classList.add('modal', 'fade');
    journalModal.setAttribute('id', 'dinnerModal');
    journalModal.setAttribute('tabindex', '-1');
    journalModal.setAttribute('aria-labelledby', 'exampleModalLabel');
    journalModal.setAttribute('aria-hidden', 'true');
    journalModal.appendChild(modalDialog);
  
    modalContainer.appendChild(journalModal);
  
    // Append modal container to the body
    document.body.appendChild(modalContainer);
  
    // Get the journal form and add submit event listener
    const journalForm = document.getElementById('dinnerForm');
    const currentModal = new bootstrap.Modal(journalModal);
    journalForm.addEventListener('submit', function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();
  
        // Check if the form is valid
        if (journalForm.checkValidity()) {
            // Form is valid, you can proceed with journal logic here
            const dinnerName = dinnerNameInput.value;
            const dinnerCalorie = dinnerCalorieInput.value;
  
            console.log('Dinner Name:', dinnerName);
            console.log('Dinner Calories:', dinnerCalorie);
            

            dinnerNameInput.value = '';
            dinnerCalorieInput.value = '';
            currentModal.hide();
            // Additional logic for handling the journal
        } else {
            // Form is invalid, display specific feedback messages
            // ... (similar to the existing logic for loginForm)
        }
    });
  }

  function init_snack_modal() {
    // Create modal container
    const modalContainer = document.createElement('div');
  
    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
  
    const modalTitle = document.createElement('h5');
    modalTitle.classList.add('modal-title');
    modalTitle.textContent = 'Add Snack Item';
  
    const closeButton = document.createElement('button');
    closeButton.setAttribute('type', 'button');
    closeButton.classList.add('btn-close');
    closeButton.setAttribute('data-bs-dismiss', 'modal');
    closeButton.setAttribute('aria-label', 'Close');
  
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);
  
    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
  
    const journalFormContainer = document.createElement('form');
    journalFormContainer.setAttribute('id', 'snackForm');
  
    const snackNameLabel = document.createElement('label');
    snackNameLabel.setAttribute('for', 'snackNameInput');
    snackNameLabel.textContent = 'Snack Name:';
  
    const snackNameInput = document.createElement('input');
    snackNameInput.setAttribute('type', 'text');
    snackNameInput.setAttribute('id', 'snackNameInput');
    snackNameInput.classList.add('form-control');
    snackNameInput.setAttribute('required', 'true');
  
    const snackCalorieLabel = document.createElement('label');
    snackCalorieLabel.setAttribute('for', 'snackCalorieInput');
    snackCalorieLabel.textContent = 'Calories:';
  
    const snackCalorieInput = document.createElement('input');
    snackCalorieInput.setAttribute('type', 'number');
    snackCalorieInput.setAttribute('id', 'snackCalorieInput');
    snackCalorieInput.classList.add('form-control');
    snackCalorieInput.setAttribute('required', 'true');
  
    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.classList.add('btn', 'btn-primary');
    submitButton.textContent = 'Submit';
    
    journalFormContainer.appendChild(snackNameLabel);
    journalFormContainer.appendChild(snackNameInput);
    journalFormContainer.appendChild(snackCalorieLabel);
    journalFormContainer.appendChild(snackCalorieInput);
    journalFormContainer.appendChild(submitButton);
  
    modalBody.appendChild(journalFormContainer);
  
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
  
    const modalDialog = document.createElement('div');
    modalDialog.classList.add('modal-dialog');
    modalDialog.appendChild(modalContent);
  
    const journalModal = document.createElement('div');
    journalModal.classList.add('modal', 'fade');
    journalModal.setAttribute('id', 'snackModal');
    journalModal.setAttribute('tabindex', '-1');
    journalModal.setAttribute('aria-labelledby', 'exampleModalLabel');
    journalModal.setAttribute('aria-hidden', 'true');
    journalModal.appendChild(modalDialog);
  
    modalContainer.appendChild(journalModal);
  
    // Append modal container to the body
    document.body.appendChild(modalContainer);
  
    // Get the journal form and add submit event listener
    const journalForm = document.getElementById('snackForm');
    const currentModal = new bootstrap.Modal(journalModal);
    journalForm.addEventListener('submit', function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();
  
        // Check if the form is valid
        if (journalForm.checkValidity()) {
            // Form is valid, you can proceed with journal logic here
            const snackName = snackNameInput.value;
            const snackCalorie = snackCalorieInput.value;
  
            console.log('Snack Name:', snackName);
            console.log('Snack Calories:', snackCalorie);
            

            snackNameInput.value = '';
            snackCalorieInput.value = '';
            currentModal.hide();
            // Additional logic for handling the journal
        } else {
            // Form is invalid, display specific feedback messages
            // ... (similar to the existing logic for loginForm)
        }
    });
  }