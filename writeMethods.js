//CSI (Control Sequence Introducer) sequences TEST ~ will be used to animate in the future
//test async
//test code escape sequences \033[D\033[D\033[D. maybe use  char
// "\033[F" – move cursor to the beginning of the previous line
//
//
//DONT USE M TO SCROLL UP
//up - "\033[A"
//down - "\033[B"
//left - "\033[D"
//right - "\033[C"
// let scrollPosition = 0;
// XTermTestv2.term.onScroll((apple) => { scrollPosition = apple.valueOf() })
//
//  TERMINAL WRITE FUNCTIONS
//  MOVE TO SEPERATE FILE LATER
//
import lodashC from "lodash.compact";
import {ImageScreenTerm} from "./ui.js";
import chalk from "chalk";

export function escLeftByNum(num) {
    return `[${num}D`
}

function escRightByNum(num) {
    return `[${num}C`
}

export function escUpByNum(num) {
    return `[${num}A`
}

function escDownByNum(num) {
    return `[${num}B`
}

function findCursor(terminal = ImageScreenTerm) {
    return [terminal.term.buffer.active.cursorX, terminal.term.buffer.active.cursorY]
}

function goToTermPosStr(arr1, terminal = ImageScreenTerm) {
    let arr2 = findCursor(terminal)
    let Xpos = arr1[0] - arr2[0]
    let Ypos = arr1[1] - arr2[1]
    let escHorizontalChars = Xpos >= 0 ? escRightByNum(Xpos) : escLeftByNum(Math.abs(Xpos))
    let escVerticalChars = (Ypos >= 0) ? escDownByNum(Ypos) : escUpByNum(Math.abs(Ypos))
    return `${escHorizontalChars}${escVerticalChars}`
}

async function slowWrite(str = '', terminal, speed) {
    str.replace(/\n+/g, ' ')
    str.replace(/\r+/g, ' ')
    let strArr = str.split(' ')
    for (let [index, tempStr] of strArr.entries()) {
        tempStr += ' '
        let cursorX = terminal.term.buffer.active.cursorX;
        let tempStrLength = tempStr.length
        let numCols = terminal.term.cols
        if (index === 0) {
            1
        } else if (index === strArr.length - 1) {
            1
        }
        if (cursorX === (numCols - 1)) {
            1
        }
        if (1 + cursorX + tempStrLength <= numCols) {
            terminal.writeSync(chalk.hex('909090')(tempStr))
            await new Promise(resolve => setTimeout(resolve, speed));
            terminal.writeSync(`${escLeftByNum(tempStrLength)}${chalk.hex('FFFFFF')(tempStr)}`)
            await new Promise(resolve => setTimeout(resolve, speed));
            //unwrite then rewrite diff color
        } else {
            // check how scrolling affects logged cursor positions and if it should decrement Y position
            terminal.writeSync(`\n${chalk.hex('909090')(tempStr)}`)
            await new Promise(resolve => setTimeout(resolve, speed));
            terminal.writeSync(`${escLeftByNum(tempStrLength)}${chalk.hex('FFFFFF')(tempStr)}`)
            await new Promise(resolve => setTimeout(resolve, speed));
        }
    }
}

function fitLines(str = '', cols = 0) {
    //various checks for characters that screw up the line wrapping
    // regex screws up apostrophes
    let strArr = str.split('\n')
    strArr = strArr.filter(n => n)
    strArr = strArr.join(' ')
    strArr = strArr.replace(/ +(?= )/g, '');
    strArr = strArr.split(' ');
    strArr = strArr.filter(n => n)
    let R = lodashC(strArr)
    let K = []
    for (let i = 0; i < R.length; i++) {
        if (typeof R[i] === 'string' || R[i] instanceof String) {
            K.push(R[i].concat(' '))
        }
    }
    let lines = []
    let rollingCount = 0
    let line = []
    for (let item of K) {
        rollingCount += item.length
        if (rollingCount > cols) {
            if (rollingCount - 1 === cols) {
                line[line.length - 1] = line[line.length - 1].slice(0, -1)
            }
            lines.push(line)
            rollingCount = item.length
            line = []
            if (item) {
                line.push(item)
            }
        } else {
            if (item) {
                line.push(item)
            }// later move to top to be more efficient
        }
    }
    lines.push(line)
    return lines
}

//doesn't change array length unlike normal shift method
function shiftArray(arr = [1, 2, 3, 4, 5], end = '', populate = true, populateArray = ['h', 'i', 'j', 'k', 'l',]) {
    let retVal = arr[0]
    for (let i = 0; i < arr.length - 1; i++) {
        arr[i] = arr[i + 1]
    }
    arr[arr.length - 1] = populate ? shiftArray(populateArray, end, false) : end
    return retVal
}

function mapTextPosition(textArr) {
    let lines = textArr;
    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            lines[y][x] = [lines[y][x], x, y]
        }
    }
}

export function rollLog(terminal = ImageScreenTerm) {
    //set scroll to bottom
    terminal.term.scrollToBottom()
    let scrollAmount = terminal.term.buffer.active.cursorY + 1
    // \ after \r to escape the hidden newline character
    terminal.writeSync(`${escDownByNum((terminal.term.rows - 1) - terminal.term.buffer.active.cursorY)}\r\
  ${`\n`.repeat(scrollAmount)}${escUpByNum(terminal.term.rows - 1)}`)
}

async function scanlines(terminal = ImageScreenTerm, text = '', speed = 5, colorArr = []) {
    colorArr = colorArr ? colorArr : ['93CAED', 'ee82ee', '4b0082', '0000ff', '008000', 'ffff00', 'ffa500', 'ff0000']
    let lines = fitLines(text, terminal.term.cols)
    let arr2 = Array(colorArr.length).fill('')
    let cursorPos = 1
    let arr = arr2.map((content, index, arr) => {
        arr[index] = [cursorPos, content]
    })
    for (let line of lines) {
        for (let i = 0; i < line.length + arr.length - 1; i++) {
            shiftArray(arr, '', true, line)
            shiftArray(arr2, ['', '',], false)
            arr2[arr2.length - 1] = [cursorPos, arr[arr.length - 1]]
            for (let i = arr.length - 1; i > -1; i--) {
                if (arr2[i][0]) {
                    terminal.writeSync(`[${arr2[i][0]}G${chalk.hex(colorArr[i])(arr2[i][1])}`)
                    await new Promise(resolve => setTimeout(resolve, speed))
                }
            }
            cursorPos = cursorPos += arr[arr.length - 1].length
        }
        terminal.writeSync('\n')
        cursorPos = 1
    }
}

//blank in future methods to write things to terminals in fancy ways wills be here instead of in the main file
export async function gradient_scanlines(terminal = ImageScreenTerm, text = "", speed = 5, gradientFunction, colorArr = []) {
    let multiline = ``
    let lorem_lines = fitLines(text, terminal.term.cols - 1)
    for (let line of lorem_lines) {
        let line_str = line.join('')
        if (line_str) {
            line_str = line_str.concat('\n')
        }
        multiline = multiline.concat(line_str)
    }
    multiline = gradientFunction(multiline)
    let cleaned = ''
    let cleanUp = fitLines(text, terminal.term.cols - 1)
    for (let line of cleanUp) {
        let line_str = line.join('')
        if (line_str) {
            line_str = line_str.concat('\n')
        }
        cleaned = cleaned.concat(line_str)
    }
    let strArr = multiline.split("\n");
    let strArr2 = cleaned.split("\n");
    for (let i = 0; i < strArr.length; i++) {
        strArr[i] = strArr[i].split(" ")
        strArr2[i] = strArr2[i].split(" ")
    }
    let temp_arr = JSON.parse(JSON.stringify(strArr2))
    mapTextPosition(temp_arr)
    //effectivelly ignores first element of array so must compensate for that
    colorArr = colorArr ? [colorArr[0], ...colorArr] : ['ffffff', 'ffffff', 'ee82ee', '4b0082', '0000ff', '008000', 'ffff00', 'ffa500', 'ff0000']
    let gradient_text = strArr;
    let lines = temp_arr;
    let arr2 = Array(colorArr.length).fill('')
    let cursorPos = 1
    //add 2d array word position
    let arr = arr2.map((content, index, arr) => {
        arr[index] = [cursorPos, content, 0/*XposArr*/, 0/*YposArr*/]
    })
    for (let line of lines) {
        for (let [index, word] of line.entries()) {
            if (line[index] !== line[-1]) {
                line[index][0] = word[0].concat(' ')
            }
        }
    }
    for (let line of gradient_text) {
        for (let [index, word] of line.entries()) {
            if (line[index] !== line[-1]) {
                line[index] = word.concat(' ')
            }
        }
    }
    for (let x = 0; x < lines.length; x++) {
        let line = lines[x]
        for (let i = 0; i < line.length + arr.length - 1; i++) {
            shiftArray(arr, '', true, line)
            shiftArray(arr2, ['', '', 0, 0,], false)
            arr2[arr2.length - 1] = [cursorPos, arr[arr.length - 1]]
            for (let i = arr.length - 1; i > -1; i--) {
                if (!(i === 0)) {
                    if (arr2[i][0]) {
                        if (arr2[i][1][0]) terminal.writeSync(`[${arr2[i][0]}G${chalk.hex(colorArr[i])(arr2[i][1][0])}`);
                        await new Promise(resolve => setTimeout(resolve, speed))
                    }
                } else if (i === 0) {
                    if (arr2[i][0]) {
                        if (arr2[i][1][0]) terminal.writeSync(`[${arr2[i][0]}G${gradient_text[arr2[i][1][2]][arr2[i][1][1]]}`);
                        await new Promise(resolve => setTimeout(resolve, speed))
                    }
                }
            }
            try {
                cursorPos = cursorPos += arr[arr.length - 1][0].length
            } catch (error) {
                cursorPos = cursorPos += 0
            }
        }
        if (!(x === lines.length - 1)) terminal.writeSync('\n');
        cursorPos = 1

    }
}