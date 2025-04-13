const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const userId = userCredential.user.uid;
      return database.ref('users/' + userId).once('value');
    })
    .then(snapshot => {
      const role = snapshot.val().role;
      sessionStorage.setItem('role', role);
      sessionStorage.setItem('user', auth.currentUser.uid);

      if (role === 'admin') {
        window.location.href = 'admin-dashboard.html';
      } else {
        window.location.href = 'user-dashboard.html';
      }
    })
    .catch(error => {
      alert('Incorrect email or password! ' + error.message);
    });
});
