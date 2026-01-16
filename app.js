// ----- STATE MANAGEMENT -----
const AppState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  user: JSON.parse(localStorage.getItem("user")) || null,
};

// ----- UTILITIES -----
const saveCart = () => localStorage.setItem("cart", JSON.stringify(AppState.cart));
const saveUser = () => localStorage.setItem("user", JSON.stringify(AppState.user));

const showToast = (message, type = "success") => {
  const toast = document.createElement("div");
  toast.className = `toast align-items-center text-bg-${type} show position-fixed bottom-0 end-0 m-3`;
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button class="btn-close btn-close-white me-2 m-auto"></button>
    </div>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
};

// ----- CART LOGIC -----
document.querySelectorAll(".card .btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const card = btn.closest(".card");
    const name = card.querySelector(".card-text").innerText;

    AppState.cart.push({ name, quantity: 1 });
    saveCart();

    showToast(`${name} added to cart 🛒`);
  });
});

// ----- LOGIN HANDLING -----
const loginForm = document.querySelector("#loginModal form");

loginForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginForm.querySelector("input[type='email']").value;
  const password = loginForm.querySelector("input[type='password']").value;

  if (!email || !password) {
    showToast("Please fill all fields", "danger");
    return;
  }

  AppState.user = { email };
  saveUser();

  bootstrap.Modal.getInstance(document.getElementById("loginModal")).hide();
  showToast(`Welcome back, ${email} 👋`);
});

// ----- SIGNUP HANDLING -----
const signupForm = document.querySelector("#signupModal form");

signupForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputs = signupForm.querySelectorAll("input");
  const [name, email, pass, confirm] = [...inputs].map(i => i.value);

  if (pass !== confirm) {
    showToast("Passwords do not match", "danger");
    return;
  }

  AppState.user = { name, email };
  saveUser();

  bootstrap.Modal.getInstance(document.getElementById("signupModal")).hide();
  showToast(`Account created for ${name} 🎉`);
});

// ----- AUTO LOGIN UI -----
window.addEventListener("DOMContentLoaded", () => {
  if (AppState.user) {
    document.querySelector(".navbar-brand").innerText =
      `🍕 Welcome, ${AppState.user.name || AppState.user.email}`;
  }
});
