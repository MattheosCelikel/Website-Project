function init_ratings(cardDataArray, avgStars, avgRate, totalReviews){

    // Container 1
    const container1 = document.createElement('div');
    container1.classList.add('text-center');

    const heading1 = document.createElement('h1');
    heading1.classList.add('display-6');
    heading1.textContent = 'Ratings and Reviews';

    const paragraph1 = document.createElement('p');
    paragraph1.textContent = 'Average Star Rating';

    const paragraph2 = document.createElement('p');
    paragraph2.textContent = '★'.repeat(Math.floor(avgStars)) + '☆'.repeat(10 - Math.floor(avgStars));

    const paragraph3 = document.createElement('p');
    paragraph3.textContent = avgRate + ' | ' + totalReviews + ' reviews';

    const addButton = document.createElement('p');
    addButton.classList.add('btn', 'btn-outline-dark');
    addButton.style.borderColor = 'transparent';
    addButton.setAttribute('data-bs-toggle', 'modal');
    addButton.setAttribute('data-bs-target', '#ratingModal');
    addButton.innerHTML = '<b class="font-weight-bold">&lt;</b> Add new Review';

    // Append elements to container 1
    container1.appendChild(heading1);
    container1.appendChild(paragraph1);
    container1.appendChild(paragraph2);
    container1.appendChild(paragraph3);
    container1.appendChild(addButton);

    // Horizontal line
    const hr1 = document.createElement('hr');

    // Container 2
    const container2 = document.createElement('div');
    container2.classList.add('row', 'd-flex', 'justify-content-between');

    const heading2 = document.createElement('div');
    heading2.classList.add('col');

    const heading2Text = document.createElement('h5');
    heading2Text.textContent = 'Filter By';

    heading2.appendChild(heading2Text);

    const clearAllLink = document.createElement('div');
    clearAllLink.classList.add('col', 'text-end');

    const clearAllAnchor = document.createElement('a');
    clearAllAnchor.href = '#';
    clearAllAnchor.classList.add('link-body-emphasis', 'link-underline', 'link-underline-opacity-0');
    clearAllAnchor.textContent = 'Clear all';

    clearAllLink.appendChild(clearAllAnchor);

    // Append elements to container 2
    container2.appendChild(heading2);
    container2.appendChild(clearAllLink);

    // Horizontal line
    const hr2 = document.createElement('hr');

    // Container 3
    const container3 = document.createElement('div');
    container3.classList.add('row');

    const filterRatingCol = document.createElement('div');
    filterRatingCol.classList.add('col-md-4');

    const filterRatingRow = document.createElement('div');
    filterRatingRow.classList.add('row');

    const filterRatingLabel = document.createElement('label');
    filterRatingLabel.setAttribute('for', 'Rating');
    filterRatingLabel.classList.add('form-label');
    filterRatingLabel.textContent = 'Filter by Rating:';

    const filterRatingInput = document.createElement('input');
    filterRatingInput.setAttribute('type', 'text');
    filterRatingInput.id = 'Rating';
    filterRatingInput.placeholder = 'Rating';
    filterRatingInput.classList.add('form-control');

    // Append elements to filterRatingCol
    filterRatingRow.appendChild(filterRatingLabel);
    filterRatingRow.appendChild(filterRatingInput);
    filterRatingCol.appendChild(filterRatingRow);

    const filterMealCol = document.createElement('div');
    filterMealCol.classList.add('col-md-4');

    const filterMealRow = document.createElement('div');
    filterMealRow.classList.add('row');

    const filterMealLabel = document.createElement('label');
    filterMealLabel.setAttribute('for', 'Meal');
    filterMealLabel.classList.add('form-label');
    filterMealLabel.textContent = 'Filter by Meal:';

    const filterMealInput = document.createElement('input');
    filterMealInput.setAttribute('type', 'text');
    filterMealInput.id = 'Meal';
    filterMealInput.placeholder = 'Meal';
    filterMealInput.classList.add('form-control');

    // Append elements to filterMealCol
    filterMealRow.appendChild(filterMealLabel);
    filterMealRow.appendChild(filterMealInput);
    filterMealCol.appendChild(filterMealRow);

    // Append elements to container 3
    container3.appendChild(filterRatingCol);
    container3.appendChild(filterMealCol);

    // Horizontal line
    const hr3 = document.createElement('hr');

    // Container 4
    const container4 = document.createElement('div');
    container4.classList.add('text-center');

    // Card List
    /*
    /USERNAME, rating, mealName, text
    */
    cardDataArray.forEach(cardData => {
        // Create Card List
        const cardList = document.createElement('div');
        cardList.classList.add('card', 'mb-1');

        // Create Card Body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        // Create Card Row
        const cardRow = document.createElement('div');
        cardRow.classList.add('row');

        // Create Card Col 1
        const cardCol1 = document.createElement('div');
        cardCol1.classList.add('col-3');

        // Create Card Title
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = cardData.USERNAME; // Set USERNAME from the data

        // Create Card Col 2
        const cardCol2 = document.createElement('div');
        cardCol2.classList.add('col-1');

        // Create Divider
        const divider = document.createElement('div');
        divider.classList.add('d-flex');
        divider.style.height = '100%';

        // Create Divider Vertical
        const dividerVertical = document.createElement('div');
        dividerVertical.classList.add('vr');

        // Create Card Col 3
        const cardCol3 = document.createElement('div');
        cardCol3.classList.add('col-8', 'text-end');

        // Create Card Text Rating
        const cardTextRating = document.createElement('h5');
        cardTextRating.classList.add('card-text');
        cardTextRating.textContent = '★'.repeat(Math.floor(cardData.RATING)) + '☆'.repeat(10 - Math.floor(cardData.RATING)); // Set rating from the data

        // Create Card Text Meal Name
        const cardTextMealName = document.createElement('p');
        cardTextMealName.classList.add('card-text');
        cardTextMealName.textContent = cardData.MEAL_NAME; // Set mealName from the data

        // Create Card Text Filler
        const cardTextFiller = document.createElement('p');
        cardTextFiller.classList.add('card-text');
        cardTextFiller.textContent = cardData.COMMENT; // Set text from the data

        // Append elements to cardCol1
        cardCol1.appendChild(cardTitle);

        // Append elements to cardCol2
        divider.appendChild(dividerVertical);
        cardCol2.appendChild(divider);

        // Append elements to cardCol3
        cardCol3.appendChild(cardTextRating);
        cardCol3.appendChild(cardTextMealName);
        cardCol3.appendChild(cardTextFiller);

        // Append elements to cardRow
        cardRow.appendChild(cardCol1);
        cardRow.appendChild(cardCol2);
        cardRow.appendChild(cardCol3);

        // Append elements to cardBody
        cardBody.appendChild(cardRow);

        // Append elements to cardList
        cardList.appendChild(cardBody);

        // Append elements to container 4
        container4.appendChild(cardList);
    });


    // Append containers to mainContainer
    document.querySelector('main').appendChild(container1);
    document.querySelector('main').appendChild(hr1);
    document.querySelector('main').appendChild(container2);
    document.querySelector('main').appendChild(hr2);
    document.querySelector('main').appendChild(container3);
    document.querySelector('main').appendChild(hr3);
    document.querySelector('main').appendChild(container4);

    filterMealInput.addEventListener('input', updateList);

    filterRatingInput.addEventListener('input', updateList);

    // Add an event listener to the link
    clearAllAnchor.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default behavior of the anchor tag
    
        filterMealInput.value = '';
        filterRatingInput.value = '';
        updateList();
    });

    function updateList(){
        const meal = filterMealInput.value.toLowerCase().trim();
        const rating = filterRatingInput.value;

        container4.innerHTML = '';

        cardDataArray.filter(card => {
            return meal && rating? card.MEAL_NAME.toLowerCase().trim().indexOf(meal) !== -1 && card.RATING == rating : //This is if both are truthy
                meal? card.MEAL_NAME.toLowerCase().trim().indexOf(meal) !== -1 : //This is if only meal is truthy
                rating? card.RATING == rating : //This is if only rating is truthy
                true; //This would be true if there are no filters
        }).forEach(cardData => {
            // Create Card List
            const cardList = document.createElement('div');
            cardList.classList.add('card', 'mb-1');
    
            // Create Card Body
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
    
            // Create Card Row
            const cardRow = document.createElement('div');
            cardRow.classList.add('row');
    
            // Create Card Col 1
            const cardCol1 = document.createElement('div');
            cardCol1.classList.add('col-3');
    
            // Create Card Title
            const cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = cardData.USERNAME; // Set USERNAME from the data
    
            // Create Card Col 2
            const cardCol2 = document.createElement('div');
            cardCol2.classList.add('col-1');
    
            // Create Divider
            const divider = document.createElement('div');
            divider.classList.add('d-flex');
            divider.style.height = '100%';
    
            // Create Divider Vertical
            const dividerVertical = document.createElement('div');
            dividerVertical.classList.add('vr');
    
            // Create Card Col 3
            const cardCol3 = document.createElement('div');
            cardCol3.classList.add('col-8', 'text-end');
    
            // Create Card Text Rating
            const cardTextRating = document.createElement('h5');
            cardTextRating.classList.add('card-text');
            cardTextRating.textContent = '★'.repeat(Math.floor(cardData.RATING)) + '☆'.repeat(10 - Math.floor(cardData.RATING)); // Set rating from the data
    
            // Create Card Text Meal Name
            const cardTextMealName = document.createElement('p');
            cardTextMealName.classList.add('card-text');
            cardTextMealName.textContent = cardData.MEAL_NAME; // Set mealName from the data
    
            // Create Card Text Filler
            const cardTextFiller = document.createElement('p');
            cardTextFiller.classList.add('card-text');
            cardTextFiller.textContent = cardData.COMMENT; // Set text from the data
    
            // Append elements to cardCol1
            cardCol1.appendChild(cardTitle);
    
            // Append elements to cardCol2
            divider.appendChild(dividerVertical);
            cardCol2.appendChild(divider);
    
            // Append elements to cardCol3
            cardCol3.appendChild(cardTextRating);
            cardCol3.appendChild(cardTextMealName);
            cardCol3.appendChild(cardTextFiller);
    
            // Append elements to cardRow
            cardRow.appendChild(cardCol1);
            cardRow.appendChild(cardCol2);
            cardRow.appendChild(cardCol3);
    
            // Append elements to cardBody
            cardBody.appendChild(cardRow);
    
            // Append elements to cardList
            cardList.appendChild(cardBody);
    
            // Append elements to container 4
            container4.appendChild(cardList);
        });
    }
}