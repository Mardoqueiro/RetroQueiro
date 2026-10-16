// Log in and create-account forms
let loginForm = document.getElementById("loginForm");
let signupForm = document.getElementById("signupForm");
let params = new URLSearchParams(location.search);
let nextPage = safeNextPage(params.get("next"));

// Send people where they were going, or to their own area
function goAfterLogin(user) {
  location.href = nextPage || (isAdmin(user) ? "./admin.html" : "./account.html");
}

function showError(form, message) {
  const error = form.querySelector("[authError]");
  error.textContent = message;
  error.hidden = !message;
}

// Explain why they landed here
let notice = document.querySelector("[authNotice]");
if (params.get("denied")) {
  notice.textContent = "That page is for the store admin. Log in with the admin account to continue.";
  notice.hidden = false;
} else if (nextPage === "checkout.html") {
  notice.textContent = "Log in or create an account to place your order.";
  notice.hidden = false;
} else if (nextPage) {
  notice.textContent = "Please log in to continue.";
  notice.hidden = false;
} else if (getCurrentUser()) {
  notice.textContent = `You're logged in as ${getCurrentUser().name}. Log in below to switch accounts.`;
  notice.hidden = false;
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  showError(loginForm, "");
  if (!loginForm.checkValidity()) {
    loginForm.classList.add("was-validated");
    return;
  }
  try {
    goAfterLogin(await logIn(loginForm.loginEmail.value, loginForm.loginPassword.value));
  } catch (error) {
    showError(loginForm, error.message);
  }
});

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  showError(signupForm, "");
  const confirm = signupForm.signupConfirm;
  confirm.setCustomValidity(
    confirm.value === signupForm.signupPassword.value ? "" : "Passwords don't match."
  );
  if (!signupForm.checkValidity()) {
    signupForm.classList.add("was-validated");
    return;
  }
  try {
    await registerCustomer(
      signupForm.signupName.value,
      signupForm.signupEmail.value,
      signupForm.signupPassword.value
    );
    goAfterLogin(getCurrentUser());
  } catch (error) {
    showError(signupForm, error.message);
  }
});

// Open the right tab from a link like login.html#signup
if (location.hash === "#signup") {
  bootstrap.Tab.getOrCreateInstance(document.querySelector('[data-bs-target="#signupPane"]')).show();
}
