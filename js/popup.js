const kifAPI = axios.create({ baseURL: "https://api.kif.fund" });

const openMessage = function (message , type) {
    var blockMessage = document.getElementById('message')
    blockMessage.innerText = message
    blockMessage.classList.add('show')
    if(type === 0) {
        blockMessage.classList.add('error')
    }
    if(type === 1){
        blockMessage.classList.add('success')
    }

    setTimeout(() => {
        blockMessage.classList.remove('show')
        blockMessage.classList.remove('success')
        blockMessage.classList.remove('error')
    }, 5000);
}

let registerBtn = document.querySelector("#register");
let loginBtn = document.querySelector("#login");

let routeBtnRegister = document.querySelector(".route-popup__register");
let routeBtnLogin = document.querySelector(".route-popup__login");
let routeBtnForgot = document.querySelector(".route-popup__forgot");

let formRegister = document.querySelector(".form-register");
let formLogin = document.querySelector(".form-login");
let formAuthentication = document.querySelector(".form-authentication");
let formForgot = document.querySelector(".form-forgot");
let formReset = document.querySelector(".form-reset");

let popup = document.querySelector("#popup");
let overlay = popup.querySelector("#overlay");
let closeIcon = popup.querySelector(".close-icon");
let menuIcon = popup.querySelector(".menu-icon-popup");

let routeButtons = document.querySelectorAll(".route-popup__button");
let containerForm = document.querySelector(".container-popup__right");
let containerRouteButtons = document.querySelector(".route-popup");

let linkToLogin = document.querySelector(".link-to-login");
let linkToRegister = document.querySelector(".link-to-register");
let linkToForgot = document.querySelector(".link-to-forgot");

let RegisterFormError = [];
let RegisterForm = document.querySelector('form[name="form-register"]');
let RegisterFormLastname = RegisterForm.querySelector("#lastname");
let RegisterFormFirstname = RegisterForm.querySelector("#firstname");
let RegisterFormEmail = RegisterForm.querySelector("#email");
let RegisterFormPassword1 = RegisterForm.querySelector("#password1");
let RegisterFormPassword2 = RegisterForm.querySelector("#password2");
let RegisterFormRefCode = RegisterForm.querySelector("#refcode");
let RegisterFormRegCode = RegisterForm.querySelector("#regcode");
let RegisterFormConsent = RegisterForm.querySelector("#consent");
let getRegcodeByEmail = RegisterForm.querySelector(".get-regcode-by-email");
let RegisterFormSubmitButton = RegisterForm.querySelector(
    'button[type="submit"]'
);

let LoginFormError = [];
let LoginForm = document.querySelector('form[name="form-login"]');
let LoginFormEmail = LoginForm.querySelector("#emailLogin");
let LoginFormPassword = LoginForm.querySelector("#passwordLogin");
let LoginFormRemember = LoginForm.querySelector("#rememberLogin");
let LoginFormSubmitButton = LoginForm.querySelector('button[type="submit"]');

let AuthenticationFormError = [];
let AuthenticationForm = document.querySelector(
    'form[name="form-authentication"]'
);
let AuthenticationFormCode = AuthenticationForm.querySelector(
    "#authentication-code"
);
let AuthenticationFormSubmitButton = AuthenticationForm.querySelector(
    'button[type="submit"]'
);

let ForgotFormError = [];
let ForgotForm = document.querySelector('form[name="form-forgot"]');
let ForgotFormEmail = ForgotForm.querySelector("#email-forgot");
let ForgotFormSubmitButton = ForgotForm.querySelector('button[type="submit"]');

let ResetFormError = [];
let ResetForm = document.querySelector('form[name="form-reset"]');
let ResetFormEmail = ResetForm.querySelector("#email-reset");
let ResetFormPassword = ResetForm.querySelector("#password-reset");
let ResetFormCode = ResetForm.querySelector("#code-reset");
let ResetFormSubmitButton = ResetForm.querySelector('button[type="submit"]');

function checkValidRegisterFormEmail() {
    let isValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
        RegisterForm.elements["email"].value
    );

    if (!isValid) {
        let errMes = RegisterFormEmail.parentElement.querySelector(
            ".error-message"
        );
        if (errMes) return;

        let p = document.createElement("p");
        p.classList.add("error-message");

        let img = document.createElement("img");
        img.src = "./images/popup/exclamation.svg";
        img.alt = "icon";

        let span = document.createElement("span");
        span.innerText = "Địa chỉ email không hợp lệ";

        p.appendChild(img);
        p.appendChild(span);

        RegisterFormEmail.parentElement.appendChild(p);
        RegisterFormError.push("error");
    } else {
        let errMes = RegisterFormEmail.parentElement.querySelector(
            ".error-message"
        );
        if (!errMes) return;

        RegisterFormEmail.parentElement.removeChild(errMes);
        RegisterFormError.pop();
    }

    if (isValid) {
        getRegcodeByEmail.style.cursor = "pointer";
        getRegcodeByEmail.style.opacity = "1";
        getRegcodeByEmail.disabled = false;
    } else {
        getRegcodeByEmail.style.cursor = "not-allowed";
        getRegcodeByEmail.style.opacity = ".3";
        getRegcodeByEmail.disabled = true;
    }
}

function checkValidRegisterFormPassword1() {
    let isValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/.test(
        RegisterForm.elements["password1"].value
    );

    if (!isValid) {
        let errMes = RegisterFormPassword1.parentElement.parentElement.querySelector(
            ".error-message"
        );
        if (errMes) return;

        let p = document.createElement("p");
        p.classList.add("error-message");

        let img = document.createElement("img");
        img.src = "./images/popup/exclamation.svg";
        img.alt = "icon";

        let span = document.createElement("span");
        span.innerText =
            "Mật khẩu yêu cầu tối thiểu tám ký tự, ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt";

        p.appendChild(img);
        p.appendChild(span);

        RegisterFormPassword1.parentElement.parentElement.appendChild(p);
        RegisterFormError.push("error");
    } else {
        let errMes = RegisterFormPassword1.parentElement.parentElement.querySelector(
            ".error-message"
        );
        if (!errMes) return;

        RegisterFormPassword1.parentElement.parentElement.removeChild(errMes);
        RegisterFormError.pop();
    }
}

function checkValidRegisterFormPassword2() {
    let isValid =
        RegisterForm.elements["password1"].value ===
        RegisterForm.elements["password2"].value;

    if (!isValid) {
        let errMes = RegisterFormPassword2.parentElement.parentElement.querySelector(
            ".error-message"
        );
        if (errMes) return;

        let p = document.createElement("p");
        p.classList.add("error-message");

        let img = document.createElement("img");
        img.src = "./images/popup/exclamation.svg";
        img.alt = "icon";

        let span = document.createElement("span");
        span.innerText = "Mật khẩu không trùng khớp";

        p.appendChild(img);
        p.appendChild(span);

        RegisterFormPassword2.parentElement.parentElement.appendChild(p);
        RegisterFormError.push("error");
    } else {
        let errMes = RegisterFormPassword2.parentElement.parentElement.querySelector(
            ".error-message"
        );
        if (!errMes) return;

        RegisterFormPassword2.parentElement.parentElement.removeChild(errMes);
        RegisterFormError.pop();
    }
}

function checkValidRegisterForm() {
    let isValid =
        RegisterFormError.length === 0 &&
        RegisterForm.elements["lastname"].value !== "" &&
        RegisterForm.elements["firstname"].value !== "" &&
        RegisterForm.elements["refcode"].value !== "" &&
        RegisterForm.elements["regcode"].value !== "" &&
        RegisterForm.elements["consent"].checked;

    if (isValid) {
        RegisterFormSubmitButton.style.cursor = "pointer";
        RegisterFormSubmitButton.style.opacity = "1";
        RegisterFormSubmitButton.disabled = false;
    } else {
        RegisterFormSubmitButton.style.cursor = "not-allowed";
        RegisterFormSubmitButton.style.opacity = ".3";
        RegisterFormSubmitButton.disabled = true;
    }
}

getRegcodeByEmail.addEventListener("click", () => {
    kifAPI
        .post("/reg_code", {
            email: RegisterForm.elements["email"].value,
        })
        .then(function (response) {
            if (response.data.status === 1) {
                let message = RegisterForm.previousElementSibling.querySelector(
                    ".message"
                );
                if (message) {
                    RegisterForm.previousElementSibling.removeChild(message);
                }

                let p = document.createElement("p");
                p.classList.add("success-message");
                p.classList.add("message");

                let img = document.createElement("img");
                img.src = "./images/popup/check.svg";
                img.alt = "icon";

                let span = document.createElement("span");
                span.innerText = "Lấy mã thành công! Vui lòng kiểm tra email!";
                openMessage('Lấy mã thành công! Vui lòng kiểm tra email!' , 1)

                p.appendChild(img);
                p.appendChild(span);

                RegisterForm.previousElementSibling.appendChild(p);
            }

            if (response.data.status === 100) {

                let message = RegisterForm.previousElementSibling.querySelector(
                    ".message"
                );
                if (message) {
                    RegisterForm.previousElementSibling.removeChild(message);
                }

                let p = document.createElement("p");
                p.classList.add("error-message");
                p.classList.add("message");

                let img = document.createElement("img");
                img.src = "./images/popup/exclamation.svg";
                img.alt = "icon";

                let span = document.createElement("span");
                span.innerText = "Email đã tồn tại";
                openMessage('Email đã tồn tại' , 0)

                p.appendChild(img);
                p.appendChild(span);

                RegisterForm.previousElementSibling.appendChild(p);

            }
            if (response.data.status === 102) {

                let message = RegisterForm.previousElementSibling.querySelector(
                    ".message"
                );
                if (message) {
                    RegisterForm.previousElementSibling.removeChild(message);
                }

                let p = document.createElement("p");
                p.classList.add("error-message");
                p.classList.add("message");

                let img = document.createElement("img");
                img.src = "./images/popup/exclamation.svg";
                img.alt = "icon";

                let span = document.createElement("span");
                span.innerText = "Vui lòng chờ 2 phút trước khi gửi lại mã";
                openMessage('Vui lòng chờ 2 phút trước khi gửi lại mã' , 0)

                p.appendChild(img);
                p.appendChild(span);

                RegisterForm.previousElementSibling.appendChild(p);

            }
        });
});

RegisterFormLastname.addEventListener("keyup", () => {
    checkValidRegisterForm();
});

RegisterFormFirstname.addEventListener("keyup", () => {
    checkValidRegisterForm();
});

RegisterFormEmail.addEventListener("keyup", () => {
    checkValidRegisterFormEmail();
    checkValidRegisterForm();
});

RegisterFormEmail.addEventListener("focus", () => {
    checkValidRegisterFormEmail();
    checkValidRegisterForm();
});

RegisterFormPassword1.addEventListener("keyup", () => {
    checkValidRegisterFormPassword1();
    checkValidRegisterFormPassword2();
    checkValidRegisterForm();
});

RegisterFormPassword2.addEventListener("keyup", () => {
    checkValidRegisterFormPassword2();
    checkValidRegisterForm();
});

RegisterFormRefCode.addEventListener("keyup", () => {
    checkValidRegisterForm();
});

RegisterFormRegCode.addEventListener("keyup", () => {
    checkValidRegisterForm();
});

RegisterFormConsent.addEventListener("change", () => {
    checkValidRegisterForm();
});

RegisterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    kifAPI
        .post("/user", {
            email: RegisterForm.elements["email"].value,
            password: RegisterForm.elements["password1"].value,
            parent_ref_code: RegisterForm.elements["refcode"].value,
            email_code: RegisterForm.elements["regcode"].value,
        })
        .then(function (response) {
            if (response.data.status === 1) {
                let message = RegisterForm.previousElementSibling.querySelector(
                    ".message"
                );
                if (message) {
                    RegisterForm.previousElementSibling.removeChild(message);
                }

                let p = document.createElement("p");
                p.classList.add("success-message");
                p.classList.add("message");

                let img = document.createElement("img");
                img.src = "./images/popup/check.svg";
                img.alt = "icon";

                let span = document.createElement("span");
                span.innerText = "Đăng ký thành công!";
                openMessage('Đăng ký thành công!' , 1)

                p.appendChild(img);
                p.appendChild(span);

                RegisterForm.previousElementSibling.appendChild(p);

                LoginForm.reset()
                LoginFormEmail.value = RegisterForm.elements["email"].value;

                navigateToLoginForm();

                RegisterForm.reset();
                checkValidRegisterForm();
            } else {
                let message = RegisterForm.previousElementSibling.querySelector(
                    ".message"
                );
                if (message) {
                    RegisterForm.previousElementSibling.removeChild(message);
                }

                let p = document.createElement("p");
                p.classList.add("error-message");
                p.classList.add("message");

                let img = document.createElement("img");
                img.src = "./images/popup/exclamation.svg";
                img.alt = "icon";

                let span = document.createElement("span");
                span.innerText = "Đăng ký thất bại! Vui lòng thử lại!";
                openMessage('Đăng ký thất bại! Vui lòng thử lại!' , 1)

                p.appendChild(img);
                p.appendChild(span);

                RegisterForm.previousElementSibling.appendChild(p);
            }
        });
});
// End Handle Register Form

// Begin Handle Login Form
function checkValidLoginFormEmail() {
    let isValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
        LoginForm.elements["emailLogin"].value
    );

    if (!isValid) {
        let errMes = LoginFormEmail.parentElement.querySelector(
            ".error-message"
        );
        if (errMes) return;

        let p = document.createElement("p");
        p.classList.add("error-message");

        let img = document.createElement("img");
        img.src = "./images/popup/exclamation.svg";
        img.alt = "icon";

        let span = document.createElement("span");
        span.innerText = "Địa chỉ email không hợp lệ";

        p.appendChild(img);
        p.appendChild(span);

        LoginFormEmail.parentElement.appendChild(p);
        LoginFormError.push("error");
    } else {
        let errMes = LoginFormEmail.parentElement.querySelector(
            ".error-message"
        );
        if (!errMes) return;

        LoginFormEmail.parentElement.removeChild(errMes);
        LoginFormError.pop();
    }
}

function checkValidLoginForm() {
    let isValid =
        LoginFormError.length === 0 &&
        LoginForm.elements["emailLogin"].value !== "" &&
        LoginForm.elements["passwordLogin"].value !== "";

    if (isValid) {
        LoginFormSubmitButton.style.cursor = "pointer";
        LoginFormSubmitButton.style.opacity = "1";
        LoginFormSubmitButton.disabled = false;
    } else {
        LoginFormSubmitButton.style.cursor = "not-allowed";
        LoginFormSubmitButton.style.opacity = ".3";
        LoginFormSubmitButton.disabled = true;
    }
}

function checkLocalStorage() {
    let emailLogin = localStorage.getItem("emailLogin");
    let passwordLogin = localStorage.getItem("passwordLogin");
    if (emailLogin && passwordLogin) {
        LoginForm.elements["emailLogin"].value = emailLogin;
        LoginForm.elements["passwordLogin"].value = passwordLogin;
    }
    checkValidLoginForm();
};

LoginFormEmail.addEventListener("keyup", () => {
    checkValidLoginFormEmail();
    checkValidLoginForm();
});

LoginFormPassword.addEventListener("keyup", () => {
    checkValidLoginForm();
});

LoginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let isRemember = LoginForm.elements["rememberLogin"].checked;
    if (isRemember) {
        localStorage.setItem(
            "emailLogin",
            LoginForm.elements["emailLogin"].value
        );
        localStorage.setItem(
            "passwordLogin",
            LoginForm.elements["passwordLogin"].value
        );
    } else {
        if (localStorage.getItem("emailLogin"))
            localStorage.removeItem("emailLogin");
        if (localStorage.getItem("passwordLogin"))
            localStorage.removeItem("passwordLogin");
    }

    kifAPI
        .post("/login", {
            email: LoginForm.elements["emailLogin"].value,
            password: LoginForm.elements["passwordLogin"].value,
        })
        .then(function (response) {
            openMessage('Đăng nhập thành công' , 1)
            if (response.data.status === 101) {
                containerForm
                    .querySelector('[class*="active"]')
                    .classList.remove("active");
                formAuthentication.classList.add("active");
            }

            if (response.data.status === 1) {
                localStorage.setItem("jwt", response.data.jwt);
                window.open("/dashboard", "_self");
            }

            if (response.data.status !== 1) {
                let message = LoginForm.previousElementSibling.querySelector(
                    ".message"
                );
                if (message) {
                    LoginForm.previousElementSibling.removeChild(message);
                }

                let p = document.createElement("p");
                p.classList.add("error-message");
                p.classList.add("message");

                let img = document.createElement("img");
                img.src = "./images/popup/exclamation.svg";
                img.alt = "icon";

                let span = document.createElement("span");
                span.innerText = "Có lỗi xảy ra! Vui lòng nhập lại!";

                p.appendChild(img);
                p.appendChild(span);

                LoginForm.previousElementSibling.appendChild(p);

                if (response.data.status === 100) {
                    let message = LoginForm.previousElementSibling.querySelector(
                        ".message"
                    );
                    if (message) {
                        LoginForm.previousElementSibling.removeChild(message);
                    }

                    let p = document.createElement("p");
                    p.classList.add("error-message");
                    p.classList.add("message");

                    let img = document.createElement("img");
                    img.src = "./images/popup/exclamation.svg";
                    img.alt = "icon";

                    let span = document.createElement("span");
                    span.innerText = "Email không tồn tại";
                    openMessage('Email không tồn tại' , 0)

                    p.appendChild(img);
                    p.appendChild(span);

                    LoginForm.previousElementSibling.appendChild(p);
                }

                if (response.data.status === 102) {
                    let message = LoginForm.previousElementSibling.querySelector(
                        ".message"
                    );
                    if (message) {
                        LoginForm.previousElementSibling.removeChild(message);
                    }

                    let p = document.createElement("p");
                    p.classList.add("error-message");
                    p.classList.add("message");

                    let img = document.createElement("img");
                    img.src = "./images/popup/exclamation.svg";
                    img.alt = "icon";

                    let span = document.createElement("span");
                    span.innerText = "Sai mật khẩu";
                    openMessage('Sai mật khẩu' , 0)

                    p.appendChild(img);
                    p.appendChild(span);

                    LoginForm.previousElementSibling.appendChild(p);
                }
                if (response.data.status === 104) {
                    let message = LoginForm.previousElementSibling.querySelector(
                        ".message"
                    );
                    if (message) {
                        LoginForm.previousElementSibling.removeChild(message);
                    }

                    let p = document.createElement("p");
                    p.classList.add("error-message");
                    p.classList.add("message");

                    let img = document.createElement("img");
                    img.src = "./images/popup/exclamation.svg";
                    img.alt = "icon";

                    let span = document.createElement("span");
                    span.innerText = "Tài khoản đã bị khóa";
                    openMessage('Tài khoản đã bị khóa' , 0)

                    p.appendChild(img);
                    p.appendChild(span);

                    LoginForm.previousElementSibling.appendChild(p);
                }
                if (response.data.status === 105) {
                    let message = LoginForm.previousElementSibling.querySelector(
                        ".message"
                    );
                    if (message) {
                        LoginForm.previousElementSibling.removeChild(message);
                    }

                    let p = document.createElement("p");
                    p.classList.add("error-message");
                    p.classList.add("message");

                    let img = document.createElement("img");
                    img.src = "./images/popup/exclamation.svg";
                    img.alt = "icon";

                    let span = document.createElement("span");
                    openMessage('Đã lâu bạn chưa đổi mật khẩu!! Vui lòng đổi mật khẩu' , 1)
                    navigateToForgotForm()

                    p.appendChild(img);
                    p.appendChild(span);

                    LoginForm.previousElementSibling.appendChild(p);

                    
                }
            }
        });
});
// End Handle Login Form

// Begin Handle Authentication Form
function checkValidAuthenticationForm() {
    let isValid =
        AuthenticationFormError.length === 0 &&
        AuthenticationForm.elements["authentication-code"].value !== "";

    if (isValid) {
        AuthenticationFormSubmitButton.style.cursor = "pointer";
        AuthenticationFormSubmitButton.style.opacity = "1";
        AuthenticationFormSubmitButton.disabled = false;
    } else {
        AuthenticationFormSubmitButton.style.cursor = "not-allowed";
        AuthenticationFormSubmitButton.style.opacity = ".3";
        AuthenticationFormSubmitButton.disabled = true;
    }
}

AuthenticationFormCode.addEventListener("keyup", () => {
});

AuthenticationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    kifAPI
        .post("/login", {
            email: LoginForm.elements["emailLogin"].value,
            password: LoginForm.elements["passwordLogin"].value,
            code_2fa: AuthenticationForm.elements["authentication-code"].value,
        })
        .then(function (response) {
            if (response.data.status === 1) {
                localStorage.setItem("jwt", response.data.jwt);
                window.open("/dashboard", "_self");
            }

            if (response.data.status === 103) {
                let message = AuthenticationForm.previousElementSibling.querySelector(
                    ".message"
                );
                if (message) {
                    AuthenticationForm.previousElementSibling.removeChild(
                        message
                    );
                }

                let p = document.createElement("p");
                p.classList.add("error-message");
                p.classList.add("message");

                let img = document.createElement("img");
                img.src = "./images/popup/exclamation.svg";
                img.alt = "icon";

                let span = document.createElement("span");
                span.innerText = "Mã xác minh không đúng! Vui lòng nhập lại!";
                openMessage('Mã xác minh không đúng! Vui lòng nhập lại!' , 0)

                p.appendChild(img);
                p.appendChild(span);

                AuthenticationForm.previousElementSibling.appendChild(p);
            }

            if (response.data.status === 105) {
                let message = AuthenticationForm.previousElementSibling.querySelector(
                    ".message"
                );
                if (message) {
                    AuthenticationForm.previousElementSibling.removeChild(
                        message
                    );
                }

                let p = document.createElement("p");
                p.classList.add("error-message");
                p.classList.add("message");

                let img = document.createElement("img");
                img.src = "./images/popup/exclamation.svg";
                img.alt = "icon";

                let span = document.createElement("span");
                openMessage('Đã lâu bạn chưa đổi mật khẩu!! Vui lòng đổi mật khẩu' , 1)
                navigateToForgotForm()

                p.appendChild(img);
                p.appendChild(span);

                AuthenticationForm.previousElementSibling.appendChild(p);
            }
        });
});
// End Handle Authentication Form

// Begin Handle Forgot Form
function checkValidForgotFormEmail() {
    let isValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
        ForgotForm.elements["email-forgot"].value
    );

    if (!isValid) {
        let errMes = ForgotFormEmail.parentElement.querySelector(
            ".error-message"
        );
        if (errMes) return;

        let p = document.createElement("p");
        p.classList.add("error-message");

        let img = document.createElement("img");
        img.src = "./images/popup/exclamation.svg";
        img.alt = "icon";

        let span = document.createElement("span");
        span.innerText = "Địa chỉ email không hợp lệ";

        p.appendChild(img);
        p.appendChild(span);

        ForgotFormEmail.parentElement.appendChild(p);
        ForgotFormError.push("error");
    } else {
        let errMes = ForgotFormEmail.parentElement.querySelector(
            ".error-message"
        );
        if (!errMes) return;

        ForgotFormEmail.parentElement.removeChild(errMes);
        ForgotFormError.pop();
    }
}

function checkValidForgotForm() {
    let isValid =
        ForgotFormError.length === 0 &&
        ForgotForm.elements["email-forgot"].value !== "";

    if (isValid) {
        ForgotFormSubmitButton.style.cursor = "pointer";
        ForgotFormSubmitButton.style.opacity = "1";
        ForgotFormSubmitButton.disabled = false;
    } else {
        ForgotFormSubmitButton.style.cursor = "not-allowed";
        ForgotFormSubmitButton.style.opacity = ".3";
        ForgotFormSubmitButton.disabled = true;
    }
}

ForgotFormEmail.addEventListener("keyup", () => {
    checkValidForgotFormEmail();
    checkValidForgotForm();
});

ForgotForm.addEventListener("submit", (e) => {
    e.preventDefault();

    kifAPI
        .post("/forgot_password_code", {
            email: ForgotForm.elements["email-forgot"].value,
        })
        .then(function (response) {
            if (response.data.status === 101) {
                let message = ForgotForm.previousElementSibling.querySelector(
                    ".message"
                );
                if (message) {
                    ForgotForm.previousElementSibling.removeChild(message);
                }

                let p = document.createElement("p");
                p.classList.add("error-message");
                p.classList.add("message");

                let img = document.createElement("img");
                img.src = "./images/popup/exclamation.svg";
                img.alt = "icon";

                let span = document.createElement("span");
                span.innerText = "Email không tồn tại";
                openMessage('Email không tồn tại' , 0)

                p.appendChild(img);
                p.appendChild(span);

                ForgotForm.previousElementSibling.appendChild(p);
            }
            if (response.data.status === 102) {
                let message = ForgotForm.previousElementSibling.querySelector(
                    ".message"
                );
                if (message) {
                    ForgotForm.previousElementSibling.removeChild(message);
                }

                let p = document.createElement("p");
                p.classList.add("error-message");
                p.classList.add("message");

                let img = document.createElement("img");
                img.src = "./images/popup/exclamation.svg";
                img.alt = "icon";

                let span = document.createElement("span");
                span.innerText = "Vui lòng chờ 2 phút trước khi nhận mã mới!";
                openMessage('Vui lòng chờ 2 phút trước khi nhận mã mới!' , 0)

                p.appendChild(img);
                p.appendChild(span);

                ForgotForm.previousElementSibling.appendChild(p);
            }

            if (response.data.status === 1) {
                openMessage('Đã gửi mã vào email của bạn' , 1)

                ResetForm.elements["email-reset"].value =
                    ForgotForm.elements["email-forgot"].value;
                containerForm
                    .querySelector('[class*="active"]')
                    .classList.remove("active");
                formReset.classList.add("active");
            }
        });
});
// End Handle Forgot Form

// Begin Handle Reset Form
function checkValidResetFormPassword() {
    let isValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/.test(
        ResetForm.elements["password-reset"].value
    );

    if (!isValid) {
        let errMes = ResetFormPassword.parentElement.parentElement.querySelector(
            ".error-message"
        );
        if (errMes) return;

        let p = document.createElement("p");
        p.classList.add("error-message");

        let img = document.createElement("img");
        img.src = "./images/popup/exclamation.svg";
        img.alt = "icon";

        let span = document.createElement("span");
        span.innerText =
            "Mật khẩu yêu cầu tối thiểu tám ký tự, ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt";

        p.appendChild(img);
        p.appendChild(span);

        ResetFormPassword.parentElement.parentElement.appendChild(p);
        ResetFormError.push("error");
    } else {
        let errMes = ResetFormPassword.parentElement.parentElement.querySelector(
            ".error-message"
        );
        if (!errMes) return;

        ResetFormPassword.parentElement.parentElement.removeChild(errMes);
        ResetFormError.pop();
    }
}

function checkValidResetForm() {
    let isValid =
        ResetFormError.length === 0 &&
        ResetForm.elements["email-reset"].value !== "" &&
        ResetForm.elements["password-reset"].value !== "" &&
        ResetForm.elements["code-reset"].value !== "";

    if (isValid) {
        ResetFormSubmitButton.style.cursor = "pointer";
        ResetFormSubmitButton.style.opacity = "1";
        ResetFormSubmitButton.disabled = false;
    } else {
        ResetFormSubmitButton.style.cursor = "not-allowed";
        ResetFormSubmitButton.style.opacity = ".3";
        ResetFormSubmitButton.disabled = true;
    }
}

ResetFormPassword.addEventListener("keyup", () => {
    checkValidResetFormPassword();
    checkValidResetForm();
});

ResetFormCode.addEventListener("keyup", () => {
    checkValidResetForm();
});


ResetFormPassword.addEventListener("change", () => {
    checkValidResetFormPassword();
    checkValidResetForm();
});

ResetFormCode.addEventListener("change", () => {
    checkValidResetForm();
});

ResetFormPassword.addEventListener("input", () => {
    checkValidResetFormPassword();
    checkValidResetForm();
});

ResetFormCode.addEventListener("input", () => {
    checkValidResetForm();
});


ResetForm.addEventListener("submit", (e) => {
    e.preventDefault();

    kifAPI
        .post("/forgot_password", {
            email: ResetForm.elements["email-reset"].value,
            password: ResetForm.elements["password-reset"].value,
            email_code: ResetForm.elements["code-reset"].value,
        })
        .then(function (response) {
            if (response.data.status === 101) {
                let message = ResetForm.previousElementSibling.querySelector(
                    ".message"
                );
                if (message) {
                    ResetForm.previousElementSibling.removeChild(message);
                }

                let p = document.createElement("p");
                p.classList.add("error-message");
                p.classList.add("message");

                let img = document.createElement("img");
                img.src = "./images/popup/exclamation.svg";
                img.alt = "icon";

                let span = document.createElement("span");
                span.innerText = "Email không tồn tại";
                openMessage('Email không tồn tại' , 0)

                p.appendChild(img);
                p.appendChild(span);

                ResetForm.previousElementSibling.appendChild(p);
            }

            if (response.data.status === 102) {
                let message = ResetForm.previousElementSibling.querySelector(
                    ".message"
                );
                if (message) {
                    ResetForm.previousElementSibling.removeChild(message);
                }

                let p = document.createElement("p");
                p.classList.add("error-message");
                p.classList.add("message");

                let img = document.createElement("img");
                img.src = "./images/popup/exclamation.svg";
                img.alt = "icon";

                let span = document.createElement("span");
                span.innerText = "Mã sai";
                openMessage('Mã sai' , 0)

                p.appendChild(img);
                p.appendChild(span);

                ResetForm.previousElementSibling.appendChild(p);
            }

            if (response.data.status === 103) {
                let message = ResetForm.previousElementSibling.querySelector(
                    ".message"
                );
                if (message) {
                    ResetForm.previousElementSibling.removeChild(message);
                }

                let p = document.createElement("p");
                p.classList.add("error-message");
                p.classList.add("message");

                let img = document.createElement("img");
                img.src = "./images/popup/exclamation.svg";
                img.alt = "icon";

                let span = document.createElement("span");
                span.innerText = "Mật khẩu mới không được giống mật khẩu cũ";
                openMessage('Mật khẩu mới không được giống mật khẩu cũ' , 0)

                p.appendChild(img);
                p.appendChild(span);

                ResetForm.previousElementSibling.appendChild(p);
            }

            if (response.data.status === 1) {
                let message = ResetForm.previousElementSibling.querySelector(
                    ".message"
                );
                if (message) {
                    ResetForm.previousElementSibling.removeChild(message);
                }

                let p = document.createElement("p");
                p.classList.add("success-message");
                p.classList.add("message");

                let img = document.createElement("img");
                img.src = "./images/popup/check.svg";
                img.alt = "icon";

                let span = document.createElement("span");
                span.innerText = "Đổi mật khẩu thành công!";
                openMessage('Đổi mật khẩu thành công!' , 1)

                p.appendChild(img);
                p.appendChild(span);

                ResetForm.previousElementSibling.appendChild(p);

                LoginFormEmail.value = ResetFormEmail.value;
                navigateToLoginForm();

                ResetForm.reset();
                checkValidResetForm();
            }
        });
});
// End Handle Reset Form

// Navigate Route Button
routeButtons.forEach((routeBtn) => {
    routeBtn.addEventListener("click", () => {
        if (routeBtn.classList.contains("active")) return;
        if (routeBtn.classList.contains("route-popup__register")) {
            navigateToRegisterForm();
            if (popup.classList.contains("show-menu-mobile")) {
                popup.classList.remove("show-menu-mobile");
            }
        }
        if (routeBtn.classList.contains("route-popup__login")) {
            navigateToLoginForm();
            if (popup.classList.contains("show-menu-mobile")) {
                popup.classList.remove("show-menu-mobile");
            }
        }
        if (routeBtn.classList.contains("route-popup__forgot")) {
            navigateToForgotForm();
            if (popup.classList.contains("show-menu-mobile")) {
                popup.classList.remove("show-menu-mobile");
            }
        }
    });
});

// Navigate To Login Form
const navigateToLoginForm = () => {
    containerRouteButtons
        .querySelector('[class*="active"]')
        .classList.remove("active");
    containerForm.querySelector('[class*="active"]').classList.remove("active");
    routeBtnLogin.classList.add("active");
    formLogin.classList.add("active");
};
linkToLogin.addEventListener("click", navigateToLoginForm);

// Navigate To Register Form
const navigateToRegisterForm = () => {
    containerRouteButtons
        .querySelector('[class*="active"]')
        .classList.remove("active");
    containerForm.querySelector('[class*="active"]').classList.remove("active");
    routeBtnRegister.classList.add("active");
    formRegister.classList.add("active");
};
linkToRegister.addEventListener("click", navigateToRegisterForm);

// Navigate To Forgot Form
const navigateToForgotForm = () => {
    containerRouteButtons
        .querySelector('[class*="active"]')
        .classList.remove("active");
    containerForm.querySelector('[class*="active"]').classList.remove("active");
    routeBtnForgot.classList.add("active");
    formForgot.classList.add("active");
};
linkToForgot.addEventListener("click", navigateToForgotForm);

// Show Popup, Open Form Register
const openRegForm = () => {
    popup.classList.add("show");
    routeBtnRegister.classList.add("active");
    formRegister.classList.add("active");
};
registerBtn.addEventListener("click", openRegForm);

// Show Popup, Open Form Login
const openLoginForm = () => {
    popup.classList.add('show');
    routeBtnLogin.classList.add('active');
    formLogin.classList.add('active');
}
loginBtn.addEventListener('click', openLoginForm);

// Hide popup, Remove class active all Elements
function hidePopup() {
    popup.classList.remove('show');
    containerRouteButtons.querySelector('[class*="active"]').classList.remove('active');
    containerForm.querySelector('[class*="active"]').classList.remove('active');
}
overlay.addEventListener('click', hidePopup);
closeIcon.addEventListener('click', hidePopup);

var search = window.location.search
search = search.replace('?ref=' , '')
if(search){
    openRegForm()
    RegisterForm.elements['refcode'].value = search
}


kifAPI.get('/home_page_transactions')
.then(res => {
    var data = res.data.data
    var marquee = document.querySelector('marquee')
    var html = ``
    data.forEach(el => {
        var d = new Date(el.create_date)
        html +=`
        <p class="${el.type === 22 ? 'draw' : 'invest'}">
            ${el.from.email} - ${el.type === 22 ? 'Rút lãi' : 'Đầu tư'} 
            <span>$${Math.ceil(el.value_in_usdt * 100) / 100}</span> 
            - ${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}
        </p>
        `
    })

    marquee.insertAdjacentHTML('afterbegin',html)
})

const handleChangeEye = function(e) {
    var src = e.getAttribute('src')
    var input = e.previousElementSibling
    if(src.indexOf('eye-close') === -1) {
        e.setAttribute('src', src.replace('eye', 'eye-close'))
        input.setAttribute('type' , 'text')
    }else{
        e.setAttribute('src', src.replace('eye-close', 'eye'))
        input.setAttribute('type' , 'password')
    }
}