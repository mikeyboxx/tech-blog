// const createCommentFormHandler = async (event) => {
//   event.preventDefault();
//   const formCommentInput = document.querySelector('.form-comment-input')
//   const comment = formCommentInput.value.trim();
//   const postId = formCommentInput.id;

//   if (comment) {
//     try {
//       let response = await fetch('/api/comments', {
//         method: 'POST',
//         body: JSON.stringify({ postId, comment }),
//         headers: { 'Content-Type': 'application/json' },
//       });
//       if (response.ok) {
//   const postId = formCommentInput.id;
//         document.location.replace(`/post/${postId}`);
//       } else {
//         response = await response.json();
//         alert(`Failed to create comment. ${response.message}`);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }
// };

// document
//   .querySelector('.comment-form')
//   .addEventListener('submit', createCommentFormHandler);

  const newCommentFormHandler = async (idx, event) => {   //function for handling new comments
    event.stopPropagation(event);


    const content = document.querySelector(`#newcomment-text${idx}`).value.trim();  //takes text entered into text field
    const postId = $(`#new-comment${idx}`).attr('post-id');  //pulls post-id hiddent in invisible element on each modal
    console.log(content);
    if (content && postId) {
      try{
        let response = await fetch('/api/comments', {   //makes post request to comments api route
          method: 'POST',
          body: JSON.stringify({content, postId}),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        } else {
          response = await response.json();
          alert(`Failed to log in. ${response.message}`);
        }
      }
      catch (err){
        console.log(err);
      }
    }
  };

const submitBtn = document.querySelectorAll('.submit-btn'); //adds event listener to submit button of all post modals. Bind method
    submitBtn.forEach(function(el, idx) {
    el.addEventListener('click', newCommentFormHandler.bind(this, idx)); 
});

