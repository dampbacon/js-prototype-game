//var seedrandom = require('seedrandom');
import {chance1, chance2} from "./random_nums.js";
import {ARMOUR, ARMOURmap, armourPicker, pickWeapon, weapons} from "./data.js";
//diff object for map generation
chance1.weighted(['a', 'b', 'c', 'd'], [1, 2, 3, 4])

// chance.rpg('#d#')
// chance.rpg('#d#', {sum: true})

//

export class Player {
    constructor(name = 'apples') {
        this.level = 0;
        this.xp = 0
        this.nextLvlxp = 200
        this.name = name;
        //damage
        this.str= this.rollStat();
        //hp modifier
        //tohit
        this.dex= this.rollStat();
        this.cha= this.rollStat();
        this.int= this.rollStat();
        let initial = chance1.rpg('2d6',{sum: true})+this.str+6
        this.hp = initial
        this.hpMax = initial
        this.slots = { weapon: true, shield: false, head: false, armor: true, ring: false }
        //this.items = Array(5).fill(0)
        this.basedamage = this.str

        this.weapon= pickWeapon()
        this.weaponName = this.weapon.name
        this.weaponCooldown = 0
        this.wBonus=this.weapon.dmgType
        // this.weapon = WEAPONmap[this.weaponName]

        //change weapon later to be similar to monster class
        this.armourName = armourPicker()
        this.armour = ARMOURmap[this.armourName]
        this.ac = this.armour ? this.armour : 10
        this.depth = 0;
        this.gold = 0;
        this.oil = 5;
        //later include identify potion mechanic
        this.potions = 2;
        this.scrolls = 2;
    }
    // changeWeapon(weapon) {
    //     //update base-damage and equip slot
    //     if (weapon) {
    //         this.weaponName= weapon
    //         this.weapon = WEAPONmap[weapon]
    //         this.slots.weapon = true
    //     }else{
    //         //make hands a zero dmg weapon later make hands into a secret that scales with less armour and more dex
    //         this.weaponName= WEAPONS.SWORD
    //         this.weapon = WEAPONmap[WEAPONS.BARE_HANDS]
    //         this.slots.weapon = false
    //     }
    // }
    rollStat() {
        return skillBonus(chance1.rpg('3d6', { sum: true }))
    }
    changeWeapon(weapon){
        this.weapon=weapon
        this.weaponName=weapon.name
        this.wBonus=this.weapon.dmgType
        this.weaponCooldown=0
    }
    //armour is string key
    changeArmour(armour) {
        this.armourName=armour
        this.armour=ARMOURmap[armour]
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
        let damage = this.basedamage + chance2.rpg(this.weapon.dmgDie,{sum: true})
        damage = damage<1 ? 1 : damage
        return damage
    }
    rollToHit(){
        let bonus=this.level>4 ?4:this.level
        bonus+=this.dex
        bonus+=this.weapon.enchant
        return [chance2.rpg('1d20',{sum: true}), bonus]
        //return [20,bonus]
    }
    rollInitiative(){
        return chance2.rpg('1d20',{sum: true})
    }
    //`${this.weapon} + ${this.base-damage} :` +
    rollSkillCheck(skill=0){
        return chance2.rpg('1d20',{sum: true})+skillBonus(skill)
    } 
    rollNewPlayer(){
        return new Player(this.name)
    }
}

class inventory {
    constructor(items = []) {
        this.thing = items
    }
}
function skillBonus(skill = 10) {
    return skill % 2 === 0 ? (skill - 10) / 2 : skill > 0 ? (skill - 1 - 10) / 2 : (skill + 1 - 10)
}

function getRandom(max) {
    return Math.floor(Math.random() * max);
}
//dice function d for readability as dice are often short-handed as d6 d4 d8
// function d(n) {
//     return 1 + getRandom(n)
// }




