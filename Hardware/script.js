const items = [
  // Power Tools
  { name: 'Hammer Drill', price: 1200, img: 'images/1.png', description: 'Perfect for drilling into hard surfaces like concrete and masonry.', category: 'Power Tools' },
  { name: 'Cordless Drill', price: 1600, img: 'images/2.png', description: 'Portable and convenient for general home repairs and DIY projects.', category: 'Power Tools' },
  { name: 'Impact Drill', price: 1800, img: 'images/3.png', description: 'Delivers high torque for driving screws and bolts.', category: 'Power Tools' },
  { name: 'Circular Saw', price: 2200, img: 'images/4.png', description: 'Ideal for making straight cuts in wood and sheet materials.', category: 'Power Tools' },
  { name: 'Jigsaw', price: 1400, img: 'images/5.png', description: 'Best for cutting curves in wood or plastic.', category: 'Power Tools' },
  { name: 'Table Saw', price: 2500, img: 'images/6.png', description: 'Powerful tool for straight cuts and woodworking projects.', category: 'Power Tools' },
  { name: 'Cutting Saw', price: 2100, img: 'images/7.png', description: 'For slicing metal pipes, rods, and heavy materials.', category: 'Power Tools' },
  { name: 'Sabre Saw', price: 1950, img: 'images/8.png', description: 'Versatile for demolition and rough cutting.', category: 'Power Tools' },
  { name: 'Rotary Hammer', price: 2300, img: 'images/9.png', description: 'Heavy-duty tool for drilling hard concrete and stone.', category: 'Power Tools' },
  { name: 'Angle Grinder', price: 1300, img: 'images/angel_grinder.png', description: 'Used for grinding, cutting, and polishing.', category: 'Power Tools' },

  // Paint
  { name: 'Latex Paint - White', price: 850, img: 'images/latex_paint.png', description: 'Water-based, interior wall paint.', category: 'Paint' },
  { name: 'Latex Paint - Blue', price: 860, img: 'images/blue.png', description: 'Great for cool tones in interiors.', category: 'Paint' },
  { name: 'Oil-Based Paint - Black', price: 950, img: 'images/oildbase.png', description: 'Durable finish for metal and wood.', category: 'Paint' },
  { name: 'Primer', price: 500, img: 'images/primer.png', description: 'Base layer for better paint adhesion.', category: 'Paint' },
  { name: 'Paint Thinner', price: 250, img: 'images/15.png', description: 'Used for cleaning and thinning oil paint.', category: 'Paint' },
  { name: 'Spray Paint - Red', price: 320, img: 'images/16.png', description: 'Fast-drying, good for small surfaces.', category: 'Paint' },

  // Machinery
  { name: 'Concrete Mixer', price: 15000, img: 'images/17.png', description: 'Used to combine cement, sand, and water.', category: 'Machinery' },
  { name: 'Mini Excavator', price: 120000, img: 'images/18.png', description: 'Compact machine for digging and demolition.', category: 'Machinery' },
  { name: 'Plate Compactor', price: 18000, img: 'images/19.png', description: 'Used for compacting soil and gravel.', category: 'Machinery' },
  { name: 'Power Trowel', price: 30000, img: 'images/20.png', description: 'Smooths and finishes concrete surfaces.', category: 'Machinery' },
  { name: 'Scaffolding Set', price: 10000, img: 'images/21.png', description: 'Steel structure for construction support.', category: 'Machinery' },

  // Wire and Cables
  { name: 'Electrical Wire 2mm', price: 25, img: 'images/22.png', description: 'Used for light fixtures and outlets.', category: 'Wire and Cables' },
  { name: 'Coaxial Cable', price: 40, img: 'images/23.png', description: 'Used for internet and TV connections.', category: 'Wire and Cables' },
  { name: 'Extension Cord 5m', price: 300, img: 'images/24.png', description: 'Provides extra reach for electronics.', category: 'Wire and Cables' },
  { name: 'HDMI Cable', price: 350, img: 'images/25.png', description: 'For transferring video/audio to screens.', category: 'Wire and Cables' },
  { name: 'Flexible Conduit 10m', price: 600, img: 'images/26.png', description: 'Protects wires and makes routing easier.', category: 'Wire and Cables' },

  // Concreting & Masonry
  { name: 'Cement Bag 40kg', price: 260, img: 'images/27.png', description: 'Portland cement for general construction.', category: 'Concreting & Masonry' },
  { name: 'Concrete Block', price: 20, img: 'images/28.png', description: 'Used in foundations and walls.', category: 'Concreting & Masonry' },
  { name: 'Rebar 10mm x 6m', price: 120, img: 'images/29.png', description: 'Steel reinforcement for concrete.', category: 'Concreting & Masonry' },
  { name: 'Trowel', price: 150, img: 'images/30.png', description: 'Tool for smoothing and finishing concrete.', category: 'Concreting & Masonry' }
];

const cart = [];
let profileSet = false;
let userProfile = { name: '', email: '' };
let selectedCategory = 'All';

function renderCategoryButtons() {
  const categories = ['All', ...new Set(items.map(item => item.category))];
  const categoryButtonsDiv = document.getElementById('category-buttons');
  categoryButtonsDiv.innerHTML = '';

  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = cat;
    btn.onclick = () => {
      selectedCategory = cat;
      renderItems();
    };
    categoryButtonsDiv.appendChild(btn);
  });
}

function renderItems() {
  const itemsDiv = document.getElementById('items');
  itemsDiv.innerHTML = '';
  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter(item => item.category === selectedCategory);

  filteredItems.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}" style="width:100px;"><br>
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <p>₱${item.price}</p>
      <input type="number" min="1" value="1" id="qty-${items.indexOf(item)}" style="width: 50px" />
      <button onclick="addToCart(${items.indexOf(item)})">Add to Cart</button>
    `;
    itemsDiv.appendChild(div);
  });
}

function addToCart(index) {
  const qty = parseInt(document.getElementById(`qty-${index}`).value);
  const item = items[index];
  const cartItem = cart.find(ci => ci.name === item.name);
  if (!profileSet) {
    showProfileModal();
    return;
  }
  if (cartItem) {
    cartItem.qty += qty;
  } else {
    cart.push({ ...item, qty });
  }
  renderCart();
}

function renderCart() {
  const cartDiv = document.getElementById('cart');
  const totalDiv = document.getElementById('total');
  cartDiv.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    const sub = item.qty * item.price;
    total += sub;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span>${item.name} x ${item.qty} = ₱${sub}</span>
      <button onclick="removeCartItem(${index})">Remove</button>
    `;
    cartDiv.appendChild(div);
  });
  totalDiv.innerText = `Total: ₱${total}`;
}

function removeCartItem(index) {
  cart.splice(index, 1);
  renderCart();
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
  if (id === "receipt-modal") {
    cart.length = 0;
    renderCart();
  }
}

document.getElementById("profile-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;

  if (username.trim() === "" || email.trim() === "") {
    alert("Please fill in both fields.");
    return;
  }

  userProfile.name = username;
  userProfile.email = email;
  profileSet = true;

  const output = `
    <p><strong>Name:</strong> ${username}</p>
    <p><strong>Email:</strong> ${email}</p>
  `;
  document.getElementById("profile-output").innerHTML = output;
  document.getElementById("profile-modal").style.display = "none";
});

function showProfileModal() {
  if (!profileSet) {
    document.getElementById("profile-modal").style.display = "block";
  }
}

function handleCheckout() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  const previewDiv = document.getElementById("order-preview");
  previewDiv.innerHTML = '';
  let subtotal = 0;

  cart.forEach(item => {
    const sub = item.qty * item.price;
    subtotal += sub;
    previewDiv.innerHTML += `<p>${item.name} x ${item.qty} = ₱${sub}</p>`;
  });

  const tax = subtotal * 0.12;
  const total = subtotal + tax;

  previewDiv.innerHTML += `<strong>Subtotal: ₱${subtotal}</strong><br>`;
  previewDiv.innerHTML += `<strong>VAT (12%): ₱${tax.toFixed(2)}</strong><br>`;
  previewDiv.innerHTML += `<strong>Total: ₱${total.toFixed(2)}</strong>`;

  document.getElementById("checkout-modal").style.display = "block";
}

function handleConfirmCheckout() {
  const receiptDiv = document.getElementById("receipt");
  receiptDiv.innerHTML = '';

  receiptDiv.innerHTML += `<p><strong>Name:</strong> ${userProfile.name}</p>`;
  receiptDiv.innerHTML += `<p><strong>Email:</strong> ${userProfile.email}</p><hr>`;
  const now = new Date();
  const dateTimeString = now.toLocaleString();
  receiptDiv.innerHTML += `<p><strong>Date:</strong> ${dateTimeString}</p><hr>`;

  let subtotal = 0;

  cart.forEach(item => {
    const sub = item.qty * item.price;
    subtotal += sub;
    receiptDiv.innerHTML += `<p>${item.name} x ${item.qty} = ₱${sub}</p>`;
  });

  const tax = subtotal * 0.12;
  const total = subtotal + tax;

  receiptDiv.innerHTML += `<h3>Subtotal: ₱${subtotal}</h3>`;
  receiptDiv.innerHTML += `<h3>VAT (12%): ₱${tax.toFixed(2)}</h3>`;
  receiptDiv.innerHTML += `<h2>Total: ₱${total.toFixed(2)}</h2>`;

  document.getElementById("checkout-modal").style.display = "none";
  document.getElementById("receipt-modal").style.display = "block";
}

document.getElementById("checkout-btn").addEventListener("click", handleCheckout);
document.getElementById("confirm-checkout").addEventListener("click", handleConfirmCheckout);

window.onload = function () {
  if (!profileSet) {
    showProfileModal();
  }
  renderCategoryButtons();
  renderItems();
};
