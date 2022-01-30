// declare containers & elements
const form = document.querySelector(".contact-form");
const submitButton = document.querySelector(".contact-btn");
const errorContainer = document.querySelector(".error-container");
const hero = document.querySelector(".container__hero");

// api url etc.

const API = "https://www.dennfisl.no/blogAPI/wp-json/contact-form-7/v1/contact-forms/234/feedback";

// Validate input values

// Regex to check if the email is valid, returns ? true : false
function validateEmail(email) {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const patternMatches = regEx.test(email.value);
  return patternMatches;
}

// check if input larger or equal to minLength of 'x'
function checkLength(input, minLen) {
  if (input.value.trim().length >= minLen) {
    return true;
  } else {
    return false;
  }
}

// DOM form input elements, credits to Kasper for teaching me this
const formInputs = () => [form["fullName"], form["email"], form["subject"], form["message"]];

// apply error styling to item(s) passed in as through 'input'. uses (input.target) = false if it's an eventlistener, and (input.target) = true if it's not.
// because the eventListener does not have a .target value
// credit to Kasper on the true/false check inside a variable!
function errorStyling(input) {
  const target = input.target ? input.composedPath()[0] : form[input];
  target.style.borderBottom = "2px solid #ff846b";
  target.nextElementSibling.style.display = "block";
}

// apply success styling to item(s)
function successStyling(input) {
  const target = input.target ? input.composedPath()[0] : form[input];
  target.style.borderBottom = "2px solid #ffbc6b";
  target.nextElementSibling.style.display = "none";
}

// Self explanatory? "if" inputName = firstName run case "firstName": return boolean ? true : false.
function isInputValid(inputName) {
  if (inputName === "fullName") {
    return checkLength(fullName, 1);
  }
  if (inputName === "email") {
    return validateEmail(email);
  }
  if (inputName === "subject") {
    return checkLength(subject, 15);
  }
  if (inputName === "message") {
    return checkLength(message, 25);
  }
  return false;
}

// Function connected from event listener, to check for input changes. Then check if its valid, then apply respsctive styling
function inputCheckValid(el) {
  const input = el.target.name;
  if (!isInputValid(input)) {
    errorStyling(el);
  }
  if (isInputValid(input)) {
    successStyling(el);
  }
}

// add input event listener
formInputs().forEach((element) => {
  element.addEventListener("input", inputCheckValid);
});

// 'Submit' (button click) form part of the validation

// If this is passed, form is valid.
function validForm() {
  const [fullName, email, subject, message] = formInputs();
  const isInputValidArr = [checkLength(fullName, 1), validateEmail(email), checkLength(subject, 15), checkLength(message, 25)];

  // if n (in this case, the array objects) === true, it will return true, otherwise no return.
  function isTrue(n) {
    return n === true;
  }

  // every object in the array gets passed through the 'isTrue' function, return boolean ? true:false
  const isFormValid = isInputValidArr.every(isTrue);
  return isFormValid;
}

// function check every input through a functon of if statements if it's valid. If this returns true, apply successStyling, else if return = false, apply errorStyling.
function submitCheckAll() {
  formInputs().forEach(function (input) {
    isInputValid(input.name) ? successStyling(input.name) : errorStyling(input.name);
  });
}

// on button click, check if form is valid, it form isn't valid, check all inputs & apply respective styling to them induvidually.
// else clear the form & display a success message
async function handleSubmit() {
  errorContainer.innerHTML = "";
  const body = new FormData(form);

  if (!validForm()) {
    submitCheckAll();
    form.removeAttribute("style");
  } else {
    submitButton.innerHTML = "Sending...";

    try {
      const response = await fetch(API, { method: "POST", body });
      const json = await response.json();

      if (json.status === "mail_sent" && validForm()) {
        form.reset();
        submitButton.innerHTML = "Send";
        formInputs().forEach((input) => {
          input.removeAttribute("style");
        });
      } else {
        sendError(json.message);
      }
    } catch (error) {
      sendError(error);
    } finally {
      form.scrollIntoView(false);
    }
  }
}

function sendError(error) {
  submitButton.innerHTML = "error";
  submitButton.disabled = true;
  setTimeout(resetButton, 7000);
  errorContainer.innerHTML = buildContactError(error);
}

function resetButton() {
  submitButton.disabled = false;
  submitButton.innerHTML = "Send";
}

// submit form event listener
submitButton.addEventListener("click", handleSubmit);

// Build contact Error
function buildContactError(errorMessage) {
  return `
          <div class="status">
            <p class="status-txt">Oops! ${errorMessage}</p>
          </div>`;
}
