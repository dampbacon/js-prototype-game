import {chance2} from "./random_nums.js";
import chalk from "chalk";
import {dmgTypeClass, weapon} from "./items.js";

export let fire_damage = new dmgTypeClass({
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
})
export let poison_damage = new dmgTypeClass({
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
})
export let slash_damage = new dmgTypeClass({
    name: 'slash_damage',
    color: 'ffffff',
    chanceToApply: 0,
    effectDuration: 0,
})
export let blunt_damage = new dmgTypeClass({
    name: 'blunt_damage',
    color: 'ffffff',
    chanceToApply: 0,
    effectDuration: 0,
})
export let piercing_damage = new dmgTypeClass({
    name: 'piercing_damage',
    color: 'ffffff',
    chanceToApply: 0,
    effectDuration: 0,
})
export let flaming_sword = new weapon({
    name: 'flaming_sword',
    dmgDie: '1d8',
    dmgType: fire_damage,
    rarity: 1,
    enchant: 0,
    description: 'a flaming sword'
})
export let poison_sword = new weapon({
    name: 'poison_sword',
    dmgDie: '1d8',
    dmgType: poison_damage,
    rarity: 1,
    enchant: 0,
    description: 'a venomous sword'
})
export let sword = new weapon({
    name: 'sword',
    dmgDie: '1d8',
    dmgType: slash_damage,
    rarity: 1,
    enchant: 0,
    description: 'a sword'
})
export const ARMOUR = Object.freeze({
    LOIN_CLOTH: 'LOIN_CLOTH',
    OXFORD_BLUE_ROBE: 'OXFORD_BLUE_ROBE',
    CAMBRIDGE_BLUE_ROBE: 'CAMBRIDGE_BLUE_ROBE',
    LABCOAT: 'LABCOAT',
    PLATE: 'PLATE',
    GANDALFS_WHITE_ROBES: 'GANDALFS_WHITE_ROBES',
    CHAINMAIL: 'CHAINMAIL',
})
//all the rooms and loot and stuff initialized here in a list we random select from
let ARMOURmap = {}
ARMOURmap[ARMOUR.LOIN_CLOTH] = 10
ARMOURmap[ARMOUR.OXFORD_BLUE_ROBE] = 12
ARMOURmap[ARMOUR.CAMBRIDGE_BLUE_ROBE] = 14
ARMOURmap[ARMOUR.LABCOAT] = 16
ARMOURmap[ARMOUR.PLATE] = 18
ARMOURmap[ARMOUR.GANDALFS_WHITE_ROBES] = 20
ARMOURmap[ARMOUR.CHAINMAIL] = 22
export {ARMOURmap};