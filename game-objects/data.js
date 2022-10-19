import {chance2, chance3} from "./random_nums.js";
import chalk from "chalk";
import {dmgTypeClass, weapon} from "./items.js";
import _ from "lodash";

//DAMAGE TYPES
export const damageTypes = Object.freeze({
    fire_damage : new dmgTypeClass({
        name: 'fire_damage',
        //effectAdverb:'you set aflame',
        color: 'FFA500',
        chanceToApply: 0.50,
        effectDuration: 0,
        applyEffect: (target, selfdmgtype, crit = false, target2) => {
            let self = selfdmgtype
            if (chance2.bool({likelihood: (100 * self.chanceToApply)}) || crit) {
                let bonusDamage = crit ? chance2.rpg('2d6', {sum: true}) : chance2.rpg('1d6', {sum: true})
                target.hp -= bonusDamage
                return `${chalk.hex(self.color)('bonus fire damage: ')}${bonusDamage}\n`
            } else {
                return ''
            }
        }
    }),
    poison_damage : new dmgTypeClass({
        name: 'poison_damage',
        color: '89ff00',
        chanceToApply: 0.60,
        effectDuration: 5,
        applyEffect: (target, selfdmgtype, crit = false, target2) => {
            let self = selfdmgtype
            if ((target2.weaponCooldown > 0) && !crit) {
                --target2.weaponCooldown
                let bonusDamage = 1
                target.hp -= bonusDamage
                return `${chalk.hex(self.color)('$$$$$$$$$ 1 poison damage: ')}${bonusDamage}\n`
            } else if (chance2.bool({likelihood: (100 * self.chanceToApply)}) || crit) {
                let bonusDamage = crit ? chance2.rpg('2d4', {sum: true}) : chance2.rpg('1d4', {sum: true})
                target2.weaponCooldown = crit ? 0 : selfdmgtype.effectDurationMax
                target.hp -= bonusDamage
                return `${chalk.hex(self.color)('DEFAULT poison damage: ')}${bonusDamage}__________________\n${target2.weaponCooldown}_______________\n`
            } else {
                return 'MISS@##@#'
            }
        }
    }),
    gravity_damage : new dmgTypeClass({
        name: 'gravity_damage',
        //effectAdverb:'you set aflame',
        color: '7919e6',
        chanceToApply: 0.7,
        effectDuration: 0,
        applyEffect: (target, selfdmgtype, crit = false, target2) => {
            if(target2.int>3){
                let self = selfdmgtype
                if (chance2.bool({likelihood: (100 * self.chanceToApply)}) || crit) {
                    let bonusDamage = crit ? chance2.rpg('6d6', {sum: true}) : chance2.rpg('3d6', {sum: true})
                    target.hp -= bonusDamage
                    return `${chalk.hex(self.color)('gravitational wave damage: ')}${bonusDamage}\n`
                }
            }
            return ''
        }
    }),
    weeb_damage : new dmgTypeClass({
        name: 'weeb_damage',
        //effectAdverb:'you set aflame',
        color: 'fbe407',
        chanceToApply: 0.1,
        effectDuration: 5,
        applyEffect: (target, selfdmgtype, crit = false, target2) => {
            let self = selfdmgtype
            let bonusChance=0
            let critmult=0
            if(crit){critmult=2}
            if(target2.dex>0){bonusChance=(target2.dex/10)*2}
            if ((target2.weaponCooldown > 0 && !crit)) {
                let appendStr=``
                let damage=0
                for(let i=0; i<(target2.weaponCooldown*2); i++){
                    let tempDam=chance2.rpg(`${1+(critmult)}d4`,{sum:true})
                    appendStr+=`naruto spam ${tempDam} damage!\n`
                    damage+=tempDam
                }
                --target2.weaponCooldown
                target.hp -= damage
                return `${chalk.hex(self.color)(`${appendStr}`)}`
            }else if (chance2.bool({likelihood: (100 * (self.chanceToApply+bonusChance))}) || crit) {
                let bonusDamage = crit ? chance2.rpg('2d8', {sum: true}) : chance2.rpg('1d8', {sum: true})
                target2.weaponCooldown = crit ? 7 : selfdmgtype.effectDurationMax
                target.hp -= bonusDamage
                return `${chalk.hex(self.color)('naruto damage dealt: ')}${bonusDamage}\n`
            } else {
                return 'MISS@##@#'
            }
        }
    }),
    slash_damage : new dmgTypeClass({
        name: 'slash_damage',
        color: 'ffffff',
        chanceToApply: 0,
        effectDuration: 0,
    }),
    blunt_damage : new dmgTypeClass({
        name: 'blunt_damage',
        color: 'ffffff',
        chanceToApply: 0,
        effectDuration: 0,
    }),
    piercing_damage : new dmgTypeClass({
        name: 'piercing_damage',
        color: 'ffffff',
        chanceToApply: 0,
        effectDuration: 0,
    })
})
//END OF DAMAGE TYPES








//WEAPONS
export const weapons = Object.freeze({
    fists: new weapon({
        name: 'hand wraps',
        dmgDie: '1d4',
        dmgType: damageTypes.weeb_damage,
        rarity: .1,
        enchant: 0,
        description: 'naruto powers'
    }),
    flamberg: new weapon({
        name: 'flamberg',
        dmgDie: '2d6',
        dmgType: damageTypes.fire_damage,
        rarity: .3,
        enchant: 0,
        description: 'a flaming flamberg'
    }),
    flaming_sword : new weapon({
        name: 'flaming_sword',
        dmgDie: '1d6',
        dmgType: damageTypes.fire_damage,
        rarity: .5,
        enchant: 0,
        description: 'a flaming sword'
    }),
    poison_sword : new weapon({
        name: 'poison_sword',
        dmgDie: '1d6',
        dmgType: damageTypes.poison_damage,
        rarity: .6,
        enchant: 0,
        description: 'a venomous sword'
    }),
    sword : new weapon({
        name: 'sword',
        dmgDie: '1d6',
        dmgType: damageTypes.slash_damage,
        rarity: .8,
        enchant: 0,
        description: 'a sword'
    }),
    textbook : new weapon({
        name: 'textbook',
        dmgDie: '1d4',
        dmgType: damageTypes.blunt_damage,//later use player int for unique damage type?
        rarity: 1,
        enchant: 0,
        description: 'a textbook'
    }),
    pencil : new weapon({
        name: 'pencil',
        dmgDie: '1d4',
        dmgType: damageTypes.piercing_damage,
        rarity: 1,
        enchant: 0,
        description: 'a pencil'
    }),
    dagger : new weapon({
        name: 'dagger',
        dmgDie: '1d4',
        dmgType: damageTypes.piercing_damage,
        rarity: 1,
        enchant: 0,
        description: 'a dagger'
    }),
    newtons_apple : new weapon({
        name: 'newtons_apple',
        dmgDie: '1d8',
        dmgType: damageTypes.gravity_damage,//later use player int for unique damage type?
        rarity: .2,
        enchant: 0,
        description: 'newton\'s apple'
    })
})

const weaponsArray=Object.values(weapons)
const weaponWeights=weaponsArray.map((item)=>{return item.rarity})
//alias 
export function pickWeapon(){
    return pickRandom(weaponsArray,weaponWeights)
}


function pickRandom(items,weights){
    let copy = _.cloneDeep(chance3.weighted(items,weights))
    //copy.dmgType=damageTypes[copy.dmgType.name]
    return copy
}







//END OF WEAPONS




export const ARMOUR = Object.freeze({
    LOIN_CLOTH: 'LOIN_CLOTH',
    TRAVELLERS_CLOTHES:'TRAVELLERS_CLOTHES',
    OXFORD_BLUE_ROBE: 'OXFORD_BLUE_ROBE',
    PADDED_ARMOUR: 'PADDED_ARMOUR',
    CAMBRIDGE_BLUE_ROBE: 'CAMBRIDGE_BLUE_ROBE',
    LABCOAT: 'LABCOAT',
    SPLINT: 'SPLINT',
    PLATE: 'PLATE',
    GANDALFS_WHITE_ROBES: 'GANDALFS_WHITE_ROBES',
    DENSE_PERSONALITY: 'DENSE_PERSONALITY',
    CHAINMAIL: 'CHAINMAIL',
})
//all the rooms and loot and stuff initialized here in a list we random select from
const ARMOURmap = {}
ARMOURmap[ARMOUR.LOIN_CLOTH] = 10
ARMOURmap[ARMOUR.TRAVELLERS_CLOTHES] = 10
ARMOURmap[ARMOUR.OXFORD_BLUE_ROBE] = 12
ARMOURmap[ARMOUR.PADDED_ARMOUR] = 12
ARMOURmap[ARMOUR.CAMBRIDGE_BLUE_ROBE] = 11
ARMOURmap[ARMOUR.LABCOAT] = 10
ARMOURmap[ARMOUR.SPLINT] = 16
ARMOURmap[ARMOUR.PLATE] = 18
ARMOURmap[ARMOUR.GANDALFS_WHITE_ROBES] = 20
ARMOURmap[ARMOUR.DENSE_PERSONALITY] = 22
ARMOURmap[ARMOUR.CHAINMAIL] = 14
Object.freeze(ARMOURmap)
export {ARMOURmap};

export const armourArrayWeights= Object.values(ARMOURmap).map((ac)=>{
    if (ac>20){
        return .2/ac
    }else if (ac >= 18){
        return .5/ac
    }
    return 1/ac
}) 
export const armourArray= Object.values(ARMOUR)

export function armourPicker(){
    return pickRandom(armourArray,armourArrayWeights)
}