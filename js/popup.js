// let routeBtnRegister = document.querySelector('.route-popup__register');
// let routeBtnLogin = document.querySelector('.route-popup__login');
// let routeBtnForgot = document.querySelector('.route-popup__forgot');

// let formRegister = document.querySelector('.form-register');
// let formLogin = document.querySelector('.form-login');
// let formAuthentication = document.querySelector('.form-authentication');
// let formForgot = document.querySelector('.form-forgot');
// let formReset = document.querySelector('.form-reset');

// let popup = document.querySelector('#popup');
// let overlay = popup.querySelector('#overlay');
// let closeIcon = popup.querySelector('.close-icon');
// let menuIcon = popup.querySelector('.menu-icon-popup');

// let routeButtons = document.querySelectorAll('.route-popup__button');
// let containerForm = document.querySelector('.container-popup__right');
// let containerRouteButtons = document.querySelector('.route-popup');

// let linkToLogin = document.querySelector('.link-to-login');
// let linkToRegister = document.querySelector('.link-to-register');
// let linkToForgot = document.querySelector('.link-to-forgot');

// let RegisterFormError = [];
// let RegisterForm = document.querySelector('form[name="form-register"]');
// let RegisterFormFirstname = RegisterForm.querySelector('#firstname');
// let RegisterFormLastname = RegisterForm.querySelector('#lastname');
// let RegisterFormEmail = RegisterForm.querySelector('#email');
// let RegisterFormPassword1 = RegisterForm.querySelector('#password1');
// let RegisterFormPassword2 = RegisterForm.querySelector('#password2');
// let RegisterFormRefCode = RegisterForm.querySelector('#refcode');
// let RegisterFormRegCode = RegisterForm.querySelector('#regcode');
// let RegisterFormConsent = RegisterForm.querySelector('#consent');
// let getRegcodeByEmail = RegisterForm.querySelector('.get-regcode-by-email');
// let RegisterFormSubmitButton = RegisterForm.querySelector('button[type="submit"]');

// let LoginFormError = [];
// let LoginForm = document.querySelector('form[name="form-login"]');
// let LoginFormEmail = LoginForm.querySelector('#email-login');
// let LoginFormPassword = LoginForm.querySelector('#password-login');
// let LoginFormRemember = LoginForm.querySelector('#remember-login');
// let LoginFormSubmitButton = LoginForm.querySelector('button[type="submit"]');

// let AuthenticationFormError = [];
// let AuthenticationForm = document.querySelector('form[name="form-authentication"]');
// let AuthenticationFormCode = AuthenticationForm.querySelector('#code-authentication');
// let AuthenticationFormSubmitButton = AuthenticationForm.querySelector('button[type="submit"]');

// let ForgotFormError = [];
// let ForgotForm = document.querySelector('form[name="form-forgot"]');
// let ForgotFormEmail = ForgotForm.querySelector('#email-forgot');
// let ForgotFormSubmitButton = ForgotForm.querySelector('button[type="submit"]');

// let ResetFormError = [];
// let ResetForm = document.querySelector('form[name="form-reset"]');
// let ResetFormEmail = ResetForm.querySelector('#email-reset');
// let ResetFormPassword = ResetForm.querySelector('#password-reset');
// let ResetFormCode = ResetForm.querySelector('#code-reset');
// let ResetFormSubmitButton = ResetForm.querySelector('button[type="submit"]');

const openMessage = function (message, type) {
    var blockMessage = document.getElementById('message');
    blockMessage.innerText = message;
    blockMessage.classList.add('show');
    if (type === 0) {
        blockMessage.classList.add('error');
        blockMessage.classList.remove('success');
    }
    if (type === 1) {
        blockMessage.classList.add('success');
        blockMessage.classList.remove('error');
    }

    setTimeout(() => {
        blockMessage.classList.remove('show');
        blockMessage.classList.remove('success');
        blockMessage.classList.remove('error');
    }, 5000);
};

const handleChangeEye = function (img) {
    var src = img.getAttribute('src');
    var input = img.previousElementSibling;

    if (src.indexOf('eye-close') === -1) {
        img.setAttribute('alt', 'eye-close');
        img.setAttribute('src', src.replace('eye', 'eye-close'));
        input.setAttribute('type', 'text');
    } else {
        img.setAttribute('alt', 'eye');
        img.setAttribute('src', src.replace('eye-close', 'eye'));
        input.setAttribute('type', 'password');
    }
};

// Begin Handle Register Form
const checkValidRegisterFormEmail = () => {
    let RegisterForm = document.querySelector('form[name="form-register"]');
    let RegisterFormEmail = RegisterForm.querySelector('#email');
    let ErrorMessage = RegisterFormEmail.parentElement.querySelector('.error-message');
    let getRegcodeByEmail = RegisterForm.querySelector('.get-regcode-by-email');

    let isValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(RegisterFormEmail.value);

    if (isValid && ErrorMessage.classList.contains('show')) {
        ErrorMessage.classList.remove('show');
        RegisterFormError.pop();
    }

    if (!isValid && !ErrorMessage.classList.contains('show')) {
        ErrorMessage.classList.add('show');
        RegisterFormError.push('error');
    }

    if (isValid && getRegcodeByEmail.disabled === true) {
        getRegcodeByEmail.disabled = false;
    }

    if (!isValid && getRegcodeByEmail.disabled === false) {
        getRegcodeByEmail.disabled = true;
    }
};

const checkValidRegisterFormPassword1 = () => {
    let RegisterForm = document.querySelector('form[name="form-register"]');
    let RegisterFormPassword1 = RegisterForm.querySelector('#password1');
    let ErrorMessage = RegisterFormPassword1.parentElement.querySelector('.error-message');

    let isValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])([0-9a-zA-Z!@#$%^&*]{8,})$/.test(
        RegisterFormPassword1.value
    );

    if (isValid && ErrorMessage.classList.contains('show')) {
        ErrorMessage.classList.remove('show');
        RegisterFormError.pop();
    }

    if (!isValid && !ErrorMessage.classList.contains('show')) {
        ErrorMessage.classList.add('show');
        RegisterFormError.push('error');
    }
};

const checkValidRegisterFormPassword2 = () => {
    let RegisterForm = document.querySelector('form[name="form-register"]');
    let RegisterFormPassword1 = RegisterForm.querySelector('#password1');
    let RegisterFormPassword2 = RegisterForm.querySelector('#password2');
    let ErrorMessage = RegisterFormPassword2.parentElement.querySelector('.error-message');

    let isValid = RegisterFormPassword1.value === RegisterFormPassword2.value;

    if (isValid && ErrorMessage.classList.contains('show')) {
        ErrorMessage.classList.remove('show');
        RegisterFormError.pop();
    }

    if (!isValid && !ErrorMessage.classList.contains('show')) {
        ErrorMessage.classList.add('show');
        RegisterFormError.push('error');
    }
};

const checkValidRegisterForm = () => {
    let RegisterForm = document.querySelector('form[name="form-register"]');
    let RegisterFormFirstname = RegisterForm.querySelector('#firstname');
    let RegisterFormLastname = RegisterForm.querySelector('#lastname');
    let RegisterFormRefCode = RegisterForm.querySelector('#refcode');
    let RegisterFormRegCode = RegisterForm.querySelector('#regcode');
    let RegisterFormConsent = RegisterForm.querySelector('#consent');
    let RegisterFormSubmitButton = RegisterForm.querySelector('button[type="submit"]');

    let isValid =
        RegisterFormError.length === 0 &&
        RegisterFormFirstname.value !== '' &&
        RegisterFormLastname.value !== '' &&
        RegisterFormRefCode.value !== '' &&
        RegisterFormRegCode.value !== '' &&
        RegisterFormConsent.checked;

    if (isValid && RegisterFormSubmitButton.disabled === true) {
        RegisterFormSubmitButton.disabled = false;
    }

    if (!isValid && RegisterFormSubmitButton.disabled === false) {
        RegisterFormSubmitButton.disabled = true;
    }
};

const eventClickGetRegCodeByEmail = () => {
    let RegisterForm = document.querySelector('form[name="form-register"]');
    let RegisterFormEmail = RegisterForm.querySelector('#email');

    kifAPI.post('/reg_code', { email: RegisterFormEmail.value }).then(function (response) {
        if (response.data.status === 1) {
            openMessage(
                checklanguage(currLanguage, {
                    vi: 'Lấy mã thành công! Vui lòng kiểm tra email!',
                    en: 'Get code successfully! Please check your email!',
                    ja: 'Get code successfully! Please check your email!',
                    kr: 'Get code successfully! Please check your email!',
                    cn: 'Get code successfully! Please check your email!',
                    fr: 'Get code successfully! Please check your email!',
                    es: 'Get code successfully! Please check your email!',
                }),
                1
            );
        }

        if (response.data.status === 100) {
            openMessage(
                checklanguage(currLanguage, {
                    vi: 'Email đã tồn tại trong hệ thống',
                    en: 'This email has been used',
                    ja: 'Ｅメールアドレスはすでに使用されています。',
                    kr: '이메일 주소 이미 사용됩니다',
                    cn: '这个电子邮件地址已经注册过',
                    fr: "L'adresse e-mail que vous avez saisie est déjà enregistrée",
                    es: 'La dirección de correo electrónico que ha ingresado ya está registrada',
                }),
                0
            );
        }
        if (response.data.status === 101) {
            openMessage(
                checklanguage(currLanguage, {
                    vi: 'Vui lòng chờ 2 phút trước khi nhận mã mới!',
                    en: 'Please wait 2 minutes before get a new code!',
                    ja: 'Please wait 2 minutes before get a new code!',
                    kr: 'Please wait 2 minutes before get a new code!',
                    cn: 'Please wait 2 minutes before get a new code!',
                    fr: 'Please wait 2 minutes before get a new code!',
                    es: 'Please wait 2 minutes before get a new code!',
                }),
                0
            );
        }
    });
};

const eventKeyUpRegisterFormEmail = () => {
    checkValidRegisterFormEmail();
    checkValidRegisterForm();
};

const eventKeyUpRegisterFormPassword1 = () => {
    checkValidRegisterFormPassword1();
    checkValidRegisterFormPassword2();
    checkValidRegisterForm();
};

const eventKeyUpRegisterFormPassword2 = () => {
    checkValidRegisterFormPassword2();
    checkValidRegisterForm();
};

const eventSubmitRegisterForm = e => {
    e.preventDefault();

    let RegisterForm = document.querySelector('form[name="form-register"]');
    let LoginForm = document.querySelector('form[name="form-login"]');
    let RegisterFormEmail = RegisterForm.querySelector('#email');
    let RegisterFormPassword1 = RegisterForm.querySelector('#password1');
    let RegisterFormRefCode = RegisterForm.querySelector('#refcode');
    let RegisterFormRegCode = RegisterForm.querySelector('#regcode');

    kifAPI
        .post('/user', {
            email: RegisterFormEmail.value,
            password: RegisterFormPassword1.value,
            parent_ref_code: RegisterFormRefCode.value,
            email_code: RegisterFormRegCode.value,
        })
        .then(function (response) {
            if (response.data.status === 1) {
                openMessage(
                    checklanguage(currLanguage, {
                        vi: 'Đăng ký thành công!',
                        en: 'Register successfully!',
                        ja: 'Register successfully!',
                        kr: 'Register successfully!',
                        cn: 'Register successfully!',
                        fr: 'Register successfully!',
                        es: 'Register successfully!',
                    }),
                    1
                );

                LoginForm.reset();
                LoginFormEmail.value = RegisterFormEmail.value;
                checkValidLoginFormEmail();
                checkValidLoginForm();
                navigateToLoginForm();

                RegisterForm.reset();
                checkValidRegisterForm();
            } else {
                openMessage(
                    checklanguage(currLanguage, {
                        vi: 'Đăng ký thất bại! Vui lòng thử lại!',
                        en: 'Registration failed! Please try again!',
                        ja: 'Registration failed! Please try again!',
                        kr: 'Registration failed! Please try again!',
                        cn: 'Registration failed! Please try again!',
                        fr: 'Registration failed! Please try again!',
                        es: 'Registration failed! Please try again!',
                    }),
                    0
                );
            }
        });
};
// End Handle Register Form

// Begin Handle Login Form
const checkValidLoginFormEmail = () => {
    let LoginForm = document.querySelector('form[name="form-login"]');
    let LoginFormEmail = LoginForm.querySelector('#email-login');
    let ErrorMessage = LoginFormEmail.parentElement.querySelector('.error-message');

    let isValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(LoginFormEmail.value);

    if (isValid && ErrorMessage.classList.contains('show')) {
        ErrorMessage.classList.remove('show');
        LoginFormError.pop();
    }

    if (!isValid && !ErrorMessage.classList.contains('show')) {
        ErrorMessage.classList.add('show');
        LoginFormError.push('error');
    }
};

const checkValidLoginFormPassword = () => {
    let LoginForm = document.querySelector('form[name="form-login"]');
    let LoginFormPassword = LoginForm.querySelector('#password-login');
    let ErrorMessage = LoginFormPassword.parentElement.querySelector('.error-message');

    let isValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])([0-9a-zA-Z!@#$%^&*]{8,})$/.test(
        LoginFormPassword.value
    );

    if (isValid && ErrorMessage.classList.contains('show')) {
        ErrorMessage.classList.remove('show');
        LoginFormError.pop();
    }

    if (!isValid && !ErrorMessage.classList.contains('show')) {
        ErrorMessage.classList.add('show');
        LoginFormError.push('error');
    }
};

const checkValidLoginForm = () => {
    let LoginForm = document.querySelector('form[name="form-login"]');
    let LoginFormEmail = LoginForm.querySelector('#email-login');
    let LoginFormPassword = LoginForm.querySelector('#password-login');
    let LoginFormSubmitButton = LoginForm.querySelector('button[type="submit"]');

    let isValid =
        LoginFormError.length === 0 &&
        LoginFormEmail.value !== '' &&
        LoginFormPassword.value !== '';

    if (isValid && LoginFormSubmitButton.disabled === true) {
        LoginFormSubmitButton.disabled = false;
    }

    if (!isValid && LoginFormSubmitButton.disabled === false) {
        LoginFormSubmitButton.disabled = true;
    }
};

// const checkLocalStorage = () => {
//     let email = localStorage.getItem('email');
//     let password = localStorage.getItem('password');

//     let LoginForm = document.querySelector('form[name="form-login"]');
//     let LoginFormEmail = LoginForm.querySelector('#email-login');
//     let LoginFormPassword = LoginForm.querySelector('#password-login');

//     if (email && password) {
//         LoginFormEmail.value = email;
//         LoginFormPassword.value = password;
//     }

//     checkValidLoginFormEmail();
//     checkValidLoginFormPassword();
//     checkValidLoginForm();
// };
// checkLocalStorage();

const eventKeyUpLoginFormEmail = () => {
    checkValidLoginFormEmail();
    checkValidLoginForm();
};

const eventKeyUpLoginFormPassword = () => {
    checkValidLoginFormPassword();
    checkValidLoginForm();
};

const eventSubmitLoginForm = e => {
    e.preventDefault();

    let LoginForm = document.querySelector('form[name="form-login"]');
    let LoginFormEmail = LoginForm.querySelector('#email-login');
    let LoginFormPassword = LoginForm.querySelector('#password-login');
    let LoginFormRemember = LoginForm.querySelector('#remember-login');

    let AuthenticationForm = document.querySelector('form[name="form-authentication"]');
    let ForgotForm = document.querySelector('form[name="form-forgot"]');

    let isRemember = LoginFormRemember.checked;
    if (isRemember) {
        localStorage.setItem('email', LoginFormEmail.value);
        localStorage.setItem('password', LoginFormPassword.value);
    } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
    }

    kifAPI
        .post('/login', {
            email: LoginFormEmail.value,
            password: LoginFormPassword.value,
        })
        .then(function (response) {
            if (response.data.status === 1) {
                openMessage(
                    checklanguage(currLanguage, {
                        vi: 'Đăng nhập thành công!',
                        en: 'Log In successfully!',
                        ja: 'Log In successfully!',
                        kr: 'Log In successfully!',
                        cn: 'Log In successfully!',
                        fr: 'Log In successfully!',
                        es: 'Log In successfully!',
                    }),
                    1
                );

                localStorage.setItem('jwt', response.data.jwt);

                setTimeout(() => {
                    window.open('/dashboard', '_self');
                }, 1000);
            }

            if (response.data.status === 100) {
                openMessage('Email không tồn tại', 0);
            }

            if (response.data.status === 101) {
                openMessage('Đã gửi mã vào email của bạn', 1);

                AuthenticationForm.reset();
                checkValidAuthenticationForm();
                navigateToAuthenticationForm();

                LoginForm.reset();
                checkValidLoginForm();
            }

            if (response.data.status === 102) {
                openMessage('Sai mật khẩu', 0);
            }

            if (response.data.status === 104) {
                openMessage('Tài khoản đã bị khóa', 0);
            }

            if (response.data.status === 105) {
                openMessage('Đã lâu bạn chưa đổi mật khẩu!! Vui lòng đổi mật khẩu', 1);

                ForgotForm.reset();
                checkValidForgotForm();
                navigateToForgotForm();
            }
        });
};
// End Handle Login Form

// Begin Handle Authentication Form
const checkValidAuthenticationForm = () => {
    let AuthenticationForm = document.querySelector('form[name="form-authentication"]');
    let AuthenticationFormCode = AuthenticationForm.querySelector('#code-authentication');
    let AuthenticationFormSubmitButton = AuthenticationForm.querySelector('button[type="submit"]');

    let isValid = AuthenticationFormError.length === 0 && AuthenticationFormCode.value !== '';

    if (isValid && AuthenticationFormSubmitButton.disabled === true) {
        AuthenticationFormSubmitButton.disabled = false;
    }

    if (!isValid && AuthenticationFormSubmitButton.disabled === false) {
        AuthenticationFormSubmitButton.disabled = true;
    }
};

const eventSubmitAuthenticationForm = e => {
    e.preventDefault();

    let LoginForm = document.querySelector('form[name="form-login"]');
    let LoginFormEmail = LoginForm.querySelector('#email-login');
    let LoginFormPassword = LoginForm.querySelector('#password-login');

    let AuthenticationForm = document.querySelector('form[name="form-authentication"]');
    let AuthenticationFormCode = AuthenticationForm.querySelector('#code-authentication');

    let ForgotForm = document.querySelector('form[name="form-forgot"]');

    kifAPI
        .post('/login', {
            email: LoginFormEmail.value,
            password: LoginFormPassword.value,
            code_2fa: AuthenticationFormCode.value,
        })
        .then(function (response) {
            if (response.data.status === 1) {
                openMessage(
                    checklanguage(currLanguage, {
                        vi: 'Đăng nhập thành công!',
                        en: 'Log In successfully!',
                        ja: 'Log In successfully!',
                        kr: 'Log In successfully!',
                        cn: 'Log In successfully!',
                        fr: 'Log In successfully!',
                        es: 'Log In successfully!',
                    }),
                    1
                );

                localStorage.setItem('jwt', response.data.jwt);

                setTimeout(() => {
                    window.open('/dashboard', '_self');
                }, 1000);
            }

            if (response.data.status === 103) {
                openMessage('Mã xác minh không đúng! Vui lòng nhập lại!', 0);
            }

            if (response.data.status === 105) {
                openMessage('Đã lâu bạn chưa đổi mật khẩu!! Vui lòng đổi mật khẩu', 1);

                ForgotForm.reset();
                checkValidForgotForm();
                navigateToForgotForm();
            }
        });
};
// End Handle Authentication Form

// Begin Handle Forgot Form
const checkValidForgotFormEmail = () => {
    let ForgotForm = document.querySelector('form[name="form-forgot"]');
    let ForgotFormEmail = ForgotForm.querySelector('#email-forgot');
    let ErrorMessage = ForgotFormEmail.parentElement.querySelector('.error-message');

    let isValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(ForgotFormEmail.value);

    if (isValid && ErrorMessage.classList.contains('show')) {
        ErrorMessage.classList.remove('show');
        ForgotFormError.pop();
    }

    if (!isValid && !ErrorMessage.classList.contains('show')) {
        ErrorMessage.classList.add('show');
        ForgotFormError.push('error');
    }
};

const checkValidForgotForm = () => {
    let ForgotForm = document.querySelector('form[name="form-forgot"]');
    let ForgotFormEmail = ForgotForm.querySelector('#email-forgot');
    let ForgotFormSubmitButton = ForgotForm.querySelector('button[type="submit"]');

    let isValid = ForgotFormError.length === 0 && ForgotFormEmail.value !== '';

    if (isValid && ForgotFormSubmitButton.disabled === true) {
        ForgotFormSubmitButton.disabled = false;
    }

    if (!isValid && ForgotFormSubmitButton.disabled === false) {
        ForgotFormSubmitButton.disabled = true;
    }
};

const eventKeyUpForgotFormEmail = () => {
    checkValidForgotFormEmail();
    checkValidForgotForm();
};

const eventSubmitForgotForm = e => {
    e.preventDefault();

    let ForgotForm = document.querySelector('form[name="form-forgot"]');
    let ForgotFormEmail = ForgotForm.querySelector('#email-forgot');

    let ResetForm = document.querySelector('form[name="form-reset"]');
    let ResetFormEmail = ResetForm.querySelector('#email-reset');

    kifAPI
        .post('/forgot_password_code', {
            email: ForgotFormEmail.value,
        })
        .then(function (response) {
            if (response.data.status === 101) {
                openMessage('Email không tồn tại', 0);
            }

            if (response.data.status === 102) {
                openMessage('Vui lòng chờ 2 phút trước khi nhận mã mới!', 0);
            }

            if (response.data.status === 1) {
                openMessage('Đã gửi mã vào email của bạn', 1);

                ResetForm.reset();
                ResetFormEmail.value = ForgotFormEmail.value;
                checkValidResetForm();
                navigateToResetForm();

                ForgotForm.reset();
                checkValidForgotForm();
            }
        });
};
// End Handle Forgot Form

// Begin Handle Reset Form
const checkValidResetFormPassword = () => {
    let ResetForm = document.querySelector('form[name="form-reset"]');
    let ResetFormPassword = ResetForm.querySelector('#password-reset');
    let ErrorMessage = ResetFormPassword.parentElement.querySelector('.error-message');

    let isValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])([0-9a-zA-Z!@#$%^&*]{8,})$/.test(
        ResetFormPassword.value
    );

    if (isValid && ErrorMessage.classList.contains('show')) {
        ErrorMessage.classList.remove('show');
        ResetFormError.pop();
    }

    if (!isValid && !ErrorMessage.classList.contains('show')) {
        ErrorMessage.classList.add('show');
        ResetFormError.push('error');
    }
};

const checkValidResetForm = () => {
    let ResetForm = document.querySelector('form[name="form-reset"]');
    let ResetFormEmail = ResetForm.querySelector('#email-reset');
    let ResetFormPassword = ResetForm.querySelector('#password-reset');
    let ResetFormCode = ResetForm.querySelector('#code-reset');
    let ResetFormSubmitButton = ResetForm.querySelector('button[type="submit"]');

    let isValid =
        ResetFormError.length === 0 &&
        ResetFormEmail.value !== '' &&
        ResetFormPassword.value !== '' &&
        ResetFormCode.value !== '';

    if (isValid && ResetFormSubmitButton.disabled === true) {
        ResetFormSubmitButton.disabled = false;
    }

    if (!isValid && ResetFormSubmitButton.disabled === false) {
        ResetFormSubmitButton.disabled = true;
    }
};

const eventKeyUpResetFormPassword = () => {
    checkValidResetFormPassword();
    checkValidResetForm();
};

const eventSubmitResetForm = e => {
    e.preventDefault();

    let ResetForm = document.querySelector('form[name="form-reset"]');
    let ResetFormEmail = ResetForm.querySelector('#email-reset');
    let ResetFormPassword = ResetForm.querySelector('#password-reset');
    let ResetFormCode = ResetForm.querySelector('#code-reset');

    let LoginForm = document.querySelector('form[name="form-login"]');
    let LoginFormEmail = LoginForm.querySelector('#email-login');

    kifAPI
        .post('/forgot_password', {
            email: ResetFormEmail.value,
            password: ResetFormPassword.value,
            email_code: ResetFormCode.value,
        })
        .then(function (response) {
            if (response.data.status === 101) {
                openMessage('Email không tồn tại', 0);
            }

            if (response.data.status === 102) {
                openMessage('Mã sai', 0);
            }

            if (response.data.status === 103) {
                openMessage('Mật khẩu mới không được giống mật khẩu cũ', 0);
            }

            if (response.data.status === 1) {
                openMessage('Đổi mật khẩu thành công!', 1);

                LoginForm.reset();
                LoginFormEmail.value = ResetFormEmail.value;
                checkValidLoginForm();
                navigateToLoginForm();

                ResetForm.reset();
                checkValidResetForm();
            }
        });
};
// End Handle Reset Form

const showMenuMobile = () => {
    let popup = document.querySelector('#popup');
    popup.classList.toggle('show-menu-mobile');
};

const navigateByRouteButton = routeBtn => {
    let popup = document.querySelector('#popup');

    if (routeBtn.classList.contains('active')) return;
    if (routeBtn.classList.contains('route-popup__register')) {
        navigateToRegisterForm();
        if (popup.classList.contains('show-menu-mobile')) {
            popup.classList.remove('show-menu-mobile');
        }
    }
    if (routeBtn.classList.contains('route-popup__login')) {
        navigateToLoginForm();
        if (popup.classList.contains('show-menu-mobile')) {
            popup.classList.remove('show-menu-mobile');
        }
    }
    if (routeBtn.classList.contains('route-popup__forgot')) {
        navigateToForgotForm();
        if (popup.classList.contains('show-menu-mobile')) {
            popup.classList.remove('show-menu-mobile');
        }
    }
};

const navigateToRegisterForm = () => {
    let containerRouteButtons = document.querySelector('.route-popup');
    let containerForm = document.querySelector('.container-popup__right');
    let routeBtnRegister = document.querySelector('.route-popup__register');
    let formRegister = document.querySelector('.form-register');

    containerRouteButtons.querySelector('[class*="active"]').classList.remove('active');
    containerForm.querySelector('[class*="active"]').classList.remove('active');
    routeBtnRegister.classList.add('active');
    formRegister.classList.add('active');
};

const navigateToLoginForm = () => {
    let containerRouteButtons = document.querySelector('.route-popup');
    let containerForm = document.querySelector('.container-popup__right');
    let routeBtnLogin = document.querySelector('.route-popup__login');
    let formLogin = document.querySelector('.form-login');

    containerRouteButtons.querySelector('[class*="active"]').classList.remove('active');
    containerForm.querySelector('[class*="active"]').classList.remove('active');
    routeBtnLogin.classList.add('active');
    formLogin.classList.add('active');
};

const navigateToForgotForm = () => {
    let containerRouteButtons = document.querySelector('.route-popup');
    let containerForm = document.querySelector('.container-popup__right');
    let routeBtnForgot = document.querySelector('.route-popup__forgot');
    let formForgot = document.querySelector('.form-forgot');

    containerRouteButtons.querySelector('[class*="active"]').classList.remove('active');
    containerForm.querySelector('[class*="active"]').classList.remove('active');
    routeBtnForgot.classList.add('active');
    formForgot.classList.add('active');
};

const navigateToAuthenticationForm = () => {
    let containerForm = document.querySelector('.container-popup__right');
    let formAuthentication = document.querySelector('.form-authentication');

    containerForm.querySelector('[class*="active"]').classList.remove('active');
    formAuthentication.classList.add('active');
};

const navigateToResetForm = () => {
    let containerForm = document.querySelector('.container-popup__right');
    let formReset = document.querySelector('.form-reset');

    containerForm.querySelector('[class*="active"]').classList.remove('active');
    formReset.classList.add('active');
};

const openRegForm = () => {
    let popup = document.querySelector('#popup');
    let routeBtnRegister = document.querySelector('.route-popup__register');
    let formRegister = document.querySelector('.form-register');

    popup.classList.add('show');
    routeBtnRegister.classList.add('active');
    formRegister.classList.add('active');
};

const openLoginForm = () => {
    let popup = document.querySelector('#popup');
    let routeBtnLogin = document.querySelector('.route-popup__login');
    let formLogin = document.querySelector('.form-login');

    popup.classList.add('show');
    routeBtnLogin.classList.add('active');
    formLogin.classList.add('active');
};

const hidePopup = () => {
    let popup = document.querySelector('#popup');
    let containerRouteButtons = document.querySelector('.route-popup');
    let containerForm = document.querySelector('.container-popup__right');

    popup.classList.remove('show');
    containerRouteButtons.querySelector('[class*="active"]').classList.remove('active');
    containerForm.querySelector('[class*="active"]').classList.remove('active');
};

var search = window.location.search;
search = search.replace('?ref=', '');
if (search) {
    var ishavequery = search.indexOf('&');
    if (ishavequery !== -1) {
        search = search.slice(0, search.indexOf('&'));
    }
    RegisterFormRefCode.value = search;
    openRegForm();
}
