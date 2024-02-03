function init_register_modal(){
    // Create the modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';

    const modalTitle = document.createElement('h5');
    modalTitle.className = 'modal-title';
    modalTitle.id = 'registerModalLabel';
    modalTitle.textContent = 'Register';

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'btn-close';
    closeButton.setAttribute('data-bs-dismiss', 'modal');
    closeButton.setAttribute('aria-label', 'Close');

    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);

    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';

    const registrationForm = document.createElement('form');
    registrationForm.id = 'registrationForm';

    const formElements = [
      { label: 'Username', type: 'text', id: 'username', feedback: 'Please enter a username.' },
      { label: 'Password', type: 'password', id: 'password', feedback: 'Please enter a password.' },
      { label: 'First Name', type: 'text', id: 'firstName', feedback: 'Please enter your first name.' },
      { label: 'Last Name', type: 'text', id: 'lastName', feedback: 'Please enter your last name.' },
      { label: 'Email Address', type: 'email', id: 'email', feedback: 'Please enter a valid email address.' },
      {
        label: 'Phone Number',
        type: 'tel',
        id: 'phoneNumber',
        pattern: '[0-9]{10}',
        feedback: 'Please enter a valid 9-digit phone number.'
      }
    ];

    formElements.forEach((element) => {
      const formGroup = document.createElement('div');
      formGroup.className = 'mb-3';

      const label = document.createElement('label');
      label.setAttribute('for', element.id);
      label.className = 'form-label';
      label.textContent = element.label;

      const input = document.createElement('input');
      input.type = element.type;
      input.className = 'form-control';
      input.id = element.id;
      input.required = true;

      if (element.pattern) {
        input.pattern = element.pattern;
      }

      const invalidFeedback = document.createElement('div');
      invalidFeedback.className = 'invalid-feedback';
      invalidFeedback.textContent = element.feedback;

      formGroup.appendChild(label);
      formGroup.appendChild(input);
      formGroup.appendChild(invalidFeedback);

      registrationForm.appendChild(formGroup);
    });

    const registerButton = document.createElement('button');
    registerButton.type = 'submit';
    registerButton.className = 'btn btn-primary';
    registerButton.textContent = 'Register';

    registrationForm.appendChild(registerButton);
    modalBody.appendChild(registrationForm);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);

    const modalDialog = document.createElement('div');
    modalDialog.className = 'modal-dialog';
    modalDialog.appendChild(modalContent);

    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'registerModal';
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'registerModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    modal.appendChild(modalDialog);



    // Append modal container to intermediary tag
    document.querySelector('intermediary').appendChild(modal);


    // Add an event listener for the form submission
    registrationForm.addEventListener('submit', async function (event) {
      // Prevent the default form submission behavior
      event.preventDefault();

      // Check if the form is valid
      if (registrationForm.checkValidity()) {
        // Form is valid, you can proceed with registration logic here
        console.log('Registration successful!');
        console.log(registrationForm.username.value, registrationForm.password.value);
        let requestBody = {
          USERNAME: registrationForm.username.value,
          PASSWORD: registrationForm.password.value,
          FIRST_NAME: registrationForm.firstName.value,
          LAST_NAME: registrationForm.lastName.value,
          EMAIL: registrationForm.email.value,
          PHONE_NUMBER: registrationForm.phoneNumber.value.length == 10? formatPhoneNumber(registrationForm.phoneNumber.value): "000-000-0000"
        };
        const data = await fetchDataWithBody('/php/init/authentication/register.php', requestBody); 

        if(data){
          console.log(data);
          location.reload();
        }
        else{
          alert("Register unsuccessful");
        }
        //window.location.href = "./";
      } else {
        // Form is invalid, display specific feedback messages
        formElements.forEach((element) => {
          const input = document.getElementById(element.id);
          const invalidFeedback = input.nextElementSibling; // Get the invalid-feedback div

          if (!input.checkValidity()) {
            // Show the feedback message if the input is invalid
            invalidFeedback.style.display = 'block';
          } else {
            // Hide the feedback message if the input is valid
            invalidFeedback.style.display = 'none';
          }
        });
      }
    });

}

function formatPhoneNumber(input) {
  // Remove non-numeric characters
  const numericOnly = input.replace(/\D/g, '');

  // Check if the length is not equal to 10
  if (numericOnly.length !== 10) {
      return false;
  }

  // Format the phone number as xxx-xxx-xxxx
  const formattedNumber = numericOnly.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  
  return formattedNumber;
}