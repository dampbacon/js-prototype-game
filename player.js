//var seedrandom = require('seedrandom');
import Chance from 'chance';
//set seed for stats roll
const chance1 = new Chance();
//diff object for dice
const chance2 = new Chance('hello');
//diff object for map generation
const chance3 = new Chance('hello');
console.log(chance1.random());
console.log(chance1.random());
chance1.weighted(['a', 'b', 'c', 'd'], [1, 2, 3, 4])

// chance.rpg('#d#')
// chance.rpg('#d#', {sum: true})

//


import {
    ARMOURmap, WEAPONmap, WEAPONS, ARMOUR
} from "./items.js";
export class Player {
    constructor(name = 'apples') {
        this.level = 0;
        this.xp = 0
        this.nextLvlxp = 200
        this.name = name;
        //damage
        this.str;
        //hp modifier
        //tohit
        this.dex;
        this.cha;
        this.int;
        this.hpMax;
        this.hp;
        this.slots = { weapon: true, shield: false, head: false, armor: true, ring: false }
        //this.items = Array(5).fill(0)
        this.basedamage;
        this.persuade = this.cha + skillBonus(this.cha)
        this.weapon = WEAPONmap[WEAPONS.SWORD]
        this.armour = ARMOURmap[ARMOUR.LOIN_CLOTH]
        this.ac = this.armour ? this.armour : 10
        this.depth = 0;
    }
    changeWeapon(weapon) {
        //update basedamage and equip slot
    }
    changeArmour(armour) {
        //update ac and equip slot
    }
    increaseHP(amount) {

    }
    decreaseHP(amount) {

    }
    increaseMAXHP(amount) {

    }
    levelUp() {

    }
    nextLevelXP() {
        this.nextLevelXP = this.nextLevelXP * 2
    }
}

class inventory {
    constructor(items = []) {
        this.thing = items
    }
}
function skillBonus(skill = 10) {
    let val = skill % 2 === 0 ? (skill - 10) / 2 : (skill - 1 - 10) / 2
    return val
}

function getRandom(max) {
    return Math.floor(Math.random() * max);
}
//dice function d for readability as dice are often short handed as d6 d4 d8
function d(n) {
    return 1 + getRandom(n)
}

function rollDamage(Player) {
    Player.basedamage + d
}

export function rollStat() {
    return skillBonus(chance1.rpg('3d6', { sum: true }))
}
