
import Chance from 'chance';
import { Player } from './player';
const chance1 = new Chance();
//make roll initiative function in main file

class monster {
    constructor(name = '', hitDie = 2, ac = 10, aggro/*12always hostile 0 inverse */, morale, weapon, dmgDie, rarity) {
        this.name = name;
        this.hitDie = hitDie;
        this.ac = ac;
        this.morale = morale;
        this.weapon = weapon;
        this.dmgDie = dmgDie;
        this.aggro = aggro;
        this.rarity = rarity;
        this.hp = chance1.rpg(`${this.hitDie}d6`, { sum: true });
    }
    attack(target=new(Player)){
        if (this.#rollToHit() >= target.ac) {
            target.decreaseHP(this.#rollDamage())
        }
    }
    #rollDamage() {
        return chance1.rpg(this.dmgDie, { sum: true })
    }
    #rollToHit() {
        return chance1.rpg(this.weapon, { sum: true }) 
    }

}
function copyMonster(monsterToCopy) {
    return new monster(
        monsterToCopy.name,
        monsterToCopy.hitDie,
        monsterToCopy.AC,
        monsterToCopy.morale,
        monsterToCopy.weapon,
        monsterToCopy.dmgDie,
        monsterToCopy.aggro,
        monsterToCopy.rarity
    )
}


