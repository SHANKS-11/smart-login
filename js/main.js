
//////////////////// DOM SELECTION ////////////////////
const signupForm = document.getElementById("signupForm");
const signupName = document.getElementById("signupName");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const signupNameError = document.getElementById("signupNameError");
const selectedInput = document.querySelectorAll(".selectedInput");
const exist = document.getElementById("exist");
const success = document.getElementById("success");
const login = document.getElementById("login");
const signinEmail = document.getElementById("signinEmail");
const signinPassword = document.getElementById("signinPassword");
const invalid = document.getElementById("invalid");
const username = document.getElementById("username");
const logOut = document.getElementById("logOut");
const forgetPass = document.getElementById("forgetPass");
const forgetPassEmail = document.getElementById("forgetPassEmail");
const invalid_forgetPassword = document.getElementById("invalid-forgetPassword");
const resetPass = document.getElementById("resetPass");

//////////////////// USER STORAGE ////////////////////
let users = [];
if (localStorage.getItem("allUsers") != null) {
  users = JSON.parse(localStorage.getItem("allUsers"));
}

//////////////////// SIGNUP ////////////////////
signupForm?.addEventListener("submit", function (e) {
  e.preventDefault();
  const userObj = {
    name: signupName.value,
    email: signupEmail.value,
    password: signupPassword.value,
  };
  if (check() && !isExist(users, userObj)) {
    success.classList.replace("d-none", "d-block");
    users.push(userObj);
    localStorage.setItem("allUsers", JSON.stringify(users));
    clear();
    setTimeout(function () {
      window.location.href = "./index.html";
    }, 2000);
  } else {
    success.classList.replace("d-block", "d-none");
  }
});

//////////////////// INPUT VALIDATION ////////////////////
for (let i = 0; i < selectedInput.length; i++) {
  selectedInput[i].addEventListener("input", function (e) {
    const inputId = e.target.id;
    const inputVal = e.target.value;
    validation(inputId, inputVal);
  });
}

function validation(id, value) {
  const regex = {
    signupName: /^[a-z]{3,15}/,
    signupEmail: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    signupPassword: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
    resetPass: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
  };
  const element = document.getElementById(id);
  const errMsg = document.getElementById(id + "Error");
  if (regex[id].test(value) === true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    errMsg?.classList.replace("d-block", "d-none");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    errMsg?.classList.replace("d-none", "d-block");
    return false;
  }
}

//////////////////// CHECK ////////////////////
function check() {
  if (
    validation(signupName.id, signupName.value) &&
    validation(signupEmail.id, signupEmail.value) &&
    validation(signupPassword.id, signupPassword.value)
  ) {
    return true;
  } else {
    return false;
  }
}

//////////////////// CHECK IF USER EXISTS ////////////////////
let loginEmail, index;
function isExist(arr, newObj) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].email == newObj.email) {
      loginEmail = arr[i].email;
      index = i;
      exist?.classList.replace("d-none", "d-block");
      return true;
    }
  }
  exist?.classList.replace("d-block", "d-none");
  return false;
}

//////////////////// CLEAR FIELDS ////////////////////
function clear() {
  signupName.value = "";
  signupEmail.value = "";
  signupPassword.value = "";
  signupName.classList.remove("is-valid");
  signupEmail.classList.remove("is-valid");
  signupPassword.classList.remove("is-valid");
}

//////////////////// LOGIN ////////////////////
login?.addEventListener("submit", function (e) {
  e.preventDefault();
  const loginUser = {
    email: signinEmail.value,
    password: signinPassword.value,
  };
  if (isExist(users, loginUser) && users[index].password == loginUser.password) {
    invalid.classList.replace("d-block", "d-none");
    localStorage.setItem("userName", users[index].name);
    setTimeout(function () {
      window.location.href = "./home.html";
    }, 2000);
  } else {
    invalid.classList.replace("d-none", "d-block");
  }
});

//////////////////// DISPLAY USERNAME ////////////////////
if (localStorage.getItem("userName") != null) {
  username.innerHTML += " " + localStorage.getItem("userName");
}

logOut?.addEventListener("click", function () {
  localStorage.removeItem("userName");
  window.location.href = "./index.html";
});

//////////////////// FORGET PASSWORD ////////////////////
forgetPass?.addEventListener("submit", function (e) {
  e.preventDefault();
  const verifyUser = {
    email: forgetPassEmail.value,
    password: resetPass.value,
  };
  if (isExist(users, verifyUser)) {
    if (validation(resetPass.id, resetPass.value)) {
      users[index].password = resetPass.value;
      localStorage.setItem("allUsers", JSON.stringify(users));
      Swal.fire({
        icon: "success",
        title: "updated password",
      });
      invalid_forgetPassword.classList.replace("d-block", "d-none");
    }
  } else {
    invalid_forgetPassword.classList.replace("d-none", "d-block");
  }
});


