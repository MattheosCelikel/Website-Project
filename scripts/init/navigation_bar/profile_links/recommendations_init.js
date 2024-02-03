function createRecommendationForm() {
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
    <div class="card-header">Recommendations</div>
    <div class="card-body">
        <div class="row">
            <div class="col-auto form-check">
                <label class="form-check-label" for="flexSwitchCheckDefault">Advanced Options</label>
            </div>
            <div class="col-auto form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
            </div>
            <div class="col text-end">
                <p id="getRecommendation" class="btn btn-outline-dark" style="border-color: transparent;"><b class="font-weight-bold">&lt;</b> Get Your Recommendation</p>
            </div>
        </div>
        <div class="row mb-4" id="advancedOptions" hidden>
            <aside id="info-block">
                <section class="file-marker">
                <div>
                    <div class="box-title">
                    Filter By Preference
                    </div>
                    <div class="box-contents">
                        <div class="container">
                            <div class="container">
                                <form id="filterDiv" class="row">
                                    <div class="col-auto">
                                        Fat:
                                    </div>
                                    <div class="col-3">
                                        <input type="number" class="form-control" id="fatInput" min="0"/>
                                    </div>
                                    <div class="col-auto">
                                        Carbs:
                                    </div>
                                    <div class="col-3">
                                        <input type="number" class="form-control" id="carbsInput" min="0"/>
                                    </div>
                                    <div class="col-auto">
                                        Protein:
                                    </div>
                                    <div class="col-3">
                                        <input type="number" class="form-control" id="proteinInput" min="0"/>
                                    </div>
                                </form>
                            </div>
                    
                        </div>
                    <div id="audit-trail">
                    </div>
                    </div>
                </div>
                </section>
            </aside>
        </div>
        <div class="container row">
            <div class="row">
                <div class="col-4">
                    Meal Name:
                </div>
                <div class="col-auto" id="mealName">
                    
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    Calories:
                </div>
                <div class="col-auto" id="calories">
                    
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    Fat:
                </div>
                <div class="col-auto" id="fat">
                    
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    Carbs:
                </div>
                <div class="col-auto" id="carbs">
                    
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    Protein:
                </div>
                <div class="col-auto" id="protein">
                    
                </div>
            </div>
        </div>
    </div>    
    `;
    formContainer.appendChild(formCard);
    container.appendChild(formContainer);
  
    // Append the container to the main tag
    document.querySelector('main').appendChild(container);

    // Get a reference to the checkbox element
    const checkbox = document.getElementById('flexSwitchCheckDefault');
    const advancedOptions = document.getElementById('advancedOptions');
    const getRecommendation = document.getElementById('getRecommendation');

    // Add an event listener to the checkbox
    checkbox.addEventListener('change', function() {
        // Check if the checkbox is checked
        if (checkbox.checked) {
            // Execute code when checkbox is checked
            console.log('Advanced Options Enabled');
            advancedOptions.removeAttribute('hidden');
        } else {
            // Execute code when checkbox is unchecked
            console.log('Advanced Options Disabled');            
            advancedOptions.setAttribute('hidden', true);
        }
    });

    getRecommendation.addEventListener('click', async function(event){
        event.preventDefault();
        console.log("It clicked");
        const mealName = document.getElementById('mealName');
        const calories = document.getElementById('calories');
        const fat = document.getElementById('fat');
        const carbs = document.getElementById('carbs');
        const protein = document.getElementById('protein');


        // Retrieve input values
        const fatInput = document.getElementById('fatInput').value;
        const carbsInput = document.getElementById('carbsInput').value;
        const proteinInput = document.getElementById('proteinInput').value;

        console.log(fatInput, carbsInput, proteinInput);
        // Validate input values
        const isValidFat = isNumeric(fatInput);
        const isValidCarbs = isNumeric(carbsInput);
        const isValidProtein = isNumeric(proteinInput);

        // Send server-side request only if all values are numeric
        if ((isValidFat) ||
            (isValidFat && isValidCarbs) ||
            (isValidFat && isValidProtein) ||//1
            (isValidFat && isValidCarbs && isValidProtein) ||//all
            (isValidCarbs) ||
            (isValidCarbs && isValidProtein) ||
            (isValidFat && isValidCarbs) ||//2
            (isValidFat && isValidProtein) ||
            (isValidCarbs && isValidProtein) ||
            (isValidProtein) ||
            (isValidFat == '' || isValidCarbs == '' || isValidProtein == '')


        ) {
            // Create the requestBody object
            const requestBody = {
                CALORIES: parseInt('2500'),
                FAT: parseInt(fatInput),
                TOTAL_CARBS: parseInt(carbsInput),
                PROTEIN: parseInt(proteinInput)
            };
            
            console.log(requestBody);
            const data = await fetchDataWithBody('/php/init/profile_links/get_recommendation.php', requestBody);
            console.log(data);
            //Insert new values
            mealName.textContent = data.MEAL_NAME;
            calories.textContent = data.CALORIES;
            fat.textContent = data.FAT + "g";
            carbs.textContent = data.TOTAL_CARBS + "g";
            protein.textContent = data.PROTEIN + "g";

        // Now you can use requestBody to send the server-side request
        } else {
            // Handle validation error: Log an error, show a message to the user, etc.
            console.error('Invalid input. Please enter numeric values for fat, carbs, and protein.');
        }
        
        
    });
  }

function isNumeric(value) {
    return (!isNaN(parseInt(value)) && isFinite(value)) || value == null || value == undefined;
}