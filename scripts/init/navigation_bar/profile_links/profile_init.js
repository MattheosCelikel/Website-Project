function createProfileForm(data) {
    // Create main container
    var container = document.createElement('div');
    container.className = 'px-4 mt-4';

    // Create navigation
    var nav = document.createElement('nav');
    nav.className = 'nav nav-borders';
    var navLinks = [
        { text: 'Profile', href: './profile.html' },
        { text: 'Metrics', href: './metrics.html' },
        { text: 'Journal', href: './journal.html' },
        { text: 'Recommendations', href: './recommendations.html' },
        { text: 'Notifications', href: './notifications.html' }
    ];
    navLinks.forEach(function(link) {
        var linkElement = document.createElement('a');
        linkElement.className = 'nav-link';
        linkElement.href = link.href;
        linkElement.textContent = link.text;
        nav.appendChild(linkElement);
    });
    container.appendChild(nav);

    // Create horizontal rule
    var hr = document.createElement('hr');
    hr.className = 'mt-0 mb-4';
    container.appendChild(hr);

    // Create form
    var formContainer = document.createElement('div');
    formContainer.className = 'row';
    var formCard = document.createElement('div');
    formCard.className = 'col-xl-12 card mb-4';
    formCard.innerHTML = `
        <div class="card-header">Account Details</div>
        <div class="card-body">
        <form id="profileForm">
            <div class="mb-3">
            <label class="small mb-1" for="inputUsername">Username</label>
            <input class="form-control" id="inputUsername" type="text" placeholder="Enter your username" value="${data.USERNAME}" required>
            </div>
            <div class="mb-3">
            <label class="small mb-1" for="inputFirstName">First name</label>
            <input class="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" value="${data.FIRST_NAME}" required>
            </div>
            <div class="mb-3">
            <label class="small mb-1" for="inputLastName">Last name</label>
            <input class="form-control" id="inputLastName" type="text" placeholder="Enter your last name" value="${data.LAST_NAME}" required>
            </div>
            <div class="mb-3">
            <label class="small mb-1" for="inputEmailAddress">Email address</label>
            <input class="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" value="${data.EMAIL}" required>
            </div>
            <div class="mb-3">
            <label class="small mb-1" for="inputPhone">Phone number</label>
            <input class="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number" value="${data.PHONE_NUMBER}">
            <span id="phoneValidationMessage" style="color: red;"></span>
            <button class="btn btn-primary" type="submit">Save changes</button>
        </form>
        </div>
    `;
    formContainer.appendChild(formCard);
    container.appendChild(formContainer);
  
    // Append the container to the main tag
    document.querySelector('main').appendChild(container);

    document.getElementById('profileForm').addEventListener('submit', async function(event){
        event.preventDefault();
        console.log("Clicked");
        const username = document.getElementById('inputUsername').value;
        const firstName = document.getElementById('inputFirstName').value;
        const lastName = document.getElementById('inputLastName').value;
        const emailAddress = document.getElementById('inputEmailAddress').value;
        const phone = document.getElementById('inputPhone').value;

        let validationMessageElement = document.getElementById('phoneValidationMessage');

        if (phone.length !== 10) {
            // Display an error message
            validationMessageElement.textContent = 'Please enter a valid 10-digit phone number';
        } else {
            // Clear the error message
            validationMessageElement.textContent = '';
        }

        let requestBody = {
            USERNAME: username,
            FIRST_NAME: firstName,
            LAST_NAME: lastName,
            EMAIL: emailAddress,
            PHONE_NUMBER: formatPhoneNumber(phone)
          };
          const data = await fetchDataWithBody('/php/init/profile_links/update_profile.php', requestBody); 
  
          if(data){
            console.log(data);
            location.reload();
          }
          else{
            alert("Update unsuccessful");
          }

        console.log(username, firstName, lastName, emailAddress, phone);
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