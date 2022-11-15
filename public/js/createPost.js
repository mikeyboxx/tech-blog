// const createPostFormHandler = async (event) => {
//   event.preventDefault();
//   const title = document.querySelector('#post-title-create').value.trim();
//   const content = document.querySelector('#post-content-create').value.trim();
  
//   if (title && content) {
//     try{
//       let response = await fetch('/api/posts', {
//         method: 'POST',
//         body: JSON.stringify({ title, content }),
//         headers: { 'Content-Type': 'application/json' },
//       });
//       if (response.ok) {
//         document.location.replace('/dashboard');
//       } else {
//         response = await response.json();
//         alert(`Failed to create post. ${response.message}`);
//       }
//     }
//     catch (err){
//       console.log(err);
//     }
//   }
// };

// document
//   .querySelector('.post-form')
//   .addEventListener('submit', createPostFormHandler);

  const newPostFormHandler = async event => {
    event.preventDefault();

    const content = document.querySelector('#newpost-text').value.trim();
    const title = document.querySelector('#newpost-title').value.trim();
    // console.log(contents);

    if (content) {
      try{
        let response = await fetch('/api/posts', {
          method: 'POST',
          body: JSON.stringify({title, content}),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          document.location.replace('/');
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

  document.querySelector('#newpost-submit').addEventListener('click', newPostFormHandler);


