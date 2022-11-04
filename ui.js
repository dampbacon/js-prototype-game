import blessedpkg from "blessed";
import chalk from "chalk";
import * as scroll from "./blessed/scroll.cjs";
import XTermNew from "./blessed-xterm/blessed-xterm.js";
import BlessedContrib from "blessed-contrib";
import "./blessed/screen.cjs";
import "./blessed/element.cjs";
import "./blessed/patches.cjs";
import "./blessed/node.cjs";
import { toggleUi } from "./thing.js";
import { STATS } from "./game-objects/data.js";

const {
	blessed
} = blessedpkg
chalk.level = 2;
export const program = blessedpkg.program()
export const screen = blessedpkg.screen({
	program: program,
	fastCSR: true,
	dockBorders: true,
	fullUnicode: true,
	cursor: {
		shape: {
			bg: 'red',
			fg: 'white',
		},
		blink: false
	}
});
const grid = new BlessedContrib.grid({
	rows: 12,
	cols: 12,
	screen: screen
})
export const ImageScreenTerm = new XTermNew({
	parent: screen,
	top: 0,
	bottom: 0,
	width: '50%',
	align: 'left',
	tags: true,
	keys: true,
	mouse: true,
	border: 'line',
	style: {
		label: {
			bold: true
		},
		focus: {
			border: {
				fg: "green"
			}
		}
	},
	scrollbar: {
		ch: ' ',
		style: {
			bg: 'white'
		},
		track: {
			style: {
				bg: 'grey'
			},
		},
	},
}).with(scroll.scroll, scroll.throttle)
export const logs = new XTermNew({
	parent: screen,
	top: '50%',
	bottom: 0,
	left: '50%',
	width: '50%',
	align: 'left',
	tags: true,
	keys: true,
	mouse: true,
	border: 'line',
	label: chalk.hex('323232')("scroll, mouseWheel or click pgDn/pgUp"),
	style: {
		label: {
			bold: true
		},
		focus: {
			border: {
				fg: "green"
			}
		}
	},
	scrollbar: {
		ch: ' ',
		style: {
			bg: 'white'
		},
		track: {
			style: {
				bg: 'grey'
			},
		},
	},
}).with(scroll.scroll, scroll.throttle)
export const stats = grid.set(0, 9, 6, 1, blessedpkg.box, {
	tags: true,
	padding: {
		left: 1,
	},
	label: '{bold}stats{/bold}',
	alwaysScroll: 'true',
	scrollable: 'true',
	scrollbars: 'true',
	scrollbar: {
		ch: ' ',
		track: {
			bg: 'blue'
		},
		style: {
			inverse: true
		}
	},
	keys: true,
	border: {
		type: 'line'
	},
	style: {
		border: {
			fg: '#f0f0f0'
		},
		hover: {
			//bg: 'green'
		},
		focus: {
			border: {
				fg: "green"
			}
		}
	}
}).with(scroll.scroll, scroll.throttle)
//in the future will list inventory items
export const InventoryBox = grid.set(0, 10, 6, 2, blessedpkg.list, {
	tags: true,
	scrollable: true,
	mouse: true,
	keys: true,
	label: '{bold}Inventory{/bold}',
	content: 'thing',
	border: {
		type: 'line'
	},
	style: {
		border: {
			fg: 'magenta'
		},
		hover: {
			//bg: 'green'
		},
		focus: {
			border: {
				fg: "green"
			}
		}
	}
})
//button container
export const buttonsContainer = grid.set(0, 6, 6, 3, blessedpkg.form, ({
	parent: screen,
	keys: true,
	label: `focus ${chalk.green('pgDown')} to scroll`,
	//content: 'test?',
	padding: {
		right: 0,
	},
	style: {
		//bg: '#515151',
		//border: {
		//bg: '#000033'},
		focus: {
			border: {
				fg: "green"
			}
		}
	},
	alwaysScroll: 'true',
	scrollable: 'true',
	scrollbars: 'true',
	scrollbar: {
		ch: chalk.green.bgBlueBright('\u2592'),
		track: {
			bg: '#630330',
			fg: 'red'
		},
		style: {
			inverse: true
		}
	}
})).with(scroll.scroll, scroll.throttle)
//export let box = createStatsBox()
//stats box
export function createStatsBox() {
	return blessedpkg.box({
		parent: screen,
		top: 'center',
		left: 'center',
		width: '40%',
		height: 10,
		tags: true,
		keys: true,
		content: '{bold}hmm{/bold}!',
		border: {
			type: 'line'
		},
		style: {
			fg: 'white',
			//bg: 'magenta',
			border: {
				//fg: '#4b0082',
				//bg: '#4b0082',
			},
			hover: {
				bg: 'green'
			}
		}
	});
}

//const k = new blessedpkg.ANSIImage
// 4 levelpoints for a perk point
// 2 level points to reroll weapon damage type
// make weak weapons with exclusive damage types
// that require lvl points to improve
export const lvlup = blessedpkg.radioset({
	parent: screen,
	keys: true,
	mouse: true,
	top: 'center',
	left: 'center',
	width: 50,
	height: 15,
	content: 'level up!',
	padding: {
		right: 0,
	},
	style: {
		bg: '#515151',
		border: {
		bg: '#000033'},
		focus: {
			border: {
				fg: "green"
			}
		}
	},
	alwaysScroll: 'true',
	scrollable: 'true',
	scrollbars: 'true',
	scrollbar: {
		ch: chalk.green.bgBlueBright('\u2592'),
		track: {
			bg: '#630330',
			fg: 'red'
		},
		style: {
			inverse: true
		}
	}
}).with(scroll.scroll, scroll.throttle)

let strRadio= new blessedpkg.radiobutton({
	parent: lvlup,
	mouse: true,
	keys: true,
	shrink: true,
	padding: {
		left: 1,
		right: 1
	},
	left: 3,
	top: 2,
	name: STATS.STR,
	content: `str`,
	//shadow: true,
	style: {
		bg: '#000072',
		focus: {
			bg: '#880808',
		},
		hover: {
			bg: '#880808',
		},
	},
})



let dexRadio= new blessedpkg.radiobutton({
	parent: lvlup,
	mouse: true,
	keys: true,
	shrink: true,
	padding: {
		left: 1,
		right: 1
	},
	left: 3,
	top: 4,
	name: STATS.DEX,
	content: `dex`,
	//shadow: true,
	style: {
		bg: '#000072',
		focus: {
			bg: '#880808',
		},
		hover: {
			bg: '#880808',
		},
	},
})

let chaRadio= new blessedpkg.radiobutton({
	parent: lvlup,
	mouse: true,
	keys: true,
	shrink: true,
	padding: {
		left: 1,
		right: 1
	},
	left: 3,
	top: 6,
	name: STATS.CHA,
	content: `cha`,
	//shadow: true,
	style: {
		bg: '#000072',
		focus: {
			bg: '#880808',
		},
		hover: {
			bg: '#880808',
		},
	},
})

let intRadio= new blessedpkg.radiobutton({
	parent: lvlup,
	mouse: true,
	keys: true,
	shrink: true,
	padding: {
		left: 1,
		right: 1
	},
	left: 3,
	top: 8,
	name: STATS.INT,
	content: `int`,
	//shadow: true,
	style: {
		bg: '#000072',
		focus: {
			bg: '#880808',
		},
		hover: {
			bg: '#880808',
		},
	},
})

let hpRadio= new blessedpkg.radiobutton({
	parent: lvlup,
	mouse: true,
	keys: true,
	shrink: true,
	padding: {
		left: 1,
		right: 1
	},
	left: 3,
	top: 10,
	name: STATS.HP,
	content: `hp `,
	//shadow: true,
	style: {
		bg: '#000072',
		focus: {
			bg: '#880808',
		},
		hover: {
			bg: '#880808',
		},
	},
})

let radioArray=[strRadio,dexRadio,chaRadio,intRadio,hpRadio]
export function getSelected(){
	for(let radio of radioArray){
		if(radio.checked){
			return radio.name
		}
	}
}


let lvlBoxStr=
`\
 2 pts reroll stat
      
 4 pts for stat inc
       
 3 pts for dmgtype 
   transmute altars\
`

let hmm=blessedpkg.box({
	parent: lvlup,
	top: 2,
	left: 15,
	width: '40%',
	height: 7,
	tags: true,
	//keys: true,
	content: chalk.hex('000000')(lvlBoxStr),
	style: {
		fg: 'white',
		bg: '#fddd00',
		border: {
			//fg: '#4b0082',
			//bg: '#4b0082',
		},
		// hover: {
		// 	bg: 'green'
		// }
	}
})

let reroll= new blessedpkg.button({
	parent: lvlup,
	mouse: true,
	keys: true,
	shrink: true,
	padding: {
		left: 1,
		right: 1
	},
	left: 38,
	top: 2,
	name: 'reroll',
	content: `reroll `,
	//shadow: true,
	style: {
		bg: 'blue',
		focus: {
			bg: '#00ff00',
		},
		hover: {
			bg: '#00ff00',
		},
	},
})

let improve= new blessedpkg.button({
	parent: lvlup,
	mouse: true,
	keys: true,
	shrink: true,
	padding: {
		left: 1,
		right: 1
	},
	left: 38,
	top: 4,
	name: 'improve',
	content: `improve`,
	//shadow: true,
	style: {
		bg: 'blue',
		focus: {
			bg: '#00ff00',
		},
		hover: {
			bg: '#00ff00',
		},
	},
})

let close= new blessedpkg.button({
	parent: lvlup,
	mouse: true,
	keys: true,
	shrink: true,
	padding: {
		left: 1,
		right: 1
	},
	left: 'center',
	top: 10,
	name: 'exit',
	content: chalk.black(`  exit  `),
	//shadow: true,
	style: {
		bg: '#fddd00',
		focus: {
			bg: '#ff0000',
		},
		hover: {
			bg: '#ff0000',
		},
	},
})

close.on('press', function() {
	lvlup.hide()
	screen.render()
})


export const levelBut= new blessedpkg.button({
	parent: lvlup,
	mouse: true,
	keys: true,
	shrink: true,
	padding: {
		left: 1,
		right: 1
	},
	right: 3,
	top: 13,
	name: 'lvlup',
	content: chalk.black(` lvlup `),
	//shadow: true,
	style: {
		bg: '#fddd00',
		focus: {
			bg: '#ff0000',
		},
		hover: {
			bg: '#ff0000',
		},
	},
})



