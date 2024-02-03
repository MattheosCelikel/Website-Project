/*
/When finished making individual components, we need to
/make a call to get necessary data from backend
/
*/

async function master_function(){
    let data = await fetchData('/php/init/authentication/check_user_login.php');
    const isLoggedIn = data.isValidLogin;
    console.log(isLoggedIn);    

    const currentPathname = window.location.pathname;
    switch (currentPathname) {
        case '/':
            console.log('Home page');
            init_navigation(isLoggedIn);
            init_spinner();
            init_register_modal();
            init_login_modal();
            init_landing_page();
            break;
        case '/ratings.html':
            console.log('Ratings page');
            if(isLoggedIn){
                init_navigation(isLoggedIn);
                init_spinner();
                //static test data
                let data = await fetchData('/php/init/community/get_all_ratings.php');
                console.log(data);
                var sum = 0;
                var totalReviews = data.length;
                data.forEach(data =>{
                    data.RATING = parseInt(data.RATING, 10);
                    sum += data.RATING;
                });
                init_ratings(data, sum / totalReviews, sum / totalReviews, totalReviews);
                init_rating_modal();
            }
            else{
                window.location.href = './';
            }
            
            break;
        case '/blog_posts.html':
            console.log('Blog posts page');
            if(isLoggedIn){
                init_navigation(isLoggedIn);
                init_spinner();
                let data = await fetchData('/php/init/community/get_all_blog_posts.php');
                console.log(data);

                blog_post_init(data);
                init_blog_post_modal();
            }
            else{
                window.location.href = './';
            }
            break;
        case '/profile.html':
            console.log('Profile page');
            if(isLoggedIn){
                init_navigation(isLoggedIn);
                init_spinner();

                let data = await fetchData('/php/init/profile_links/get_profile.php');
                console.log(data);

                createProfileForm(data);
            }
            else{
                window.location.href = './';
            }
            break;
        case '/metrics.html':
            console.log('Metric page');
            if(isLoggedIn){
                init_navigation(isLoggedIn);
                init_spinner();
                let activityData = await fetchData('/php/init/profile_links/get_activity_list.php');
                console.log(activityData);
                let metricData = await fetchData('/php/init/profile_links/get_metric_data.php');
                console.log(metricData);

                createMetricForm(metricData, activityData);
            }
            else{
                window.location.href = './';
            }
            break;
        case '/journal.html':
            console.log('Journal page');
            if(isLoggedIn){
                const journalTestData = [
                    {
                        foodName: 'testFood1',
                        calories: 24
                    },
                    {
                        foodName: 'testFood2',
                        calories: 253
                    },
                    {
                        foodName: 'testFood3',
                        calories: 0
                    }
                ];

                init_navigation(isLoggedIn);
                init_spinner();
                init_journal_modal();
                createJournalForm(journalTestData, journalTestData, journalTestData, journalTestData);
            }
            else{
                window.location.href = './';
            }
            break;
        case '/recommendations.html':
            console.log('Recommendations page');
            if(isLoggedIn){
                init_navigation(isLoggedIn);
                init_spinner();
                createRecommendationForm();
            }
            else{
                window.location.href = './';
            }
            break;
        case '/notifications.html':
            console.log('Notifications page');
            if(isLoggedIn){
                init_navigation(isLoggedIn);
                init_spinner();

                let data = await fetchData('/php/init/profile_links/get_profile.php');
                console.log(data);
                let notificationData = await fetchData('/php/init/profile_links/get_notification_data.php');
                console.log(notificationData);

                createNotificationForm(data.PHONE_NUMBER, notificationData);
            }
            else{
                window.location.href = './';
            }
            break;
        case '/test.html':
            console.log('Test page');
            if(isLoggedIn){
                init_navigation(isLoggedIn);
                init_spinner();
                init_register_modal();
                init_login_modal();
                init_landing_page();
            }
            else{
                window.location.href = './';
            }
            break;
        default:
            console.log('Unknown page');
            window.location.href = './';
        break;
    };
}

master_function();

