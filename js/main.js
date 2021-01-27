const showLanguage = () => {
    var currentLanguage = document.querySelector('.current-language');
    if (Array.from(currentLanguage.classList).includes('show')) {
        currentLanguage.classList.remove('show');
    } else {
        currentLanguage.classList.add('show');
    }
};

document.addEventListener('click', e => {
    var currentLanguage = document.querySelector('.current-language');
    if (
        Array.from(currentLanguage.classList).indexOf('show') !== -1 &&
        !e.path.includes(currentLanguage)
    ) {
        currentLanguage.classList.remove('show');
    }
});
document.addEventListener('keyup', e => {
    let popup = document.querySelector('#popup');
    if (!Array.from(popup.classList).includes('show')) return;
    if (e.keyCode === 27) hidePopup();
});

const showMenuHeader = () => {
    let menuPage = document.querySelector('.menu-page');
    if (Array.from(menuPage.classList).includes('show-menu')) {
        menuPage.classList.remove('show-menu');
    } else {
        menuPage.classList.add('show-menu');
    }
};
const hideMenuHeader = () => {
    let menuPage = document.querySelector('.menu-page');
    menuPage.classList.remove('show-menu');
};
document.addEventListener('keyup', e => {
    if (e.keyCode === 27) hideMenuHeader();
});

var handleInputCalc = function (ele) {
    var value = Number(ele.value);
    var perday = document.getElementById('perday');
    var perweek = document.getElementById('perweek');
    var permonth = document.getElementById('permonth');

    perday.innerText = '$' + Math.floor(value * 0.004 * 100) / 100;
    perweek.innerText = '$' + Math.floor(value * 0.004 * 7 * 100) / 100;
    permonth.innerText = '$' + Math.floor(value * 0.004 * 30 * 100) / 100;
};

const clearValue = () => {
    let inputCalc = document.getElementById('input-number');
    inputCalc.value = '';
    handleInputCalc(inputCalc);
};





var smoothSroll = function (track, startX = 0, endX = 0, startY = 0, endY = 0, duration) {
    return new Promise(function (resolve) {
        var scrollLengthX = endX - startX;
        var scrollLengthY = endY - startY;

        var startTime = new Date().getTime();

        var interval = setInterval(function () {
            var currTime = new Date().getTime();

            if (currTime - startTime < duration) {
                var percentTime = (currTime - startTime) / duration;
                track.scroll(
                    startX + scrollLengthX * percentTime,
                    startY + scrollLengthY * percentTime
                );
            } else {
                track.scroll(endX, endY);
                clearInterval(interval);
                resolve();
            }
        }, 10);
    });
};

var setSliderWithCurrentActive = function (newCurrentActive) {
    var trackSlider = document.querySelector('#feel .wrapper-slider');
    var blockSilder = document.querySelector('#feel .wrapper-slider .slider');
    var sliderPrevButton = document.querySelector('#feel .prev');
    var sliderNextButton = document.querySelector('#feel .next');

    var listPaginationSlider = Array.from(
        document.querySelectorAll('#feel .control-slider .pagination-silder button')
    );

    var totalScroll = Math.abs(newCurrentActive - currentActive);
    var sliderWidth = blockSilder.querySelector('.item').offsetWidth;
    var endX = newCurrentActive * sliderWidth;

    listPaginationSlider[currentActive].classList.remove('active');
    listPaginationSlider[newCurrentActive].classList.add('active');
    sliderPrevButton.style.pointerEvents = 'none';
    sliderNextButton.style.pointerEvents = 'none';
    listPaginationSlider.forEach(function (el) {
        el.style.pointerEvents = 'none';
    });
    smoothSroll(
        trackSlider,
        trackSlider.scrollLeft,
        endX,
        undefined,
        undefined,
        totalScroll * 300
    ).then(function () {
        currentActive = newCurrentActive;
        listPaginationSlider.forEach(function (el) {
            el.style.pointerEvents = 'all';
        });
        sliderPrevButton.style.pointerEvents = 'all';
        sliderNextButton.style.pointerEvents = 'all';
    });
};

const scrollLeftSlider = () => {
    let listSlider = Array.from(document.querySelectorAll('#feel .wrapper-slider .slider .item'));
    setSliderWithCurrentActive(currentActive - 1 >= 0 ? currentActive - 1 : listSlider.length - 1);
};

const scrollRightSlider = () => {
    let listSlider = Array.from(document.querySelectorAll('#feel .wrapper-slider .slider .item'));
    setSliderWithCurrentActive(currentActive + 1 <= listSlider.length - 1 ? currentActive + 1 : 0);
};
