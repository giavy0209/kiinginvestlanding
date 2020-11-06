var handleInputCalc = function (ele) {
    var perday = document.getElementById('perday')
    var perweek = document.getElementById('perweek')
    var permonth = document.getElementById('permonth')
    var value = Number(ele.value)
    perday.innerText = '$'+(value * 0.004).toFixed(2)
    perweek.innerText = '$'+(value * 0.004 * 7).toFixed(2)
    permonth.innerText = '$'+(value * 0.004 * 30).toFixed(2)
}
var smoothSroll = function (track,startX = 0, endX = 0, startY = 0, endY = 0 , duration = 300) {
    return new Promise (function(resolve) {
        var scrollLengthX = endX - startX
        var scrollLengthY = endY - startY

        var startTime = new Date().getTime()

        var interval = setInterval(function() {
            var currTime = new Date().getTime()
            
            if(currTime - startTime < duration ){
                var percentTime = (currTime - startTime) / duration
                track.scroll(startX + scrollLengthX * percentTime , startY + scrollLengthY * percentTime)
            }else{
                track.scroll(endX, endY)
                clearInterval(interval)
                resolve()
            }
        }, 10);
    })
}
window.onload = function () {
    var currentLanguage = document.querySelector('.current-language')
    let inputCalc = document.getElementById('input-number')
    handleInputCalc(inputCalc)

    inputCalc.addEventListener('focus', e => {
        e.target.value = ''
    })

    document.addEventListener('click', e => {
        if
        (
            Array.from(currentLanguage.classList).indexOf('show') !== -1 &&
            !e.path.includes(currentLanguage)
        )
        {
            currentLanguage.classList.remove('show')
        }
    })

    var showlanguage = function () {
        currentLanguage.addEventListener('click', function () {
            if (Array.from(this.classList).includes('show'))
                this.classList.remove('show')
            else
                this.classList.add('show')
        })
    }
    showlanguage()
}

//slider
var currentActive = 0

var trackSlider = document.querySelector('#feel .wrapper-slider')
var blockSilder = document.querySelector('#feel .wrapper-slider .slider')
var listSlider = Array.from(blockSilder.querySelectorAll('.item'))

var blockPaginationSlider = document.querySelector('#feel .control-slider .pagination-silder')
var sliderPrevButton = document.querySelector('#feel .prev')
var sliderNextButton = document.querySelector('#feel .next')

var removeAllActive = function(list){
    list.forEach(function(el){
        el.classList.remove('active')
    })
}

var setSliderWithCurrentActive = function (newCurrentActive, listPaginationSlider) {
    var totalScroll = Math.abs(newCurrentActive - currentActive)
    var sliderWidth = blockSilder.querySelector('.item').offsetWidth
    var endX = newCurrentActive * sliderWidth
    removeAllActive(listPaginationSlider)
    listPaginationSlider[newCurrentActive].classList.add('active')
    sliderPrevButton.style.pointerEvents = 'none'
    sliderNextButton.style.pointerEvents = 'none'
    listPaginationSlider.forEach(function(el){
        el.style.pointerEvents = 'none'
    })
    smoothSroll(trackSlider, trackSlider.scrollLeft , endX, undefined, undefined , totalScroll * 300)
    .then(function () {
        currentActive = newCurrentActive
        listPaginationSlider.forEach(function(el){
            el.style.pointerEvents = 'all'
        })
        sliderPrevButton.style.pointerEvents = 'all'
        sliderNextButton.style.pointerEvents = 'all'
    })
}

listSlider.forEach(function(el, index) { 
    var create_pagination_button = document.createElement('button')
    blockPaginationSlider.append(create_pagination_button)

})
var blockPaginationSlider = document.querySelector('#feel .control-slider .pagination-silder')
var listPaginationSlider = Array.from(blockPaginationSlider.querySelectorAll('button'))
removeAllActive(listPaginationSlider)

listPaginationSlider[currentActive].classList.add('active')

listPaginationSlider.forEach(function(el,index){
    el.addEventListener('click' , function(e) {
        setSliderWithCurrentActive(index , listPaginationSlider)
    })
})
sliderPrevButton.addEventListener('click' , function() {
    setSliderWithCurrentActive(
        currentActive - 1 >= 0 ? currentActive - 1 : listSlider.length - 1,
        listPaginationSlider
    )
})
sliderNextButton.addEventListener('click' , function() {
    setSliderWithCurrentActive(
        currentActive + 1 < listSlider.length ? currentActive + 1 : 0,
        listPaginationSlider
    )
})
// Language
var changeLanguageFunc = function(e) {
    let currentElement = e.target
    currentElement.parentElement.querySelector('[class*=active]').classList.remove('active')
    if (currentElement.getAttribute('data-lang').toLowerCase() === currentElement.innerText.toLowerCase())
    currentElement.classList.add('active')
}
let languages = document.querySelectorAll('.language .lang')

languages.forEach(lang => {
    lang.addEventListener('click', changeLanguageFunc)
})

// Show Menu
let menuPage = document.querySelector('.menu-page')
var showMenuButton = document.querySelector('.menu-icon')

var showMenuFunc = function() {
    menuPage.classList.add('show-menu')
}
showMenuButton.addEventListener('click', e => {
    showMenuFunc()
})

// Close Menu
var closeMenuButton = [
    menuPage.querySelector('.close-icon'),
    menuPage.querySelector('.mask')
]
var closeMenuFunc = function (el) { 
    menuPage.classList.remove('show-menu')
}
closeMenuButton.forEach(function(el){
    el.addEventListener('click', closeMenuFunc)
})

document.addEventListener('keyup', e => {
    if (e.key === 'Escape'){
        closeMenuFunc()
    }
})