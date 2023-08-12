var generateButton = document.getElementById("generate")
var previousList = document.getElementById("previous")
var table = document.getElementById("squares")
var last = document.getElementById("last")

var lastSelectedColor = "rgb(0, 200, 255)"
var selectedColor = "rgb(200, 200, 255)"

let squares = []
let columns = {
    1: "A",
    2: "B",
    3: "C",
    4: "D",
    5: "E",
    6: "F",
    7: "G"
}

function keyByValue(appObj, value) {
    // https://www.tutorialspoint.com/get-key-from-value-in-javascript
    const [key] = Object.entries(appObj).find(([key, val]) => val === value) || [];
    return key || null;
 }
function displaySquare(square) {
    let li = document.createElement("li")
    li.innerHTML = square
    previousList.append(li)
}
function newSquare(square) {
    squares[squares.length] = square

    displaySquare(square);

    let col = square.charAt(0); // A
    let row = Number.parseInt(square.charAt(1)); // 5

    let tableRow = table.children[row-1]
    let tableItem = tableRow.children[keyByValue(columns, col)-1]

    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            let item = table.children[i].children[j]
            if (item.style.backgroundColor == lastSelectedColor) {
                item.style.backgroundColor = selectedColor
                break
            }
        }
    }

    tableItem.style.backgroundColor = lastSelectedColor

    last.innerHTML = square
}
function generate() {
    if (squares.length == 7 * 7) { return }

    let square = ""
    while (true) {
        let row = Math.floor(Math.random() * 7) + 1
        let col = columns[Math.floor(Math.random() * 7) + 1]
    
        square = col+row

        if (!(squares.includes(square))) { break }
    }

    console.log(square)

    newSquare(square)
}
function choose() {
    if (squares.length == 7 * 7) { return }

    let square = ""
    while (true) {
        square = prompt("Next square: ").toUpperCase()
        
        if ( !(squares.includes(square)) && square.length == 2 && !isNaN(square.charAt(1)) && isNaN(square.charAt(0)) ) { break }
    }

    newSquare(square)
}
function undo() {
    let lastSquare = previousList.lastChild;
    let square = lastSquare.innerHTML

    lastSquare.remove();
    squares.pop();

    if (squares.length == 0) { 
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 7; j++) {
                let item = table.children[i].children[j]
                item.style = ""
            }
        }
        last.innerHTML = "No square selected yet"
        return
    }

    let nextLastSquare = previousList.lastChild

    last.innerHTML = nextLastSquare.innerHTML

    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            let item = table.children[i].children[j]
            if (item.innerHTML == square) {
                item.style = ""
            } else if (item.innerHTML == nextLastSquare.innerHTML) {
                item.style.backgroundColor = lastSelectedColor
            }
        }
    }
}