const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
try {
  if (username && password) {
    if (document.querySelector('#btn-signup')){
      let response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/');
      } else {
        response = await response.json();
        alert(`Failed to sign up. ${response.message}`);
      }
    } else {
      let response = await fetch('/api/users/login', {
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
    }
  }
} catch (err) {
  console.log(err);
}
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);


