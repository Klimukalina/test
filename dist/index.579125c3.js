const rotateButton = document.getElementById("rotateButton");
const wheelSecond = document.querySelector(".wheel__second");
const registerForm = document.getElementById("registerForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const currencySelect = document.getElementById("currency");
let spinCount = 0;
rotateButton.addEventListener("click", ()=>{
    console.log("Button clicked");
    if (spinCount < 2) {
        rotateButton.disabled = true;
        spinCount++;
        console.log("Spin count:", spinCount);
        wheelSecond.classList.remove("spin");
        wheelSecond.offsetWidth;
        console.log("Animation class removed for reset");
        wheelSecond.classList.add("spin");
        console.log("Animation class added");
        setTimeout(()=>{
            rotateButton.disabled = false;
            const bonus = spinCount === 1 ? "Bonus 1" : "Bonus 2";
            console.log("Spin completed. Bonus awarded:", bonus);
            alert(`Congratulations! You won ${bonus}!`);
            if (spinCount === 2) setTimeout(()=>{
                if (registerForm.classList.contains("hidden")) {
                    registerForm.classList.remove("hidden");
                    console.log("Registration form displayed");
                } else console.log("Registration form is already displayed");
            }, 1000);
        }, 2000);
    } else console.log("Spin limit reached");
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

//# sourceMappingURL=index.579125c3.js.map
