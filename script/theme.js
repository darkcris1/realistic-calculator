var calculatorCont = document.querySelector('.calculatorCont')
var root = document.querySelector(':root')
var contTheme = document.getElementById('contTheme')
var themeButton = document.querySelectorAll('.themeCont span')
var THEME_KEY = 'calc.theme'
var initialTheme = localStorage.getItem(THEME_KEY) || 'default'
var themes = {
  darktheme: {
    calculatorCont: 'black',
    keyBtn: 'black',
  },
  default: {
    calculatorCont: '#3d433d',
    keyBtn: 'linear-gradient(#305030,#334d33,#394639,#3d433d 90%)',
  },
  theme1: {
    calculatorCont: 'linear-gradient(to right,#4278b9,#ae9a41)',
    keyBtn: 'linear-gradient(to left,#367c95,#945353)',
  },
  theme2: {
    calculatorCont: 'linear-gradient(0deg,rgb(153,87,146),#503678)',
    keyBtn: 'linear-gradient(rgb(111,28,145),rgb(129,56,93))',
  },
}

themeButton.forEach((button) => {
  button.addEventListener('click', function () {
    const keyClass = this.className.replace('active', '').trim()

    // Save the theme in local storage
    localStorage.setItem(THEME_KEY, keyClass)

    var { calculatorCont, keyBtn } = themes[keyClass]

    root.style.setProperty('--calculator-bg', calculatorCont)
    root.style.setProperty('--key-button-bg', keyBtn)

    // Get the current active element , remove the active class and pass it
    const currentActive = document.querySelector('.themeCont span.active')
    currentActive.classList.remove('active')
    this.classList.add('active')
  })
})

function renderTheme() {
  document.querySelector('.' + initialTheme).click()
}
window.addEventListener('DOMContentLoaded', renderTheme)
