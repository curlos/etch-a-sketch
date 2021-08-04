// const gridElem = document.querySelector('.grid')
// console.log(gridElem)
// console.log(gridElem.style)
// console.log(gridElem.style.gridTemplateColumns)
// gridElem.style['gridTemplateColumns'] = 'repeat(10, 80px);'

const grid = document.querySelector('.grid')

const generateGrid = (gridSize=10) => {
    grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`

    for (let i = 0; i < gridSize ** 2; i++) {
        let cell = document.createElement('div')
        cell.classList.add('cell')
        cell.addEventListener("mouseover", changeColor)
        grid.appendChild(cell)
    }
}

const changeColor = (event) => {
    const elem = event.target
    elem.style.backgroundColor = 'black'
}

generateGrid()