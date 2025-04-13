// Redirect non-admins
const role = sessionStorage.getItem('role');
if (role !== 'admin') {
  window.location.href = 'user-dashboard.html';
}

const productForm = document.getElementById('productForm');
const productsDiv = document.getElementById('products');

productForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = productForm.title.value;
  const price = productForm.price.value;
  const image = productForm.image.value;

  const newProductRef = database.ref('products').push();
  newProductRef.set({
    title: title,
    price: parseFloat(price),
    image: image
  });

  productForm.reset();
});

// Fetch products
database.ref('products').on('value', snapshot => {
  productsDiv.innerHTML = '';
  snapshot.forEach(childSnapshot => {
    const product = childSnapshot.val();
    const key = childSnapshot.key;

    const div = document.createElement('div');
    div.innerHTML = `
      <img src="${product.image}" width="100"><br>
      <b>${product.title}</b> - $${product.price}<br>
      <button onclick="editProduct('${key}', '${product.title}', ${product.price}, '${product.image}')">Edit</button>
      <button onclick="deleteProduct('${key}')">Delete</button>
      <hr>
    `;
    productsDiv.appendChild(div);
  });
});

function editProduct(key, title, price, image) {
  const newTitle = prompt("New Title", title);
  const newPrice = prompt("New Price", price);
  const newImage = prompt("New Image URL", image);

  database.ref('products/' + key).update({
    title: newTitle,
    price: parseFloat(newPrice),
    image: newImage
  });
}

function deleteProduct(key) {
  database.ref('products/' + key).remove();
}
