import './main.scss';

const rotateButton = document.getElementById("rotateButton");
const wheelSecond = document.querySelector(".wheel__second");
const registerForm = document.getElementById("registerForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const currencySelect = document.getElementById("currency");
const togglePasswordIcon = document.getElementById('toggle-password');
const spinAudio = document.getElementById("spinAudio");
const formAudio = document.getElementById("formAudio");
const bonusAudio = document.getElementById("bonusAudio");

let spinCount = 0;

const reward1 = document.querySelector('.reward__wrapper--1');
const reward2 = document.querySelector('.reward__wrapper--2');

const phoneError = document.createElement('div');
phoneError.classList.add('error-message');
registerForm.appendChild(phoneError);

const emailError = document.createElement('div');
emailError.classList.add('error-message');
registerForm.appendChild(emailError);

rotateButton.addEventListener("click", () => {
  if (spinCount < 2) {
    rotateButton.disabled = true;
    spinCount++;

    const startAngle = spinCount === 1 ? 0 : 757;
    const endAngle = spinCount === 1 ? 757 : 1441;

    const animationName = `spin${spinCount}`;

    const existingStyles = document.getElementById(animationName);
    if (existingStyles) {
      existingStyles.remove();
    }

    const styleSheet = document.createElement("style");
    styleSheet.id = animationName;
    styleSheet.textContent = `
      @keyframes ${animationName} {
        0% {
          transform: translate(-50%, -50%) rotate(${startAngle}deg);
        }
        100% {
          transform: translate(-50%, -50%) rotate(${endAngle}deg);
        }
      }
    `;
    document.head.appendChild(styleSheet);

    spinAudio.play();
    spinAudio.loop = true;

    wheelSecond.style.animation = `${animationName} 2s cubic-bezier(0.1, 0, 0.2, 1) forwards`;

    setTimeout(() => {
      spinAudio.pause();
      spinAudio.currentTime = 0;
      if (spinCount === 1) {
        reward1.classList.remove('hidden');
        bonusAudio.currentTime = 0;
        bonusAudio.play();
      }

      if (spinCount === 2) {
        reward2.classList.remove('hidden');
        bonusAudio.currentTime = 0;
        bonusAudio.play();

        setTimeout(() => {
          registerForm.classList.remove("hidden");
          formAudio.currentTime = 0;
          formAudio.play();
        }, 2000); 
      }
    }, 2500); 

    setTimeout(() => {
      if (spinCount < 2) {
        rotateButton.disabled = false;
      } else {
        rotateButton.disabled = true;
      }
    }, 3000); 
  }
});

const registerFormElement = document.querySelector(".register__form");

registerFormElement.addEventListener("submit", function(event) {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;
  const currency = currencySelect.value;

  console.log("Form submitted!");
  console.log("Email:", email);
  console.log("Password:", password);
  console.log("Currency:", currency);

  registerFormElement.reset(); 
});

togglePasswordIcon.addEventListener('click', function() {
  const isPasswordVisible = passwordInput.type === 'text';

  passwordInput.type = isPasswordVisible ? 'password' : 'text';

  const passwordToggleText = togglePasswordIcon.querySelector('span');
  if (passwordToggleText) {
    passwordToggleText.textContent = isPasswordVisible ? 'Visible' : 'Hidden';
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const emailButton = document.querySelector(".register__button--email");
  const phoneButton = document.querySelector(".register__button--phone");
  const emailField = document.getElementById("email");
  const phoneField = document.getElementById("phoneField");
  const emailFieldContainer = emailField.closest(".register__field");
  const selectField = document.getElementById("currency");

  emailButton.classList.add("selected");

  emailButton.addEventListener("click", () => {
    emailButton.classList.add("selected");
    phoneButton.classList.remove("selected");

    emailFieldContainer.classList.remove("hidden");
    phoneField.classList.add("hidden");

    selectField.classList.add("email-selected"); 
  });

  phoneButton.addEventListener("click", () => {
    phoneButton.classList.add("selected");
    emailButton.classList.remove("selected");

    phoneField.classList.remove("hidden");
    emailFieldContainer.classList.add("hidden");

    selectField.classList.add("phone-selected");
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const submitButton = document.querySelector(".register__submit");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const phonePattern = /^\+?\d{1,4}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/;

  function toggleSubmitButton() {
    const emailValue = emailInput.value.trim();
    const phoneValue = phoneInput.value.trim();

    const isEmailValid = emailPattern.test(emailValue);
    const isPhoneValid = phonePattern.test(phoneValue);

    if ((emailValue && isEmailValid) || (phoneValue && isPhoneValid)) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  }

  emailInput.addEventListener("input", toggleSubmitButton);
  phoneInput.addEventListener("input", toggleSubmitButton);

  toggleSubmitButton();
}); 