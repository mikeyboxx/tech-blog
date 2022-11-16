const signupFormHandler = async event => {
  event.stopPropagation();

  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  console.log( username,  password);

  if (username  && password) {
    try{
      let response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username,  password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        // response = await response.json();
        alert(`Failed to log in. ${response.message}`);
      }
    }
    catch (err){
      console.log(err);
    }
  }
};

document.querySelector('#signup-submit').addEventListener('click', signupFormHandler);

document.querySelector("#password-signup").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.stopPropagation();
    document.querySelector("#signup-submit").click();
  }
});
