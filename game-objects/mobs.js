
import { monsterRandom } from './random_nums.js';
import { Player } from './player.js';
//make roll initiative function in main file
const defaults={name:'', hitDie:1, ac:8, morale:6, weapon:'stick', dmgDie:6, aggro:6, rarity:1, weaknesses:[]}
export class monster {/*12always hostile 0 inverse */
    constructor({name, hitDie, ac, morale, weapon, dmgDie, aggro, rarity}={...defaults}) {
        this.name = name;
        this.hitDie = hitDie;
        this.ac = ac;
        this.morale = morale;
        this.weapon = weapon;
        this.dmgDie = dmgDie;
        this.aggro = aggro;
        this.rarity = rarity;
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


