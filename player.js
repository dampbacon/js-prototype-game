//var seedrandom = require('seedrandom');
import Chance from 'chance';
//set seed for everything
const chance1 = new Chance('hello');
console.log(chance1.random());    
console.log(chance1.random());    
chance1.weighted(['a', 'b', 'c', 'd'], [1, 2, 3, 4])

// chance.rpg('#d#')
// chance.rpg('#d#', {sum: true})

//


import { WEAPONmap, WEAPONS
 } from "./items.js";
export class Player{
    constructor(name='apples'){
        this.level=0;
        this.xp=0
        this.nextLvlxp=200
        this.name = name;
        //damage
        this.str = 10;
        //hp modifier
        this.const = 10;
        //tohit
        this.dex = 10;
        this.cha = 10;
        this.ac = 10;
        this.hpMax = 20
        this.hp = 20;
        this.slots = {leftHand: false, rightHand: false, head: false, body: false, ring: false}
        //this.items = Array(5).fill(0)
        this.basedamage = this.str+skillBonus(this.str)
        this.persuade = this.cha+skillBonus(this.cha)
        this.weapon = WEAPONmap[WEAPONS.SWORD]
    }
    increaseHP(amount){

    }
    decreaseHP(amount){

    }
    increaseMAXHP(amount){

    }
    levelUp(){

    }
    nextLevelXP(){
        this.nextLevelXP = this.nextLevelXP * 2
    }
}

class inventory{
    constructor(items=[]){
        this.thing = items
    }
}
function skillBonus(skill=10){
    let val = skill%2===0 ? (skill-10)/2 : (skill-1-10)/2
    return val
}

function getRandom(max) {
    return Math.floor(Math.random() * max);
}
//dice function d for readability as dice are often short handed as d6 d4 d8
function d(n){
    return 1+getRandom(n)
}

function rollDamage(Player){
    Player.basedamage+d(Player.weapon)
}

function rollSTATS(Player){

}