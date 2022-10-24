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
//
import lodashC from "lodash.compact";
import {ImageScreenTerm, logs} from "./ui.js";
import gradient from 'gradient-string';
import chalk from "chalk";
import {DMG_COLOUR, DMG_TYPE, dynamicBox, escDownByNum, escLeftByNum, escRightByNum, escUpByNum, miscColours, rarityByWeight, weapons} from "./game-objects/data.js";

chalk.level = 2;

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
export function fitLines(str = '', cols = 0) {
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
			} // later move to top to be more efficient
		}
	}
	lines.push(line)
	return lines
}
//doesn't change array length unlike normal shift method
function shiftArray(arr = [1, 2, 3, 4, 5], end = '', populate = true, populateArray = ['h', 'i', 'j', 'k', 'l', ]) {
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
		arr[index] = [cursorPos, content, 0 /*XposArr*/ , 0 /*YposArr*/ ]
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
			shiftArray(arr2, ['', '', 0, 0, ], false)
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
			shiftArray(arr2, ['', '', ], false)
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

export function mkWeaponBan(weapon=weapons.newtons_apple, vertBarColour='36454f'){
    let wpn=weapon
    let wpnlines=wpn.description.split('\n')
    let testweaponBanner=
`\
             ${chalk.hex(rarityByWeight(wpn.rarity))('Name   :'+(wpn.name.replace(/_/g, ' ')))}
             ${chalk.greenBright(`dmgDie :${wpn.dmgDie}`)}
             ${chalk.hex(wpn.dmgType.color)('dmgTyp :'+wpn.dmgType.name)}
             ${chalk.blueBright(`desc.  :${wpnlines[0]}`)}
                     ${chalk.blueBright(`${wpnlines[1]?wpnlines[1]:''}${wpnlines[2]?`\n${' '.repeat(21)+wpnlines[2]}`:''}`)}\
`
    return dynamicBox(testweaponBanner,51,false, gradient.passion,vertBarColour)
}//passion

export function fitLinesStr(text, width = logs.term.cols - 1) {
	let multiline = ``
	let lorem_lines = fitLines(text, width)
	for (let line of lorem_lines) {
		let line_str = line.join('')
		if (line_str) {
			line_str = line_str.concat('\n')
		}
		multiline = multiline.concat(line_str)
	}
	return multiline
}
export async function slowLineWrite(multiLineText,term=ImageScreenTerm){
	let lines=multiLineText.split('\n')
	for (let i of lines){
		await new Promise(r => setTimeout(r, 50));
		term.writeSync(i+'\n')
	}
}
export async function drawBanner(weap=weapons.newtons_apple, term=ImageScreenTerm){
	let weapon4box=weap
	let desclines= weapon4box.description.split('\n').length
	let extraesc=0
	if(desclines>2){
		extraesc=desclines-2
	}

	let linesIcon=weapon4box.art.split('\n')

	await(slowLineWrite(dynamicBox(`\n\n\n\n${`\n`.repeat(extraesc)}`,51,false,gradient.retro,'ffffff')))
	term.writeSync('\r'+escUpByNum(7+extraesc))

	await(slowLineWrite(mkWeaponBan(weapon4box, rarityByWeight(weapon4box.rarity))))
	term.writeSync(escUpByNum(6+extraesc)+'\r'+escRightByNum(2))//fix for multiline of 3
	for (let i of linesIcon){
		await new Promise(r => setTimeout(r, 50));
		term.writeSync(i+'\n\r'+escRightByNum(2))
	}
	term.writeSync(`\n${`\n`.repeat(extraesc)}`)//clear previous banner
}

export async function writePotion(amount=1,term=ImageScreenTerm){
	let icon=`\
${chalk.hex('8b4513')('{▄}')}
\u001b[97m\u001b[40m█\u001b${chalk.hex('ff2d57')('█')}\u001b[97m\u001b[40m█\u001b[m
\u001b[37m\u001b[40m \u001b[97m\u001b[40m▀\u001b[37m\u001b[40m \u001b[m\
`
	let k=
`\
    ${chalk.hex('ff2d57')(`  You found...
      potions!`)}
        ${chalk.greenBright(`X ${amount}`)} \
`
	await slowLineWrite(dynamicBox(`\n\n`,20,false,gradient.cristal,'d3d3d3'))
	term.writeSync('\r'+escUpByNum(5))
	await slowLineWrite(dynamicBox(k,20,false,gradient.summer,'ff2d57'))
	term.writeSync('\r'+escUpByNum(4)+escRightByNum(2))
	let iconLines=icon.split('\n')
	//ImageScreenTerm.writeSync(ddfs)
	for (let i of iconLines){
		await new Promise(r => setTimeout(r, 50));
		term.writeSync(i+'\n\r'+escRightByNum(2))
	}
	term.writeSync('\n')
}

export async function writeGold(amount,term=ImageScreenTerm){
let goldStr=
`\
${chalk.bold.hex('FFD700')(`You found some gold!`)}
    ${chalk.greenBright(`qnt : ${amount}gp`)}\
`
	await slowLineWrite(dynamicBox(goldStr,20,false,gradient.summer,'FFD700'))
	//term.writeSync('\n')
}

//effectively a copy of above function but i was too lazy to generalise and alias it
export async function writeOil(amount=1,term=ImageScreenTerm){
	let icon=`\
[37m[40m ${chalk.hex('55342B')('▄▄')}[37m[40m [m
[97m[40m▄${chalk.bgHex(miscColours.oil)(chalk.hex('ffffff')('▀▀'))}[97m[40m▄[m
[97m[40m▀${chalk.bgHex('ffffff')(chalk.hex(miscColours.oil)('▀▀'))}[97m[40m▀[m\
`
	let k=
`\
    ${chalk.hex(miscColours.oil)(`  You found...
      oil flasks!`)}
        ${chalk.greenBright(`X ${amount}`)} \
`
	await slowLineWrite(dynamicBox(`\n\n`,20,false,gradient.cristal,'d3d3d3'))
	term.writeSync('\r'+escUpByNum(5))
	await slowLineWrite(dynamicBox(k,20,false,gradient.summer,miscColours.oil))
	term.writeSync('\r'+escUpByNum(4)+escRightByNum(2))
	let iconLines=icon.split('\n')
	//ImageScreenTerm.writeSync(ddfs)
	for (let i of iconLines){
		await new Promise(r => setTimeout(r, 50));
		term.writeSync(i+'\n\r'+escRightByNum(2))
	}
	term.writeSync('\n')
}
//another lazy copy
export async function writeScroll(amount=1,term=ImageScreenTerm){
	let icon=`\
[37m[40m▀${chalk.bgHex('ffffff')(chalk.hex(DMG_COLOUR[DMG_TYPE.MAGIC])('☼§≈♫'))}[37m[40m [m
[37m[40m ${chalk.bgHex('ffffff')(chalk.hex(DMG_COLOUR[DMG_TYPE.MAGIC])('φ♫§≈'))}[37m[40m [m
[37m[40m [97m[40m▀[37m[40m▀▀▀▀[m\
`
	let k=
`\
    ${chalk.hex(DMG_COLOUR[DMG_TYPE.MAGIC])(`  You found...
      magic scrolls!`)}
        ${chalk.greenBright(`X ${amount}`)} \
`
	await slowLineWrite(dynamicBox(`\n\n`,20,false,gradient.cristal,'d3d3d3'))
	term.writeSync('\r'+escUpByNum(5))
	await slowLineWrite(dynamicBox(k,20,false,gradient.summer,DMG_COLOUR[DMG_TYPE.MAGIC]))
	term.writeSync('\r'+escUpByNum(4)+escRightByNum(1))
	let iconLines=icon.split('\n')
	//ImageScreenTerm.writeSync(ddfs)
	for (let i of iconLines){
		await new Promise(r => setTimeout(r, 50));
		term.writeSync(i+'\n\r'+escRightByNum(1))
	}
	term.writeSync('\n')
}