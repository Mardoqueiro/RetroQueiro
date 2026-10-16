// Customer and admin logins.
// This is a browser-only demo login: accounts, the session and orders are
// saved in this browser's localStorage. It is NOT real security, because
// anyone can read or change localStorage. Real protection needs a server.

// Admin login. To change the password, run this in the browser console
// (with your own password) and paste the result below:
//   await hashPassword("mordecai.dimbu@gmail.com", "your-new-password")
const ADMIN_EMAIL = "mordecai.dimbu@gmail.com";
const ADMIN_PASSWORD_HASH = "1c9e9882cf58a44b61c99a716c037c21af636dc3c5c160aa5ddb31a0002cccf9";
const ADMIN_NAME = "Mardoquéiro";

async function hashPassword(email, password) {
  const data = new TextEncoder().encode(`${email.trim().toLowerCase()}:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

// Customer accounts
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

async function registerCustomer(name, email, password) {
  email = email.trim().toLowerCase();
  const users = getUsers();
  if (email === ADMIN_EMAIL || users.some((user) => user.email === email)) {
    throw new Error("An account with this email already exists. Try logging in instead.");
  }
  users.push({ name: name.trim(), email, passwordHash: await hashPassword(email, password) });
  saveUsers(users);
  startSession({ name: name.trim(), email, role: "customer" });
}

async function logIn(email, password) {
  email = email.trim().toLowerCase();
  const passwordHash = await hashPassword(email, password);

  if (email === ADMIN_EMAIL && passwordHash === ADMIN_PASSWORD_HASH) {
    return startSession({ name: ADMIN_NAME, email, role: "admin" });
  }
  const user = getUsers().find((user) => user.email === email && user.passwordHash === passwordHash);
  if (!user) throw new Error("That email and password don't match. Please try again.");
  return startSession({ name: user.name, email, role: "customer" });
}

// Session
function startSession(user) {
  localStorage.setItem("session", JSON.stringify(user));
  return user;
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("session"));
}

function isAdmin(user = getCurrentUser()) {
  return user?.role === "admin";
}

function logOut() {
  localStorage.removeItem("session");
}

// Orders, saved per customer email
function getOrders(email) {
  const orders = JSON.parse(localStorage.getItem("orders")) || {};
  return orders[email] || [];
}

function addOrder(email, order) {
  const orders = JSON.parse(localStorage.getItem("orders")) || {};
  orders[email] = [order, ...(orders[email] || [])];
  localStorage.setItem("orders", JSON.stringify(orders));
}

// Only allow redirects to pages on this site, e.g. "checkout.html"
function safeNextPage(next) {
  return /^[a-z]+\.html$/.test(next || "") ? next : null;
}

// Navbar: "Log in" link, or the user's menu once they're logged in
function renderAccountNav() {
  const slot = document.querySelector("[accountNav]");
  const user = getCurrentUser();
  if (!slot || !user) return;

  const base = slot.dataset.base;
  const onAccountPage = /\/(account|admin)\.html$/.test(location.pathname);
  slot.classList.add("dropdown");
  slot.innerHTML = `
    <button class="nav-link dropdown-toggle account-toggle${onAccountPage ? " active" : ""}" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      <i class="bi bi-person-circle" aria-hidden="true"></i> ${escapeHtml(user.name.split(" ")[0])}
    </button>
    <ul class="dropdown-menu dropdown-menu-end account-menu">
      <li><span class="dropdown-item-text account-menu__email">${escapeHtml(user.email)}</span></li>
      <li><a class="dropdown-item" href="${base}account.html"><i class="bi bi-person" aria-hidden="true"></i> My account</a></li>
      ${isAdmin(user) ? `<li><a class="dropdown-item" href="${base}admin.html"><i class="bi bi-sliders" aria-hidden="true"></i> Manage products</a></li>` : ""}
      <li><hr class="dropdown-divider" /></li>
      <li><button class="dropdown-item" type="button" data-logout><i class="bi bi-box-arrow-right" aria-hidden="true"></i> Log out</button></li>
    </ul>`;

  slot.querySelector("[data-logout]").addEventListener("click", () => {
    logOut();
    location.href = slot.dataset.home;
  });
}

// Pages marked <body data-requires="customer|admin"> need the right login
function guardPage() {
  const required = document.body.dataset.requires;
  if (!required) return;

  const user = getCurrentUser();
  const allowed = required === "admin" ? isAdmin(user) : Boolean(user);
  if (allowed) {
    document.body.classList.add("auth-ok");
    return;
  }
  const page = location.pathname.split("/").pop();
  location.replace(`./login.html?next=${page}${user ? "&denied=1" : ""}`);
}

guardPage();
renderAccountNav();
