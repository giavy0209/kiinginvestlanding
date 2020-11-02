var handleInputCalc = function (e) {
    var input = document.getElementById('input-number')
    var perday = document.getElementById('perday')
    var perweek = document.getElementById('perweek')
    var permonth = document.getElementById('permonth')
    var value = Number(e.value)
    console.log(value);
    perday.innerText = '$'+(value * 0.004).toFixed(2)
    perweek.innerText = '$'+(value * 0.004 * 7).toFixed(2)
    permonth.innerText = '$'+(value * 0.004 * 30).toFixed(2)
}
window.onload = function () {
    var chooseLanguage = document.querySelector('.current-language')
    handleInputCalc(document.getElementById('input-number'))

    document.addEventListener('click',e=>{
        if(Array.from(chooseLanguage.classList).indexOf('show') !== -1 && !e.path.includes(chooseLanguage)) {
            chooseLanguage.classList.remove('show')
        }
    })

    var showlanguage = function () {
        chooseLanguage.addEventListener('click', function () {
            if(Array.from(this.classList).includes('show')){
                this.classList.remove('show')
            }else{
                this.classList.add('show')
            }
        })
    }
    showlanguage()
}

// Slider
let slider = document.querySelector('.slider')
let listItems = Array.from(slider.querySelectorAll('.item'))
let widthSlider = 0;
let listItemData = listItems.map(item => {
    widthSlider += item.offsetWidth
    item.style.width = item.offsetWidth + 'px'
    return {
        itemElement: item,
        itemWidth: item.offsetWidth
    }
})
slider.style.width = widthSlider + 'px'
let btnNext = slider.parentElement.parentElement.querySelector('.next')
let btnPrev = slider.parentElement.parentElement.querySelector('.prev')
let currentSlider = 0
let widthTransform = 0
btnNext.addEventListener('click', e => {
    if (currentSlider < listItemData.length - 1) {
        widthTransform += (-1) * listItemData[currentSlider].itemWidth
        slider.style.transform = `translateX(${widthTransform}px)`
        currentSlider++
    }
})
btnPrev.addEventListener('click', e => {
    if (currentSlider > 0) {
        widthTransform -= (-1) * listItemData[currentSlider].itemWidth
        slider.style.transform = `translateX(${widthTransform}px)`
        currentSlider--
    }
})