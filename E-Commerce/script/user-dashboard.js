// Redirect non-users
const role = sessionStorage.getItem('role');
if (role !== 'user') {
  window.location.href = 'admin-dashboard.html';
}

const productsDiv = document.getElementById('products');

database.ref('products').on('value', snapshot => {
  productsDiv.innerHTML = '';
  snapshot.forEach(childSnapshot => {
    const product = childSnapshot.val();

    const div = document.createElement('div');
    div.innerHTML = `
      <img src="${product.image}" width="100"><br>
      <b>${product.title}</b> - $${product.price}
      <hr>
    `;
    productsDiv.appendChild(div);
  });
});
