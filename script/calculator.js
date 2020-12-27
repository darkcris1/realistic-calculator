var LOCAL_STORAGE_LIST_KEY = 'history.list'
var histories = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
var resultInput = document.querySelector('#resultId')
var signOper = true
var dotOper = true
var answer = ''

function playSound(e) {
  console.log(e.target.tagName)
  if (!(e.target.tagName === 'BUTTON')) return
  const aud = new Audio('./click_effect.mp3');
  aud.currentTime = 0.32;
  aud.play()
}
window.addEventListener('click', playSound)
function clearBtn(elem) {
  if (elem == 'clearAll') {
    resultInput.innerText = 0
    dotOper = true
    signOper = true
  } else if (elem == 'clearOne') {
    if (resultInput.innerText == 'NaN') {
      resultInput.innerText = 0
    } else {
      resultInput.innerText = resultInput.innerText.substr(
        0,
        resultInput.innerText.length - 1,
      )
      dotOper = true
      signOper = true
      if (resultInput.innerText === '') {
        resultInput.innerText = 0
      }
    }
  }
}
function msgDisplay() {
  var msg = document.querySelector('.msgScroll')
  const parentWidth = msg.parentElement.clientWidth
  const inputWidth = resultInput.scrollWidth

  if (inputWidth > parentWidth) msg.style.display = 'block'
  else msg.style.display = 'none'
}

const observer = new MutationObserver(msgDisplay)
observer.observe(resultInput, { childList: true })

function btn(obj) {
  const input = resultInput.innerText
  if (input == '0' || input == 'NaN') resultInput.innerText = ''
  var num = obj.innerText

  if (/[0-9]/.test(num)) signOper = true

  for (var i = 0; i <= 9; i++) {
    if (num == i) resultInput.innerText += i
  }

  msgDisplay()
}

function oper(op) {
  const input = resultInput.innerText
  if (input == 'NaN' || input == '0') resultInput.innerText = ''
  if (signOper) {
    switch (op) {
      case '+':
      case '×':
      case '-':
      case '÷':
        resultInput.innerText += op
        signOper = false
        break
      case '%':
        resultInput.innerText = resultInput.innerText / 100
        break
      case 'squareroot':
        if (resultInput.innerText <= 0)
          resultInput.innerText = Math.sqrt(resultInput.innerText * -1)
        else
          resultInput.innerText = Math.sqrt(
            parseInt(eval(resultInput.innerText)),
          )
        break
    }
    if (/(\+|-|÷|×)$/.test()) dotOper = true
  }
}
function dotSign() {
  if (dotOper) {
    resultInput.innerText += '.'
    dotOper = false
  }
}
function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(histories))
}
function renderList() {
  const ul = document.querySelector('.lists')

  removeElement(ul)

  histories.forEach((list) => {
    const li = document.createElement('li')
    li.innerHTML = list
    ul.insertBefore(li, ul.firstChild)
    li.onclick = function () {
      document.querySelector('.history').click()
      resultInput.innerText = this.lastElementChild.innerHTML
    }
  })
}
// Initially render the list in local storage
renderList()

function removeElement(ulLi) {
  while (ulLi.firstChild) ulLi.firstChild.remove()
}
function clearList() {
  localStorage.removeItem(LOCAL_STORAGE_LIST_KEY)
  removeElement(this.previousElementSibling)
  histories = []
}

const clear = document.querySelector('.clear')
clear.addEventListener('click', clearList)

function equal() {
  const input = resultInput.innerText
  if (input !== '0') {
    const mathInput = input
      .replaceAll('×', '*')
      .replaceAll('÷', '/')
      .replace(/(\+|-|\*|\/)$/, '')
    answer = eval(mathInput)
    histories.push(
      `${resultInput.innerText}<br>=<span style="color:#44fd44">${answer}</span>`,
    )
    renderList()
    save()
    resultInput.innerText = answer
    dotOper = true
  }
}
// Process for Sci-cal buttons
function science(sci) {
  var input = resultInput.innerText
  var mathInput = input.replaceAll('×', '*').replaceAll('÷', '/')
  const isLastO = /(\+|÷|×|-)$/.test(input)
  if (input == 'NaN') resultInput.innerText = ''
  switch (sci) {
    case 'cos':
    case 'tan':
    case 'sin':
      if (isLastO) break
      resultInput.innerText = Math[sci](eval(mathInput))
      break
    case 'pi':
      if (isLastO) resultInput.innerText = eval(mathInput + Math.PI)
      else if (input === '0') resultInput.innerText = Math.PI
      else resultInput.innerText = eval(mathInput + '*' + Math.PI)
      break
  }
}

const historyBtn = document.querySelector('.history')
historyBtn.addEventListener('click', function () {
  const historyList = document.querySelector('.history + div')
  historyList.classList.toggle('slide')
  if (this.innerText === 'History') {
    this.style.top = '20px'
    this.innerText = 'Back'
  } else {
    this.style.top = '40px'
    this.innerText = 'History'
  }
})
