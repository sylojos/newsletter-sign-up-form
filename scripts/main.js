const form = document.querySelector("form");
const emailInput = form.querySelector(".jsEmailField");
const errorMessage = form.querySelector(".jsErrorMessage");
const signUpPage = document.querySelector(".jsDefaultSection");
const successPage = document.querySelector(".jsSuccessSection");
const confirmEmail = document.querySelector(".jsConfirmEmail");

const emailRegExp = /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d-]+(?:\.[a-z\d-]+)+$/i;

let isChanged = false;

/* 
   add novalidate attribute using JavaScript rather than adding
   directly in HTML, this allow form to have a fallback to default
   browser validation if JavaScript is disabled or failed to load
   (does not end up with no validation if JavaScript is failed to load
   or disabled)
*/
form.setAttribute("novalidate", "");

function isEmailValid() {
  return (
    emailInput.value.trim().length !== 0 &&
    emailRegExp.test(emailInput.value.trim())
  );
}

function handleEmailInput() {
  if (isChanged) {
    const emailValidity = isEmailValid();
    if (!emailValidity) {
      emailInput.setAttribute("aria-invalid", "true");
      errorMessage.textContent = "Valid email required";
    } else {
      emailInput.removeAttribute("aria-invalid");
      errorMessage.textContent = "";
    }
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const emailValidity = isEmailValid();
  if (!emailValidity) {
    emailInput.setAttribute("aria-invalid", "true");
    errorMessage.textContent = "Valid email required";
    emailInput.focus();
  } else {
    emailInput.removeAttribute("aria-invalid");
    errorMessage.textContent = "";
    signUpPage.classList.toggle("hidden");
    successPage.classList.toggle("hidden");
    confirmEmail.textContent = `${emailInput.value}`;
  }
}

emailInput.addEventListener("change", () => {
  isChanged = true;
});

emailInput.addEventListener("keyup", () => {
  const emailValidity = isEmailValid();
  if (emailValidity) {
    emailInput.removeAttribute("aria-invalid");
    errorMessage.textContent = "";
  }
});

emailInput.addEventListener("blur", handleEmailInput);
form.addEventListener("submit", handleSubmit);
