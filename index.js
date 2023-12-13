const form = document.querySelector("form");
const thanksBox = document.querySelector(".thanksBox");
const submitButton = document.querySelector(".submitButton");
// interactive cards
const nameOnCard = document.querySelector(".name");
const numberOnCard = document.querySelector(".cardNumber");
const expMonthOnCard = document.querySelector(".expM");
const expYearOnCard = document.querySelector(".expY");
const cvcOnCard = document.querySelector(".card2data");
// inputs
const cardHolderInput = document.querySelector(".nameInput");
const cardNumberInput = document.querySelector(".cardNumberInput");
const monthInput = document.querySelector(".expMonthInput");
const yearInput = document.querySelector(".expYearInput");
const cvcInput = document.querySelector(".cvcInput");
// errorMessages
const wrongNumber = document.querySelector(".wrongNumber");
const wrongExpDate = document.querySelector(".wrongExpDate");
const wrongCVC = document.querySelector(".wrongCVC");
// borders
const numberBorder = document.querySelector(".numberBorder");
const monthBorder = document.querySelector(".monthBorder");
const yearBorder = document.querySelector(".yearBorder");
const cvcBorder = document.querySelector(".cvcBorder");
//last input field (removing margin on error message)
const lastInputs = document.querySelectorAll(".lastField");

/////format card input
cardNumberInput.addEventListener("keyup", (e) => {
  if (e.code === "Backspace") {
    cardNumberInput.value = cardNumberInput.value.replace(/\s+$/, "");
  } else {
    formatCreditCard();
  }
});
const formatCreditCard = () => {
  let realNumber = cardNumberInput.value.replace(/\s/g, "");
  let newNumber = "";
  for (let i = 1; i <= realNumber.length; i++) {
    newNumber += realNumber.charAt(i - 1);
    if (i % 4 == 0 && i > 0 && i < 15) newNumber += " ";
  }
  cardNumberInput.value = newNumber;
};
//////////////

/////interactive cards
cardHolderInput.addEventListener("keyup", () => {
  nameOnCard.innerText = cardHolderInput.value;
});
cardNumberInput.addEventListener("keyup", () => {
  numberOnCard.innerText = cardNumberInput.value;
});
monthInput.addEventListener("keyup", () => {
  expMonthOnCard.innerText = monthInput.value;
});
yearInput.addEventListener("keyup", () => {
  expYearOnCard.innerText = yearInput.value;
});
cvcInput.addEventListener("keyup", () => {
  cvcOnCard.innerText = cvcInput.value;
});

///////////submit
const isNumeric = (input) => {
  let numWithoutSpaces = input.replace(/\s/g, "").split("");
  return numWithoutSpaces.every((num) => {
    return "0123456789".indexOf(num) !== -1;
  });
};
const cardNumberEval = (value) => {
  if (!isNumeric(value) || value === "") {
    numberBorder.style.background = "hsl(0, 100%, 66%)";
    wrongNumber.style.display = "block";
    if (value === "") {
      wrongNumber.innerText = "Can't be blank";
    } else {
      wrongNumber.innerText = "Wrong format, numbers only";
    }
    return false;
  }
  numberBorder.style.background = "hsl(270, 3%, 87%)";
  wrongNumber.style.display = "none";
  return true;
};

const expDateEval = (month, year) => {
  let monthEmpty = false;
  let yearEmpty = false;
  if (month === "") {
    monthBorder.style.background = "hsl(0, 100%, 66%)";
    wrongExpDate.style.display = "block";
    wrongExpDate.innerText = "Can't be blank";
    monthEmpty = true;
  } else {
    monthBorder.style.background = "hsl(270, 3%, 87%)";
    if (year !== "") wrongExpDate.style.display = "none";
  }
  if (year === "") {
    yearBorder.style.background = "hsl(0, 100%, 66%)";
    wrongExpDate.style.display = "block";
    wrongExpDate.innerText = "Can't be blank";
    yearEmpty = true;
  } else {
    yearBorder.style.background = "hsl(270, 3%, 87%)";
    if (month !== "") wrongExpDate.style.display = "none";
  }
  if (monthEmpty || yearEmpty) {
    //deleting margin bottom according to design
    lastInputs.forEach((input) => {
      input.style.marginBottom = "0";
    });
    return false;
  }

  return true;
};

const cvcEval = (value) => {
  if (value === "") {
    cvcBorder.style.background = "hsl(0, 100%, 66%)";
    wrongCVC.style.display = "block";
    wrongCVC.innerText = "Can't be blank";
    //deleting margin bottom according to design
    lastInputs.forEach((input) => {
      input.style.marginBottom = "0";
    });
    return false;
  }
  cvcBorder.style.background = "hsl(270, 3%, 87%)";
  wrongCVC.style.display = "none";
  return true;
};

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const eval1 = cardNumberEval(cardNumberInput.value);
  const eval2 = expDateEval(monthInput.value, yearInput.value);
  const eval3 = cvcEval(cvcInput.value);
  if (
    monthInput.value !== "" &&
    yearInput.value !== "" &&
    cvcInput.value !== ""
  ) {
    lastInputs.forEach((input) => {
      input.style.marginBottom = "26px";
    });
  }
  if (eval1 && eval2 && eval3) {
    form.style.display = "none";
    thanksBox.style.display = "block";
  }
});
