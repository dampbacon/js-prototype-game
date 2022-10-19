
//
// Weapon objects
//
//
import chalk from "chalk";
import { Player } from "./player.js";
import {chance2} from "./random_nums.js";
class dmgTypeClass{
    constructor({name, /*effectAdverb, */chanceToApply, color, effectDuration, applyEffect}){
        this.name = name;
        //effectAdverb=effectAdverb?effectAdverb:''
        //can be a normal number but can be a list with apply effect function callback
        //this.effectparams = effectparams?effectparams:null;
        this.color = color;
        this.effectDurationMax = effectDuration?effectDuration:0;
        //callback function to apply effect passed as argument
        //
        this.applyEffect = applyEffect?applyEffect:null; 
        this.chanceToApply = chanceToApply?chanceToApply:0
    }
    
    applyEffectWF(arg1,arg2,arg3){
        return this.applyEffect(arg1,this,arg2,arg3)
    }
}


class weapon {
    constructor({name, dmgDie, dmgType, rarity, enchant, description}) {
        this.name = name?name:'Stick';
        this.dmgDie = dmgDie?dmgDie:'1d4';
        this.dmgType = dmgType?dmgType:new dmgTypeClass({name:'blunt',color:'ffffff'});
        this.rarity = rarity?rarity:1;
        this.enchant = enchant?enchant:0;
        this.description = description?description: this.generateDescription();
    }
    // generateDescription() {
    //     return 'A weapon';
    // }
    
}

export let fire_damage = new dmgTypeClass({
    name:'fire_damage',
    //effectAdverb:'you set aflame',
    color:'FFA500',
    chanceToApply: 0.50,
    effectDuration: 0,
    applyEffect:(target, selfdmgtype, crit=false, target2)=>{
        let self=selfdmgtype
        if(chance2.bool({ likelihood: (100*self.chanceToApply)}) || crit){
            let bonusDamage=crit?chance2.rpg('2d6',{sum: true}):chance2.rpg('1d6',{sum: true})
            target.hp-=bonusDamage
            return `${chalk.hex(self.color)('bonus fire damage: ')}${bonusDamage}\n`
        }else{
            return ''
        }
    }
})
export let poison_damage = new dmgTypeClass({
    name:'poison_damage',
    color:'89ff00',
    chanceToApply: 0.60,
    effectDuration: 5,
    applyEffect:(target, selfdmgtype, crit=false, target2)=>{
        let self=selfdmgtype
        if((target2.weaponCooldown>0)&&!crit){
            --target2.weaponCooldown
            let bonusDamage=1
            target.hp-=bonusDamage
            return `${chalk.hex(self.color)('$$$$$$$$$ 1 poison damage: ')}${bonusDamage}\n`
        }else if(chance2.bool({ likelihood: (100*self.chanceToApply)}) || crit){
            let bonusDamage=crit?chance2.rpg('2d4',{sum: true}):chance2.rpg('1d4',{sum: true})
            target2.weaponCooldown= crit?0:selfdmgtype.effectDurationMax
            target.hp-=bonusDamage
            return `${chalk.hex(self.color)('DEFAULT poison damage: ')}${bonusDamage}__________________\n${target2.weaponCooldown}_______________\n`
        }else{
            return 'MISS@##@#'
        }
    }
})






export let flaming_sword = new weapon({
    name:'flaming_sword',
    dmgDie: '1d8',
    dmgType:fire_damage,
    rarity:1,
    enchant:0,
    description:'a flaming sword'
})


export let poison_sword = new weapon({
    name:'poison_sword',
    dmgDie: '1d8',
    dmgType:poison_damage,
    rarity:1,
    enchant:0,
    description:'a flaming sword'
})











export const WEAPONS = Object.freeze({
    SPEAR: 'SPEAR',
    DAGGER: 'DAGGER',
    SCIMITAR: 'SCIMITAR',
    SWORD: 'SWORD',
    BATTLE_AXE: 'BATTLE_AXE',
    GREAT_SWORD: 'GREAT_SWORD',
    BARE_HANDS: 'BARE_HANDS',

})
let WEAPONmap = {}
//dmg dice d(amount)
WEAPONmap[WEAPONS.SPEAR] = '1d6'
WEAPONmap[WEAPONS.SCIMITAR] = '2d4'
WEAPONmap[WEAPONS.DAGGER] = '1d4'
WEAPONmap[WEAPONS.SWORD] = '1d8'
WEAPONmap[WEAPONS.BATTLE_AXE] = '1d10'
WEAPONmap[WEAPONS.GREAT_SWORD] = '2d6'
WEAPONmap[WEAPONS.BARE_HANDS] = '1d2' //coin flip
export { WEAPONmap };

export const ARMOUR = Object.freeze({
    LOIN_CLOTH: 'LOIN_CLOTH',
    OXFORD_BLUE_ROBE: 'OXFORD_BLUE_ROBE',
    CAMBRIDGE_BLUE_ROBE: 'CAMBRIDGE_BLUE_ROBE',
    LABCOAT: 'LABCOAT',
    PLATE: 'PLATE',
    GANDALFS_WHITE_ROBES: 'GANDALFS_WHITE_ROBES',
    CHAINMAIL: 'CHAINMAIL',
})

let ARMOURmap = {}
ARMOURmap[ARMOUR.LOIN_CLOTH] = 10
ARMOURmap[ARMOUR.OXFORD_BLUE_ROBE] = 12
ARMOURmap[ARMOUR.CAMBRIDGE_BLUE_ROBE] = 14
ARMOURmap[ARMOUR.LABCOAT] = 16
ARMOURmap[ARMOUR.PLATE] = 18
ARMOURmap[ARMOUR.GANDALFS_WHITE_ROBES] = 20
ARMOURmap[ARMOUR.CHAINMAIL] = 22


export { ARMOURmap };
