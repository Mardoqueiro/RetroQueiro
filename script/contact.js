// Send the contact form in the background and show the result on the page
let contactForm = document.getElementById("contact-form");
let formStatus = document.querySelector("[formStatus]");

function showFormStatus(type, message) {
  formStatus.className = `form-status form-status--${type}`;
  formStatus.textContent = message;
  formStatus.hidden = false;
}

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  formStatus.hidden = true;

  if (!contactForm.checkValidity()) {
    contactForm.classList.add("was-validated");
    contactForm.querySelector(":invalid").focus();
    return;
  }

  const submitButton = contactForm.querySelector("[type=submit]");
  submitButton.disabled = true;

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error(`Form service replied ${response.status}`);

    contactForm.reset();
    contactForm.classList.remove("was-validated");
    showFormStatus("success", "Thanks! Your message has been sent.");
  } catch (error) {
    showFormStatus(
      "error",
      "Sorry, your message couldn't be sent. Please email us at mordecai.dimbu@gmail.com instead."
    );
  } finally {
    submitButton.disabled = false;
  }
});
