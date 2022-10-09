//var seedrandom = require('seedrandom');
import Chance from 'chance';
//set seed for stats roll
const chance1 = new Chance();
//diff object for dice
const chance2 = new Chance();
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

function rollStat() {
    return skillBonus(chance1.rpg('3d6', { sum: true }))
}
export class Player {
    constructor(name = 'apples') {
        this.level = 0;
        this.xp = 0
        this.nextLvlxp = 200
        this.name = name;
        //damage
        this.str= rollStat();
        //hp modifier
        //tohit
        this.dex= rollStat();
        this.cha= rollStat();
        this.int= rollStat();

        this.hp = (chance1.rpg('2d6',{sum: true})+this.str)>0?(chance1.rpg('2d6',{sum: true})+this.str):1;
        this.hpMax = this.hp;
        this.slots = { weapon: true, shield: false, head: false, armor: true, ring: false }
        //this.items = Array(5).fill(0)
        this.basedamage = this.str
        this.persuade = this.cha + skillBonus(this.cha)
        this.weapon = WEAPONmap[WEAPONS.SWORD]
        this.weaponName = WEAPONS.SWORD
        //change weapon later to be simaler to monster class
        this.armour = ARMOURmap[ARMOUR.LOIN_CLOTH]
        this.ac = this.armour ? this.armour : 10
        this.depth = 0;
    }
    changeWeapon(weapon) {
        //update basedamage and equip slot
        if (weapon) {
            this.weaponName= weapon
            this.weapon = WEAPONmap[weapon]
            this.slots.weapon = true
        }else{
            //make hands a zero dmg weapon later make hands into a secret that scales with less armour and more dex
            this.weaponName= WEAPONS.SWORD
            this.weapon = WEAPONmap[WEAPONS.BARE_HANDS]
            this.slots.weapon = false
            if(this.str>1){
                this.basedamage = this.str
            }else{
                this.basedamage = 0
            }
        }
    }
    changeArmour(armour) {
        //update ac and equip slot
    }
    //not max
    increaseHP(amount) {
        if(amount+this.hp>this.hpMax){
            this.hp=this.hpMax
        }else{
            this.hp+=amount
        }
    }
    decreaseHP(amount) {
        this.hp -= amount
    }
    increaseMAXHP(amount) {
        this.hpMax+=amount
        this.hp+=amount
    }
    levelUp() {

    }
    nextLevelXP() {
        this.nextLevelXP = this.nextLevelXP * 2
    }
    rollReaction(){
        return chance2.rpg('2d6',{sum: true})+this.cha
    }
    rollDamage(){
        let damage = this.basedamage + chance2.rpg(this.weapon,{sum: true})
        damage = damage<0 ? 0 : damage
        return damage
    }
    rollToHit(){
        let bonus=this.level>4 ?4:this.level
        return chance2.rpg('1d20',{sum: true})+this.dex+bonus
    }
    //`${this.weapon} + ${this.basedamage} :` + 
}

class inventory {
    constructor(items = []) {
        this.thing = items
    }
}
function skillBonus(skill = 10) {
    let val = skill % 2 === 0 ? (skill - 10) / 2 : skill > 0 ? (skill - 1 - 10) / 2 : (skill + 1 - 10)
    return val
}

function getRandom(max) {
    return Math.floor(Math.random() * max);
}
//dice function d for readability as dice are often short handed as d6 d4 d8
function d(n) {
    return 1 + getRandom(n)
}




