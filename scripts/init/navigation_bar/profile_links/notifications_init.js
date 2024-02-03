function createNotificationForm(phoneNumber, data){
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
    <div class="card-header">Notifications</div>
    <div class="card-body">
        <div class="row">
        <div class="card-header">
            Push Notifications
            <div class="form-check form-switch">
                <input class="form-check-input" id="smsToggleSwitch" type="checkbox" ${data.CAN_NOTIFY_USER ? 'checked' : ''}>
                <label class="form-check-label" for="smsToggleSwitch"></label>
            </div>
        </div>
        <div class="card-body">
            <form id="notificationForm">
                <!-- Form Group (default SMS number)-->
                <div class="mb-3">
                    <label class="small mb-1" for="inputNotificationSms">Default SMS number</label>
                    <input class="form-control" id="inputNotificationSms" type="tel" value="${phoneNumber}" disabled>
                </div>
                <!-- Form Group (SMS updates checkboxes)-->
                <div class="mb-0">
                    <label class="small mb-2">Choose which types of push notifications you receive</label>
                    <div class="form-check mb-2">
                        <input class="form-check-input" id="checkSmsComment" type="checkbox" ${data.IS_NOTIFIED_BLOG? 'checked' : ''}>
                        <label class="form-check-label" for="checkSmsComment">Someone comments on your post</label>
                    </div>
                    <div class="form-check mb-2">
                        <input class="form-check-input" id="checkSmsGroup" type="checkbox" ${data.IS_NOTIFIED_JOURNAL? 'checked' : ''}>
                        <label class="form-check-label" for="checkSmsGroup">Occasional reminders to update your journal</label>
                    </div>
                </div>
                <div class="row">
                    <button class="btn btn-primary" type="submit">Save changes</button>
                </div>
            </form>
        </div>

        </div>
    </div>    
    `;
    formContainer.appendChild(formCard);
    container.appendChild(formContainer);
  
    // Append the container to the main tag
    document.querySelector('main').appendChild(container);

    document.getElementById('notificationForm').addEventListener('submit', async function(event){
        event.preventDefault();
        console.log("Submitted");

        const canNotifyUser = document.getElementById('smsToggleSwitch').checked;
        const smsNumber = document.getElementById('inputNotificationSms').value;
        const receiveCommentNotifications = document.getElementById('checkSmsComment').checked;
        const receiveGroupNotifications = document.getElementById('checkSmsGroup').checked;

        // Do something with the values, for example, log them to the console
        console.log('Default SMS number:', smsNumber);
        console.log('Receive Blog Notifications:', receiveCommentNotifications);
        console.log('Receive Journal Notifications:', receiveGroupNotifications);

        //Save options

        const requestBody = {
            CAN_NOTIFY_USER: canNotifyUser? 1: 0,
            IS_NOTIFIED_BLOG: receiveCommentNotifications? 1: 0,
            IS_NOTIFIED_JOURNAL: receiveGroupNotifications? 1: 0
        };
        
        console.log(requestBody);
        const data = await fetchDataWithBody('/php/init/profile_links/update_notification_data.php', requestBody);
        console.log(data);
  
        if(data.isUpdated){
            location.reload();
        }
        else{
            alert('Update didn\'t go through');
        }
    });
}