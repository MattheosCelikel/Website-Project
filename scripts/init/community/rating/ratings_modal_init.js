function init_rating_modal() {
  // Create modal container
  const modalContainer = document.createElement('div');

  const modalHeader = document.createElement('div');
  modalHeader.classList.add('modal-header');

  const modalTitle = document.createElement('h5');
  modalTitle.classList.add('modal-title');
  modalTitle.textContent = 'Ratings';

  const closeButton = document.createElement('button');
  closeButton.setAttribute('type', 'button');
  closeButton.classList.add('btn-close');
  closeButton.setAttribute('data-bs-dismiss', 'modal');
  closeButton.setAttribute('aria-label', 'Close');

  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeButton);

  const modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');

  const ratingFormContainer = document.createElement('form');
  ratingFormContainer.setAttribute('id', 'ratingForm');

  const ratingLabel = document.createElement('label');
  ratingLabel.setAttribute('for', 'ratingSelect');
  ratingLabel.textContent = 'Select Rating:';

  const ratingSelect = document.createElement('select');
  ratingSelect.setAttribute('id', 'ratingSelect');
  ratingSelect.classList.add('form-control');
  ratingSelect.setAttribute('required', 'true');

  // Add rating options dynamically
  for (let i = 1; i <= 10; i++) {
      const option = document.createElement('option');
      option.value = i.toString();
      option.textContent = i.toString();
      ratingSelect.appendChild(option);
  }

  const mealNameLabel = document.createElement('label');
  mealNameLabel.setAttribute('for', 'mealNameInput');
  mealNameLabel.textContent = 'Meal Name:';

  const mealNameInput = document.createElement('input');
  mealNameInput.setAttribute('type', 'text');
  mealNameInput.setAttribute('id', 'mealNameInput');
  mealNameInput.classList.add('form-control');
  mealNameInput.setAttribute('required', 'true');

  const commentLabel = document.createElement('label');
  commentLabel.setAttribute('for', 'commentTextarea');
  commentLabel.textContent = 'Comment:';

  const commentTextarea = document.createElement('textarea');
  commentTextarea.setAttribute('id', 'commentTextarea');
  commentTextarea.classList.add('form-control');
  commentTextarea.setAttribute('required', 'true');

  const submitButton = document.createElement('button');
  submitButton.setAttribute('type', 'submit');
  submitButton.classList.add('btn', 'btn-primary');
  submitButton.textContent = 'Submit';

  ratingFormContainer.appendChild(ratingLabel);
  ratingFormContainer.appendChild(ratingSelect);
  ratingFormContainer.appendChild(mealNameLabel);
  ratingFormContainer.appendChild(mealNameInput);
  ratingFormContainer.appendChild(commentLabel);
  ratingFormContainer.appendChild(commentTextarea);
  ratingFormContainer.appendChild(submitButton);

  modalBody.appendChild(ratingFormContainer);

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);

  const modalDialog = document.createElement('div');
  modalDialog.classList.add('modal-dialog');
  modalDialog.appendChild(modalContent);

  const ratingModal = document.createElement('div');
  ratingModal.classList.add('modal', 'fade');
  ratingModal.setAttribute('id', 'ratingModal');
  ratingModal.setAttribute('tabindex', '-1');
  ratingModal.setAttribute('aria-labelledby', 'exampleModalLabel');
  ratingModal.setAttribute('aria-hidden', 'true');
  ratingModal.appendChild(modalDialog);

  modalContainer.appendChild(ratingModal);

  // Append modal container to the body
  document.body.appendChild(modalContainer);

  // Get the rating form and add submit event listener
  const ratingForm = document.getElementById('ratingForm');
  ratingForm.addEventListener('submit', async function (event) {
      // Prevent the default form submission behavior
      event.preventDefault();

      // Check if the form is valid
      if (ratingForm.checkValidity()) {
        // Form is valid, you can proceed with rating logic here
        const selectedRating = ratingSelect.value;
        const mealName = mealNameInput.value;
        const comment = commentTextarea.value;

        console.log('Rating:', selectedRating);
        console.log('Meal Name:', mealName);
        console.log('Comment:', comment);

        const requestBody = {
            RATING: selectedRating,
            MEAL_NAME: mealName,
            COMMENT: comment
        };
        
        console.log(requestBody);
        const data = await fetchDataWithBody('/php/init/community/insert_rating.php', requestBody);
        console.log(data);

        if(data.isCreated){
            location.reload();
        }
        else{
            alert('Submission didn\'t go through');
        }
        //location.reload();
        
          // Additional logic for handling the rating
      } else {
          // Form is invalid, display specific feedback messages
          // ... (similar to the existing logic for loginForm)
      }
  });
}
