function init_navigation(loggedIn){
    if(loggedIn){
        user_navigation();
    }
    else{
        guest_navigation();
    }
}

function user_navigation(underlinePage){
    // Create the navigation container
    const navContainer = document.createElement('nav');
    navContainer.classList.add('container-xxl', 'bd-gutter', 'flex-wrap', 'flex-lg-nowrap');
    navContainer.setAttribute('aria-label', 'Main navigation');

    // Create the logo link
    const logoLink = document.createElement('a');
    logoLink.href = './';
    logoLink.classList.add('navbar-brand', 'p-0', 'me-0', 'me-lg-2', 'd-none', 'd-sm-block');

    // Create the logo image
    const logoImg = document.createElement('img');
    logoImg.src = './images/original_logo_cropped.png';
    logoImg.alt = 'Food Lovers';
    logoImg.style.width = '120px';
    logoImg.style.height = '60px';

    // Append logo image to logo link
    logoLink.appendChild(logoImg);

    // Append logo link to navigation container
    navContainer.appendChild(logoLink);

    // Create offcanvas container
    const offcanvasContainer = document.createElement('div');
    offcanvasContainer.classList.add('offcanvas', 'offcanvas-end', 'flex-grow-1');
    offcanvasContainer.tabIndex = '-1';
    offcanvasContainer.id = 'bdNavbar';
    offcanvasContainer.setAttribute('aria-labelledby', 'bdNavbarOffcanvasLabel');
    offcanvasContainer.setAttribute('data-bs-scroll', 'true');

    // Create offcanvas header
    const offcanvasHeader = document.createElement('div');
    offcanvasHeader.classList.add('offcanvas-header', 'px-4', 'pb-0');

    // Create offcanvas title
    const offcanvasTitle = document.createElement('h5');
    offcanvasTitle.classList.add('offcanvas-title', 'text-white');
    offcanvasTitle.id = 'bdNavbarOffcanvasLabel';
    offcanvasTitle.textContent = 'Bootstrap';

    // Create close button
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.classList.add('btn-close', 'btn-close-white');
    closeButton.setAttribute('data-bs-dismiss', 'offcanvas');
    closeButton.setAttribute('aria-label', 'Close');
    closeButton.setAttribute('data-bs-target', '#bdNavbar');

    // Append offcanvas title and close button to offcanvas header
    offcanvasHeader.appendChild(offcanvasTitle);
    offcanvasHeader.appendChild(closeButton);

    // Create offcanvas body
    const offcanvasBody = document.createElement('div');
    offcanvasBody.classList.add('offcanvas-body', 'p-4', 'pt-0', 'p-lg-0');

    // Create horizontal rule
    const hr = document.createElement('hr');
    hr.classList.add('d-lg-none', 'text-white-50');

    // Create first list inside offcanvas body
    const list1 = document.createElement('ul');
    list1.classList.add('navbar-nav', 'flex-row', 'flex-wrap', 'bd-navbar-nav', 'nav-underline');

    // Create first list items
    const listItem1 = document.createElement('li');
    listItem1.classList.add('nav-item', 'col-auto');
    const link1 = document.createElement('a');
    link1.classList.add(...(underlinePage ? ['nav-link', 'py-2', 'px-0', 'px-lg-2', 'active'] : ['nav-link', 'py-2', 'px-0', 'px-lg-2']));
    link1.setAttribute('aria-current', 'true');
    link1.href = './';
    link1.textContent = 'Home';
    listItem1.appendChild(link1);

    const listItem2 = document.createElement('li');
    listItem2.classList.add('nav-item', 'dropdown', 'col-auto');
    const dropdownButton = document.createElement('button');
    dropdownButton.type = 'button';
    dropdownButton.classList.add('btn', 'btn-link', 'nav-link', 'py-2', 'px-0', 'px-lg-2', 'dropdown-toggle');
    dropdownButton.setAttribute('data-bs-toggle', 'dropdown');
    dropdownButton.setAttribute('aria-expanded', 'false');
    dropdownButton.setAttribute('data-bs-display', 'static');
    dropdownButton.textContent = 'Community';
    const dropdownMenu = document.createElement('ul');
    dropdownMenu.classList.add('dropdown-menu');
    const dropdownHeader = document.createElement('h6');
    dropdownHeader.classList.add('dropdown-header');
    dropdownHeader.textContent = 'Community Forums';
    const dropdownItem1 = document.createElement('li');
    const dropdownLink1 = document.createElement('a');
    dropdownLink1.classList.add('dropdown-item');
    dropdownLink1.href = './ratings.html';
    dropdownLink1.textContent = 'Ratings';
    dropdownItem1.appendChild(dropdownLink1);
    const dropdownItem2 = document.createElement('li');
    const dropdownLink2 = document.createElement('a');
    dropdownLink2.classList.add('dropdown-item');
    dropdownLink2.href = './blog_posts.html';
    dropdownLink2.textContent = 'Blog Posts';
    dropdownItem2.appendChild(dropdownLink2);
    dropdownMenu.appendChild(dropdownHeader);
    dropdownMenu.appendChild(dropdownItem1);
    dropdownMenu.appendChild(dropdownItem2);
    listItem2.appendChild(dropdownButton);
    listItem2.appendChild(dropdownMenu);

    // Create second list inside offcanvas body
    const list2 = document.createElement('ul');
    list2.classList.add('navbar-nav', 'flex-row', 'flex-wrap', 'ms-auto');

    // Create second list items with circular image icon and dropdown
    const listItem3 = document.createElement('li');
    listItem3.classList.add('nav-item', 'dropdown');
    const profileButton = document.createElement('button');
    profileButton.type = 'button';
    profileButton.classList.add('btn', 'btn-link', 'nav-link', 'py-2', 'px-0', 'px-lg-2', 'dropdown-toggle');
    profileButton.setAttribute('data-bs-toggle', 'dropdown');
    profileButton.setAttribute('aria-expanded', 'false');
    const profileIcon = document.createElement('img');
    profileIcon.src = './images/no_photo.png'; // Add your circular profile icon image source
    profileIcon.alt = 'Profile';
    profileIcon.classList.add('rounded-circle');
    profileIcon.style.width = '30px'; // Set the width of the circular icon
    profileIcon.style.height = '30px'; // Set the height of the circular icon
    profileButton.appendChild(profileIcon);

    const dropdownMenu2 = document.createElement('ul');
    dropdownMenu2.classList.add('dropdown-menu', 'dropdown-menu-end');
    dropdownMenu2.setAttribute('aria-labelledby', 'profileDropdown');

    const menuItems = ['Profile', 'Journal', 'Recommendations'];
    const hrefs = ['./profile.html', './journal.html', './recommendations.html'];

    menuItems.forEach((itemText, index) => {
        const menuItem = document.createElement('li');
        const link = document.createElement('a');
        link.classList.add('dropdown-item');
        link.href = hrefs[index]; // Adds appropriate links for each menu item
        link.textContent = itemText;
        menuItem.appendChild(link);
        dropdownMenu2.appendChild(menuItem);
    });

    // Creating a separate logout button as a <li> element
    const logoutMenuItem = document.createElement('li');
    const logoutButton = document.createElement('button');
    logoutButton.classList.add('dropdown-item'); // Apply the same class as links
    logoutButton.textContent = 'Logout';
    logoutButton.addEventListener('click', logout);
    logoutMenuItem.appendChild(logoutButton);

    // Appending the logout button to the dropdown menu
    dropdownMenu2.appendChild(logoutMenuItem);

    async function logout(event) {
        // Prevent the default behavior of the button click
        event.preventDefault();

        const data = await fetchData('/php/init/authentication/logout_user.php');
        console.log("Logging out user:", data);
        location.reload();
    }
    listItem3.appendChild(profileButton);
    listItem3.appendChild(dropdownMenu2);


    // Append list items to lists
    list1.appendChild(listItem1);
    list1.appendChild(listItem2);
    list2.appendChild(listItem3);

    // Append lists to offcanvas body
    offcanvasBody.appendChild(hr);
    offcanvasBody.appendChild(list1);
    offcanvasBody.appendChild(list2);

    // Append offcanvas header and body to offcanvas container
    offcanvasContainer.appendChild(offcanvasHeader);
    offcanvasContainer.appendChild(offcanvasBody);

    // Append offcanvas container to navigation container
    navContainer.appendChild(offcanvasContainer);

    // Append the navigation container to the header tag
    document.querySelector('header').appendChild(navContainer);
}

function guest_navigation(){
    // Create the navigation container
    const navContainer = document.createElement('nav');
    navContainer.classList.add('container-xxl', 'bd-gutter', 'flex-wrap', 'flex-lg-nowrap');
    navContainer.setAttribute('aria-label', 'Main navigation');

    // Create the logo link
    const logoLink = document.createElement('a');
    logoLink.href = './';
    logoLink.classList.add('navbar-brand', 'p-0', 'me-0', 'me-lg-2', 'd-none', 'd-sm-block');

    // Create the logo image
    const logoImg = document.createElement('img');
    logoImg.src = './images/original_logo_cropped.png';
    logoImg.alt = 'Food Lovers';
    logoImg.style.width = '120px';
    logoImg.style.height = '60px';

    // Append logo image to logo link
    logoLink.appendChild(logoImg);

    // Append logo link to navigation container
    navContainer.appendChild(logoLink);

    // Create offcanvas container
    const offcanvasContainer = document.createElement('div');
    offcanvasContainer.classList.add('offcanvas', 'offcanvas-end', 'flex-grow-1');
    offcanvasContainer.tabIndex = '-1';
    offcanvasContainer.id = 'bdNavbar';
    offcanvasContainer.setAttribute('aria-labelledby', 'bdNavbarOffcanvasLabel');
    offcanvasContainer.setAttribute('data-bs-scroll', 'true');

    // Create offcanvas header
    const offcanvasHeader = document.createElement('div');
    offcanvasHeader.classList.add('offcanvas-header', 'px-4', 'pb-0');

    // Create offcanvas title
    const offcanvasTitle = document.createElement('h5');
    offcanvasTitle.classList.add('offcanvas-title', 'text-white');
    offcanvasTitle.id = 'bdNavbarOffcanvasLabel';
    offcanvasTitle.textContent = 'Bootstrap';

    // Create close button
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.classList.add('btn-close', 'btn-close-white');
    closeButton.setAttribute('data-bs-dismiss', 'offcanvas');
    closeButton.setAttribute('aria-label', 'Close');
    closeButton.setAttribute('data-bs-target', '#bdNavbar');

    // Append offcanvas title and close button to offcanvas header
    offcanvasHeader.appendChild(offcanvasTitle);
    offcanvasHeader.appendChild(closeButton);

    // Create offcanvas body
    const offcanvasBody = document.createElement('div');
    offcanvasBody.classList.add('offcanvas-body', 'p-4', 'pt-0', 'p-lg-0');



    // Create first list inside offcanvas body
    const list1 = document.createElement('ul');
    list1.classList.add('navbar-nav', 'flex-row', 'flex-wrap', 'bd-navbar-nav', 'nav-underline');

    // Create first list items
    const listItem1 = document.createElement('li');
    listItem1.classList.add('nav-item', 'col-auto');
    const link1 = document.createElement('a');
    link1.classList.add('nav-link', 'py-2', 'px-0', 'px-lg-2', 'active');
    link1.setAttribute('aria-current', 'true');
    link1.href = './';
    link1.textContent = 'Home';
    listItem1.appendChild(link1);

    // Create second list inside offcanvas body
    const list2 = document.createElement('ul');
    list2.classList.add('navbar-nav', 'flex-row', 'flex-wrap', 'ms-auto');

    // Create second list items
    const listItem3 = document.createElement('li');
    listItem3.classList.add('nav-item');
    const loginButton = document.createElement('button');
    loginButton.type = 'button';
    loginButton.classList.add('btn', 'btn-link', 'nav-link', 'py-2', 'px-0', 'px-lg-2');
    loginButton.setAttribute('data-bs-toggle', 'modal');
    loginButton.setAttribute('data-bs-target', '#loginModal');
    loginButton.textContent = 'Login';
    listItem3.appendChild(loginButton);

    const listItem4 = document.createElement('li');
    listItem4.classList.add('nav-item', 'py-1', 'py-lg-1', 'col-auto');
    const verticalBar = document.createElement('div');
    verticalBar.classList.add('vr', 'd-flex', 'h-100', 'mx-2', 'text-black');

    listItem4.appendChild(verticalBar);

    const listItem5 = document.createElement('li');
    listItem5.classList.add('nav-item');
    const registerButton = document.createElement('button');
    registerButton.type = 'button';
    registerButton.classList.add('btn', 'btn-link', 'nav-link', 'py-2', 'px-0', 'px-lg-2');
    registerButton.setAttribute('data-bs-toggle', 'modal');
    registerButton.setAttribute('data-bs-target', '#registerModal');
    registerButton.textContent = 'Register';
    listItem5.appendChild(registerButton);

    // Append list items to lists
    list1.appendChild(listItem1);
    list2.appendChild(listItem3);
    list2.appendChild(listItem4);
    list2.appendChild(listItem5);

    // Append lists to offcanvas body
    offcanvasBody.appendChild(list1);
    offcanvasBody.appendChild(list2);

    // Append offcanvas header and body to offcanvas container
    offcanvasContainer.appendChild(offcanvasHeader);
    offcanvasContainer.appendChild(offcanvasBody);

    // Append offcanvas container to navigation container
    navContainer.appendChild(offcanvasContainer);

    // Append the navigation container to the header tag
    document.querySelector('header').appendChild(navContainer);

}
