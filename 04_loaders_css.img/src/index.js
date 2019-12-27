
function createEl() {
    let body = document.body
    let div = document.createElement('div')
    div.setAttribute('id', 'box')
    div.innerHTML = '我是box'
    div.style.backgroundColor = 'pink'

    body.appendChild(div)

    console.log(div)
}

createEl()