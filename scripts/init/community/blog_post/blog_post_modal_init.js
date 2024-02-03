function init_blog_post_modal() {
    // Create modal container
    const modalContainer = document.createElement('div');
  
    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
  
    const modalTitle = document.createElement('h5');
    modalTitle.classList.add('modal-title');
    modalTitle.textContent = 'Blog Post';
  
    const closeButton = document.createElement('button');
    closeButton.setAttribute('type', 'button');
    closeButton.classList.add('btn-close');
    closeButton.setAttribute('data-bs-dismiss', 'modal');
    closeButton.setAttribute('aria-label', 'Close');
  
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);
  
    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
  
    const blogPostFormContainer = document.createElement('form');
    blogPostFormContainer.setAttribute('id', 'blogPostForm');
  
    const blogPostTitleLabel = document.createElement('label');
    blogPostTitleLabel.setAttribute('for', 'blogPostTitleInput');
    blogPostTitleLabel.textContent = 'Blog Post Title:';
  
    const blogPostTitleInput = document.createElement('input');
    blogPostTitleInput.setAttribute('type', 'text');
    blogPostTitleInput.setAttribute('id', 'blogPostTitleInput');
    blogPostTitleInput.classList.add('form-control');
    blogPostTitleInput.setAttribute('required', 'true');
  
    const commentLabel = document.createElement('label');
    commentLabel.setAttribute('for', 'commentTextarea');
    commentLabel.textContent = 'Blog Post Text:';
  
    const commentTextarea = document.createElement('textarea');
    commentTextarea.setAttribute('id', 'commentTextarea');
    commentTextarea.classList.add('form-control');
    commentTextarea.setAttribute('required', 'true');
  
    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.classList.add('btn', 'btn-primary');
    submitButton.textContent = 'Submit';
  
    blogPostFormContainer.appendChild(blogPostTitleLabel);
    blogPostFormContainer.appendChild(blogPostTitleInput);
    blogPostFormContainer.appendChild(commentLabel);
    blogPostFormContainer.appendChild(commentTextarea);
    blogPostFormContainer.appendChild(submitButton);
  
    modalBody.appendChild(blogPostFormContainer);
  
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
  
    const modalDialog = document.createElement('div');
    modalDialog.classList.add('modal-dialog');
    modalDialog.appendChild(modalContent);
  
    const blogPostModal = document.createElement('div');
    blogPostModal.classList.add('modal', 'fade');
    blogPostModal.setAttribute('id', 'blogPostModal');
    blogPostModal.setAttribute('tabindex', '-1');
    blogPostModal.setAttribute('aria-labelledby', 'exampleModalLabel');
    blogPostModal.setAttribute('aria-hidden', 'true');
    blogPostModal.appendChild(modalDialog);
  
    modalContainer.appendChild(blogPostModal);
  
    // Append modal container to the body
    document.body.appendChild(modalContainer);
  
    // Get the blogPost form and add submit event listener
    const blogPostForm = document.getElementById('blogPostForm');
    blogPostForm.addEventListener('submit', async function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();
  
        // Check if the form is valid
        if (blogPostForm.checkValidity()) {
            // Form is valid, you can proceed with blogPost logic here
            const blogPostTitle = blogPostTitleInput.value;
            const comment = commentTextarea.value;
  
            console.log('Blog Post Title:', blogPostTitle);
            console.log('Comment:', comment);
  

            const requestBody = {
                BLOG_TITLE: blogPostTitle,
                USER_TEXT: comment
            };
            
            console.log(requestBody);
            const data = await fetchDataWithBody('/php/init/community/insert_blog_post.php', requestBody);
            console.log(data);
    
            if(data.isCreated){
                location.reload();
            }
            else{
                alert('Submission didn\'t go through');
            }
            // Additional logic for handling the blogPost
        } else {
            // Form is invalid, display specific feedback messages
            // ... (similar to the existing logic for loginForm)
        }
    });
  }
  