const createCommentFormHandler = async (event) => {
  event.preventDefault();
  const formCommentInput = document.querySelector('.form-comment-input')
  const comment = formCommentInput.value.trim();
  const postId = formCommentInput.id;

  if (comment) {
    try {
      let response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ postId, comment }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
  const postId = formCommentInput.id;
        document.location.replace(`/post/${postId}`);
      } else {
        response = await response.json();
        alert(`Failed to create comment. ${response.message}`);
      }
    } catch (err) {
      console.log(err);
    }
  }
};

document
  .querySelector('.comment-form')
  .addEventListener('submit', createCommentFormHandler);


