const addNewPostButtonHandler = async (event) => {
  event.preventDefault();

  if (username && password) {
    try {
      let response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/');
      } else {
        response = await response.json();
        alert(`Failed to log in. ${response.message}`);
      }
    } catch (err) {
      console.log(err);
    }
  }
};

document
  .querySelector('.btn-new-post')
  .addEventListener('click', addNewPostButtonHandler);


