function blog_post_init(blogPostsData){
    // Header Section
    const headerSection = document.createElement('div');
    headerSection.classList.add('text-center');
    
    const headerTitle = document.createElement('h3');
    headerTitle.textContent = 'Blog Posts';
    
    const addPostButton = document.createElement('p');
    addPostButton.classList.add('btn', 'btn-outline-dark');
    addPostButton.style.borderColor = 'transparent';
    addPostButton.setAttribute('data-bs-toggle', 'modal');
    addPostButton.setAttribute('data-bs-target', '#blogPostModal');
    addPostButton.innerHTML = '<b class="font-weight-bold"><</b> Add new Post';
    
    headerSection.appendChild(headerTitle);
    headerSection.appendChild(addPostButton);
    
    document.querySelector('main').appendChild(headerSection);
    
    // Horizontal Line
    const hrElement = document.createElement('hr');
    document.querySelector('main').appendChild(hrElement);
    
    const overallBlogPostContainer = document.createElement('blogpostcontainer');

    // Loop through the array of data and create blog post elements
    blogPostsData.forEach(data => {
        // Blog Post Section (Generated per data set)
        const blogPostContainer = document.createElement('div');
        blogPostContainer.classList.add('row', 'mb-2');

        const emptyColumn1 = document.createElement('div');
        emptyColumn1.classList.add('col-1', 'col-sm-3');
        const emptyColumn2 = document.createElement('div');
        emptyColumn2.classList.add('col-1', 'col-sm-3');
        const blogPostColumn = document.createElement('div');
        blogPostColumn.classList.add('col-10', 'col-sm-6');
    
        const blogPostCard = document.createElement('div');
        blogPostCard.classList.add('card');
    
        const imageLink = './images/blog_posts/' + getRandomNumber(1, 10) +'.jpg';
        const blogPostImage = document.createElement('img');
        blogPostImage.src = imageLink;
        blogPostImage.classList.add('img-thumbnail', 'img-fluid');
        blogPostImage.alt = '...';
    
        const blogPostCardBody = document.createElement('div');
        blogPostCardBody.classList.add('card-body');
    
        const blogPostTitle = document.createElement('h5');
        blogPostTitle.classList.add('card-title');
        blogPostTitle.textContent = data.BLOG_TITLE;
    
        const blogPostText = document.createElement('p');
        blogPostText.classList.add('card-text', 'text-truncate');
        blogPostText.textContent = data.USER_TEXT;
    
        const blogPostAuthor = document.createElement('p');
        blogPostAuthor.classList.add('card-text', 'text-body-secondary');
        blogPostAuthor.innerHTML = `<small>Made by ${data.USERNAME}</small>`;
    
        const viewPostButton = document.createElement('button');
        viewPostButton.type = 'button';
        viewPostButton.classList.add('btn', 'btn-primary');
        viewPostButton.textContent = 'View the Blog Post';
    
        blogPostCardBody.appendChild(blogPostTitle);
        blogPostCardBody.appendChild(blogPostText);
        blogPostCardBody.appendChild(blogPostAuthor);
        blogPostCardBody.appendChild(viewPostButton);
    
        blogPostCard.appendChild(blogPostImage);
        blogPostCard.appendChild(blogPostCardBody);
    
        blogPostColumn.appendChild(blogPostCard);
        blogPostContainer.appendChild(emptyColumn1);
        blogPostContainer.appendChild(blogPostColumn);
        blogPostContainer.appendChild(emptyColumn2);
        overallBlogPostContainer.appendChild(blogPostContainer); 
        
        viewPostButton.addEventListener('click', async function(){
            //Individual blog page is made here with parameters
            console.log("It's working");
            console.log(data.BLOG_ID);
            console.log(data.BLOG_TITLE);
            console.log(data.USER_TEXT);
            console.log(data.USERNAME);
            console.log(imageLink);
            console.log("Post data: " + data);
            
            //Removes body of the page
            document.querySelector('main').innerHTML = '';
            console.log("It got removed");
            //Creates detailed blogpost
            await detailed_blog_page_init(blogPostsData, data.BLOG_TITLE, data.USER_TEXT, data.USERNAME, imageLink, data.BLOG_ID);
        });
    });

    document.querySelector('main').appendChild(overallBlogPostContainer); 
}

async function detailed_blog_page_init(originalBlogPostsData, title, text, author, image, blogId){
        
    const main = document.querySelector('main');
    console.log("This is the author: " + author);
    
    // Row 1
    const row1 = document.createElement('div');
    row1.classList.add('row', 'mb-5');
    row1.innerHTML = `
    <div class="col-1 col-sm-3"></div>
    <div class="col-10 col-sm-6">
        <button class="btn btn-outline-dark" id="backbutton" style="border-color: transparent;">
        Back to Blog Post Overview
        </button>
    </div>
    <div class="col-1 col-sm-3"></div>
    `;

    // Row 2 (Title)
    const row2 = document.createElement('div');
    row2.classList.add('text-center', 'mb-2');
    row2.innerHTML = `<h1>${title}</h1>`;

    // Row 3 (Photo)
    const row3 = document.createElement('div');
    row3.classList.add('row', 'mb-4', 'text-center');
    row3.innerHTML = `
    <div class="col-1 col-sm-3"></div>
    <div class="col-10 col-sm-6">
        <img src="${image}" alt="A random food photo">
    </div>
    <div class="col-1 col-sm-3"></div>
    `;

    // Row 4 (Full text of the blog)
    const row4 = document.createElement('div');
    row4.classList.add('row', 'mb-4');
    row4.innerHTML = `
    <div class="col-1 col-sm-3"></div>
    <div class="col-10 col-sm-6">
        <p>${text}</p>
    </div>
    <div class="col-1 col-sm-3"></div>
    `;

    // Row 5 (Add a comment section)
    const row5 = document.createElement('div');
    row5.classList.add('row', 'mb-4');
    row5.innerHTML = `
    <div class="col-1 col-sm-3"></div>
    <div class="col-10 col-sm-6">
        <div class="row mb-2">
        <div class="col-2 col-lg-1">
            <img src="./images/no_photo.png" alt="Profile" class="rounded-circle" style="width: 40px; height: 40px;">
        </div>
        <div class="col-lg-11 col-10">
            <textarea id="commentTextarea" class="form-control" rows="2" placeholder="Add a comment..." required></textarea>
        </div>
        </div>
        <button id="shareButton" class="btn btn-sm btn-primary pull-right" type="submit"><i class="fa fa-pencil fa-fw"></i> Share</button>
    </div>
    <div class="col-1 col-sm-3"></div>
    `;

    // Row 6 (List of comments)
    const row6 = document.createElement('commentlist');

    //Fetch comments and append to commentlist
    const requestBody = {
        BLOG_ID: blogId
    };

    let data = await fetchDataWithBody('/php/init/community/get_blog_post_comments.php', requestBody);
    console.log(data);
    if(data){
        data.forEach(commentData => {
            const user = commentData.USERNAME;
            const date = commentData.BLOG_DATE;
            const text = commentData.BLOG_TEXTS;
    
            console.log(commentData);
    
            const comment = document.createElement('comment');
            comment.classList.add('row');
            comment.innerHTML = `
            <div class="col-1 col-sm-3"></div>
            <div class="col-10 col-sm-6">
                <div class="row mb-2">
                    <div class="col-2 col-lg-1">
                    <img src="./images/no_photo.png" alt="Profile" class="rounded-circle" style="width: 40px; height: 40px;">
                    </div>
                    <div class="col-lg-11 col-10">
                    <div class="row">
                        <small class="small"><b>${user}</b> ${date}</small>
                    </div>
                    <div class="row">
                        <p>${text}</p>
                    </div>
                    </div>
                </div>
            </div>
            `;
            row6.appendChild(comment);
        });
    }


    // Append rows to main
    main.appendChild(row1);
    main.appendChild(row2);
    main.appendChild(row3);
    main.appendChild(row4);
    main.appendChild(row5);
    main.appendChild(row6);

    document.getElementById('backbutton').addEventListener('click', function(){
        redo_blog_page_init(originalBlogPostsData);
    });

    // Add an event listener to the "Share" button
    document.getElementById('shareButton').addEventListener('click', async function () {
        // Get the input data
        const commentText = document.getElementById('commentTextarea').value;
        //If it's truthy then register the comment
        if(commentText && commentText.trim()){
            //User is in the session to grab from
            const date = new Date();
            const currentDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
            console.log(commentText);

            //Fetch comments and append to commentlist
            const requestBody = {
                BLOG_DATE: currentDate,
                BLOG_TEXT: commentText,
                BLOG_ID: blogId
            };

            let detailedData = await fetchDataWithBody('/php/init/community/insert_blog_post_comment.php', requestBody);
            console.log(detailedData);

            if(detailedData){
                //Assuming that it works past this point, it will redo the comment list:
                
                row6.innerHTML = '';

                let data = await fetchDataWithBody('/php/init/community/get_blog_post_comments.php', requestBody);
                console.log(data);
                if(data){
                    data.forEach(commentData => {
                        const user = commentData.USERNAME;
                        const date = commentData.BLOG_DATE;
                        const text = commentData.BLOG_TEXTS;
                
                        console.log(commentData);
                
                        const comment = document.createElement('comment');
                        comment.classList.add('row');
                        comment.innerHTML = `
                        <div class="col-1 col-sm-3"></div>
                        <div class="col-10 col-sm-6">
                            <div class="row mb-2">
                                <div class="col-2 col-lg-1">
                                <img src="./images/no_photo.png" alt="Profile" class="rounded-circle" style="width: 40px; height: 40px;">
                                </div>
                                <div class="col-lg-11 col-10">
                                <div class="row">
                                    <small class="small"><b>${user}</b> ${date}</small>
                                </div>
                                <div class="row">
                                    <p>${text}</p>
                                </div>
                                </div>
                            </div>
                        </div>
                        `;
                        row6.appendChild(comment);
                        document.getElementById('commentTextarea').value = '';
        });
    }
            }

        }
        // Refresh the page (you might want to use a more specific method based on your needs)
        //location.reload();
    });

}

function redo_blog_page_init(blogPostsData){
    //Removes body of the page
    document.querySelector('main').innerHTML = '';
    blog_post_init(blogPostsData);
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}