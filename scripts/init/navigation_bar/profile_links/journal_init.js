function createJournalForm(breakfastItems, lunchItems, dinnerItems, snackItems) {  
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
    const TOTAL_CALORIES_UNCOUNTED = 2500;
    const calorieCard = document.createElement('div');
    calorieCard.className = 'col-xl-12 card mb-4';
    calorieCard.innerHTML = `<div class="card-header">Calories Remaining</div>
    <div class="card-body">
      <div class="row">
        <div class="col-1 col-md-4"></div>
        <div class="col-auto text-center">
          <p id="totalCaloriesUncounted">${TOTAL_CALORIES_UNCOUNTED}</p>
        </div>
        <div class="col-auto text-center">
          <p>-</p>
        </div>
        <div class="col-auto text-center">
          <p id="calorieGainedFromMeals">0</p>
        </div>
        <div class="col-auto text-center">
          <p>+</p>
        </div>
        <div class="col-auto text-center">
          <p id="caloriesLostFromExercise">0</p>
        </div>
        <div class="col-auto text-center">
          <p>=</p>
        </div>
        <div class="col-auto text-center">
          <p id="totalCaloriesNeeded">2500</p>
        </div>
      </div>
    </div>`;

    const breakfastCard = document.createElement('div');
    breakfastCard.className = 'col-xl-12 card mb-4';
    breakfastCard.innerHTML = `<div class="card-body">
    <div class="row">
      <div class="col-6">
        <div class="text-center">
          Breakfast
        </div>
      </div>
      <div class="col-6">
        <div class="text-end">
          <p id="breakfastCalories">0 Calories</p>
        </div>
      </div>
    </div>
    <hr>
    <div id="breakfastItemRow" class="mb-3">

    </div>
    <div class="row">
      <div class="text-center">
        <p class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#breakfastModal" style="border-color: transparent;">
          <b class="font-weight-bold">&lt;</b> Add Food
        </p>
      </div>
    </div>
    </div>   `;
    
    const LunchCard = document.createElement('div');
    LunchCard.className = 'col-xl-12 card mb-4';
    LunchCard.innerHTML = `<div class="card-body">
    <div class="row">
      <div class="col-6">
        <div class="text-center">
          Lunch
        </div>
      </div>
      <div class="col-6">
        <div class="text-end">
          <p id="lunchCalories">0 Calories</p>
        </div>
      </div>
    </div>
    <hr>
    <div id="lunchItemRow"class="mb-3">
        
    </div>
    <div class="row">
      <div class="text-center">
        <p class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#lunchModal" style="border-color: transparent;">
          <b class="font-weight-bold">&lt;</b> Add Food
        </p>
      </div>
    </div>
    </div>  `;

    const DinnerCard = document.createElement('div');
    DinnerCard.className = 'col-xl-12 card mb-4';
    DinnerCard.innerHTML = `<div class="card-body">
    <div class="row">
      <div class="col-6">
        <div class="text-center">
          Dinner
        </div>
      </div>
      <div class="col-6">
        <div class="text-end">
          <p id="dinnerCalories">0 Calories</p>
        </div>
      </div>
    </div>
    <hr>
    <div id="dinnerItemRow" class="mb-3">

    </div>
    <div class="row">
      <div class="text-center">
        <p class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#dinnerModal" style="border-color: transparent;">
          <b class="font-weight-bold">&lt;</b> Add Food
        </p>
      </div>
    </div>
    </div>   `;

    const SnackCard = document.createElement('div');
    SnackCard.className = 'col-xl-12 card mb-4';
    SnackCard.innerHTML = `<div class="card-body">
      <div class="row">
        <div class="col-6">
          <div class="text-center">
            Snacks
          </div>
        </div>
        <div class="col-6">
          <div class="text-end">
            <p id="snackCalories">0 Calories</p>
          </div>
        </div>
      </div>
      <hr>
      <div id="snackItemRow" class="mb-3">
          
        

      </div>
      <div class="row">
        <div class="text-center">
          <p class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#snackModal" style="border-color: transparent;">
            <b class="font-weight-bold">&lt;</b> Add Snack
          </p>
        </div>
      </div>

    </div>`;

    container.appendChild(calorieCard);
    container.appendChild(breakfastCard);
    container.appendChild(LunchCard);
    container.appendChild(DinnerCard);
    container.appendChild(SnackCard); 
  
    // Append the container to the main tag
    document.querySelector('main').appendChild(container);

    let breakfastTotal = 0;
    let lunchTotal = 0;
    let dinnerTotal = 0;
    let snackTotal = 0;

    //Initializes all of the items
    breakfastItems.forEach(item => {
      breakfastTotal += item.calories;
      document.getElementById('breakfastItemRow').appendChild(createFoodItem(item.foodName, item.calories));
    });

    lunchItems.forEach(item => {
      lunchTotal += item.calories;
      document.getElementById('lunchItemRow').appendChild(createFoodItem(item.foodName, item.calories));
    });

    dinnerItems.forEach(item => {
      dinnerTotal += item.calories;
      document.getElementById('dinnerItemRow').appendChild(createFoodItem(item.foodName, item.calories));
    });

    snackItems.forEach(item => {
      snackTotal += item.calories;
      document.getElementById('snackItemRow').appendChild(createFoodItem(item.foodName, item.calories));
    });

    //Updates sum of calories for all adjacent cards
    document.getElementById('breakfastCalories').innerText = `${breakfastTotal} Calories`;
    document.getElementById('lunchCalories').innerText = `${lunchTotal} Calories`;
    document.getElementById('dinnerCalories').innerText = `${dinnerTotal} Calories`;
    document.getElementById('snackCalories').innerText = `${snackTotal} Calories`;
    
    //Change Total amount of calories for header card
    document.getElementById('calorieGainedFromMeals').innerText = `${breakfastTotal + lunchTotal + dinnerTotal + snackTotal}`;
    document.getElementById('totalCaloriesNeeded').innerText = `${TOTAL_CALORIES_UNCOUNTED - (breakfastTotal + lunchTotal + dinnerTotal + snackTotal)}`;
  }

  function createFoodItem(foodName, calories){
    const card = document.createElement('div');
    card.innerHTML = `<div class="row">
      <div class="col-6">
        <div class="text-center">
          ${foodName}
        </div>
      </div>
      <div class="col-6">
        <div class="text-end">
          <p>${calories} Calories</p>
        </div>
      </div>
    </div>`;
    return card;
  }