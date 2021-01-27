const kifAPI = axios.create({ baseURL: 'https://api.kif.fund' });

const checklanguage = (language, objectLanguage) => objectLanguage[language];

const listLanguages = ['vi', 'en', 'ja', 'kr', 'cn', 'fr', 'es'];

const popupHTML = language => `
    <div id="overlay" onclick="hidePopup()"></div>
    <div class="container-popup">
        <div class="menu-icon-popup" onclick="showMenuMobile()">
            <img src="./images/popup/menu.svg" alt="icon" />
        </div>

        <div class="close-icon" onclick="hidePopup()">
            <img src="./images/popup/close.svg" alt="icon" />
        </div>

        <div class="container-popup__left">
            <img src="./images/logo-header.svg" alt="Logo" />
            <p class="name-kif">KING INVESTMENTS FUND</p>

            <div class="route-popup">
                <div
                    class="route-popup__button route-popup__register"
                    onclick="navigateByRouteButton(this)"
                >
                    <img src="./images/popup/register.svg" alt="icon" />
                    <span>${checklanguage(language, {
                        vi: 'Đăng Ký',
                        en: 'Sign Up',
                        ja: '新規登録',
                        kr: '가입',
                        cn: '注册',
                        fr: "S'inscrire",
                        es: 'Registrar',
                    })}</span>
                </div>
                <div
                    class="route-popup__button route-popup__login"
                    onclick="navigateByRouteButton(this)"
                >
                    <img src="./images/popup/login.svg" alt="icon" />
                    <span>${checklanguage(language, {
                        vi: 'Đăng Nhập',
                        en: 'Log In',
                        ja: 'ログイン',
                        kr: '로그인',
                        cn: '登入',
                        fr: 'Connexion',
                        es: 'Iniciar sesión',
                    })}</span>
                </div>
                <div
                    class="route-popup__button route-popup__forgot"
                    onclick="navigateByRouteButton(this)"
                >
                    <img src="./images/popup/forgot.svg" alt="icon" />
                    <span>${checklanguage(language, {
                        vi: 'Quên mật khẩu',
                        en: 'Forgot your password?',
                        ja: 'パスワードを忘れた場合',
                        kr: '비밀번호를 잊으셨나요?',
                        cn: '忘记密码了吗？',
                        fr: 'Mot de passe oublié?',
                        es: '¿Olvidaste tu contraseña?',
                    })}</span>
                </div>
            </div>
        </div>

        <div class="container-popup__right">
            <div class="form-popup form-register">
                <div class="form-popup__title">
                    <p class="form-popup__title1">${checklanguage(language, {
                        vi: 'Đăng Ký',
                        en: 'Sign Up',
                        ja: '新規登録',
                        kr: '가입',
                        cn: '注册',
                        fr: "S'inscrire",
                        es: 'Registrar',
                    })}</p>
                    <p class="form-popup__title2">
                        ${checklanguage(language, {
                            vi: 'Bạn đã có tài khoản?',
                            en: 'Do you already have an account?',
                            ja: 'すでにアカウントをお持ちですか？',
                            kr: '계정이 이미 있습니까?',
                            cn: '您还没有帐号吗？',
                            fr: 'Vous avez déjà un compte?',
                            es: '¿Ya tiene una cuenta?',
                        })}
                        <span class="link-to-login" onclick="navigateToLoginForm()">
                            ${checklanguage(language, {
                                vi: 'Đăng Nhập',
                                en: 'Log In',
                                ja: 'ログイン',
                                kr: '로그인',
                                cn: '登入',
                                fr: 'Connexion',
                                es: 'Iniciar sesión',
                            })}
                        </span>
                    </p>
                </div>
                <form name="form-register" class="form-popup__form" onsubmit="return eventSubmitRegisterForm(event)">
                    <div class="layout-2">
                        <div class="form-popup__control">
                            <label for="firstname">${checklanguage(language, {
                                vi: 'Tên',
                                en: 'First Name',
                                ja: 'ファーストネーム',
                                kr: '이름',
                                cn: '名字',
                                fr: 'Nom',
                                es: 'Nombre',
                            })}</label>
                            <input
                                id="firstname" type="text" name="firstname"
                                onkeyup="checkValidRegisterForm()"
                            />
                        </div>
                        <div class="form-popup__control">
                            <label for="lastname">${checklanguage(language, {
                                vi: 'Họ',
                                en: 'Last Name',
                                ja: '苗字',
                                kr: '성',
                                cn: '姓氏',
                                fr: 'Prénom',
                                es: 'Apellido',
                            })}</label>
                            <input
                                id="lastname" type="text" name="lastname"
                                onkeyup="checkValidRegisterForm()"
                            />
                        </div>
                    </div>
                    <div class="form-popup__control">
                        <label for="email">${checklanguage(language, {
                            vi: 'Email',
                            en: 'Email',
                            ja: 'Eメールアドレス',
                            kr: '이메일',
                            cn: '电子邮件地址',
                            fr: 'E-mail',
                            es: 'Correo electrónico',
                        })}</label>
                        <input
                            id="email" type="email" name="email"
                            onkeyup="eventKeyUpRegisterFormEmail()"
                            onfocus="eventKeyUpRegisterFormEmail()"
                            oninput="eventKeyUpRegisterFormEmail()"
                        />
                        <p class="error-message">
                            <img src="./images/popup/exclamation.svg" alt="icon" />
                            <span>${checklanguage(language, {
                                vi: 'Địa chỉ email không hợp lệ',
                                en: 'Invalid email address format',
                                ja: '有効な E メールアドレスをご入力ください。',
                                kr: '이메일 주소 올바르지 않습니다',
                                cn: '请使用有效的电子邮件地址',
                                fr: "Le format de l'adresse e-mail n'est pas valide",
                                es: 'El formato de la dirección de correo electrónico no es válido',
                            })}</span>
                        </p>
                    </div>
                    <div class="layout-2">
                        <div class="form-popup__control">
                            <label for="password1">${checklanguage(language, {
                                vi: 'Mật khẩu',
                                en: 'Password',
                                ja: 'パスワード',
                                kr: '비밀번호',
                                cn: '密码',
                                fr: 'Mot de passe',
                                es: 'Contraseña',
                            })}</label>
                            <input
                                id="password1" type="password" name="password1"
                                onkeyup="eventKeyUpRegisterFormPassword1()"
                                onfocus="eventKeyUpRegisterFormPassword1()"
                                oninput="eventKeyUpRegisterFormPassword1()"
                            />
                            <img
                                onclick="handleChangeEye(this)"
                                src="./images/eye.svg"
                                alt="eye"
                            />
                            <p class="error-message">
                                <img src="./images/popup/exclamation.svg" alt="icon" />
                                <span>${checklanguage(language, {
                                    vi:
                                        'Mật khẩu yêu cầu tối thiểu 8 ký tự, ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt',
                                    en:
                                        'Passwords must be a minimum of eight (8) characters in length, contain at least one (1) character from three (4) of the following categories: UPPERCASE LETTER (A-Z), lowercase letter (a-z), digit (0-9) and special character (!@#$%^&*)',
                                    ja:
                                        'パスワードは8文字以上で、次のカテゴリの3つから少なくとも1文字が含まれている必要があります。大文字（AZ）、小文字（az）、数字（0-9） および特殊文字（！@＃$％^＆*）',
                                    kr: '비밀번호는 8글자, 대문자,일반자, 숫자, 특수문자 포함',
                                    cn:
                                        '密码长度至少为8个字符，必须包含至少1个大写字母（AZ），1个小写字母（az），以及1个数字（0-9 ）和特殊符号（〜`！@＃$％^＆*）',
                                    fr:
                                        'Le mot de passe doit comporter au moins 8 caractères, y compris une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial',
                                    es:
                                        'La contraseña debe tener ocho caracteres de mínimo, incluyendo una letra mayúscula, una minúscula, un número y un carácter especial',
                                })}</span>
                            </p>
                        </div>
                        <div class="form-popup__control">
                            <label for="password2">${checklanguage(language, {
                                vi: 'Xác nhận mật khẩu',
                                en: 'Confirm password',
                                ja: 'もう一度パスワードをご入力ください。',
                                kr: '비밀번호 확인',
                                cn: '请再次输入密码',
                                fr: 'Confirmez le mot de passe',
                                es: 'Confirmación de contraseña',
                            })}</label>
                            <input
                                id="password2" type="password" name="password2"
                                onkeyup="eventKeyUpRegisterFormPassword2()"
                            />
                            <img
                                onclick="handleChangeEye(this)"
                                src="./images/eye.svg"
                                alt="eye"
                            />
                            <p class="error-message">
                                <img src="./images/popup/exclamation.svg" alt="icon" />
                                <span>${checklanguage(language, {
                                    vi: 'Mật khẩu không trùng khớp',
                                    en: 'Password does not match',
                                    ja: 'パスワードが正しくありません',
                                    kr: '비밀번호가 일치하지 않습니다',
                                    cn: '密码错误',
                                    fr:
                                        'Le mot de passe que vous avez entré ne correspond pas au mot de passe du système',
                                    es:
                                        'La contraseña que ingresó no coincide con la contraseña del sistema',
                                })}</span>
                            </p>
                        </div>
                    </div>
                    <div class="form-popup__control">
                        <label for="refcode">${checklanguage(language, {
                            vi: 'Mã giới thiệu',
                            en: 'Referral Code',
                            ja: '紹介コード',
                            kr: '추천 코드',
                            cn: '介绍代码',
                            fr: 'Code de référence',
                            es: 'Código de referencia',
                        })}</label>
                        <input
                            id="refcode" type="text" name="refcode"
                            onkeyup="checkValidRegisterForm()"
                        />
                    </div>
                    <div class="layout-2">
                        <div class="form-popup__control">
                            <label for="regcode">${checklanguage(language, {
                                vi: 'Mã đăng ký',
                                en: 'Registration Code',
                                ja: '登録コード',
                                kr: '가입 코드',
                                cn: '登记代码',
                                fr: "Code d'enregistrement",
                                es: 'Código de registro',
                            })}</label>
                            <input
                                id="regcode" type="text" name="regcode"
                                onkeyup="checkValidRegisterForm()"
                            />
                        </div>
                        <div class="form-popup__control" style="align-self: flex-end">
                            <button type="button" class="get-regcode-by-email" disabled onclick="eventClickGetRegCodeByEmail()">
                                ${checklanguage(language, {
                                    vi: 'Lấy mã đăng ký bằng email',
                                    en: 'Receive verification code via email',
                                    ja: 'Eメールで確認コードを受け取る',
                                    kr: '이메일을 통해 인증 코드 받기',
                                    cn: '通过电子邮件接收验证码',
                                    fr: 'Recevez le code de vérification par e-mail',
                                    es: 'Recibir el código de verificación por correo electrónico',
                                })}
                            </button>
                        </div>
                    </div>
                    <div class="form-popup__control checkbox">
                        <input id="consent" type="checkbox" name="consent" onchange="checkValidRegisterForm()" />
                        <label for="consent">
                            ${checklanguage(language, {
                                vi:
                                    'Tôi đồng ý với <a href="./Termofuse.pdf" target="_blank">Điều khoản và Điều kiện</a> | <a href="./Privacy-policy.pdf" target="_blank">Chính sách riêng tư</a> của King Investments Fund.',
                                en:
                                    'I have read and agree to <a href="./Termofuse.pdf" target="_blank">The terms and Conditions</a> | <a href="./Privacy-policy.pdf" target="_blank">Privacy policy</a> of King Investments Fund.',
                                ja:
                                    '同意します <a href="./Termofuse.pdf" target="_blank">利用規約</a> | <a href="./Privacy-policy.pdf" target="_blank">プライバシー規約</a> KIFの.',
                                kr:
                                    '나는 동의합니다 <a href="./Termofuse.pdf" target="_blank">약관과 정책</a> | <a href="./Privacy-policy.pdf" target="_blank">개인정보 보호 정책</a> KIF의.',
                                cn:
                                    '我同意 <a href="./Termofuse.pdf" target="_blank">条款与条件</a> | <a href="./Privacy-policy.pdf" target="_blank">隐私政策</a> KIF的.',
                                fr:
                                    'Je suis d\'accord avec <a href="./Termofuse.pdf" target="_blank">Termes et conditions</a> | <a href="./Privacy-policy.pdf" target="_blank">Politique de confidentialité</a> de King Investments Fund.',
                                es:
                                    'Estoy de acuerdo con <a href="./Termofuse.pdf" target="_blank">Terminos y Condiciones</a> | <a href="./Privacy-policy.pdf" target="_blank">Política de privacidad</a> de King Investments Fund.',
                            })}
                        </label>
                    </div>
                    <div class="layout-2">
                        <div class="form-popup__control clear-mb">
                            <button type="submit" disabled>${checklanguage(language, {
                                vi: 'Đăng Ký',
                                en: 'Sign Up',
                                ja: '新規登録',
                                kr: '가입',
                                cn: '注册',
                                fr: "S'inscrire",
                                es: 'Registrar',
                            })}</button>
                        </div>
                        <div class="form-popup__control clear-mb hide">
                            <button type="button">Đăng Ký</button>
                        </div>
                    </div>
                </form>
            </div>

            <div class="form-popup form-login">
                <div class="form-popup__title">
                    <p class="form-popup__title1">${checklanguage(language, {
                        vi: 'Đăng nhập',
                        en: 'Log in',
                        ja: 'ログイン',
                        kr: '로그인',
                        cn: '登入',
                        fr: 'Connexion',
                        es: 'Iniciar sesión',
                    })}</p>
                    <p class="form-popup__title2">
                        ${checklanguage(language, {
                            vi: 'Bạn chưa có tài khoản?',
                            en: "Don't have an account?",
                            ja: 'アカウントをお持ちではありませんか？',
                            kr: '계정이 없으십니까?',
                            cn: '您还没有帐号吗？',
                            fr: "Vous n'avez pas de compte?",
                            es: '¿Ya no tiene una cuenta?',
                        })}
                        <span
                            class="link-to-register"
                            onclick="navigateToRegisterForm()"
                        >
                            ${checklanguage(language, {
                                vi: 'Đăng ký',
                                en: 'Sign up',
                                ja: '新規登録',
                                kr: '가입',
                                cn: '注册',
                                fr: "S'inscrire",
                                es: 'Registrar',
                            })}
                        </span>
                    </p>
                </div>
                <form
                    name="form-login" class="form-popup__form"
                    onsubmit="return eventSubmitLoginForm(event)"
                >
                    <div class="form-popup__control">
                        <label for="email-login">${checklanguage(language, {
                            vi: 'Email',
                            en: 'Email',
                            ja: 'Eメールアドレス',
                            kr: '이메일',
                            cn: '电子邮件地址',
                            fr: 'E-mail',
                            es: 'Correo electrónico',
                        })}</label>
                        <input
                            id="email-login" type="email" name="email-login"
                            onkeyup="eventKeyUpLoginFormEmail()"
                            onfocus="eventKeyUpLoginFormEmail()"
                            oninput="eventKeyUpLoginFormEmail()"
                        />
                        <p class="error-message">
                            <img src="./images/popup/exclamation.svg" alt="icon" />
                            <span>${checklanguage(language, {
                                vi: 'Địa chỉ email không hợp lệ',
                                en: 'Invalid email address format',
                                ja: '有効な E メールアドレスをご入力ください。',
                                kr: '이메일 주소 올바르지 않습니다',
                                cn: '请使用有效的电子邮件地址',
                                fr: "Le format de l'adresse e-mail n'est pas valide",
                                es: 'El formato de la dirección de correo electrónico no es válido',
                            })}</span>
                        </p>
                    </div>
                    <div class="form-popup__control">
                        <label for="password-login">${checklanguage(language, {
                            vi: 'Mật khẩu',
                            en: 'Password',
                            ja: 'パスワード',
                            kr: '비밀번호',
                            cn: '密码',
                            fr: 'Mot de passe',
                            es: 'Contraseña',
                        })}</label>
                        <input
                            id="password-login" type="password" name="password-login"
                            onkeyup="eventKeyUpLoginFormPassword()"
                            onfocus="eventKeyUpLoginFormPassword()"
                            oninput="eventKeyUpLoginFormPassword()"
                        />
                        <img
                            onclick="handleChangeEye(this)"
                            src="./images/eye.svg"
                            alt="eye"
                        />
                        <p class="error-message">
                            <img src="./images/popup/exclamation.svg" alt="icon" />
                            <span>${checklanguage(language, {
                                vi:
                                    'Mật khẩu yêu cầu tối thiểu 8 ký tự, ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt',
                                en:
                                    'Passwords must be a minimum of eight (8) characters in length, contain at least one (1) character from three (4) of the following categories: UPPERCASE LETTER (A-Z), lowercase letter (a-z), digit (0-9) and special character (!@#$%^&*)',
                                ja:
                                    'パスワードは8文字以上で、次のカテゴリの3つから少なくとも1文字が含まれている必要があります。大文字（AZ）、小文字（az）、数字（0-9） および特殊文字（！@＃$％^＆*）',
                                kr: '비밀번호는 8글자, 대문자,일반자, 숫자, 특수문자 포함',
                                cn:
                                    '密码长度至少为8个字符，必须包含至少1个大写字母（AZ），1个小写字母（az），以及1个数字（0-9 ）和特殊符号（〜`！@＃$％^＆*）',
                                fr:
                                    'Le mot de passe doit comporter au moins 8 caractères, y compris une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial',
                                es:
                                    'La contraseña debe tener ocho caracteres de mínimo, incluyendo una letra mayúscula, una minúscula, un número y un carácter especial',
                            })}</span>
                        </p>
                    </div>
                    <div class="form-popup__control checkbox" style="align-items: center">
                        <input
                            id="remember-login" type="checkbox" name="remember-login"
                            checked
                        />
                        <label for="remember-login">${checklanguage(language, {
                            vi: 'Nhớ email và mật khẩu',
                            en: 'Remember email and password',
                            ja: 'Eメールとパスワードを保存できるようにする。',
                            kr: '이메일과 비밀번호 기억',
                            cn: '记住电子邮件和密码',
                            fr: "Enregistrez l'adresse e-mail et le mot de passe",
                            es: 'Recordar el correo electrónico y la contraseña',
                        })}</label>
                    </div>
                    <div class="layout-2">
                        <div class="form-popup__control clear-mb">
                            <button type="submit" disabled>${checklanguage(language, {
                                vi: 'Đăng Nhập',
                                en: 'Log In',
                                ja: 'ログイン',
                                kr: '로그인',
                                cn: '登入',
                                fr: 'Connexion',
                                es: 'Iniciar sesión',
                            })}</button>
                        </div>
                        <div class="form-popup__control clear-mb hide">
                            <button type="button">Đăng Nhập</button>
                        </div>
                    </div>
                </form>
                <p class="link-to-forgot" onclick="navigateToForgotForm()">
                    ${checklanguage(language, {
                        vi: 'Quên mật khẩu?',
                        en: 'Forgot your password?',
                        ja: 'パスワードを忘れた場合',
                        kr: '비밀번호를 잊으셨나요?',
                        cn: '忘记密码了吗？',
                        fr: 'Mot de passe oublié?',
                        es: '¿Olvidaste tu contraseña?',
                    })}
                </p>
            </div>

            <div class="form-popup form-authentication">
                <div class="form-popup__title">
                    <p class="form-popup__title1">
                        ${checklanguage(language, {
                            vi: 'Đăng Nhập Với<br />Google Authentication Code',
                            en: 'Log In With<br />Google Authentication Code',
                            ja: 'ログイン<br />Google認証コード',
                            kr: '로 로그인<br />Google 인증코드',
                            cn: '登入<br />谷歌的认证码',
                            fr: 'Connectez-vous Avec<br />Code De Google Authentication',
                            es: 'Iniciar Con<br />Código De Autenticación De Google',
                        })}
                    </p>
                </div>
                <form
                    name="form-authentication" class="form-popup__form"
                    onsubmit="return eventSubmitAuthenticationForm(event)"
                >
                    <div class="form-popup__control">
                        <label for="code-authentication">${checklanguage(language, {
                            vi: 'Mã Xác minh của Google',
                            en: 'Google Authentication Code',
                            ja: 'Google認証コード',
                            kr: 'Google 인증코드',
                            cn: '谷歌的认证码',
                            fr: 'Code de Google Authentication',
                            es: 'Código de verificación de Google',
                        })}</label>
                        <input
                            id="code-authentication" type="text" name="code-authentication"
                            onkeyup="checkValidAuthenticationForm()"
                            onfocus="checkValidAuthenticationForm()"
                            oninput="checkValidAuthenticationForm()"
                        />
                    </div>
                    <div class="layout-2" style="margin-top: 10px">
                        <div class="form-popup__control clear-mb">
                            <button type="submit" disabled>${checklanguage(language, {
                                vi: 'Đăng Nhập',
                                en: 'Log In',
                                ja: 'ログイン',
                                kr: '로그인',
                                cn: '登入',
                                fr: 'Connexion',
                                es: 'Iniciar sesión',
                            })}</button>
                        </div>
                        <div class="form-popup__control clear-mb hide">
                            <button type="button">Đăng Nhập</button>
                        </div>
                    </div>
                </form>
            </div>

            <div class="form-popup form-forgot">
                <div class="form-popup__title">
                    <p class="form-popup__title1">${checklanguage(language, {
                        vi: 'Quên mật khẩu?',
                        en: 'Forgot your password?',
                        ja: 'パスワードを忘れた場合',
                        kr: '비밀번호를 잊으셨나요?',
                        cn: '忘记密码了吗？',
                        fr: 'Mot de passe oublié?',
                        es: '¿Olvidaste tu contraseña?',
                    })}</p>
                    <p class="form-popup__title2">${checklanguage(language, {
                        vi: 'Đặt lại mật khẩu qua email đăng ký',
                        en: 'Reset password using email',
                        ja: '使用しているEメールアドレスでパスワードを変更',
                        kr: '이메일을 통해 비밀번호 다시 설정',
                        cn: '通过电子邮件重置密码',
                        fr: 'Restaurez le mot de passe par e-mail',
                        es: 'Restablecer la contraseña por correo electrónico',
                    })}</p>
                </div>
                <form
                    name="form-forgot" class="form-popup__form"
                    onsubmit="return eventSubmitForgotForm(event)"
                >
                    <div class="form-popup__control">
                        <label for="email-forgot">${checklanguage(language, {
                            vi: 'Email',
                            en: 'Email',
                            ja: 'Eメールアドレス',
                            kr: '이메일',
                            cn: '电子邮件地址',
                            fr: 'E-mail',
                            es: 'Correo electrónico',
                        })}</label>
                        <input
                            id="email-forgot" type="email" name="email-forgot"
                            placeholder="${checklanguage(language, {
                                vi: 'Chúng tôi cần email của bạn cho việc xác minh',
                                en: 'We need your email to verify',
                                ja: '確認のためにEメールアドレスが必要',
                                kr: '이증하기 위해 이메일 주소가 필요합니다',
                                cn: '我们需要您的电子邮件进行验证',
                                fr: 'Nous avons besoin de votre e-mail pour vérifier',
                                es: 'Necesitamos su correo electrónico para la verificación',
                            })}"
                            onkeyup="eventKeyUpForgotFormEmail()"
                            onfocus="eventKeyUpForgotFormEmail()"
                            oninput="eventKeyUpForgotFormEmail()"
                        />
                        <p class="error-message">
                            <img src="./images/popup/exclamation.svg" alt="icon" />
                            <span>${checklanguage(language, {
                                vi: 'Địa chỉ email không hợp lệ',
                                en: 'Invalid email address format',
                                ja: '有効な E メールアドレスをご入力ください。',
                                kr: '이메일 주소 올바르지 않습니다',
                                cn: '请使用有效的电子邮件地址',
                                fr: "Le format de l'adresse e-mail n'est pas valide",
                                es: 'El formato de la dirección de correo electrónico no es válido',
                            })}</span>
                        </p>
                    </div>
                    <div class="layout-2" style="margin-top: 10px">
                        <div class="form-popup__control clear-mb">
                            <button type="submit" disabled>${checklanguage(language, {
                                vi: 'Đặt lại',
                                en: 'Reset',
                                ja: '変更',
                                kr: '다시 설정',
                                cn: '重设',
                                fr: 'Restaurez',
                                es: 'Restablecer',
                            })}</button>
                        </div>
                        <div class="form-popup__control clear-mb hide">
                            <button type="button">Đặt lại</button>
                        </div>
                    </div>
                </form>
            </div>

            <div class="form-popup form-reset">
                <div class="form-popup__title">
                    <p class="form-popup__title1">${checklanguage(language, {
                        vi: 'Đặt lại mật khẩu',
                        en: 'Reset password',
                        ja: 'パスワードを変更',
                        kr: '비밀번호를 다시 설정',
                        cn: '重设密码',
                        fr: 'Restaurez le mot de passe',
                        es: 'Restablecer su contraseña',
                    })}</p>
                    <p class="form-popup__title2">
                        ${checklanguage(language, {
                            vi:
                                'Chúng tôi vừa gửi mã code qua email của bạn. Vui lòng nhập vào ô bên dưới.',
                            en:
                                'We have sent a verification code to your email. Please check and enter the code below.',
                            ja:
                                'Eメールアドレスに確認コードを送信致しました。コードを確認してご入力ください。',
                            kr:
                                '방금 귀하의 이메일을 통해 코드를 보냈습니다. 아래 상자를 입력하십시오',
                            cn: '我们已经给您的电子邮件发送了验证码。 请检查并在以下表格输入.',
                            fr:
                                'Nous avons envoyé un code de vérification à votre adresse e-mail. Vérifiez et entrez le code ci-dessous.',
                            es:
                                'Hemos enviado un código de verificación a su correo electrónico. Verifique e ingrese el código abajo.',
                        })}
                    </p>
                </div>
                <form
                    name="form-reset" class="form-popup__form"
                    onsubmit="return eventSubmitResetForm(event)"
                >
                    <div class="form-popup__control">
                        <label for="email-reset">${checklanguage(language, {
                            vi: 'Email',
                            en: 'Email',
                            ja: 'Eメールアドレス',
                            kr: '이메일',
                            cn: '电子邮件地址',
                            fr: 'E-mail',
                            es: 'Correo electrónico',
                        })}</label>
                        <input id="email-reset" type="email" name="email-reset" disabled />
                    </div>
                    <div class="form-popup__control">
                        <label for="password-reset">${checklanguage(language, {
                            vi: 'Mật khẩu mới',
                            en: 'New password',
                            ja: '新しいパスワード',
                            kr: '새 비밀번호',
                            cn: '新密码',
                            fr: 'Nouveau mot de passe',
                            es: 'Contraseña nueva',
                        })}</label>
                        <input
                            id="password-reset" type="password" name="password-reset"
                            placeholder="${checklanguage(language, {
                                vi: 'Ít nhất 8 ký tự, bao gồm cả chữ và số',
                                en: 'At least 8 characters including letters and numbers',
                                ja: '文字と数字を含む少なくとも8文字',
                                kr: '문자와 숫자를 포함하여 8자 이상',
                                cn: '至少8个字符,包括数字与字母',
                                fr: 'Au moins 8 caractères, y compris des lettres et des chiffres',
                                es: 'Al menos 8 caracteres, incluidas letras y numeros',
                            })}"
                            onkeyup="eventKeyUpResetFormPassword()"
                            onfocus="eventKeyUpResetFormPassword()"
                            oninput="eventKeyUpResetFormPassword()"
                        />
                        <img
                            onclick="handleChangeEye(this)"
                            src="./images/eye.svg"
                            alt="eye"
                        />
                        <p class="error-message">
                            <img src="./images/popup/exclamation.svg" alt="icon" />
                            <span>${checklanguage(language, {
                                vi:
                                    'Mật khẩu yêu cầu tối thiểu 8 ký tự, ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt',
                                en:
                                    'Passwords must be a minimum of eight (8) characters in length, contain at least one (1) character from three (4) of the following categories: UPPERCASE LETTER (A-Z), lowercase letter (a-z), digit (0-9) and special character (!@#$%^&*)',
                                ja:
                                    'パスワードは8文字以上で、次のカテゴリの3つから少なくとも1文字が含まれている必要があります。大文字（AZ）、小文字（az）、数字（0-9） および特殊文字（！@＃$％^＆*）',
                                kr: '비밀번호는 8글자, 대문자,일반자, 숫자, 특수문자 포함',
                                cn:
                                    '密码长度至少为8个字符，必须包含至少1个大写字母（AZ），1个小写字母（az），以及1个数字（0-9 ）和特殊符号（〜`！@＃$％^＆*）',
                                fr:
                                    'Le mot de passe doit comporter au moins 8 caractères, y compris une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial',
                                es:
                                    'La contraseña debe tener ocho caracteres de mínimo, incluyendo una letra mayúscula, una minúscula, un número y un carácter especial',
                            })}</span>
                        </p>
                    </div>
                    <div class="form-popup__control">
                        <label for="code-reset">${checklanguage(language, {
                            vi: 'Mã Code',
                            en: 'Code',
                            ja: 'コード',
                            kr: '코드',
                            cn: '验证码',
                            fr: 'Code',
                            es: 'Código',
                        })}</label>
                        <input
                            id="code-reset" type="text" name="code-reset"
                            placeholder="${checklanguage(language, {
                                vi: 'Mã code từ email',
                                en: 'Code via email',
                                ja: 'Eメールによるコード',
                                kr: '이메일을 통한 코드',
                                cn: '电子邮件的验证码',
                                fr: 'Code par e-mail',
                                es: 'Código por correo electrónico',
                            })}"
                            onkeyup="checkValidResetForm()"
                            onfocus="checkValidResetForm()"
                            oninput="checkValidResetForm()"
                        />
                    </div>
                    <div class="layout-2" style="margin-top: 10px">
                        <div class="form-popup__control clear-mb">
                            <button type="submit" disabled>${checklanguage(language, {
                                vi: 'Xác nhận',
                                en: 'Verify',
                                ja: '確認する',
                                kr: '확인',
                                cn: '确认',
                                fr: 'Vérifier',
                                es: 'Verificar',
                            })}</button>
                        </div>
                        <div class="form-popup__control clear-mb hide">
                            <button type="button">Xác nhận</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
`;

const headerHTML = language => `
    <div class="kdg-container z-index-1 position-relative h-full">
        <div class="top">
            <div class="logo">
                <img src="./images/logo-header.svg" alt="Logo" />
                <h3 class="bold">KING INVESTMENTS FUND</h3>
            </div>
            <div class="menu">
                <a href="https://kif.group/" target="_blank" id="more">
                    ${checklanguage(language, {
                        vi: 'TÌM HIỂU THÊM VỀ KIF <span>TẠI ĐÂY</span>',
                        en: 'KNOW MORE ABOUT KIF <span>HERE</span>',
                        ja: 'KIFについて詳しくは<span>こちら</span>',
                        kr: 'KIF에 대한 더 알아보기 <span>여기</span>',
                        cn: '了解关于KIF的更多信息<span>点击此处</span>',
                        fr: 'En savoir plus sur KIF <span>ici</span>',
                        es: 'MÁS INFORMACIÓN SOBRE KIF <span>AQUÍ</span>',
                    })}
                </a>
                <div id="login" onclick="openLoginForm()">
                    ${checklanguage(language, {
                        vi: 'Đăng Nhập',
                        en: 'Log In',
                        ja: 'ログイン',
                        kr: '로그인',
                        cn: '登入',
                        fr: 'Connexion',
                        es: 'Iniciar sesión',
                    })}
                </div>
                <div id="register" onclick="openRegForm()">
                    ${checklanguage(language, {
                        vi: 'Đăng Ký',
                        en: 'Sign Up',
                        ja: '新規登録',
                        kr: '가입',
                        cn: '注册',
                        fr: "S'inscrire",
                        es: 'Registrar',
                    })}
                </div>
            </div>
            <div class="current-language" onclick="showLanguage()">
                <span>${checklanguage(language, {
                    vi: 'VI',
                    en: 'EN',
                    ja: 'JA',
                    kr: 'KR',
                    cn: 'CN',
                    fr: 'FR',
                    es: 'ES',
                })}</span>
                <ul class="choose-language">
                    ${listLanguages
                        .map(
                            _language => `
                        <li onclick="changeLanguage('${_language}')">
                            <img src="./images/language-${_language}.svg" alt="" />
                            <span>${_language.toUpperCase()}</span>
                        </li>
                        `
                        )
                        .join('')}
                </ul>
            </div>
        </div>
        <div class="content">
            <div>
                <h1 class="bold">YOUR TRUST - OUR FUTURE</h1>
                <h6>${checklanguage(language, {
                    vi:
                        'King Investments Fund - mô hình Quỹ 4.0 tiên phong trong lĩnh vực đầu tư tài chính số. Chúng tôi luôn đem đến các giải pháp đầu tư tốt nhất được quản lý chuyên nghiệp bởi các chuyên gia tài chính hàng đầu hiện nay.',
                    en:
                        'King Investments Fund - 4.0 pioneer model in digital financial investment. We always bring the best investment solutions, professionally managed by leading financial experts.',
                    ja:
                        'デジタル金融投資における先駆的な4.0資金模範であるKIF (King Investments Fund)。一流の金融専門家により専門的に管理された最高の投資ソリューションをご提供致します。',
                    kr:
                        'King Investments Fund - 펀드모델 4.0 디지털 금융 투자 분야의 개척자.저희가 항상 최고의 금융 저문가가 전문적으로 관리하는 최고의 투자 솔루션을 제공합니다.',
                    cn:
                        'King Investments Fund - 金融投资的4.0先锋模型。 我们给您带来最好的投资方案，并由领先的金融专家进行专业管理。',
                    fr: 'FR',
                    es:
                        'Fondo de inversiones King (King Investments Fund) - Modelo de fondo 4.0 pionero en inversión financiera digital. Siempre brindamos las mejores soluciones de inversión administradas profesionalmente por los principales expertos financieros en la actualidad.',
                })}</h6>
                <span onclick="openLoginForm()" class="button">${checklanguage(language, {
                    vi: 'Đầu tư ngay',
                    en: 'Invest now',
                    ja: '今すぐ投資する',
                    kr: '바로 투자',
                    cn: '马上投资',
                    fr: 'Investir maintenant',
                    es: 'Invertir ahora',
                })}</span>
            </div>
        </div>
        <div class="menu-icon" onclick="showMenuHeader()">
            <img src="./images/menu-icon.svg" />
        </div>
        <div class="menu-page">
            <div class="mask" onclick="hideMenuHeader()"></div>
            <img class="logo" src="./images/logo-header.svg" />
            <p class="menu-page-title">KING INVESTMENTS FUND</p>
            <a href="https://kif.group/" target="_blank" class="menu-page-more">
                ${checklanguage(language, {
                    vi: 'TÌM HIỂU THÊM VỀ KIF <span>TẠI ĐÂY</span>',
                    en: 'KNOW MORE ABOUT KIF <span>HERE</span>',
                    ja: 'KIFについて詳しくはこちら',
                    kr: '여기서 KIF에 대해 알아보기',
                    cn: '点击此以了解有关KIF的更多信息',
                    fr: "Plus d'informations sur KIF ici",
                    es: 'Más información sobre KIF aquí',
                })}
            </a>
            <div class="control">
                <button onclick="openLoginForm()" class="login">
                    ${checklanguage(language, {
                        vi: 'Đăng Nhập',
                        en: 'Log In',
                        ja: 'ログイン',
                        kr: '로그인',
                        cn: '登入',
                        fr: 'Connexion',
                        es: 'Iniciar sesión',
                    })}
                </button>
                <button onclick="openRegForm()" class="register">
                    ${checklanguage(language, {
                        vi: 'Đăng Ký',
                        en: 'Sign Up',
                        ja: '新規登録',
                        kr: '가입',
                        cn: '注册',
                        fr: "S'inscrire",
                        es: 'Registrar',
                    })}
                </button>
            </div>
            <div class="language mt-30">
                ${listLanguages
                    .map(
                        _language => `
                    <div 
                    class="lang ${language === _language ? 'active' : ''}" 
                    onclick="changeLanguage('${_language}')">
                        ${_language.toUpperCase()}
                        <img src="./images/language-${_language}.svg"/>
                    </div>
                    `
                    )
                    .join('')}
            </div>
            <div class="close-icon" onclick="hideMenuHeader()">
                <img src="./images/close-icon.svg" />
            </div>
        </div>
    </div>
`;

const calcHTML = language => `
    <div class="kdg-container h-full class2">
        <div class="calc-money">
            <div class="img-box mr-10">
                <img src="./images/calculator.svg" alt="" />
            </div>
            <div>
                <h5 class="mb-10">${checklanguage(language, {
                    vi: 'Nhập số tiền đầu tư',
                    en: 'Enter Investment Amount',
                    ja: '投資額をご入力ください',
                    kr: '투자 금액 입력',
                    cn: '输入投资金额',
                    fr: "Entrez le montant de l'investissement",
                    es: 'Ingresar el monto de la inversión',
                })}</h5>
                <div class="input-number">
                    <input
                        onfocus="clearValue()"
                        value="1000"
                        onkeyup="handleInputCalc(this)"
                        id="input-number"
                        type="number"
                    />
                    <div class="button">${checklanguage(language, {
                        vi: 'Tính toán',
                        en: 'Calculate',
                        ja: '計算',
                        kr: '계산하기',
                        cn: '计算',
                        fr: 'Calculer',
                        es: 'Calcular',
                    })}</div>
                </div>
            </div>
        </div>
        <div class="calc-profit">
            <div class="item">
                <div id="perday">$4</div>
                <p>${checklanguage(language, {
                    vi: 'Lợi nhuận ngày',
                    en: 'Daily Profit',
                    ja: '毎日の利益',
                    kr: '일일 이익',
                    cn: '每日利润',
                    fr: 'Bénéfice quotidien',
                    es: 'Lucro por día',
                })}</p>
            </div>
            <div class="item">
                <div id="perweek">$28</div>
                <p>${checklanguage(language, {
                    vi: 'Lợi nhuận tuần',
                    en: 'Weekly Profit',
                    ja: '毎週の利益',
                    kr: '주당 이익',
                    cn: '每周利润',
                    fr: 'Bénéfice hebdomadaire',
                    es: 'Lucro por semana',
                })}</p>
            </div>
            <div class="item">
                <div id="permonth">$120</div>
                <p>${checklanguage(language, {
                    vi: 'Lợi nhuận tháng',
                    en: 'Monthly Profit',
                    ja: '毎月の利益',
                    kr: '월 이익',
                    cn: '每月利润',
                    fr: 'Bénéfice mensuel',
                    es: 'Lucro por mes',
                })}</p>
            </div>
        </div>
    </div>
`;

const roadmapHTML = language => `
    <div class="title mb-60">
        <h4>${checklanguage(language, {
            vi: 'Lộ Trình',
            en: 'Pattern',
            ja: 'プロセス',
            kr: '프로세스',
            cn: '路线',
            fr: 'Processus',
            es: 'Proceso',
        })}</h4>
        <div class="hr"></div>
    </div>
    <div class="kdg-container">
        <div class="kdg-row va-m">
            <div class="kdg-col-4">
                <div class="period-part">
                    <div class="circle-box">
                        <div class="circle-1 no-animation">
                            <div class="circle-3"></div>
                            <div class="circle-4"></div>
                        </div>
                        <div class="circle-2"></div>
                        <img class="road-icon" src="./images/road1.svg" alt="Road1" />
                        <img class="road-icon done" src="./images/road-done.svg" />
                    </div>
                    <p class="period-number">${checklanguage(language, {
                        vi: 'Giai đoạn 1',
                        en: 'Stage 1',
                        ja: 'ステージ１',
                        kr: '1단계',
                        cn: '第一阶段',
                        fr: 'Étape 1',
                        es: 'Fase 1',
                    })}</p>
                    <p class="period-title">${checklanguage(language, {
                        vi: 'VÒNG GÓP VỐN NỘI BỘ ĐỂ VẬN HÀNH QUỸ',
                        en: 'Internal Capital Contribution for Funding Operations',
                        ja: '資金運用のための内部出資',
                        kr: '펀딩 운영을 위한 내부 자본 기여',
                        cn: '资金管理的内部投资',
                        fr: 'FR',
                        es: 'CONTRIBUCIONES DE CAPITAL INTERNO PARA LA OPERACIÓN DEL FONDO',
                    })}</p>
                    <p class="period-money">
                        ${checklanguage(language, {
                            vi: 'Số Vốn Góp',
                            en: 'Capital Contribution',
                            ja: '資本拠出',
                            kr: '자본 출자',
                            cn: '投资额',
                            fr: 'Contribution en capital',
                            es: 'Contribución de capital',
                        })}:
                        <span>$300,000</span>
                    </p>
                </div>
            </div>
            <div class="kdg-col-4">
                <div class="period-part">
                    <div class="circle-box">
                        <div class="circle-1">
                            <div class="circle-3"></div>
                            <div class="circle-4"></div>
                        </div>
                        <div class="circle-2"></div>
                        <img class="road-icon" src="./images/road2.svg" alt="Road2" />
                    </div>
                    <p class="period-number">${checklanguage(language, {
                        vi: 'Giai đoạn 2',
                        en: 'Stage 2',
                        ja: 'ステージ2',
                        kr: '2단계',
                        cn: '第二阶段',
                        fr: 'Étape 2',
                        es: 'Fase 2',
                    })}</p>
                    <p class="period-title">${checklanguage(language, {
                        vi: 'VÒNG NHẬN ĐẦU TƯ TỪ CỘNG ĐỒNG',
                        en: 'IPO (Initial Public Offering)',
                        ja: '新規株式公開 (IPO)',
                        kr: '기업공개 (IPO)',
                        cn: '公开募股 (IPO)',
                        fr: 'Introduction en bourse (IPO)',
                        es: 'Oferta pública inicial (IPO)',
                    })}</p>
                    <p class="period-money">
                        ${checklanguage(language, {
                            vi: 'Vốn Huy Động',
                            en: 'Paid-up Capital',
                            ja: '資本拠出',
                            kr: '자본 출자',
                            cn: '注册资本',
                            fr: 'Capital de mobilisation',
                            es: 'Movilización de capital',
                        })}:
                        <span>$1,000,000</span>
                    </p>
                </div>
            </div>
            <div class="kdg-col-4">
                <div class="period-part">
                    <div class="circle-box">
                        <div class="circle-1">
                            <div class="circle-3"></div>
                            <div class="circle-4"></div>
                        </div>
                        <div class="circle-2"></div>
                        <img class="road-icon" src="./images/road3.svg" alt="Road3" />
                    </div>
                    <p class="period-number">${checklanguage(language, {
                        vi: 'Giai đoạn 3',
                        en: 'Stage 3',
                        ja: 'ステージ3',
                        kr: '3단계',
                        cn: '第三阶段',
                        fr: 'Étape 3',
                        es: 'Fase 3',
                    })}</p>
                    <p class="period-title">${checklanguage(language, {
                        vi: 'QUỸ ĐẦU TƯ MẠO HIỂM CHO TÀI SẢN SỐ',
                        en: 'Venture Investment Fund For Digital Assets',
                        ja: 'デジタル資産のためのベンチャー投資金',
                        kr: '디지털 자산을 위한 벤처 투자 펀드',
                        cn: '数字资产风险投资基金',
                        fr: "FOND D'INVESTISSEMENT EN CAPITAL-RISQUE POUR LES ACTIFS NUMÉRIQUES",
                        es: 'CAPITAL DE RIESGO PARA ACTIVOS DIGITALES',
                    })}</p>
                    <p class="period-money">
                        ${checklanguage(language, {
                            vi: 'Vốn Huy Động',
                            en: 'Paid-up Capital',
                            ja: '資本拠出',
                            kr: '자본 출자',
                            cn: '注册资本',
                            fr: 'Capital de mobilisation',
                            es: 'Movilización de capital',
                        })}:
                        <span>$10,000,000</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="title mt-70">
        <h4>${checklanguage(language, {
            vi: 'Giao Dịch Gần Đây',
            en: 'Recent Transactions',
            ja: '最近の取引',
            kr: '최근 거래',
            cn: '最近的交易',
            fr: 'Transactions récentes',
            es: 'Transacciones Recientes',
        })}</h4>
        <div class="hr"></div>
    </div>
`;

const historyHTML = language => `
    <div class="kdg-container">
        <div class="kdg-row va-m">
            <div class="kdg-col-4">
                <div class="history-transaction">
                    <img src="./images/rocket.svg" alt="Road1" />
                    <span>${checklanguage(language, {
                        vi: 'LỊCH SỬ GIAO DỊCH GẦN NHẤT',
                        en: 'Transaction History',
                        ja: '取引履歴',
                        kr: '최근 거래 내역',
                        cn: '交易历史',
                        fr: 'Historique des transactions',
                        es: 'HISTORIAL DE TRANSACCIONES',
                    })}</span>
                </div>
            </div>
            <div class="kdg-col-8">
                <marquee class="text-transaction"></marquee>
            </div>
        </div>
    </div>
`;

const feelHTML = language => `
    <div class="title mb-50">
        <h4>${checklanguage(language, {
            vi: 'Cảm Nhận Nhà Đầu Tư',
            en: "Investor's Thought",
            ja: '投資家の感想',
            kr: '투자자의 생각',
            cn: '投资者的感想',
            fr: 'Appréciation des investisseurs',
            es: 'Apreciación del inversor',
        })}</h4>
        <div class="hr"></div>
    </div>
    <div style="--item: 4; --item-per-row: 2;" class="kdg-container position-relative hover-control-slider">
        <div class="wrapper-slider mb-35">
            <div class="va-m slider">
                <div class="item">
                    <div class="feel-part">
                        <div class="avatar img img-1-1">
                            <img src="./images/ceo-1.jpg" alt="Ava1" />
                        </div>
                        <div class="description">
                            <p class="comment mb-35">
                                ${checklanguage(language, {
                                    vi:
                                        'Quỹ KIF là một điểm tựa vững chắc cho các nhà đầu tư và là nơi rất uy tín về lĩnh vực đầu tư cho các nhà đầu tư trong giai đoạn khó khăn vì dịch bệnh.',
                                    en:
                                        'KIF Fund is a solid fulcrum and prestigious place for people to invest in during this difficult times of the COVID-19 pandemic.',
                                    ja:
                                        'KIF資金は、新型コロナ渦に、投資家にとって支えとある確かな点であり、信頼できるところです。',
                                    kr:
                                        'KIF 펀드는 투자자에게 탄탄한 거저이며 코로나로 어려운 시기에 투자자를 위한 투자 분야에서 매우 권위 있는 곳입니다.',
                                    cn:
                                        'KIF基金是在COVID-19大流行的困难时期中也能够让大家安心投资的平台。是值得投资者信赖的安稳平台。',
                                    fr: 'FR',
                                    es:
                                        'KIF Fund es un punto de apoyo sólido para los inversores y un lugar muy prestigioso en el campo de la inversión para los inversores en tiempos difíciles debido a las epidemias.',
                                })}
                            </p>
                            <div class="info">
                                <h5 class="name">Bà Chữ Thiết</h5>
                                <!-- <p class="position">CEO Kingdom Game 4.0</p> -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="feel-part">
                        <div class="avatar img img-1-1">
                            <img src="./images/ceo-2.jpg" alt="Ava2" />
                        </div>
                        <div class="description">
                            <p class="comment mb-35">
                                ${checklanguage(language, {
                                    vi:
                                        'Tôi tình cờ biết tới Quỹ KIF trong giai đoạn khó khăn nhất, Quỹ không chỉ mang lại cho tôi lợi nhuận đầu tư đều đặn mà còn là nơi cung cấp cho tôi nhiều kiến thức đầu tư và thi trường đầy bổ ích.',
                                    en:
                                        'I happened to know about KIF Fund during the most difficult time of my life. The Fund not only brought me a steady return on investment, but also provided me with a lot of useful investment and market knowledge.',
                                    ja:
                                        '人生で最も困難な時期に、たまたまKIFについて知りました。 安定した投資収益率がいただけるだけでなく、有用な投資と市場知識について多く提供してくださいましてありがたいです。',
                                    kr:
                                        '가장 어려운 시기에 KIF 펀드를 알게 되고 나에게 꾸준한 투자 이익을 줄 뿐만 아니라 많은 투자 지식과 좋은 시장을 제공해줬습니다',
                                    cn:
                                        '在我一生中最艰难的时刻，我偶然认识了KIF基金。 该基金不仅为我带来了稳定的投资回报，还为我提供了许多有用的关于投资和市场知识。',
                                    fr: 'FR',
                                    es:
                                        'Supe sobre el Fondo KIF durante el período más difícil. El Fondo no solo me brindó un rendimiento constante de la inversión, sino que también me proporcionó una gran cantidad de información útil sobre inversiones y mercado.',
                                })}
                            </p>
                            <div class="info">
                                <h5 class="name">Ông Đức Tĩnh</h5>
                                <!-- <p class="position">CEO Kingdom Game 4.0</p> -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="feel-part">
                        <div class="avatar img img-1-1">
                            <img src="./images/ceo-3.jpg" alt="Ava3" />
                        </div>
                        <div class="description">
                            <p class="comment mb-35">
                                ${checklanguage(language, {
                                    vi:
                                        'Quỹ KIF đã tạo dựng được một cộng đồng nhà đầu tư lẫn người tiêu dùng đầy vững mạnh. Bên cạnh đó, hiệp hội doanh nghiệp G20 là điểm tựa vững chắc cho các doanh nghiệp trong thời đại số 4.0',
                                    en:
                                        'KIF Fund has built a strong community of investors and consumers. In addition to that, G20 is a solid fulcrum for businesses in the digital age of the Fourth Industrial Revolution.',
                                    ja:
                                        'KIFは、投資家と消費者の強力なコミュニティを構築してきました。 その上、G20は第4次産業革命のデジタル時代における企業にとって確固たる支点です。',
                                    kr:
                                        'KIF 펀드는 투자자와 소비자의 강력한 커뮤니티를 만들었습니다. 또한 G20 비즈니스 협회는 디지털 시대 4.0의 비즈니스를 위한 견고한 기반입니다.',
                                    cn:
                                        'KIF基金建拥有强大的投资者和消费者。 同时，G20商业协会是现代的强大支撑点。',
                                    fr: 'FR',
                                    es:
                                        'KIF Fundo ha creado una sólida comunidad de inversores y consumidores. Además, la asociación empresarial del G20 es un punto de apoyo sólido para las empresas en la era digital 4.0',
                                })}
                            </p>
                            <div class="info">
                                <h5 class="name">Ông Kiến Quốc</h5>
                                <!-- <p class="position">CEO Kingdom Game 4.0</p> -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="feel-part">
                        <div class="avatar img img-1-1">
                            <img src="./images/ceo-4.jpg" alt="Ava4" />
                        </div>
                        <div class="description">
                            <p class="comment mb-35">
                                ${checklanguage(language, {
                                    vi:
                                        'Với những chiến lược đầu tư đúng đắn và dòng tiền mang lại ổn định, KIF luôn mang lại sự an tâm cho tôi mỗi ngày để tôi luôn có động lực phấn đấu và đóng góp nhiều hơn nữa cho sự phát triển của Quỹ.',
                                    en:
                                        'With the right investment strategies and stable cash flow, KIF brings me assurance so that I always feel secured and motivated to strive and contribute to the Fund development. .',
                                    ja:
                                        '適切な投資戦略と安定したキャッシュフローにより、KIFは私に安心感を与え、資金に貢献しようと努力する意欲を高めるのに役立ちます。',
                                    kr:
                                        '올바른 투자 전략과 안정적인 현금 흐름으로 KIF는 항상 저에게 마음의 평안을 주므로 저는 항상 펀드의 발전에 더 많은 노력과 기여를 하고자 합니다.',
                                    cn:
                                        '有了正确的投资策略和稳定的现金收入，KIF给我带来了保证，使我有动力去为基金的发展做出贡献。 。',
                                    fr: 'FR',
                                    es:
                                        'Con las estrategias de inversión adecuadas y un flujo de caja estable, KIF siempre me da tranquilidad todos los días para que siempre tenga una gran motivación y fuerza para luchar y luchar y luchar. y calidez.',
                                })}
                            </p>
                            <div class="info">
                                <h5 class="name">Bà Văn Thị Thanh</h5>
                                <!-- <p class="position">CEO Kingdom Game 4.0</p> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="control-slider">
            <div class="pagination-silder">
                <button class="active" onclick="setSliderWithCurrentActive(0)"></button>
                <button onclick="setSliderWithCurrentActive(1)"></button>
                <button onclick="setSliderWithCurrentActive(2)"></button>
                <button onclick="setSliderWithCurrentActive(3)"></button>
            </div>
        </div>
        <div class="control-slider1">
            <span class="prev" onclick="scrollLeftSlider()">
                <img src="./images/prev.svg" />
            </span>
            <span class="next" onclick="scrollRightSlider()">
                <img src="./images/next.svg" />
            </span>
        </div>
    </div>
`;

const footerHTML = language => `
    <div class="kdg-container">
        <div class="kdg-row va-m mb-35">
            <div class="kdg-col-1 none"></div>
            <div class="kdg-col-2">
                <div class="img-box">
                    <img src="./images/logo-footer.svg" alt="Logo" />
                    <p class="bold">KING INVESTMENTS FUND</p>
                </div>
            </div>
            <div class="kdg-col-3">
                <div class="info">
                    <h5 class="title-fund bold mb-10">KING INVESTMENTS FUND</h5>
                    <p class="address-info light mb-10">
                        ${checklanguage(language, {
                            vi: 'Trụ sở',
                            en: 'Headquarter',
                            ja: '本社',
                            kr: '본부',
                            cn: '总公司',
                            fr: 'Siège social',
                            es: 'Sede',
                        })}: 2 Kingdom Street, Paddington, London, United Kingdom, W2 6BD.
                    </p>
                    <p class="mail light">Business@kif.group</p>
                </div>
            </div>
            <div class="kdg-col-1 divider none">
                <div class="divider-child"></div>
            </div>
            <div class="kdg-col-4">
                <div class="social">
                    <h5 class="title-social bold mb-10">${checklanguage(language, {
                        vi: 'THEO DÕI KIF TRÊN MẠNG XÃ HỘI',
                        en: 'Follow KIF on social media',
                        ja: 'SNSでKIFをフォローする',
                        kr: 'SNS에서 KIF를 팔로우하세요',
                        cn: '在社交媒体上关注KIF',
                        fr: 'Suivez KIF sur les médias sociaux',
                        es: 'SEGUIR DE KIF EN RED SOCIAL',
                    })}</h5>
                    <div class="icon-box mb-10">
                        <a href="https://www.facebook.com/kinginvestments.kif" target="_blank">
                            <img src="./images/facebook.svg" alt="facebook" />
                        </a>
                        <a href="https://t.me/kif_chat" target="_blank">
                            <img src="./images/telegram.svg" alt="telegram" />
                        </a>
                        <a href="#" target="_blank">
                            <img src="./images/twitter.svg" alt="twitter" />
                        </a>
                    </div>
                    <form>
                        <div class="input-box">
                            <input
                                id="input-email" type="text"
                                placeholder="${checklanguage(language, {
                                    vi: 'Nhập email của bạn',
                                    en: 'Enter your email',
                                    ja: 'Eメールをご入力ください',
                                    kr: '이메일 주소를 입력하세요',
                                    cn: '输入你的电子邮箱',
                                    fr: 'Entrez votre e-mail',
                                    es: 'Ingresar tu nombre',
                                })}"
                            />
                            <a id="button-email" href="#" class="button">${checklanguage(language, {
                                vi: 'Đăng Ký',
                                en: 'Sign Up',
                                ja: '新規登録',
                                kr: '가입',
                                cn: '注册',
                                fr: "S'inscrire",
                                es: 'Registrar',
                            })}</a>
                        </div>
                    </form>
                </div>
            </div>
            <div class="kdg-col-1 none"></div>
        </div>
    </div>

    <div class="policy">
        <div class="kdg-container policyy">
            <a href="/Termofuse.pdf" target="_blank">Terms Of Use</a>
            <a href="Privacy-policy.pdf" target="_blank">Privacy Policy</a>
            <a href="AML.pdf" target="_blank">AML Policy</a>
            <a href="KCapitalGroupRefundandReturnpolicy.pdf" target="_blank">Refund Policy</a>
        </div>
    </div>

    <p class="copyright light">Copyright © 2020 King Investments Fund. All Rights Reserved</p>
`;

const popupDOM = document.getElementById('popup');
const headerDOM = document.getElementById('header');
const calcDOM = document.getElementById('calc');
const roadmapDOM = document.getElementById('roadmap');
const historyDOM = document.getElementById('history');
const feelDOM = document.getElementById('feel');
const footerDOM = document.getElementById('footer');

kifAPI.get('/home_page_transactions').then(res => {
    var data = res.data.data;
    var marquee = document.querySelector('marquee');
    var html = ``;
    data.forEach(el => {
        var d = new Date(el.create_date);
        html += `
        <p class="${el.type === 22 ? 'draw' : 'invest'}">
            ${el.from.email} - ${el.type === 22 ? 'Rút lãi' : 'Đầu tư'}
            <span>$${Math.ceil(el.value_in_usdt * 100) / 100}</span>
            - ${d.getDate()}/${
            d.getMonth() + 1
        }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}
        </p>
        `;
    });
});

// kifAPI.get('/home_page_transactions').then(res => {
//     var marquee = document.querySelector('marquee');
//     var html = ``;
//     data.forEach(el => {
//         var d = new Date(el.create_date);
//         html += `
//         <p class="${el.type === 22 ? 'draw' : 'invest'}">
//             ${el.from.email} - ${el.type === 22 ? 'Rút lãi' : 'Đầu tư'}
//             <span>$${Math.ceil(el.value_in_usdt * 100) / 100}</span>
//             - ${d.getDate()}/${
//             d.getMonth() + 1
//         }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}
//         </p>
//         `;
//     });

//     marquee.insertAdjacentHTML('afterbegin', html);
// });
const checkRefCode = () => {
    const openRegForm = () => {
        let popup = document.querySelector('#popup');
        let routeBtnRegister = document.querySelector('.route-popup__register');
        let formRegister = document.querySelector('.form-register');

        popup.classList.add('show');
        routeBtnRegister.classList.add('active');
        formRegister.classList.add('active');
    };
    var search = window.location.search;
    search = search.replace('?ref=', '');
    let RegisterForm = document.querySelector('form[name="form-register"]');
    let RegisterFormRefCode = RegisterForm.querySelector('#refcode');
    if (search) {
        var ishavequery = search.indexOf('&');
        if (ishavequery !== -1) {
            search = search.slice(0, search.indexOf('&'));
        }
        RegisterFormRefCode.value = search;
        openRegForm();
    }
};

const changeLanguage = language => {
    localStorage.setItem('lang', JSON.stringify(language));
    currentActive = 0;
    currLanguage = language;
    RegisterFormError = [];
    LoginFormError = [];
    AuthenticationFormError = [];
    ForgotFormError = [];
    ResetFormError = [];
    // checkLocalStorage();

    popupDOM.innerHTML = '';
    headerDOM.innerHTML = '';
    calcDOM.innerHTML = '';
    roadmapDOM.innerHTML = '';
    historyDOM.innerHTML = '';
    feelDOM.innerHTML = '';
    footerDOM.innerHTML = '';

    popupDOM.insertAdjacentHTML('afterbegin', popupHTML(language));
    headerDOM.insertAdjacentHTML('afterbegin', headerHTML(language));
    calcDOM.insertAdjacentHTML('afterbegin', calcHTML(language));
    roadmapDOM.insertAdjacentHTML('afterbegin', roadmapHTML(language));
    historyDOM.insertAdjacentHTML('afterbegin', historyHTML(language));
    feelDOM.insertAdjacentHTML('afterbegin', feelHTML(language));
    footerDOM.insertAdjacentHTML('afterbegin', footerHTML(language));

    checkRefCode();

    kifAPI.get('/home_page_transactions').then(res => {
        var data = res.data.data;
        var marquee = document.querySelector('marquee');
        var html = ``;
        data.forEach(el => {
            var d = new Date(el.create_date);
            html += `
            <p class="${el.type === 22 ? 'draw' : 'invest'}">
                ${el.from.email} - ${
                el.type === 22
                    ? `${checklanguage(language, {
                          vi: 'Rút lãi',
                          en: 'Profit Withdrawal',
                          ja: '利益の引き出し',
                          kr: '이익 인출',
                          cn: '利润提款',
                          fr: 'Retrait des bénéfices',
                          es: 'Retirar lucro',
                      })}`
                    : `${checklanguage(language, {
                          vi: 'Đầu tư',
                          en: 'Invest',
                          ja: '投資する',
                          kr: '투자',
                          cn: '投资',
                          fr: 'Investir',
                          es: 'Invertir',
                      })}`
            }
                <span>$${Math.ceil(el.value_in_usdt * 100) / 100}</span>
                - ${d.getDate()}/${
                d.getMonth() + 1
            }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}
            </p>
            `;
        });

        marquee.insertAdjacentHTML('afterbegin', html);
    });
};

let currentActive = 0;
let currLanguage = localStorage.getItem('lang') ? JSON.parse(localStorage.getItem('lang')) : 'en';
let RegisterFormError = [];
let LoginFormError = [];
let AuthenticationFormError = [];
let ForgotFormError = [];
let ResetFormError = [];
changeLanguage(currLanguage);



checkRefCode();