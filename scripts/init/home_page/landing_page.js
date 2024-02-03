function init_landing_page(){
    
    // Create row container
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');

    // Create left column
    const leftColumn = document.createElement('div');
    leftColumn.classList.add('col-lg-5', 'col-sm-12');
    
    // Create content
    const heading = document.createElement('h1');
    heading.classList.add('display-6');
    heading.textContent = "Start your fitness journey today with Food Lovers and achieve the results you've always dreamed of";

    const subheading = document.createElement('h2');
    subheading.classList.add('h6', 'text-muted');
    subheading.textContent = 'Get started now';

    const joinButton = document.createElement('button');
    joinButton.classList.add('btn', 'btn-outline-primary', 'mt-3');
    joinButton.setAttribute('data-bs-toggle', 'modal');
    joinButton.setAttribute('data-bs-target', '#registerModal');
    joinButton.textContent = 'Join Now';

    // Append content to left column
    leftColumn.appendChild(document.createElement('br'));
    leftColumn.appendChild(document.createElement('br'));
    leftColumn.appendChild(heading);
    leftColumn.appendChild(subheading);
    leftColumn.appendChild(document.createElement('br'));
    leftColumn.appendChild(document.createElement('br'));
    leftColumn.appendChild(joinButton);
    leftColumn.appendChild(document.createElement('br'));
    leftColumn.appendChild(document.createElement('br'));

    // Create right column
    const rightColumn = document.createElement('div');
    rightColumn.classList.add('col-md-7', 'col-sm-12');
    rightColumn.style.backgroundImage = "url('./images/landing_page.png')";
    rightColumn.style.backgroundSize = '100% 100%';

    // Append left and right columns to the row
    rowDiv.appendChild(leftColumn);
    rowDiv.appendChild(rightColumn);

    // Append row to the main container
    document.querySelector('main').appendChild(rowDiv);
}