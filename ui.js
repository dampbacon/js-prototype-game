import blessedpkg from "blessed";
import chalk from "chalk";
import * as scroll from "./blessed/scroll.cjs";
import XTermNew from "./blessed-xterm/blessed-xterm.js";
import BlessedContrib from "blessed-contrib";
import "./blessed/screen.cjs";
import "./blessed/element.cjs";
import "./blessed/patches.cjs";
import "./blessed/node.cjs";

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
	top: '50%',
	bottom: 0,
	left: '50%',
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