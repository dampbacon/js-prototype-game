import {chance2, chance3, monsterRandom} from "./random_nums.js";
import chalk from "chalk";
import {dmgScrollFun, dmgTypeClass, Scroll, weapon} from "./items.js";
import _ from "lodash";
import repeat from "repeat-string";
import longest from "longest";
import gradient from 'gradient-string';
//var align = require('align-text');
import align_text from 'align-text';
//import atest from "../atest.cjs";
//import { alignTextv2 } from "../writeMethods.js";
//DAMAGE TYPES



/*
████████▄     ▄████████   ▄▄▄▄███▄▄▄▄      ▄████████    ▄██████▄     ▄████████          ███     ▄██   ▄      ▄███████▄    ▄████████    ▄████████ 
███   ▀███   ███    ███ ▄██▀▀▀███▀▀▀██▄   ███    ███   ███    ███   ███    ███      ▀█████████▄ ███   ██▄   ███    ███   ███    ███   ███    ███ 
███    ███   ███    ███ ███   ███   ███   ███    ███   ███    █▀    ███    █▀          ▀███▀▀██ ███▄▄▄███   ███    ███   ███    █▀    ███    █▀  
███    ███   ███    ███ ███   ███   ███   ███    ███  ▄███         ▄███▄▄▄              ███   ▀ ▀▀▀▀▀▀███   ███    ███  ▄███▄▄▄       ███        
███    ███ ▀███████████ ███   ███   ███ ▀███████████ ▀▀███ ████▄  ▀▀███▀▀▀              ███     ▄██   ███ ▀█████████▀  ▀▀███▀▀▀     ▀███████████ 
███    ███   ███    ███ ███   ███   ███   ███    ███   ███    ███   ███    █▄           ███     ███   ███   ███          ███    █▄           ███ 
███   ▄███   ███    ███ ███   ███   ███   ███    ███   ███    ███   ███    ███          ███     ███   ███   ███          ███    ███    ▄█    ███ 
████████▀    ███    █▀   ▀█   ███   █▀    ███    █▀    ████████▀    ██████████         ▄████▀    ▀█████▀   ▄████▀        ██████████  ▄████████▀                                                                                                                                                   
*/
//return array consist of str and dmg done
export const DMG_TYPE= Object.freeze({
    FIRE:'FIRE',
    ICE:'ICE',
    LIGHTNING:'LIGHTNING',
    POISON:'POISON',
    BLUNT:'BLUNT',
    SLASH:'SLASH',
    PIERCE:'PIERCE',
    HOLY:'HOLY',
    DARK:'DARK',
    GRAVITY:'GRAVITY',
    NARUTO:'NARUTO',
    NONE:'NONE',
    MAGIC:'MAGIC',
})
// let FIRE=DMG_TYPE.FIRE,ICE=DMG_TYPE.ICE, 
// LIGHTNING=DMG_TYPE.LIGHTNING, POISON=DMG_TYPE.POISON,BLUNT=DMG_TYPE.BLUNT, 
// SLASH=DMG_TYPE.SLASH , PIERCE=DMG_TYPE.PIERCE, HOLY=DMG_TYPE.HOLY, 
// DARK=DMG_TYPE.DARK, GRAVITY=DMG_TYPE.GRAVITY, NARUTO=DMG_TYPE.NARUTO;

const DMG_COLOUR = {}
DMG_COLOUR[DMG_TYPE.FIRE] = 'FFA500'
DMG_COLOUR[DMG_TYPE.ICE] = '00FFFF'
DMG_COLOUR[DMG_TYPE.LIGHTNING] = 'fad20c'
DMG_COLOUR[DMG_TYPE.POISON] = '00FF00'
DMG_COLOUR[DMG_TYPE.BLUNT] = 'FFFFFF'
DMG_COLOUR[DMG_TYPE.SLASH] = 'FFFFFF'
DMG_COLOUR[DMG_TYPE.PIERCE] = 'FFFFFF'
DMG_COLOUR[DMG_TYPE.HOLY] = 'fef65b'
DMG_COLOUR[DMG_TYPE.DARK] = '5d5d5d'
DMG_COLOUR[DMG_TYPE.GRAVITY] = '7919e6'
DMG_COLOUR[DMG_TYPE.NARUTO] = 'fbe407'
DMG_COLOUR[DMG_TYPE.NONE] = 'FFFFFF'
DMG_COLOUR[DMG_TYPE.MAGIC] = '263ce3'

Object.freeze(DMG_COLOUR)
export {DMG_COLOUR}




export const damageTypes = Object.freeze({
    fire_damage : new dmgTypeClass({
        name: DMG_TYPE.FIRE,
        //effectAdverb:'you set aflame',
        color: DMG_COLOUR[DMG_TYPE.FIRE],
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
        name: DMG_TYPE.POISON,
        color: DMG_COLOUR[DMG_TYPE.POISON],
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
        name: DMG_TYPE.GRAVITY,
        //effectAdverb:'you set aflame',
        color: DMG_COLOUR[DMG_TYPE.GRAVITY],
        chanceToApply: 0.7,
        effectDuration: 0,
        applyEffect: (target, selfdmgtype, crit = false, target2) => {
            if(target2.int>3){
                let self = selfdmgtype
                if (chance2.bool({likelihood: (100 * self.chanceToApply)}) || crit) {
                    let bonusDamage = crit ? chance2.rpg('6d6', {sum: true}) : chance2.rpg('3d6', {sum: true})
                    target.hp -= bonusDamage
                    return `${chalk.hex(self.color)('bonus gravitational wave damage: ')}${bonusDamage}\n`
                }
            }
            return ''
        }
    }),
    weeb_damage : new dmgTypeClass({
        name: DMG_TYPE.NARUTO,
        //effectAdverb:'you set aflame',
        color: DMG_COLOUR[DMG_TYPE.NARUTO],
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
        name: DMG_TYPE.SLASH,
        color: DMG_COLOUR[DMG_TYPE.SLASH],
        chanceToApply: 0,
        effectDuration: 0,
    }),
    blunt_damage : new dmgTypeClass({
        name: DMG_TYPE.BLUNT,
        color: DMG_COLOUR[DMG_TYPE.BLUNT],
        chanceToApply: 0,
        effectDuration: 0,
    }),
    piercing_damage : new dmgTypeClass({
        name: DMG_TYPE.PIERCE,
        color: DMG_COLOUR[DMG_TYPE.PIERCE],
        chanceToApply: 0,
        effectDuration: 0,
    })
})
//END OF DAMAGE TYPES




/*
 ▄█     █▄     ▄████████    ▄████████    ▄███████▄  ▄██████▄  ███▄▄▄▄      ▄████████ 
███     ███   ███    ███   ███    ███   ███    ███ ███    ███ ███▀▀▀██▄   ███    ███ 
███     ███   ███    █▀    ███    ███   ███    ███ ███    ███ ███   ███   ███    █▀  
███     ███  ▄███▄▄▄       ███    ███   ███    ███ ███    ███ ███   ███   ███        
███     ███ ▀▀███▀▀▀     ▀███████████ ▀█████████▀  ███    ███ ███   ███ ▀███████████ 
███     ███   ███    █▄    ███    ███   ███        ███    ███ ███   ███          ███ 
███ ▄█▄ ███   ███    ███   ███    ███   ███        ███    ███ ███   ███    ▄█    ███ 
 ▀███▀███▀    ██████████   ███    █▀   ▄████▀       ▀██████▀   ▀█   █▀   ▄████████▀  
                                                                                     
*/
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





/*

   ▄████████    ▄████████   ▄▄▄▄███▄▄▄▄    ▄██████▄  ███    █▄     ▄████████ 
  ███    ███   ███    ███ ▄██▀▀▀███▀▀▀██▄ ███    ███ ███    ███   ███    ███ 
  ███    ███   ███    ███ ███   ███   ███ ███    ███ ███    ███   ███    ███ 
  ███    ███  ▄███▄▄▄▄██▀ ███   ███   ███ ███    ███ ███    ███  ▄███▄▄▄▄██▀ 
▀███████████ ▀▀███▀▀▀▀▀   ███   ███   ███ ███    ███ ███    ███ ▀▀███▀▀▀▀▀   
  ███    ███ ▀███████████ ███   ███   ███ ███    ███ ███    ███ ▀███████████ 
  ███    ███   ███    ███ ███   ███   ███ ███    ███ ███    ███   ███    ███ 
  ███    █▀    ███    ███  ▀█   ███   █▀   ▀██████▀  ████████▀    ███    ███ 
               ███    ███                                         ███    ███ 

*/
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

const rarityColours=[
    'ffffff',
    '1eff00',
    '0070dd',
    'a335ee',
    'ff8000',
]
Object.freeze(rarityColours)
export {rarityColours}

export function ArmourRarityColour(ac){
    //let colour=''
    switch(ac){
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
            return rarityColours[0]
        case 11:
        case 12: 
        case 13:
        case 14:
            return rarityColours[1]
        case 15:
        case 16:
            return rarityColours[2]
        case 17:
        case 18:
            return rarityColours[3]
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
        case 24:
        case 25:
        case 26:
            return rarityColours[4]
    }
}



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


/*
   ▄████████  ▄████████    ▄████████  ▄██████▄   ▄█        ▄█          ▄████████ 
  ███    ███ ███    ███   ███    ███ ███    ███ ███       ███         ███    ███ 
  ███    █▀  ███    █▀    ███    ███ ███    ███ ███       ███         ███    █▀  
  ███        ███         ▄███▄▄▄▄██▀ ███    ███ ███       ███         ███        
▀███████████ ███        ▀▀███▀▀▀▀▀   ███    ███ ███       ███       ▀███████████ 
         ███ ███    █▄  ▀███████████ ███    ███ ███       ███                ███ 
   ▄█    ███ ███    ███   ███    ███ ███    ███ ███▌    ▄ ███▌    ▄    ▄█    ███ 
 ▄████████▀  ████████▀    ███    ███  ▀██████▀  █████▄▄██ █████▄▄██  ▄████████▀  
                          ███    ███            ▀         ▀                      
*/
// LATER USE A WRAP TEXT FUNCTION TO GENERALISE STRINGS FITTING THE BOX
export const ScrollsAll=Object.freeze({
    fireball : new Scroll({
        name: 'fireball',
        dmgTypeE: DMG_TYPE.FIRE,
        targetmonster: true,
        rarity: 1,
        description: 'A scroll that summons a fireball to attack a monster',
        scrollFunction: dmgScrollFun(
            `dodges the worst of the blast and takes`,
            `catches the full force of the fiery explosion and takes`,
            `Unfortunately you are not in combat, you cast it out of the room.`,
            DMG_COLOUR[DMG_TYPE.FIRE],//`FFA500`,
            `4d6`,
            `fireball`
        )
    }),
    lightning_bolt : new Scroll({
        name: 'lightning bolt',
        dmgTypeE: DMG_TYPE.LIGHTNING,
        targetmonster: true,
        rarity: 1,
        description: 'A scroll that summons a lightning bolt to strike a monster',
        scrollFunction: dmgScrollFun(
            `catches a glancing strike and takes`,
            `catches the full force of the thunder bolt\nand takes`,
            `Unfortunately you are not in combat, you cast it out of the room.`,
            DMG_COLOUR[DMG_TYPE.LIGHTNING],//`FFA500`,
            `4d6`,
            `lightning bolt`
        )
    }),
    kill : new Scroll({
        name: 'kill',
        dmgTypeE: DMG_TYPE.DARK,
        targetmonster: true,
        rarity: 1,
        description: 'A scroll that kills a monster most of the time',
        scrollFunction: dmgScrollFun(
            `takes a glancing blow from the curse\nand takes`,
            `absorbs the full force of the curse killing it`,
            `unfortunately there is nothing to kill besides yourself.\nYou let the scroll fizzle into ashes`,
            DMG_COLOUR[DMG_TYPE.DARK],
            `4d6`,
            `kill`,
            true,
        )
    }),
    heal : new Scroll({
        name: 'heal',
        dmgTypeE: DMG_TYPE.HOLY,
        targetplayer: true,
        rarity: 0.1,
        description: 'A scroll that heals the player',
        scrollFunction: (player, params = {}) => {
            let heal = chance2.rpg('2d8', {sum: true})
            if (player.hp === player.hpMax) {
                return chalk.hex(DMG_COLOUR[DMG_TYPE.HOLY])(`You cast heal on yourself even though you are already at full health.\nWasting a spell that could have been used to save yourself.`)
            } else {
                let healAmount = heal
                if ((player.hp + heal) > player.hpMax) {
                    healAmount = player.hpMax - player.hp
                }
                player.increaseHP(heal)
                return chalk.hex(DMG_COLOUR[DMG_TYPE.HOLY])(`You cast heal on yourself and heal`) + ` ${chalk.greenBright(healAmount + `hp`)}`
            }
        }
    }),
    vitalize : new Scroll({
        name: 'vitalize',
        dmgTypeE: DMG_TYPE.HOLY,
        targetplayer: true,
        rarity: 0.02,
        description: 'A scroll that strengthens the players life force',
        scrollFunction: (player, params = {}) => {
            let hpInc = chance2.rpg('1d6', {sum: true})
            player.hpMax += hpInc
            player.hp += hpInc
            return chalk.hex(DMG_COLOUR[DMG_TYPE.HOLY])(`You cast the spell and feel your vitality strengthened`) + ` ${chalk.greenBright(`Max HP increased by ${hpInc}`)}`
        }
    }),
    //make one for unique dmg types to weapons
    enchantWeapon : new Scroll({
        name: 'enchant weapon',
        dmgTypeE: DMG_TYPE.MAGIC,
        targetplayer: true,
        rarity: 0.1,
        description: 'A scroll that enchants the players weapon',
        scrollFunction: (player, params = {}) => {
            if (player.weapon.enchant < 3) {
                player.weapon.enchant += 1
                return chalk.hex(DMG_COLOUR[DMG_TYPE.MAGIC])(`You cast the spell and your ${player.weapon.name} is infused with magic. Weapon enchant increased by `)+`${chalk.greenBright(`1`)}`
            } else {
                //  something special later
                return chalk.hex(DMG_COLOUR[DMG_TYPE.MAGIC])(`You attempt to enchant your ${player.weapon.name} but it is already at max enchant`)
            }
        }
    }),
    curseWeapon : new Scroll({
        name: 'curse weapon',
        dmgTypeE: DMG_TYPE.DARK,
        targetplayer: true,
        rarity: 0.1,
        description: 'A scroll that curses the players weapon',
        scrollFunction: (player, params = {}) => {
            if (player.weapon.enchant > -3) {
                player.weapon.enchant -= 1
                return chalk.hex(DMG_COLOUR[DMG_TYPE.DARK])(`You cast the spell and your ${player.weapon.name} is cursed`) + ` ${chalk.greenBright(`weapon quality drops by 1`)}`
            } else {
                //  something special later specifically for max curse
                return chalk.hex(DMG_COLOUR[DMG_TYPE.DARK])(`You attempt to curse your ${player.weapon.name} but it is already at max curse`)
            }
        }
    })
})

const scrollsArray=Object.values(ScrollsAll)
const scrollWeights=scrollsArray.map((item)=>{return item.rarity})
//alias 
export function pickScroll(){
    return pickRandom(scrollsArray,scrollWeights)
}





/*

   ▄████████ ███▄▄▄▄      ▄████████   ▄▄▄▄███▄▄▄▄   ▄██   ▄        
  ███    ███ ███▀▀▀██▄   ███    ███ ▄██▀▀▀███▀▀▀██▄ ███   ██▄     
  ███    █▀  ███   ███   ███    █▀  ███   ███   ███ ███▄▄▄███      
 ▄███▄▄▄     ███   ███  ▄███▄▄▄     ███   ███   ███ ▀▀▀▀▀▀███
▀▀███▀▀▀     ███   ███ ▀▀███▀▀▀     ███   ███   ███ ▄██   ███
  ███    █▄  ███   ███   ███    █▄  ███   ███   ███ ███   ███
  ███    ███ ███   ███   ███    ███ ███   ███   ███ ███   ███
  ██████████  ▀█   █▀    ██████████  ▀█   ███   █▀   ▀█████▀ 
                                                            
*/









/*
   ▄████████ ███▄▄▄▄      ▄████████   ▄▄▄▄███▄▄▄▄   ▄██   ▄           ▄████████    ▄████████     ███     
  ███    ███ ███▀▀▀██▄   ███    ███ ▄██▀▀▀███▀▀▀██▄ ███   ██▄        ███    ███   ███    ███ ▀█████████▄ 
  ███    █▀  ███   ███   ███    █▀  ███   ███   ███ ███▄▄▄███        ███    ███   ███    ███    ▀███▀▀██ 
 ▄███▄▄▄     ███   ███  ▄███▄▄▄     ███   ███   ███ ▀▀▀▀▀▀███        ███    ███  ▄███▄▄▄▄██▀     ███   ▀ 
▀▀███▀▀▀     ███   ███ ▀▀███▀▀▀     ███   ███   ███ ▄██   ███      ▀███████████ ▀▀███▀▀▀▀▀       ███     
  ███    █▄  ███   ███   ███    █▄  ███   ███   ███ ███   ███        ███    ███ ▀███████████     ███     
  ███    ███ ███   ███   ███    ███ ███   ███   ███ ███   ███        ███    ███   ███    ███     ███     
  ██████████  ▀█   █▀    ██████████  ▀█   ███   █▀   ▀█████▀         ███    █▀    ███    ███    ▄████▀   
                                                                                  ███    ███             
*/
const GenericEnemiesArt=Object.freeze({

    genericHumaniod:
    `[37m[40m   [90m[40m▄▄▄&*[32m[40m¿[90m[40m/▄▄▄▄▄▄▄▄░░░░░[m
    [37m[40m     [90m[40m&*[32m[40m¿[94m[40m¿[90m[40m/▒[37m[40m   [30m[40m░[37m[40m [90m[40m#▒[37m[40m≈÷≈  [m
    [37m[40m   [90m[40m**&[32m[40m¿[94m[40m¿[90m[40m░░▒[37m[40m  [30m[40m▒[31m[40m♦[30m[40m#[90m[40m#▒░░░░░[m
    [37m[40m [90m[40m*//&&[37m[40m [90m[40m/[32m[40m¿¿[90m[40m▒[37m[40m   [90m[40m░▒#▒[37m[40m≈÷≈  [m
    [90m[40m///&&//[32m[40m¿¿[90m[40m░▒[37m[40m  [90m[40m▒░░#▒░░░░░[m
    [37m[40m  [90m[40m////[37m[40m [32m[40m¿[90m[40m/[94m[40m¿[90m[40m▒[30m[40m○░[37m[40m [90m[40m▒▓#▒[37m[40m≈÷≈  [m
    [37m[40m [90m[40m//[37m[40m [32m[40m¿[30m[40m○[94m[40m¿[90m[40m░░░▒[30m[40m░[37m[40m  [90m[40m░[37m[40m [90m[40m#▒░░░░░[m
    [37m[40m   [90m[40m/&&&[37m[40m   [90m[40m▒[30m[40m░▒[37m[40m [90m[40m░[37m[40m [90m[40m#▒[37m[40m≈÷≈  [m
    [37m[40m [90m[40m&&░█▒▓▓█▓▒[30m[40m░▒[37m[40m   [90m[40m#▓░░░░░[m
    [37m[40m   ########     #######[m`,
    
    amorphousBlob:
    `[90m[40m░░░░░▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄[37m[40m [m
    [37m[40m  ≈÷≈[90m[40m▒[33m[40m║[37m[40m [30m[40m░[37m[40m   [90m[40m▒\[37m[40m  [90m[40m*[37m[40m@   [m
    [90m[40m░░░░░▒[33m[40m║[37m[40m     [90m[40m▒░░[37m[40m  [30m[40m⌂[90m[40m**[37m[40m [m
    [37m[40m  ≈÷≈[90m[40m▒[33m[40m║[37m[40m     [90m[40m▒[37m[40m [30m[40m⌂[93m[40m⌂[37m[40m  [93m[40m⌂[30m[40m⌂[90m[40m\[m
    [90m[40m░░░░░▒[33m[40m║[30m[40m#[31m[40m♦[30m[40m▒[37m[40m [30m[40m○[90m[40m▒░[30m[40m⌂[93m[40mπ[30m[40m⌂[37m[40m [93m[40mπ[37m[40m @[m
    [37m[40m  ≈÷≈[90m[40m▒[33m[40m║[90m[40m▒[37m[40mC[90m[40m▓[30m[40m░[31m[40m♦[90m[40m▒[37m[40m [30m[40m⌂[33m[40mV[37m[40m  [33m[40mV[37m[40m @[m
    [90m[40m░░░░░▒[33m[40m║[90m[40m░░█░░▒░░[37m[40m│ [30m[40m⌂[37m[40m│ [90m[40m\[m
    [37m[40m  ≈÷≈[90m[40m▒[33m[40m║[37m[40mC[90m[40m░▒▓[37m[40mC[90m[40m▒[37m[40m   [90m[40m&&&\[37m[40m [m
    [90m[40m░░░░░▓[33m[40m║[37m[40m     [90m[40m▒▓█▓▓▒█░&[m
    [37m[40m#######     ######## [m`,
    
    amorphousBlobCave:
    `[37m[40m             [90m[40m####[37m[40m        [m
    [37m[40m       [90m[40m//[37m[40m [90m[40m###[37m[40m   [90m[40m##\[37m[40m      [m
    [37m[40m       [90m[40m/[37m[40m  [90m[40m#▒[37m[40m      [90m[40m##\\\[37m[40m  [m
    [37m[40m    [90m[40m////[37m[40m [90m[40m#▒[37m[40m          [90m[40m#\\[37m[40m [m
    [37m[40m   [90m[40m//[37m[40m  [90m[40m#▒▒[37m[40m       \     [90m[40m\\[m
    [37m[40m [90m[40m///[37m[40m [90m[40m#▒▒[37m[40m    [30m[40m#[31m[40m♦[30m[40m▒[37m[40m [30m[40m○[37m[40m  \   [90m[40m#\[m
    [90m[40m//[37m[40m [90m[40m#▒▒[37m[40m  \  [90m[40m▓▒[37m[40mC[90m[40m▓[30m[40m░[31m[40m♦[37m[40m  [90m[40m‼[37m[40m    [90m[40m#[m
    [90m[40m/[37m[40m  [90m[40m▒[37m[40m    [90m[40m░░░===█░░░░╥╥╥[37m[40m   [m
    [90m[40m/[37m[40m  [90m[40m▒[37m[40m   [90m[40m░░[37m[40m [90m[40m▒‼[37m[40mC[90m[40m░▒▓[37m[40mC[90m[40m‼░░░░[37m[40m   [m
    [90m[40m/[37m[40m [90m[40m▒[37m[40m     [90m[40m▀▒░▀░░░[37m[40m [90m[40m░░▀[37m[40m      [m`,
    
    guard:
    `[37m[40m           [90m[40m####[37m[40m             [m
    [37m[40m         [90m[40m/##[37m[40m   [90m[40m###[37m[40m [90m[40m\\[37m[40m       [m
    [37m[40m     [90m[40m///##[37m[40m      [90m[40m▒#[37m[40m  [90m[40m\[37m[40m       [m
    [37m[40m    [90m[40m//#[37m[40m          [90m[40m▒#[37m[40m [90m[40m\\\\[37m[40m    [m
    [37m[40m   [90m[40m//[37m[40m             [90m[40m▒▒#[37m[40m  [90m[40m\\[37m[40m   [m
    [37m[40m [90m[40m///#[37m[40m        [97m[40m↑[37m[40m      [90m[40m▒▒#[37m[40m [90m[40m\\\[37m[40m [m
    [90m[40m//[37m[40m [90m[40m#[37m[40m      [30m[40m░[31m[40m♦[37m[40m │        [90m[40m▒▒#[37m[40m [90m[40m\\[m
    [90m[40m/[37m[40m        ║█[90m[40m░/[33m[40m↓[37m[40m          [90m[40m▒[37m[40m  [90m[40m\[m
    [90m[40m/[37m[40m         [90m[40m▓[37m[40mC        [93m[40m⌂⌂[37m[40m  [90m[40m▒[37m[40m  [90m[40m\[m
    [90m[40m/[37m[40m [90m[40m▒[37m[40m       ▌▌      [93m[40m⌂⌂⌂⌂⌂[37m[40m  [90m[40m▒[37m[40m [90m[40m\[m`
    })
    
    const artArray=Object.values(GenericEnemiesArt)
    export function PickEnemyArt(){
        return chance3.pickone(artArray)
    }
    






/*

   ▄████████ ███▄▄▄▄      ▄████████   ▄▄▄▄███▄▄▄▄   ▄██   ▄        ████████▄     ▄████████    ▄████████  ▄████████    ▄████████  ▄█     ▄███████▄     ███      ▄██████▄     ▄████████    ▄████████ 
  ███    ███ ███▀▀▀██▄   ███    ███ ▄██▀▀▀███▀▀▀██▄ ███   ██▄      ███   ▀███   ███    ███   ███    ███ ███    ███   ███    ███ ███    ███    ███ ▀█████████▄ ███    ███   ███    ███   ███    ███ 
  ███    █▀  ███   ███   ███    █▀  ███   ███   ███ ███▄▄▄███      ███    ███   ███    █▀    ███    █▀  ███    █▀    ███    ███ ███▌   ███    ███    ▀███▀▀██ ███    ███   ███    ███   ███    █▀  
 ▄███▄▄▄     ███   ███  ▄███▄▄▄     ███   ███   ███ ▀▀▀▀▀▀███      ███    ███  ▄███▄▄▄       ███        ███         ▄███▄▄▄▄██▀ ███▌   ███    ███     ███   ▀ ███    ███  ▄███▄▄▄▄██▀   ███        
▀▀███▀▀▀     ███   ███ ▀▀███▀▀▀     ███   ███   ███ ▄██   ███      ███    ███ ▀▀███▀▀▀     ▀███████████ ███        ▀▀███▀▀▀▀▀   ███▌ ▀█████████▀      ███     ███    ███ ▀▀███▀▀▀▀▀   ▀███████████ 
  ███    █▄  ███   ███   ███    █▄  ███   ███   ███ ███   ███      ███    ███   ███    █▄           ███ ███    █▄  ▀███████████ ███    ███            ███     ███    ███ ▀███████████          ███ 
  ███    ███ ███   ███   ███    ███ ███   ███   ███ ███   ███      ███   ▄███   ███    ███    ▄█    ███ ███    ███   ███    ███ ███    ███            ███     ███    ███   ███    ███    ▄█    ███ 
  ██████████  ▀█   █▀    ██████████  ▀█   ███   █▀   ▀█████▀       ████████▀    ██████████  ▄████████▀  ████████▀    ███    ███ █▀    ▄████▀         ▄████▀    ▀██████▀    ███    ███  ▄████████▀  
                                                                                                                     ███    ███                                            ███    ███              

*///               make
// `you attempt to ${pickMoveWord()} your way through the ${pickPathName()} to get to the next room.    
//  A ${pickEnemyAdjective()} ${monster.name} is ${pickEnemyVerb()} here obstructing your path.
// Choose your next move`
const enemyAdjective = Object.freeze([
    'large',
    'small',
    'tall',
    'short',
    'fat',
    'skinny',
    'ugly',
    'beautiful',
    'scary',
    'cute',
    'angry',
    'happy',
    'sad',
    'furious',
    'calm',
    'sneaky',
    'slimy',
    'slippery',
    'sticky',
    'damp',
    'rotten',
    'stinky',
    'melancholy',
    'demonic',
    'angelic',
    'contemplative',
    'distracted',
    'determined',
    'disgruntled',
    'under-payed',
    'over-worked',
    'destitute',
    'hungry',
    'thirsty',
    'sleepy',
    'drooping',
    'drowsy',
    'dull',
    'dazed',
    'dizzy',
    'drunk',
    'drugged',
    'drained',
    'diseased',
    'disgusting',
    'disheveled',
    'sloppy',
    'dirty',
    'filthy',
    'greasy',
    'grubby',
    'grungy',
    'lazy',
    'lethargic',
    'listless',
    'uncreative',
    'uninspired',
    'unmotivated',
    'unproductive',
    'stupid',
    'dumb',
    'slow',
    'slow-witted',
    'shining',
    'brilliant',
    'intellegent',
    'bright',
    'well-groomed',
    'manicured',
    'impecable',
    'genius',
    'hardworking',
    'happy',
    'introsprospective'
])


const moveWord = Object.freeze([
    "crawl",
    "sneak",
    "creep",
    "slither",
    "scurry",
    "wriggle",
    "sneak",
    "weave",
    "make",
    "make",
    "hurry",
    "rush",
    "walk"
])

const pathName = Object.freeze([
    "rubble",
    "tunnels",
    "corridors",
    "passages",
    "paths",
    "mine-shafts",
    "ruins",
    "caves",
    "scafolding",
    "overgrowth",
    "burrows",
    "shadows",
    "hallway",
    "pathway",
    "gully",
])




const verbOpts = Object.freeze([
    "lurking",
    "haunting",
    "creeping",
    "leering",
    "shouting",
    "gargling",
    "drooling",
    "rolling",
    "playing charades",
    "dancing",
    "dining",
    "painting a work of art",
    "singing",
    "hunting",
    "titering",
    "floundering",
    "wobling",
    "calculating",
    "dozing",
    "sneezing",
    "scrawling advanced calculus",
    "reconciling general relativity and quantum mechanics",
    "programming",
    "procrastinating",
    "studying",
    "reading",
    "contemplates",
    "waiting",
    "siting",
    "standing guard",
    "monologing",
    "brooding",
    "hiding",
    "looming",
    "snoozing",
])

export function pickEnemyVerb(){
    return monsterRandom.pickone(verbOpts)
}

export function pickPathName(){
    return monsterRandom.pickone(pathName)
}

export function pickMoveWord(){
    return monsterRandom.pickone(moveWord)
}

export function pickEnemyAdjective(){
    return monsterRandom.pickone(enemyAdjective)
}

export function makeRoomText(monster){
    let roomText = 
`\
you attempt to ${pickMoveWord()} your way through the ${pickPathName()} to get to the next room.    
A ${pickEnemyAdjective()} ${monster.name} is ${pickEnemyVerb()} here obstructing your path.
Choose your next move wisely.\
`
    return roomText
}









































export const border=
`\
╭╼────────────────────────╾╮
│                          │
│                          │
│                          │
│                          │
│                          │
╰╼────────────────────────╾╯
`



//adapted from jonschlinkert align-text examples (MIT)
function centerAlign(len, longest, line, lines) {
    return Math.floor((longest - len) / 2);
}
export function padString(string, len, both){
    if(both){
        return string.split('\n')
        .map((val='',_a,_b)=>{return '*'.repeat(Math.floor(len)/2)+val+'*'.repeat(Math.floor(len)/2)})
        .join('\n')
    }
    return string.split('\n')
    .map((val='',_a,_b)=>{return '*'.repeat(Math.floor(len)/2)+val})
    .join('\n')
}
  //+'@'.repeat(Math.floor(len)/2)+'@'.repeat(Math.floor(len)%2)})


//later mak compat with escape stringz
//.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,'')
export function textBoxNotUI(text,padding){
    //let str= padString(text,padding,both)
    let str= text
    //str=align_text(str, centerAlign);
    let lines = str.split('\n');
    let max = longest(lines).length;

    lines = lines.map((line,ind) => {
        var diff = max - line.length;
        if(ind===0){console.log(line)}
        return '│' + line + repeat(' ', diff) + '│';
    });

    let top = '╭╼'+repeat('─', lines[0].length-4)+'╾╮';
    let bot = '╰╼'+repeat('─', lines[0].length-4)+'╾╯';
    let res = top + '\n'
    + lines.join('\n') + '\n'
    + bot;
    return (res)
}
// turns taken, damage deal, damage taken

export let testContent=
`\
╭╼────────────────────────────────────────────╾╮
│   ${gradient.instagram("MonsterName")} ${chalk.blue(`deafeated in`)} ${chalk.greenBright(`${4} turns`)}
│   <${'-'.repeat(38)}>
│   XP earned:  ${chalk.greenBright(`545`)}
│
│   average hit rate: 99.999 % hit chance
│   average damage dealt per turn: ${chalk.redBright(`999`)} smg
|
│   Total dmg dealt; ${chalk.redBright('9999 dmg')}
│   Total dmg taken: ${chalk.greenBright(`-33`)} dmg
│
│   potions used ${chalk.green('  |')} ${chalk.cyan('Elixir')}
│   scrolls used ${chalk.green('  |')} ${chalk.yellow('ScrollName')}
│   oil flask used ${chalk.green('|')} ${chalk.redBright('FireOil')}
╰╼────────────────────────────────────────────╾╯\
`

export let testContent2=
`\
${gradient.instagram("MonsterName")} ${chalk.blue(`deafeated in`)} ${chalk.greenBright(`${4} turns`)}
<${'-'.repeat(38)}>
XP earned:  ${chalk.greenBright(`545`)}
average hit rate: 99.999 % hit chance
average damage dealt per turn: ${chalk.redBright(`999`)} smg
Total dmg dealt; ${chalk.redBright('9999 dmg')}
Total dmg taken: ${chalk.greenBright(`-33`)} dmg
potions used ${chalk.green('  |')} ${chalk.cyan('Elixir')}
scrolls used ${chalk.green('  |')} ${chalk.yellow('ScrollName')}
oil flask used ${chalk.green('|')} ${chalk.redBright('FireOil')}\
`
