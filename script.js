// const gridElem = document.querySelector('.grid')
// console.log(gridElem)
// console.log(gridElem.style)
// console.log(gridElem.style.gridTemplateColumns)
// gridElem.style['gridTemplateColumns'] = 'repeat(10, 80px);'

const grid = document.querySelector('.grid')
const colorPicker = document.querySelector('.colorPicker')
const slider = document.getElementById('myRange')
const colorModeButton = document.querySelector('.colorMode')
const rainbowModeButton = document.querySelector('.rainbowMode')
const eraserButton = document.querySelector('.eraser')
const clearButton = document.querySelector('.clear')
let color = colorPicker.value
let mode = 'color'

const generateGrid = (gridSize=64) => {
    clearGrid()

    grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`

    for (let i = 0; i < gridSize ** 2; i++) {
        let cell = document.createElement('div')
        cell.classList.add('cell')
        cell.addEventListener("mouseover", changeDivColor)
        grid.appendChild(cell)
    }
}

const changeDivColor = (event) => {
    const elem = event.target

    if (mode == 'color') {
        elem.style.backgroundColor = color
    } else if (mode == 'rainbow') {
        color = "#" + Math.floor(Math.random()*16777215).toString(16)
        elem.style.backgroundColor = color
    } else if (mode == 'eraser') {
        color = '#fff'
        elem.style.backgroundColor = color
    }
}

const clearGrid = () => {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild)
    }
}

const changeColorValue = (event) => {
    console.log(event.target.value)
    color = event.target.value
}

const updateSliderValue = (event) => {
    console.log(event.target.value)
}

const submitNewSliderValue = () => {
    console.log('called')
    generateGrid(slider.value)
}

const changeMode = (event) => {
    console.log(event.target.value)
    mode = event.target.value
}

const resetGrid = (event) => {
    generateGrid(slider.value)
}

slider.addEventListener('input', updateSliderValue)
slider.addEventListener('mouseup', submitNewSliderValue)
colorPicker.addEventListener('input', changeColorValue)

colorModeButton.addEventListener('click', changeMode)
rainbowModeButton.addEventListener('click', changeMode)
eraserButton.addEventListener('click', changeMode)
clearButton.addEventListener('click', resetGrid)

generateGrid(slider.value)