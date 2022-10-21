
import { monsterRandom } from './random_nums.js';
import { Player } from './player.js';
import { PickEnemyArt } from './data.js';
import { dmgTypeClass } from './items.js';
//make roll initiative function in main file
const defaults={name:'', hitDie:1, ac:8, morale:6, weapon:'stick', dmgDie:6, aggro:6, rarity:1, weaknesses:[]}
export class monster {/*12always hostile 0 inverse */
    constructor({name, hitDie, ac, morale, weapon, dmgDie, aggro, rarity, art}={...defaults}) {
        this.name = name;
        this.hitDie = hitDie;
        this.ac = ac;
        this.morale = morale;
        this.weapon = weapon;
        this.dmgDie = dmgDie;
        this.aggro = aggro;
        this.rarity = rarity;
        this.art= art?art:PickEnemyArt()
        this.hp = monsterRandom.rpg(`${this.hitDie}d6`, { sum: true });
    }
    rollDamage() {
        // later change to bring consistancy simaler to player class
        return monsterRandom.rpg(`1d${this.dmgDie}`, { sum: true })
    }
    rollToHit() {
        return monsterRandom.rpg(`1d20`, { sum: true }) + monsterRandom.rpg(`${this.hitDie}d6`, { sum: true })
    }
    rollInitiative(){
        return monsterRandom.rpg('1d20',{sum: true})
    }

}
export function copyMonster(monsterToCopy) {
    return new monster(
        {
        name:monsterToCopy.name,
        hitDie:monsterToCopy.hitDie,
        ac:monsterToCopy.ac,
        morale:monsterToCopy.morale,
        weapon:monsterToCopy.weapon,
        dmgDie:monsterToCopy.dmgDie,
        aggro:monsterToCopy.aggro,
        rarity:monsterToCopy.rarity,
        }
    )
}


//some damage types have alternate effects on a targets weapon cooldowns 
//these implentations will simulate being target 2 in a trap
class TrapDMGfirstHit{
    constructor(name,dmgType){
        this.weaponCooldown-0
        this.name = name;
        //damage
        this.str= 5
        //hp modifier
        //tohit
        this.dex= 5
        this.cha= 5
        this.int= 5
        //this.dmgType = dmgType?dmgType:new dmgTypeClass({name:'blunt',color:'ffffff'});
        //trapweapons perhaps?????
    }
}
class TrapDMGcooldown{
    constructor(name,dmgType){
        this.weaponCooldown=5
        this.name = name;
        //damage
        this.str= 5
        //hp modifier
        //tohit
        this.dex= 5
        this.cha= 5
        this.int= 5
        //this.dmgType = dmgType?dmgType:new dmgTypeClass({name:'blunt',color:'ffffff'});
    }
}


