const gridElem = document.querySelector('.grid')
console.log(gridElem)
console.log(gridElem.style)
console.log(gridElem.style.gridTemplateColumns)
gridElem.style['gridTemplateColumns'] = 'repeat(10, 80px);'