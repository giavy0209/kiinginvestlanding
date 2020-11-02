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