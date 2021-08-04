
const grid = document.querySelector('.grid')
const penColorPicker = document.querySelector('.penColorPicker')
const backgroundColorPicker = document.querySelector('.backgroundColorPicker')
const slider = document.getElementById('myRange')
const colorModeButton = document.querySelector('.colorMode')
const rainbowModeButton = document.querySelector('.rainbowMode')
const eraserButton = document.querySelector('.eraser')
const clearButton = document.querySelector('.clear')

backgroundColorPicker.value = '#ffffff'

let penColor = penColorPicker.value
let previousBackgroundColor = backgroundColorPicker.value
let backgroundColor = backgroundColorPicker.value
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
        penColor = penColorPicker.value
        elem.style.backgroundColor = penColor
    } else if (mode == 'rainbow') {
        penColor = "#" + Math.floor(Math.random()*16777215).toString(16)
        elem.style.backgroundColor = penColor
    } else if (mode == 'eraser') {
        penColor = backgroundColor
        elem.style.backgroundColor = penColor
    }
}

const clearGrid = () => {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild)
    }
}

const changePenColorValue = (event) => {
    console.log(event.target.value)
    penColor = event.target.value
}

const changeBackgroundColorValue = (event) => {
    console.log(event.target.value)
    backgroundColor = event.target.value

    let cells = document.getElementsByClassName('cell')


    for (let cell of cells) {

        if (cell.style.backgroundColor == '') {
            cell.style.backgroundColor = backgroundColor
        } else {
            let rgb = cell.style.backgroundColor
        
            rgb = rgb.substring(4, rgb.length-1)
            .replace(/ /g, '')
            .split(',');

            let r = Number(rgb[0])
            let g = Number(rgb[1])
            let b = Number(rgb[2])
            let cellBackgroundColor = rgbToHex(r, g, b)

            console.log(cellBackgroundColor)
            if (cellBackgroundColor == previousBackgroundColor) {
                cell.style.backgroundColor = backgroundColor
            }
        }
    }

    previousBackgroundColor = backgroundColor
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
penColorPicker.addEventListener('input', changePenColorValue)
penColorPicker.addEventListener('input', changePenColorValue)
backgroundColorPicker.addEventListener('input', changeBackgroundColorValue)
colorModeButton.addEventListener('click', changeMode)
rainbowModeButton.addEventListener('click', changeMode)
eraserButton.addEventListener('click', changeMode)
clearButton.addEventListener('click', resetGrid)

// Version 4.0 - Shade, Blend and Convert a Web Color @PimpTrizkit
const pSBC = (p,c0,c1,l) => {
	let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
	if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
	if(!this.pSBCr)this.pSBCr=(d)=>{
		let n=d.length,x={};
		if(n>9){
			[r,g,b,a]=d=d.split(","),n=d.length;
			if(n<3||n>4)return null;
			x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
		}else{
			if(n==8||n==6||n<4)return null;
			if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
			d=i(d.slice(1),16);
			if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
			else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
		}return x};
	h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
	if(!f||!t)return null;
	if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
	else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
	a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
	if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
	else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}

const componentToHex = (c) => {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  

const rgbToHex = (r, g, b) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
  

window.onload = () => {
    generateGrid(slider.value)
}