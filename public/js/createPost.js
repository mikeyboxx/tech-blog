const createPostFormHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#post-title-create').value.trim();
  const content = document.querySelector('#post-content-create').value.trim();
  
  if (title && content) {
    try{
      let response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        response = await response.json();
        alert(`Failed to create post. ${response.message}`);
      }
    }
    catch (err){
      console.log(err);
    }
  }
};

document
  .querySelector('.post-form')
  .addEventListener('submit', createPostFormHandler);


