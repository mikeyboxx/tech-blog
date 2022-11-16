const loginFormHandler = async event => {
  event.stopPropagation();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    try{
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
    catch (err){
      console.log(err);
    }
  }
};

document.querySelector('#login-submit').addEventListener('click', loginFormHandler);

document.querySelector("#password-login").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.stopPropagation();
    document.querySelector('#login-submit').click();
  }
});


