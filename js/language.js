const checklanguage = function (language , {...content}) {

    return content[language]
}

const header = (language) => `
    <div class="kdg-container z-index-1 position-relative h-full">
        <div class="kdg-row va-m">
            <div class="kdg-col-5">
                <div class="logo">
                    <img src="./images/logo-header.svg" alt="Logo" />
                    <h3 class="bold">KING INVESTMENTS FUND</h3>
                </div>
            </div>
            <div class="kdg-col-6">
                <ul class="menu">
                    <li><a href="https://kif.group/" target="_blank" id="more">Tìm hiểu thêm về kif <span>tại đây</span></a></li>
                    <li><div id="login">${
                        checklanguage(language , {
                            vi : 'ĐĂNG NHẬP',
                            en : "LOGIN"
                        })
                    }</div></li>
                    <li><div id="register">ĐĂNG KÝ</div></li>
                </ul>
            </div>
            <div class="kdg-col-1">
                <div class="current-language">
                    <span>VI</span>
                    <ul class="choose-language">
                        <li>VI</li>
                        <li>EN</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="kdg-row content">
            <div class="kdg-col-7">
                <h1 class="bold">YOUR TRUST - OUR FUTURE</h1>
                <h6>King Investments Fund - mô hình Quỹ 4.0 tiên phong trong lĩnh vực đầu tư tài chính số. Chúng tôi luôn đem đến các giải pháp đầu tư tốt nhất được quản lý chuyên nghiệp bởi các chuyên gia tài chính hàng đầu hiện nay.</h6>
                <span onclick="openLoginForm()" class="button">ĐẦU TƯ NGAY</span>
            </div>
        </div>
        <div class="menu-icon">
            <img src="./images/menu-icon.svg" />
        </div>
        <div class="menu-page">
            <div class="mask"></div>
            <img class="logo" src="./images/logo-header.svg" />
            <p class="menu-page-title">KING INVESTMENTS FUND</p>
            <a href="https://kif.group/" target="_blank" class="menu-page-more">Tìm Hiểu Thêm Về KIF <span>Tại Đây</span></a>
            <div class="control">
                <button onclick="openLoginForm()" class="login">ĐĂNG NHẬP</button>
                <button onclick="openRegForm()" class="register">ĐĂNG KÝ</button>
            </div>
            <div class="language">
                <div data-lang="vi" class="lang vi active">VI</div>
                <div data-lang="en" class="lang en">EN</div>
            </div>
            <div class="close-icon">
                <img src="./images/close-icon.svg" />
            </div>
        </div>
    </div>
`