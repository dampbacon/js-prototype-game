import gradient from 'gradient-string';
import {
	pickEnemy
} from './data.js';
const defaults = {
	id: 0,
	body: {
		body: '',
		format: {
			//later make write modes like an enum thing with 'default', 'scan lines',
			//Or directly bind function like gradientFunction
			writeMode: 'gradientScanlines',
			gradientFunction: gradient.retro.multiline,
			gradientArr: ['#3f51b1', '#5a55ae', '#7b5fac', '#8f6aae', '#a86aa4', '#cc6b8e', '#f18271', '#f3a469', '#f7c978'],
			speed: 20,
		},
		TextFile: {
			exists: false,
			url: ''
		},
	},
	toScreen: {
		toScreen: '',
		AnsiFile: {
			exists: false,
			url: '',
		},
	},
	buttons: [
		[]
	],
	cleared: false,
}
// wrap event groups with this eventually, like in a room a combat event, skill check event and loot event.
export class eventPackage {
	#eventMap
	constructor({
		id,
		events
	} = {
		id: 0,
		events: []
	}) {
		this.id = eventPackage.id;
		this.#eventMap = this.#createEventsMap(events);
	}
	#createEventsMap(eventsArrary = [], storyArr = {}) {
		eventsArrary.forEach((element) => {
			storyArr[element.id] = element
		})
		return storyArr;
	}
	eventsMap() {
		return this.#eventMap;
	}
}
export class game_event {
	constructor({
		id,
		body,
		toScreen,
		buttons,
		cleared,
		enemies,
		noDrops,
		loot,
		
	} = {
		...defaults
	}) {
		this.id = id
		this.body = body
		this.toScreen = toScreen
		this.buttons = buttons
		this.cleared = false
		// later pick between enemy or trap
		// enemies will ussually be just a pick enemy function refreshed
		// how ever for custom events and more flexibility ability for a room to have no enemies will be added
		this.enemies = enemies ? enemies : []
		this.loot = loot ? loot : []  // {type: 'gold', item: 10, text:"blah"} or {type: 'weapon', item: weapons.sword} or {type: 'armor', item: null}
		this.noDrops = noDrops ? noDrops : false
		//buttons are in the format of [[event_id,"button label", enabled_always=true]]        
	}
	setCleared() {
		this.cleared = true
	}
	disableButton(number) {
		this.buttons[number - 1][2] = false
	}
	test = () => console.log("mmmmmmmmmmmmmmmmmmmmmm!!")
}
export class game_event_gain_item extends game_event {
	constructor({
		id,
		body,
		toScreen,
		buttons,
		arryItems
	} = {
		...defaults,
		arryItems: []
	}) {
		super(id, body, toScreen, buttons)
		this.arryItems = arryItems;
	}
}
// export class game_event_enemy extends game_event {
//     constructor({ id, body, toScreen, buttons, enemy, cleared } = { ...defaults, enemy: null, cleared: false }) {
//         //make if enemy is hostile pass buttons to be created for combat
//         super(id, body, toScreen, buttons, cleared)
//         this.enemy = enemy;
//     }
// }
// let a = new game_event_enemy()
// //stub
// export class game_event_skillcheck extends game_event {
//     constructor({ 'id': id, 'body': body, 'toScreen': toScreen, 'buttons': buttons, 'arrySkillCheck': arrySkillCheck } = { ...defaults, arrySkillCheck: [] }) {
//         super(id, body, toScreen, buttons)
//         this.arrySkillCheck = arrySkillCheck;
//     }
// }
// run away skill check if suceed goto random room same depth
function generateEventPackage(depth) {}