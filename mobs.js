
import Chance from 'chance';
const chance1 = new Chance();
//make roll initiative function in main file

class monster {
    constructor(name = '', hitDie = 2, AC = 10, aggro/*12always hostile 0 inverse */, morale, weapon, dmgDie, rarity) {
        this.name = name;
        this.hitDie = hitDie;
        this.AC = AC;
        this.morale = morale;
        this.weapon = weapon;
        this.dmgDie = dmgDie;
        this.aggro = aggro;
        this.rarity = rarity;
        this.hp = chance1.rpg(`${this.hitDie}d6`);
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


