function init_login_modal(){
    // Create modal container
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal', 'fade');
  modalContainer.id = 'loginModal';
  modalContainer.tabIndex = '-1';
  modalContainer.setAttribute('aria-labelledby', 'loginModalLabel');
  modalContainer.setAttribute('aria-hidden', 'true');

  // Create modal dialog
  const modalDialog = document.createElement('div');
  modalDialog.classList.add('modal-dialog');

  // Create modal content
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  // Create modal header
  const modalHeader = document.createElement('div');
  modalHeader.classList.add('modal-header');

  // Create modal title
  const modalTitle = document.createElement('h5');
  modalTitle.classList.add('modal-title');
  modalTitle.id = 'loginModalLabel';
  modalTitle.textContent = 'Login';

  // Create close button
  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.classList.add('btn-close');
  closeButton.setAttribute('data-bs-dismiss', 'modal');
  closeButton.setAttribute('aria-label', 'Close');

  // Append modal title and close button to modal header
  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeButton);

  // Create modal body
  const modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');

  // Create login form
  const loginForm = document.createElement('form');

  // Create username input field
  const usernameDiv = document.createElement('div');
  usernameDiv.classList.add('mb-3');
  const usernameLabel = document.createElement('label');
  usernameLabel.classList.add('form-label');
  usernameLabel.setAttribute('for', 'username');
  usernameLabel.textContent = 'Username';
  const usernameInput = document.createElement('input');
  usernameInput.type = 'text';
  usernameInput.classList.add('form-control');
  usernameInput.id = 'username';
  usernameInput.required = true;
  usernameDiv.appendChild(usernameLabel);
  usernameDiv.appendChild(usernameInput);

  // Create password input field
  const passwordDiv = document.createElement('div');
  passwordDiv.classList.add('mb-3');
  const passwordLabel = document.createElement('label');
  passwordLabel.classList.add('form-label');
  passwordLabel.setAttribute('for', 'password');
  passwordLabel.textContent = 'Password';
  const passwordInput = document.createElement('input');
  passwordInput.type = 'password';
  passwordInput.classList.add('form-control');
  passwordInput.id = 'password';
  passwordInput.required = true;
  passwordDiv.appendChild(passwordLabel);
  passwordDiv.appendChild(passwordInput);

  // Create submit button
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.classList.add('btn', 'btn-primary');
  submitButton.textContent = 'Login';

  // Append input fields and submit button to login form
  loginForm.appendChild(usernameDiv);
  loginForm.appendChild(passwordDiv);
  loginForm.appendChild(submitButton);

  // Append login form to modal body
  modalBody.appendChild(loginForm);

  // Append modal header and body to modal content
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);

  // Append modal content to modal dialog
  modalDialog.appendChild(modalContent);

  // Append modal dialog to modal container
  modalContainer.appendChild(modalDialog);

  //To reference the modal as a modal object to access api functionality
  const loginModalBootstrap = new bootstrap.Modal(modalContainer);

  // Append modal container to intermediary tag
  document.querySelector('intermediary').appendChild(modalContainer);

  loginForm.addEventListener('submit', async function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Check if the form is valid
    if (loginForm.checkValidity()) {
      // Form is valid, you can proceed with registration logic here
      console.log('Login successful!');
      console.log(loginForm.username.value, loginForm.password.value);
      let requestBody = {
        USERNAME: loginForm.username.value,
        PASSWORD: loginForm.password.value
      };
      console.log(requestBody);
      const data = await fetchDataWithBody('/php/init/authentication/check_user_exists.php', requestBody);
      console.log(data);
      console.log('Outside login logic');

      if(data && data.isValidLogin){
        console.log('Valid Login');
        const emailConfirmation = await fetchData('/php/init/authentication/send_2fa.php');
        console.log(emailConfirmation.isEmailSent);
        if(emailConfirmation.isEmailSent){
          //Show modal so user can enter email code
          console.log(emailConfirmation);
          
          //Hides login modal
          loginModalBootstrap.hide();

          //Remove body
          document.body.innerHTML = '';

          //Change body to confirmation
          checkTwoFactorAuthentication(emailConfirmation.code);

          //location.reload();
        }
        else{
          console.log("Email failed to send");
        }
      }
      else {
        // Form is invalid, display message saying invalid login
        displayInvalidLoginMessage(modalBody);
      }
      
    }
  });

  // Listen for input events on username and password fields
  loginForm.username.addEventListener('input', hideInvalidLoginMessage);
  loginForm.password.addEventListener('input', hideInvalidLoginMessage);
}

function displayInvalidLoginMessage(modalBody) {
  // Check if the error message element already exists
  const errorMessageElement = document.getElementById('invalidLoginMessage');
  if (!errorMessageElement) {
    // Create a new element for the error message
    const errorMessage = document.createElement('p');
    errorMessage.id = 'invalidLoginMessage';
    errorMessage.classList.add('text-danger');
    errorMessage.textContent = 'Invalid login. Please check your credentials and try again.';

    // Append the error message to the modal body
    modalBody.appendChild(errorMessage);
  }
}

function hideInvalidLoginMessage() {
  // Check if the error message element exists and remove it
  const errorMessageElement = document.getElementById('invalidLoginMessage');
  if (errorMessageElement) {
    errorMessageElement.remove();
  }
}

function checkTwoFactorAuthentication(code){
  document.body.innerHTML = `
  <div class="row justify-content-center mt-7">
    <div class="col-lg-5 text-center">
      <a href="./">
        <img src="/images/original_logo_cropped.png" alt="">
      </a>
      <div class="card mt-5">
        <div id="cardBody" class="card-body py-5 px-lg-5">
          <div class="svg-icon svg-icon-xl text-purple">
            <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>ionicons-v5-g</title><path d="M336,208V113a80,80,0,0,0-160,0v95" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></path><rect x="96" y="208" width="320" height="272" rx="48" ry="48" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></rect></svg>
          </div>
          <h3 class="fw-normal text-dark mt-4">
            2-step verification
          </h3>
          <p class="mt-4 mb-1">
            We sent a verification code to your email.
          </p>
          <p>
            Please enter the code in the field below.
          </p>
            
          <form id="twoFactorAuthenticationForm">
            <div class="row mt-4 pt-2">
              <div class="col">
                <input type="number" class="form-control form-control-lg text-center py-4" maxlength="1" autofocus="">
              </div>
              <div class="col">
                <input type="number" class="form-control form-control-lg text-center py-4" maxlength="1">
              </div>
              <div class="col">
                <input type="number" class="form-control form-control-lg text-center py-4" maxlength="1">
              </div>
              <div class="col">
                <input type="number" class="form-control form-control-lg text-center py-4" maxlength="1">
              </div>
              <div class="col">
                <input type="number" class="form-control form-control-lg text-center py-4" maxlength="1">
              </div>
              <div class="col">
                <input type="number" class="form-control form-control-lg text-center py-4" maxlength="1">
              </div>
            </div>

            <button type="submit" class="btn btn-purple btn-lg w-100 hover-lift-light mt-4">
              Verify my account
            </button>
          </form>

          
        </div>
      </div>

      <p class="text-center text-muted mt-4">
        Didn't receive it?
        <a href="#!" id="resendCode" class="text-decoration-none ms-2">
          Resend code
        </a>
      </p>
    </div>
  </div>
  `;

  const form = document.getElementById('twoFactorAuthenticationForm');

  form.addEventListener('submit', async function(event){
    event.preventDefault();
    console.log("Submitted form");
    //Check if code is equal to what they put
    if(form.checkValidity()){

      // Select all input elements within the form
      const inputElements = form.querySelectorAll('input[type="number"]');
      
      // Create an array to store the values
      const values = [];

      // Iterate through the input elements and get their values
      inputElements.forEach(function(input) {
        values.push(input.value);
      });

      // Concatenate the values and convert to a number
      const concatenatedNumber = Number(values.join(''));
      console.log(concatenatedNumber, code);
      //compare codes
      //If it's right then save user authentication otherwise tell them no
      if(concatenatedNumber == code){
        await fetchData('/php/init/authentication/login_user.php');
        location.reload();
      }
      else{
        //Too lazy to work on this. Just assume if nothing happens then its wrong
        await fetchData('/php/init/authentication/logout_user.php');
        location.reload();
      }
    }
  });

  document.getElementById('resendCode').addEventListener('click', async function(event){

    const emailConfirmation = await fetchData('/php/init/authentication/send_2fa.php');
    if(emailConfirmation.isEmailSent){
      const twoFactorAuthenticationBody = document.getElementById('cardBody');
      displayEmailIsSent(twoFactorAuthenticationBody);
    }
  });

 
}

function displayEmailIsSent(twoFactorAuthenticationBody){
  // Check if the error message element already exists
  const emailConfirmationElement = document.getElementById('sentEmailConfirmation');
  if (!emailConfirmationElement) {
    // Create a new element for the error message
    const emailConfirmation = document.createElement('p');
    emailConfirmation.id = 'sentEmailConfirmation';
    emailConfirmation.classList.add('text-danger');
    emailConfirmation.textContent = 'Another Email has been sent. Please check your inbox.';

    // Append the error message to the modal body
    twoFactorAuthenticationBody.appendChild(emailConfirmation);
  }
}