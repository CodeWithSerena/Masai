const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = registerForm.email.value;
  const password = registerForm.password.value;
  const role = registerForm.userType.value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return database.ref('users/' + user.uid).set({
        email: email,
        role: role
      });
    })
    .then(() => {
      alert('Registration Successful! Please log in.');
      window.location.href = 'login.html';
    })
    .catch((error) => {
      alert('Error: ' + error.message);
    });
});
