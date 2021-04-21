'use strict'

const btnElm = document.querySelectorAll('.cell')

let move = 'circle';

btnElm.forEach(cell => {
  cell.addEventListener('click', (e) => {
    const cell = e.target
    if (move !== 'circle') {
      cell.classList.add('add-cross');
      document.querySelector('.ikon').src = 'img/circle.svg';
      move = 'circle'
    } else {
      cell.classList.add('add-circle');
      document.querySelector('.ikon').src = 'img/cross.svg';
      move = 'cross'
    }
    cell.disabled = true
  }, {once: true})
})