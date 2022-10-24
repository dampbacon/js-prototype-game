import {chance2, chance3, monsterRandom} from "./random_nums.js";
import chalk from "chalk";
import {dmgScrollFun, dmgTypeClass, Scroll, weapon} from "./items.js";
import _ from "lodash";
import assert from 'node:assert/strict';

import gradient from 'gradient-string';
import {monster} from "./mobs.js";
import {Player, playerState} from "./player.js";

//DAMAGE TYPES
chalk.level = 2;
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
export const DMG_TYPE = Object.freeze({
	FIRE: 'FIRE',
	ICE: 'ICE',
	LIGHTNING: 'LIGHTNING',
	POISON: 'POISON',
	BLUNT: 'BLUNT',
	SLASH: 'SLASH',
	PIERCE: 'PIERCE',
	HOLY: 'HOLY',
	DARK: 'DARK',
	GRAVITY: 'GRAVITY',
	NARUTO: 'NARUTO',
	NONE: 'NONE',
	MAGIC: 'MAGIC',
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
export {
	DMG_COLOUR
}


export const miscColours=Object.freeze({
	oil:'3B3131',
	potionPink:'ff2d57',
	...DMG_COLOUR,
	common:'ffffff',
	uncommon:'1eff00',
	rare:'0070dd',
	epic:'a335ee',
	legendary:'ff8000',
})






export const damageTypes = Object.freeze({
	fire_damage: new dmgTypeClass({
		name: DMG_TYPE.FIRE,
		//effectAdverb:'you set aflame',
		color: DMG_COLOUR[DMG_TYPE.FIRE],
		chanceToApply: 0.50,
		effectDuration: 0,
		applyEffect: (target, selfdmgtype, crit = false, target2) => {
			let self = selfdmgtype
			if (chance2.bool({
					likelihood: (100 * self.chanceToApply)
				}) || crit) {
				let bonusDamage = crit ? chance2.rpg('2d6', {
					sum: true
				}) : chance2.rpg('1d6', {
					sum: true
				})
				target.hp -= bonusDamage
				try{
					target2.encDat.TdmgAr[-1] += bonusDamage
				}catch(e){}
				return `${chalk.hex(self.color)('bonus fire damage: ')}${bonusDamage}\n`
			} else {
				return ''
			}
		}
	}),
	poison_damage: new dmgTypeClass({
		name: DMG_TYPE.POISON,
		color: DMG_COLOUR[DMG_TYPE.POISON],
		chanceToApply: 0.60,
		effectDuration: 5,
		applyEffect: (target, selfdmgtype, crit = false, target2) => {
			let self = selfdmgtype
			if ((target2.weaponCooldown > 0) && !crit) {
				--target2.weaponCooldown
				let bonusDamage = 1
                if(target2.dex>0){
                    bonusDamage+=target2.dex
                }
				target.hp -= bonusDamage
				try{
					target2.encDat.TdmgAr[-1] += bonusDamage
				}catch(e){}
				return `${chalk.hex(self.color)('$$$$$$$$$ 1 poison damage: ')}${bonusDamage}\n`
			} else if (chance2.bool({
					likelihood: (100 * self.chanceToApply)
				}) || crit) {
				let bonusDamage = crit ? chance2.rpg('2d4', {
					sum: true
				}) : chance2.rpg('1d4', {
					sum: true
				})
				target2.weaponCooldown = crit ? 0 : selfdmgtype.effectDurationMax
				target.hp -= bonusDamage
				try{
					target2.encDat.TdmgAr[-1] += bonusDamage
				}catch(e){}
				return `${chalk.hex(self.color)('DEFAULT poison damage: ')}$dam${bonusDamage}__________________\ncool${target2.weaponCooldown}_______________\n`
			} else {
				return 'MISS@##@#'
			}
		}
	}),
	gravity_damage: new dmgTypeClass({
		name: DMG_TYPE.GRAVITY,
		//effectAdverb:'you set aflame',
		color: DMG_COLOUR[DMG_TYPE.GRAVITY],
		chanceToApply: 0.7,
		effectDuration: 0,
		applyEffect: (target, selfdmgtype, crit = false, target2) => {
			if (target2.int > 3) {
				let self = selfdmgtype
				if (chance2.bool({
						likelihood: (100 * self.chanceToApply)
					}) || crit) {
					let bonusDamage = crit ? chance2.rpg('6d6', {
						sum: true
					}) : chance2.rpg('3d6', {
						sum: true
					})
					target.hp -= bonusDamage
					try{
						target2.encDat.TdmgAr[-1] += bonusDamage
					}catch(e){}
					return `${chalk.hex(self.color)('bonus gravitational wave damage: ')}${bonusDamage}\n`
				}
			}
			return ''
		}
	}),
	weeb_damage: new dmgTypeClass({
		name: DMG_TYPE.NARUTO,
		//effectAdverb:'you set aflame',
		color: DMG_COLOUR[DMG_TYPE.NARUTO],
		chanceToApply: 0.1,
		effectDuration: 5,
		applyEffect: (target, selfdmgtype, crit = false, target2) => {
			let self = selfdmgtype
			let bonusChance = 0
			let critmult = 0
			if (crit) {
				critmult = 2
			}
			if (target2.dex > 0) {
				bonusChance = (target2.dex / 10) * 2
			}
			if ((target2.weaponCooldown > 0 && !crit)) {
				let appendStr = ``
				let damage = 0
				for (let i = 0; i < (target2.weaponCooldown * 2); i++) {
					let tempDam = chance2.rpg(`${1+(critmult)}d4`, {
						sum: true
					})
					appendStr += `naruto spam ${tempDam} damage!\n`
					damage += tempDam
				}
				--target2.weaponCooldown
				target.hp -= damage
				try{
					target2.encDat.TdmgAr[-1] += damage
				}catch(e){}
				return `${chalk.hex(self.color)(`${appendStr}`)}`
			} else if (chance2.bool({
					likelihood: (100 * (self.chanceToApply + bonusChance))
				}) || crit) {
				let bonusDamage = crit ? chance2.rpg('2d8', {
					sum: true
				}) : chance2.rpg('1d8', {
					sum: true
				})
				target2.weaponCooldown = crit ? 7 : selfdmgtype.effectDurationMax
				target.hp -= bonusDamage
				try{
					target2.encDat.TdmgAr[-1] += bonusDamage
				}catch(e){}
				return `${chalk.hex(self.color)('naruto damage dealt: ')}${bonusDamage}\n`
			} else {
				return 'MISS@##@#'
			}
		}
	}),
	slash_damage: new dmgTypeClass({
		name: DMG_TYPE.SLASH,
		color: DMG_COLOUR[DMG_TYPE.SLASH],
		chanceToApply: 0,
		effectDuration: 0,
	}),
	blunt_damage: new dmgTypeClass({
		name: DMG_TYPE.BLUNT,
		color: DMG_COLOUR[DMG_TYPE.BLUNT],
		chanceToApply: 0,
		effectDuration: 0,
	}),
	piercing_damage: new dmgTypeClass({
		name: DMG_TYPE.PIERCE,
		color: DMG_COLOUR[DMG_TYPE.PIERCE],
		chanceToApply: 0,
		effectDuration: 0,
	})
})
//END OF DAMAGE TYPES
/*
 ▄█     █▄     ▄████████    ▄████████    ▄███████▄  ▄██████▄  ███▄▄▄▄           ▄████████    ▄████████     ███     
███     ███   ███    ███   ███    ███   ███    ███ ███    ███ ███▀▀▀██▄        ███    ███   ███    ███ ▀█████████▄ 
███     ███   ███    █▀    ███    ███   ███    ███ ███    ███ ███   ███        ███    ███   ███    ███    ▀███▀▀██ 
███     ███  ▄███▄▄▄       ███    ███   ███    ███ ███    ███ ███   ███        ███    ███  ▄███▄▄▄▄██▀     ███   ▀ 
███     ███ ▀▀███▀▀▀     ▀███████████ ▀█████████▀  ███    ███ ███   ███      ▀███████████ ▀▀███▀▀▀▀▀       ███     
███     ███   ███    █▄    ███    ███   ███        ███    ███ ███   ███        ███    ███ ▀███████████     ███     
███ ▄█▄ ███   ███    ███   ███    ███   ███        ███    ███ ███   ███        ███    ███   ███    ███     ███     
 ▀███▀███▀    ██████████   ███    █▀   ▄████▀       ▀██████▀   ▀█   █▀         ███    █▀    ███    ███    ▄████▀   
                                                                                            ███    ███             
*/
export const weaponART = Object.freeze({
	apple:
`\

[95m[40m≈[37m[40m   [92m[40m▌[37m[40m [95m[40m≈≈[37m[40m  [m
[37m[40m  [31m[40m███[97m[41m▀[97m[40m█[37m[40m [95m[40m≈[37m[40m [m
[37m[40m [95m[40m≈[31m[40m████[97m[41m▀[37m[40m  [95m[40m≈[m
[37m[40m [95m[40m≈[37m[40m [31m[40m▀▀▀[30m[40m[37m[40m [m\
`,
	swordHandle:
`\
[37m[40m     [90m[40m╔[37m[40m╛    [m
[37m[40m     [90m[40m╟==≈≈≈[m
[90m[43m▄[30m[43m▒[90m[43m▄[30m[43m▒[90m[43m▄[90m[40m╠[37m[40m════[90m[40m═[m
[37m[40m     [90m[40m╟==≈≈≈[m
[37m[40m     [90m[40m╚[37m[40m╕    [m\
`


})



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
	hand_wraps: new weapon({
		name: 'hand wraps',
		dmgDie: '1d4',
		dmgType: damageTypes.weeb_damage,
		rarity: .1,
		enchant: 0,
		description: 'channels naruto powers, chance\nfor bonus dmg, scales with dex',
	}),
	flamberge: new weapon({
		name: 'flamberge',
		dmgDie: '2d6',
		dmgType: damageTypes.fire_damage,
		rarity: .3,
		enchant: 0,
		description: 'a flaming flamberge, powerful\nsword + fire dmg',
		art: weaponART.swordHandle,
	}),
	flaming_sword: new weapon({
		name: 'flaming_sword',
		dmgDie: '1d6',
		dmgType: damageTypes.fire_damage,
		rarity: .5,
		enchant: 0,
		description: 'a flaming sword'
	}),
	poison_sword: new weapon({
		name: 'poison_sword',
		dmgDie: '1d6',
		dmgType: damageTypes.poison_damage,
		rarity: .6,
		enchant: 0,
		description: 'a venomous sword, bonus poison\ndmg scales with dex'
	}),
	sword: new weapon({
		name: 'sword',
		dmgDie: '1d6',
		dmgType: damageTypes.slash_damage,
		rarity: .8,
		enchant: 0,
		description: 'a sword'
	}),
	textbook: new weapon({
		name: 'textbook',
		dmgDie: '1d4',
		dmgType: damageTypes.blunt_damage, //later use player int for unique damage type?
		rarity: 1,
		enchant: 0,
		description: 'a physics textbook'
	}),
	pencil: new weapon({
		name: 'pencil',
		dmgDie: '1d4',
		dmgType: damageTypes.piercing_damage,
		rarity: 1,
		enchant: 0,
		description: 'a freshly sharpened pencil'
	}),
	dagger: new weapon({
		name: 'dagger',
		dmgDie: '1d4',
		dmgType: damageTypes.piercing_damage,
		rarity: 1,
		enchant: 0,
		description: 'a dagger'
	}),
	newtons_apple: new weapon({
		name: 'newtons_apple',
		dmgDie: '1d8',
		dmgType: damageTypes.gravity_damage, 
		rarity: .2,
		enchant: 0,
		description: `newton\'s apple, only a genius \ncan wield its true powers`,
		art: weaponART.apple
	})
})
export function rarityByWeight(num=1)
{
    if(num<=.2)
    {
        return rarityColours[4]
    }else if(num<=.4)
    {
        return rarityColours[3]
    }else if(num<=.6)
    {
        return rarityColours[2]
    }
    else if(num<=.8)
    {
        return rarityColours[1]
    }
    else if(num<=1)
    {
        return rarityColours[0]
    }
}
const weaponsArray = Object.values(weapons)
const weaponWeights = weaponsArray.map((item) => {
	return item.rarity
})
//alias 
export function pickWeapon() {
	return pickRandom(weaponsArray, weaponWeights)
}

function pickRandom(items, weights) {
	let copy = _.cloneDeep(chance3.weighted(items, weights))
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
	TRAVELLERS_CLOTHES: 'TRAVELLERS_CLOTHES',
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
export {
	ARMOURmap
};
const rarityColours = [
	miscColours.common,
	miscColours.uncommon,
	miscColours.rare,
	miscColours.epic,
	miscColours.legendary,
]
Object.freeze(rarityColours)
export {
	rarityColours
}
export function ArmourRarityColour(ac) {
	//let colour=''
	switch (ac) {
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
export const armourArrayWeights = Object.values(ARMOURmap).map((ac) => {
	if (ac > 20) {
		return .2 / ac
	} else if (ac >= 18) {
		return .5 / ac
	}
	return 1 / ac
})
export const armourArray = Object.values(ARMOUR)
export function armourPicker() {
	return pickRandom(armourArray, armourArrayWeights)
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
export const ScrollsAll = Object.freeze({
	polymorph: new Scroll({
		name: 'polymorph',
		dmgTypeE: DMG_TYPE.NONE,
		targetmonster: true,
		changeMonster: true,
		rarity: 0.1,
		description: 'A scroll that changes the target monster into a random monster',
		scrollFunction: (player = new Player(), params = {}) => {
			if (player.state === playerState.COMBAT) {
				let saveDC = 10 + player.int + (player.level > 4 ? 4 : player.level)
				if (monsterRandom.d20() + player.encDat.enemy >= saveDC) {
					return `You read the scroll and nothing happens.`
				} else {
					let oldName = player.encDat.enmyName
					player.encDat.enemy = pickEnemy() //new Monster()  //temp till implemented fully
					player.encDat.enemy.polymorph=true
					params.term.reset()
					player.encDat.enmyName = player.encDat.enemy.name
					params.term.writeSync(player.encDat.enemy.art)
					return `You read the scroll and the shape of ${oldName} distorts and... \nturns into a ${player.encDat.enmyName}!`
				}
			} else {
				return `You read the scroll and nothing happens.`
			}
		}
	}),
	fireball: new Scroll({
		name: 'fireball',
		dmgTypeE: DMG_TYPE.FIRE,
		targetmonster: true,
		rarity: 1,
		description: 'A scroll that summons a fireball to attack a monster',
		scrollFunction: dmgScrollFun(
			`dodges the worst of the blast and takes`,
			`catches the full force of the fiery explosion and takes`,
			`Unfortunately you are not in combat, you cast it out of the room.`,
			DMG_COLOUR[DMG_TYPE.FIRE], //`FFA500`,
			`4d6`,
			`fireball`
		)
	}),
	magicMissile: new Scroll({
		name: 'magic missile',
		dmgTypeE: DMG_TYPE.MAGIC,
		targetmonster: true,
		rarity: 0.2,
		description: 'A scroll that summons magic missles to attack a monster',
		scrollFunction: dmgScrollFun(
			`####### SHOULD NOT DISPLAY ######`,
			`is struck by four magical bolts takes`,
			`Unfortunately you are not in combat, you cast it out of the room.`,
			DMG_COLOUR[DMG_TYPE.MAGIC], //`FFA500`,
			`####### NO DICE CRASH IF READ #######`,
			`Magic Missle`,
			false,
			true,
			12,
			true,
		)
	}),
	lightning_bolt: new Scroll({
		name: 'lightning bolt',
		dmgTypeE: DMG_TYPE.LIGHTNING,
		targetmonster: true,
		rarity: 1,
		description: 'A scroll that summons a lightning bolt to strike a monster',
		scrollFunction: dmgScrollFun(
			`catches a glancing strike and takes`,
			`catches the full force of the thunder bolt\nand takes`,
			`Unfortunately you are not in combat, you cast it out of the room.`,
			DMG_COLOUR[DMG_TYPE.LIGHTNING], //`FFA500`,
			`4d6`,
			`lightning bolt`
		)
	}),
	kill: new Scroll({
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
	heal: new Scroll({
		name: 'heal',
		dmgTypeE: DMG_TYPE.HOLY,
		targetplayer: true,
		rarity: 0.2,
		description: 'A scroll that heals the player',
		scrollFunction: (player, params = {}) => {
			let heal = chance2.rpg('2d8', {
				sum: true
			})
			if (player.hp === player.hpMax) {
				return chalk.hex(DMG_COLOUR[DMG_TYPE.HOLY])(
					`You cast heal on yourself even though you are already at full health.\nWasting a spell that could have been used to save yourself.`
					)
			} else {
				let healAmount = heal
				if ((player.hp + heal) > player.hpMax) {
					healAmount = player.hpMax - player.hp
				}
				player.increaseHP(heal)
				return chalk.hex(DMG_COLOUR[DMG_TYPE.HOLY])(`You cast heal on yourself and heal`) +
					` ${chalk.greenBright(healAmount + `hp`)}`
			}
		}
	}),
	vitalize: new Scroll({
		name: 'vitalize',
		dmgTypeE: DMG_TYPE.HOLY,
		targetplayer: true,
		rarity: 0.08,
		description: 'A scroll that strengthens the players life force',
		scrollFunction: (player, params = {}) => {
			let hpInc = chance2.rpg('1d6', {
				sum: true
			})
			player.hpMax += hpInc
			player.hp += hpInc
			return chalk.hex(DMG_COLOUR[DMG_TYPE.HOLY])(`You cast the spell and feel your vitality strengthened`) +
				` ${chalk.greenBright(`Max HP increased by ${hpInc}`)}`
		}
	}),
	//make one for unique dmg types to weapons
	enchantWeapon: new Scroll({
		name: 'enchant weapon',
		dmgTypeE: DMG_TYPE.MAGIC,
		targetplayer: true,
		rarity: 0.1,
		description: 'A scroll that enchants the players weapon',
		scrollFunction: (player, params = {}) => {
			if (player.weapon.enchant < 3) {
				player.weapon.enchant += 1
				return chalk.hex(DMG_COLOUR[DMG_TYPE.MAGIC])(
						`You cast the spell and your ${player.weapon.name} is infused with magic. Weapon enchant increased by `) +
					`${chalk.greenBright(`1`)}`
			} else {
				//  something special later
				return chalk.hex(DMG_COLOUR[DMG_TYPE.MAGIC])(
					`You attempt to enchant your ${player.weapon.name} but it is already at max enchant`)
			}
		}
	}),
	curseWeapon: new Scroll({
		name: 'curse weapon',
		dmgTypeE: DMG_TYPE.DARK,
		targetplayer: true,
		rarity: 0.1,
		description: 'A scroll that curses the players weapon',
		scrollFunction: (player, params = {}) => {
			if (player.weapon.enchant > -3) {
				player.weapon.enchant -= 1
				return chalk.hex(DMG_COLOUR[DMG_TYPE.DARK])(`You cast the spell and your ${player.weapon.name} is cursed`) +
					` ${chalk.greenBright(`weapon quality drops by 1`)}`
			} else {
				//  something special later specifically for max curse
				return chalk.hex(DMG_COLOUR[DMG_TYPE.DARK])(
					`You attempt to curse your ${player.weapon.name} but it is already at max curse`)
			}
		}
	})
})
const scrollsArray = Object.values(ScrollsAll)
const scrollWeights = scrollsArray.map((item) => {
	return item.rarity
})
//alias 
export function pickScroll() {
	return pickRandom(scrollsArray, scrollWeights)
}
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
const GenericEnemiesArt = Object.freeze({
	genericHumaniod: `
    [37m[40m   [90m[40m▄▄▄&*[32m[40m¿[90m[40m/▄▄▄▄▄▄▄▄░░░░░[m
    [37m[40m     [90m[40m&*[32m[40m¿[94m[40m¿[90m[40m/▒[37m[40m   [30m[40m░[37m[40m [90m[40m#▒[37m[40m≈÷≈  [m
    [37m[40m   [90m[40m**&[32m[40m¿[94m[40m¿[90m[40m░░▒[37m[40m  [30m[40m▒[31m[40m♦[30m[40m#[90m[40m#▒░░░░░[m
    [37m[40m [90m[40m*//&&[37m[40m [90m[40m/[32m[40m¿¿[90m[40m▒[37m[40m   [90m[40m░▒#▒[37m[40m≈÷≈  [m
    [90m[40m///&&//[32m[40m¿¿[90m[40m░▒[37m[40m  [90m[40m▒░░#▒░░░░░[m
    [37m[40m  [90m[40m////[37m[40m [32m[40m¿[90m[40m/[94m[40m¿[90m[40m▒[30m[40m○░[37m[40m [90m[40m▒▓#▒[37m[40m≈÷≈  [m
    [37m[40m [90m[40m//[37m[40m [32m[40m¿[30m[40m○[94m[40m¿[90m[40m░░░▒[30m[40m░[37m[40m  [90m[40m░[37m[40m [90m[40m#▒░░░░░[m
    [37m[40m   [90m[40m/&&&[37m[40m   [90m[40m▒[30m[40m░▒[37m[40m [90m[40m░[37m[40m [90m[40m#▒[37m[40m≈÷≈  [m
    [37m[40m [90m[40m&&░█▒▓▓█▓▒[30m[40m░▒[37m[40m   [90m[40m#▓░░░░░[m
    [37m[40m   ########     #######[m`,
	amorphousBlob: `
    [90m[40m░░░░░▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄[37m[40m [m
    [37m[40m  ≈÷≈[90m[40m▒[33m[40m║[37m[40m [30m[40m░[37m[40m   [90m[40m▒\[37m[40m  [90m[40m*[37m[40m@   [m
    [90m[40m░░░░░▒[33m[40m║[37m[40m     [90m[40m▒░░[37m[40m  [30m[40m⌂[90m[40m**[37m[40m [m
    [37m[40m  ≈÷≈[90m[40m▒[33m[40m║[37m[40m     [90m[40m▒[37m[40m [30m[40m⌂[93m[40m⌂[37m[40m  [93m[40m⌂[30m[40m⌂[90m[40m\[m
    [90m[40m░░░░░▒[33m[40m║[30m[40m#[31m[40m♦[30m[40m▒[37m[40m [30m[40m○[90m[40m▒░[30m[40m⌂[93m[40mπ[30m[40m⌂[37m[40m [93m[40mπ[37m[40m @[m
    [37m[40m  ≈÷≈[90m[40m▒[33m[40m║[90m[40m▒[37m[40mC[90m[40m▓[30m[40m░[31m[40m♦[90m[40m▒[37m[40m [30m[40m⌂[33m[40mV[37m[40m  [33m[40mV[37m[40m @[m
    [90m[40m░░░░░▒[33m[40m║[90m[40m░░█░░▒░░[37m[40m│ [30m[40m⌂[37m[40m│ [90m[40m\[m
    [37m[40m  ≈÷≈[90m[40m▒[33m[40m║[37m[40mC[90m[40m░▒▓[37m[40mC[90m[40m▒[37m[40m   [90m[40m&&&\[37m[40m [m
    [90m[40m░░░░░▓[33m[40m║[37m[40m     [90m[40m▒▓█▓▓▒█░&[m
    [37m[40m#######     ######## [m`,
	amorphousBlobCave: `
    [37m[40m             [90m[40m####[37m[40m        [m
    [37m[40m       [90m[40m//[37m[40m [90m[40m###[37m[40m   [90m[40m##\[37m[40m      [m
    [37m[40m       [90m[40m/[37m[40m  [90m[40m#▒[37m[40m      [90m[40m##\\\[37m[40m  [m
    [37m[40m    [90m[40m////[37m[40m [90m[40m#▒[37m[40m          [90m[40m#\\[37m[40m [m
    [37m[40m   [90m[40m//[37m[40m  [90m[40m#▒▒[37m[40m       \     [90m[40m\\[m
    [37m[40m [90m[40m///[37m[40m [90m[40m#▒▒[37m[40m    [30m[40m#[31m[40m♦[30m[40m▒[37m[40m [30m[40m○[37m[40m  \   [90m[40m#\[m
    [90m[40m//[37m[40m [90m[40m#▒▒[37m[40m  \  [90m[40m▓▒[37m[40mC[90m[40m▓[30m[40m░[31m[40m♦[37m[40m  [90m[40m‼[37m[40m    [90m[40m#[m
    [90m[40m/[37m[40m  [90m[40m▒[37m[40m    [90m[40m░░░===█░░░░╥╥╥[37m[40m   [m
    [90m[40m/[37m[40m  [90m[40m▒[37m[40m   [90m[40m░░[37m[40m [90m[40m▒‼[37m[40mC[90m[40m░▒▓[37m[40mC[90m[40m‼░░░░[37m[40m   [m
    [90m[40m/[37m[40m [90m[40m▒[37m[40m     [90m[40m▀▒░▀░░░[37m[40m [90m[40m░░▀[37m[40m      [m`,
	guard: `
    [37m[40m           [90m[40m####[37m[40m             [m
    [37m[40m         [90m[40m/##[37m[40m   [90m[40m###[37m[40m [90m[40m\\[37m[40m       [m
    [37m[40m     [90m[40m///##[37m[40m      [90m[40m▒#[37m[40m  [90m[40m\[37m[40m       [m
    [37m[40m    [90m[40m//#[37m[40m          [90m[40m▒#[37m[40m [90m[40m\\\\[37m[40m    [m
    [37m[40m   [90m[40m//[37m[40m             [90m[40m▒▒#[37m[40m  [90m[40m\\[37m[40m   [m
    [37m[40m [90m[40m///#[37m[40m        [97m[40m↑[37m[40m      [90m[40m▒▒#[37m[40m [90m[40m\\\[37m[40m [m
    [90m[40m//[37m[40m [90m[40m#[37m[40m      [30m[40m░[31m[40m♦[37m[40m │        [90m[40m▒▒#[37m[40m [90m[40m\\[m
    [90m[40m/[37m[40m        ║█[90m[40m░/[33m[40m↓[37m[40m          [90m[40m▒[37m[40m  [90m[40m\[m
    [90m[40m/[37m[40m         [90m[40m▓[37m[40mC        [93m[40m⌂⌂[37m[40m  [90m[40m▒[37m[40m  [90m[40m\[m
    [90m[40m/[37m[40m [90m[40m▒[37m[40m       ▌▌      [93m[40m⌂⌂⌂⌂⌂[37m[40m  [90m[40m▒[37m[40m [90m[40m\[m`,
}) //art for misc. enemies
const artArray = Object.values(GenericEnemiesArt)
export function PickEnemyArt() {
	return chance3.pickone(artArray)
}
export const enemiesArt = Object.freeze({
	gobo: `
[90m[40m----▒###########░▓-▓▓▓\[37m[40m  [m
[37m[40m    [90m[40m▒[37m[40m         [93m[40m⌂⌂[90m[40m░▄▄▄▄▄\\\[m
[37m[40m----[90m[40m▒[37m[40m    [33m[40m⌂#[37m[40m    [93m[40m⌂[90m[40m░░░○○░[37m[40m [90m[40m\[37m[40m [m
[90m[40m----▒[37m[40m   [92m[40m\`[31m[42m••[92m[40m\`[90m[40m│[37m[40m   [90m[40m░[37m[40m░░░░░[90m[40m\\\[m
[37m[40m----[90m[40m▒[37m[40m    [33m[40m▒Ç[32m[40m/[33m[40m^[37m[40m   [90m[40m░[90m[47m▄▄▄▄▄[90m[40m\\[37m[40m [m
[37m[40m    [90m[40m▒[37m[40m    [32m[40m''[37m[40m     [90m[40m░○▓○▓▓[37m[40m [90m[40m\\[m`,
	computerman: `
[37m[40m              [90m[40m####[37m[40m              [m
[37m[40m            [90m[40m/##[37m[40m   [90m[40m###[37m[40m [90m[40m\\[37m[40m        [m
[37m[40m        [90m[40m///##[37m[40m      [90m[40m▒#[37m[40m  [90m[40m\[37m[40m        [m
[37m[40m       [90m[40m//#[37m[40m          [90m[40m▒#[37m[40m [90m[40m\\\\[37m[40m     [m
[37m[40m      [90m[40m//[37m[40m             [90m[40m▒▒#[37m[40m  [90m[40m\\[37m[40m    [m
[37m[40m    [90m[40m///#[37m[40m        ___    [90m[40m▒▒#[37m[40m [90m[40m\\\[37m[40m  [m
[37m[40m   [90m[40m//[37m[40m [90m[40m#[37m[40m [30m[40m [37m[40m  [31m[40m♦[37m[40m    [97m[46m\`\`[37m[40m▒[     [90m[40m▒▒#[37m[40m [90m[40m\\[37m[40m [m
 [37m[40m   [90m[40m/[37m[40m   [93m[40m\`\\[96m[40m\█░-[37m[40m⌐▬▬ ↨         [90m[40m▒[37m[40m  [90m[40m\[37m[40m [m
[37m[40m   [90m[40m/[37m[40m      [90m[40m▓Ç[37m[40m [90m[43m▄[33m[40m▀▀▀▀▀[90m[43m▄[37m[40m   [93m[40m⌂⌂[37m[40m  [90m[40m▒[37m[40m  [90m[40m\[37m[40m [m
[37m[40m   [90m[40m/[37m[40m [90m[40m▒[37m[40m   [33m[40m^[94m[40m√√[37m[40m [90m[40m⌐[37m[40m     [90m[40m¬[37m[40m  [93m[40m⌂⌂⌂⌂[37m[40m  [90m[40m▒[37m[40m [90m[40m\[37m[40m [m
   
`,
	chicken: `[37m[40m                        [m
[37m[40m                        [m
[37m[40m         [91m[40m▄[37m[40m              [m
[37m[40m        [91m[47m▀▀[97m[40m▄[37m[40m             [m
[37m[40m       [93m[41m▀[97m[40m█[90m[47m▀[97m[40m█▄[37m[40m  [97m[40m▄█[97m[47m▄▄[37m[40m      [m
[37m[40m       [91m[40m▀[97m[40m█████▄[97m[47m▀▀[97m[40m██[37m[40m      [m
[37m[40m        [97m[40m███[97m[47m▀[97m[40m████[97m[47m▄[97m[40m▀[37m[40m      [m
[37m[40m        ▀[97m[47m▀[97m[40m██[97m[47m▄▄▄▄[97m[40m▀[37m[40m       [m
[37m[40m          ▀▀▀▀▀         [m
[37m[40m                        [m
[37m[40m                        [m
[37m[40m                        [m\
`,
	batman: `[38;5;242;48;5;243m▄[38;5;243;48;5;241m▄[38;5;243;48;5;242m▄[38;5;241;48;5;241m▄[38;5;242;48;5;241m▄[38;5;241;48;5;241m▄▄▄▄[38;5;242;48;5;241m▄[38;5;241;48;5;241m▄▄▄▄▄▄▄▄[38;5;59;48;5;241m▄[38;5;59;48;5;59m▄[38;5;59;48;5;240m▄[38;5;240;48;5;240m▄▄▄▄▄[38;5;239;48;5;239m▄▄▄[48;5;239m [38;5;240;48;5;239m▄[38;5;239;48;5;239m▄[38;5;238;48;5;239m▄[38;5;239;48;5;239m▄▄[38;5;240;48;5;239m▄[38;5;240;48;5;240m▄▄[38;5;240;48;5;59m▄[38;5;241;48;5;241m▄▄▄▄▄[38;5;242;48;5;241m▄[38;5;242;48;5;242m▄[38;5;242;48;5;243m▄[38;5;8;48;5;8m▄[38;5;8;48;5;102m▄[38;5;102;48;5;102m▄[38;5;245;48;5;246m▄[38;5;246;48;5;247m▄[38;5;247;48;5;248m▄▄▄[38;5;248;48;5;248m▄[m
[38;5;243;48;5;242m▄[38;5;241;48;5;242m▄[38;5;242;48;5;242m▄▄▄▄▄▄[38;5;243;48;5;242m▄▄▄[38;5;242;48;5;242m▄[38;5;241;48;5;241m▄▄▄[38;5;239;48;5;241m▄[38;5;241;48;5;241m▄[38;5;8;48;5;242m▄[38;5;241;48;5;241m▄[38;5;59;48;5;59m▄▄▄[38;5;240;48;5;240m▄[38;5;239;48;5;240m▄▄[38;5;239;48;5;239m▄[38;5;240;48;5;239m▄▄▄▄[38;5;239;48;5;239m▄▄▄▄▄▄▄[38;5;240;48;5;240m▄[38;5;243;48;5;240m▄[38;5;240;48;5;240m▄[38;5;238;48;5;59m▄[38;5;242;48;5;241m▄[38;5;242;48;5;242m▄▄[38;5;243;48;5;243m▄[38;5;243;48;5;242m▄[38;5;8;48;5;243m▄[38;5;245;48;5;102m▄[38;5;245;48;5;245m▄[38;5;246;48;5;245m▄▄[38;5;247;48;5;247m▄[38;5;248;48;5;247m▄[38;5;247;48;5;247m▄[38;5;248;48;5;247m▄[38;5;145;48;5;144m▄[m
[38;5;8;48;5;8m▄[38;5;243;48;5;242m▄▄▄[38;5;242;48;5;242m▄▄[38;5;243;48;5;242m▄▄[38;5;243;48;5;243m▄[38;5;243;48;5;8m▄[38;5;243;48;5;243m▄▄[38;5;242;48;5;242m▄▄[38;5;242;48;5;241m▄[38;5;238;48;5;238m▄[38;5;235;48;5;240m▄[38;5;243;48;5;246m▄[38;5;102;48;5;243m▄[38;5;242;48;5;241m▄[38;5;241;48;5;241m▄[38;5;241;48;5;59m▄▄[38;5;240;48;5;240m▄[38;5;240;48;5;239m▄[38;5;239;48;5;239m▄[38;5;240;48;5;240m▄▄▄▄[38;5;239;48;5;239m▄▄▄▄▄▄▄[38;5;240;48;5;240m▄[38;5;237;48;5;239m▄[38;5;234;48;5;236m▄[38;5;102;48;5;241m▄[38;5;245;48;5;66m▄[38;5;243;48;5;242m▄[38;5;66;48;5;243m▄[38;5;8;48;5;243m▄[38;5;102;48;5;243m▄[38;5;245;48;5;102m▄[38;5;246;48;5;246m▄▄[38;5;247;48;5;246m▄[38;5;248;48;5;247m▄[38;5;248;48;5;248m▄[38;5;144;48;5;248m▄[38;5;145;48;5;248m▄▄▄[m
[38;5;8;48;5;8m▄[38;5;8;48;5;243m▄▄[38;5;243;48;5;243m▄▄▄▄▄▄▄▄[38;5;8;48;5;243m▄[38;5;243;48;5;243m▄▄[38;5;245;48;5;243m▄[38;5;8;48;5;239m▄[38;5;235;48;5;234m▄[38;5;236;48;5;238m▄[38;5;237;48;5;242m▄[38;5;241;48;5;245m▄[38;5;240;48;5;243m▄[38;5;239;48;5;242m▄[38;5;238;48;5;242m▄[38;5;237;48;5;240m▄[38;5;237;48;5;239m▄[38;5;236;48;5;238m▄▄[38;5;235;48;5;238m▄▄▄[38;5;236;48;5;238m▄[38;5;237;48;5;239m▄[38;5;238;48;5;240m▄[38;5;239;48;5;241m▄[38;5;59;48;5;242m▄[38;5;241;48;5;241m▄[38;5;241;48;5;242m▄[38;5;238;48;5;238m▄[38;5;236;48;5;236m▄[38;5;235;48;5;234m▄[38;5;102;48;5;8m▄[38;5;102;48;5;102m▄[38;5;243;48;5;243m▄[38;5;8;48;5;8m▄[38;5;102;48;5;8m▄[38;5;245;48;5;245m▄[38;5;246;48;5;245m▄[38;5;246;48;5;246m▄[38;5;247;48;5;246m▄[38;5;247;48;5;247m▄[38;5;248;48;5;248m▄[38;5;145;48;5;145m▄▄[38;5;249;48;5;249m▄▄[38;5;249;48;5;145m▄[m
[38;5;245;48;5;102m▄[38;5;8;48;5;8m▄[38;5;243;48;5;8m▄[38;5;8;48;5;243m▄[38;5;8;48;5;8m▄[38;5;8;48;5;243m▄[38;5;8;48;5;8m▄[38;5;102;48;5;8m▄[38;5;8;48;5;8m▄[38;5;102;48;5;102m▄[38;5;102;48;5;8m▄▄[38;5;245;48;5;8m▄[38;5;245;48;5;102m▄[38;5;247;48;5;247m▄[38;5;7;48;5;249m▄[38;5;241;48;5;239m▄[38;5;234;48;5;234m▄[38;5;235;48;5;236m▄▄[38;5;234;48;5;236m▄[38;5;233;48;5;236m▄[38;5;233;48;5;234m▄▄▄▄▄▄[38;5;234;48;5;234m▄▄[38;5;233;48;5;234m▄▄[38;5;233;48;5;235m▄[38;5;234;48;5;235m▄[38;5;234;48;5;236m▄[38;5;234;48;5;237m▄[38;5;236;48;5;238m▄[38;5;237;48;5;238m▄[38;5;237;48;5;237m▄[38;5;237;48;5;235m▄[38;5;246;48;5;245m▄[38;5;254;48;5;188m▄[38;5;245;48;5;245m▄[38;5;243;48;5;243m▄[38;5;8;48;5;8m▄[38;5;245;48;5;245m▄[38;5;246;48;5;246m▄[38;5;247;48;5;246m▄[38;5;247;48;5;247m▄[38;5;248;48;5;247m▄[38;5;144;48;5;248m▄[38;5;248;48;5;144m▄[38;5;145;48;5;145m▄[38;5;249;48;5;249m▄▄▄[m
[38;5;102;48;5;102m▄[38;5;8;48;5;8m▄[38;5;102;48;5;8m▄▄[38;5;245;48;5;245m▄▄[38;5;245;48;5;102m▄[38;5;246;48;5;245m▄▄▄▄[38;5;245;48;5;245m▄[38;5;246;48;5;246m▄[38;5;246;48;5;245m▄[38;5;247;48;5;246m▄[38;5;249;48;5;145m▄[38;5;59;48;5;59m▄[38;5;233;48;5;234m▄▄▄[38;5;233;48;5;233m▄▄▄[48;5;233m [38;5;233;48;5;233m▄[38;5;233;48;5;234m▄[38;5;234;48;5;234m▄▄[38;5;234;48;5;233m▄[38;5;234;48;5;234m▄[48;5;234m [38;5;234;48;5;233m▄[38;5;234;48;5;234m▄[38;5;234;48;5;233m▄[38;5;234;48;5;234m▄▄▄[38;5;235;48;5;235m▄[38;5;235;48;5;236m▄[38;5;238;48;5;239m▄[38;5;145;48;5;248m▄[38;5;254;48;5;254m▄[38;5;245;48;5;102m▄[38;5;243;48;5;243m▄[38;5;102;48;5;8m▄[38;5;246;48;5;246m▄[38;5;247;48;5;246m▄[38;5;248;48;5;247m▄[38;5;145;48;5;248m▄[38;5;249;48;5;145m▄[38;5;249;48;5;249m▄[38;5;249;48;5;145m▄[38;5;249;48;5;249m▄[38;5;250;48;5;249m▄[38;5;181;48;5;250m▄▄[m
[38;5;246;48;5;245m▄[38;5;245;48;5;102m▄▄▄[38;5;246;48;5;245m▄[38;5;246;48;5;246m▄▄▄▄▄▄▄▄[38;5;248;48;5;247m▄[38;5;188;48;5;250m▄[38;5;250;48;5;7m▄[38;5;242;48;5;242m▄[38;5;234;48;5;234m▄[38;5;233;48;5;233m▄▄▄[38;5;232;48;5;233m▄▄[38;5;233;48;5;233m▄▄[38;5;234;48;5;234m▄▄▄▄[38;5;235;48;5;234m▄[38;5;234;48;5;234m▄[38;5;235;48;5;235m▄[38;5;235;48;5;234m▄[38;5;235;48;5;233m▄[38;5;234;48;5;233m▄[38;5;233;48;5;233m▄[38;5;234;48;5;234m▄▄[38;5;235;48;5;235m▄[38;5;242;48;5;239m▄[38;5;188;48;5;249m▄[38;5;255;48;5;255m▄[38;5;15;48;5;252m▄[38;5;246;48;5;102m▄[38;5;245;48;5;245m▄[38;5;246;48;5;246m▄[38;5;248;48;5;247m▄[38;5;145;48;5;248m▄[38;5;145;48;5;145m▄[38;5;249;48;5;249m▄▄[38;5;250;48;5;249m▄[38;5;250;48;5;250m▄[38;5;7;48;5;250m▄[38;5;7;48;5;181m▄[38;5;250;48;5;181m▄[m
[38;5;245;48;5;246m▄[38;5;246;48;5;246m▄[38;5;246;48;5;245m▄[38;5;246;48;5;246m▄▄▄[38;5;247;48;5;246m▄▄[38;5;246;48;5;246m▄▄▄▄▄[38;5;248;48;5;248m▄[38;5;188;48;5;253m▄[38;5;7;48;5;250m▄[38;5;246;48;5;8m▄[38;5;237;48;5;236m▄[48;5;233m [38;5;233;48;5;233m▄[48;5;233m [38;5;233;48;5;232m▄▄[48;5;233m [38;5;234;48;5;234m▄▄[38;5;235;48;5;234m▄▄[38;5;235;48;5;235m▄▄▄▄[38;5;236;48;5;235m▄[38;5;235;48;5;235m▄[38;5;235;48;5;234m▄[38;5;234;48;5;234m▄▄[38;5;235;48;5;234m▄[38;5;235;48;5;235m▄[38;5;8;48;5;243m▄[38;5;254;48;5;254m▄[38;5;255;48;5;255m▄▄[38;5;248;48;5;247m▄[38;5;248;48;5;246m▄[38;5;249;48;5;248m▄[38;5;250;48;5;248m▄[38;5;250;48;5;145m▄[38;5;250;48;5;249m▄▄[38;5;250;48;5;250m▄▄▄▄▄[38;5;181;48;5;250m▄[m
[38;5;246;48;5;246m▄▄▄[38;5;247;48;5;246m▄[38;5;247;48;5;247m▄▄▄▄▄[38;5;246;48;5;246m▄▄▄[38;5;247;48;5;246m▄[38;5;248;48;5;247m▄[38;5;252;48;5;252m▄[38;5;7;48;5;7m▄[38;5;102;48;5;245m▄[38;5;236;48;5;236m▄[38;5;233;48;5;233m▄▄▄▄▄[38;5;234;48;5;233m▄[38;5;235;48;5;234m▄[38;5;235;48;5;235m▄[48;5;235m [38;5;235;48;5;235m▄[38;5;236;48;5;235m▄[38;5;236;48;5;236m▄▄▄▄[38;5;236;48;5;235m▄[48;5;235m [38;5;235;48;5;235m▄▄▄▄[38;5;242;48;5;8m▄[38;5;252;48;5;253m▄[38;5;255;48;5;255m▄▄[38;5;253;48;5;249m▄[38;5;249;48;5;249m▄[38;5;250;48;5;7m▄[38;5;181;48;5;7m▄[38;5;187;48;5;7m▄[38;5;181;48;5;181m▄▄[38;5;7;48;5;7m▄[38;5;250;48;5;250m▄▄▄▄[38;5;250;48;5;187m▄[m
[38;5;248;48;5;247m▄[38;5;247;48;5;247m▄[38;5;248;48;5;247m▄▄▄[38;5;248;48;5;248m▄▄▄[38;5;248;48;5;247m▄▄[38;5;247;48;5;247m▄[38;5;248;48;5;247m▄▄[38;5;252;48;5;7m▄[38;5;188;48;5;188m▄[38;5;7;48;5;250m▄[38;5;245;48;5;243m▄[38;5;237;48;5;235m▄[38;5;233;48;5;233m▄▄[38;5;234;48;5;233m▄[38;5;233;48;5;233m▄▄[38;5;233;48;5;234m▄[38;5;235;48;5;235m▄▄▄[38;5;236;48;5;236m▄[38;5;237;48;5;236m▄▄▄[38;5;236;48;5;236m▄[38;5;236;48;5;237m▄[38;5;236;48;5;236m▄[38;5;235;48;5;235m▄▄▄▄▄[38;5;243;48;5;241m▄[38;5;252;48;5;252m▄[38;5;255;48;5;255m▄▄▄[38;5;250;48;5;250m▄[38;5;187;48;5;7m▄[38;5;187;48;5;187m▄▄▄▄▄[38;5;187;48;5;181m▄[38;5;181;48;5;250m▄[38;5;187;48;5;250m▄[38;5;181;48;5;181m▄[38;5;7;48;5;250m▄[m
[38;5;248;48;5;248m▄▄▄▄[38;5;145;48;5;248m▄[38;5;249;48;5;248m▄[38;5;249;48;5;145m▄[38;5;249;48;5;249m▄[38;5;249;48;5;145m▄[38;5;249;48;5;248m▄[38;5;145;48;5;145m▄[38;5;248;48;5;248m▄▄[38;5;251;48;5;252m▄[38;5;253;48;5;253m▄[38;5;250;48;5;249m▄[38;5;102;48;5;243m▄[38;5;237;48;5;237m▄[38;5;233;48;5;233m▄[38;5;234;48;5;233m▄[38;5;234;48;5;234m▄[38;5;234;48;5;233m▄[38;5;233;48;5;233m▄[38;5;234;48;5;234m▄[38;5;235;48;5;235m▄[38;5;236;48;5;235m▄[38;5;237;48;5;236m▄▄▄[38;5;237;48;5;237m▄[38;5;238;48;5;237m▄[38;5;237;48;5;237m▄[38;5;238;48;5;237m▄[38;5;236;48;5;237m▄[38;5;236;48;5;236m▄[38;5;236;48;5;235m▄[38;5;235;48;5;235m▄[38;5;236;48;5;236m▄▄[38;5;242;48;5;241m▄[38;5;188;48;5;252m▄[38;5;255;48;5;255m▄▄[38;5;255;48;5;15m▄[38;5;187;48;5;181m▄[38;5;223;48;5;187m▄[38;5;254;48;5;187m▄[38;5;255;48;5;187m▄[38;5;254;48;5;187m▄[38;5;187;48;5;223m▄▄[38;5;187;48;5;187m▄▄▄▄▄[m
[38;5;145;48;5;248m▄▄[38;5;249;48;5;248m▄[38;5;249;48;5;145m▄[38;5;7;48;5;249m▄[38;5;187;48;5;250m▄[38;5;187;48;5;7m▄[38;5;187;48;5;187m▄[38;5;187;48;5;7m▄[38;5;187;48;5;250m▄▄[38;5;181;48;5;249m▄[38;5;187;48;5;250m▄[38;5;252;48;5;251m▄[38;5;188;48;5;253m▄[38;5;249;48;5;7m▄[38;5;245;48;5;247m▄[38;5;237;48;5;238m▄[38;5;233;48;5;233m▄[38;5;233;48;5;234m▄[38;5;235;48;5;234m▄▄▄[38;5;234;48;5;234m▄[38;5;236;48;5;236m▄▄[48;5;235m [38;5;235;48;5;236m▄[38;5;236;48;5;236m▄[38;5;236;48;5;238m▄▄[38;5;237;48;5;237m▄[38;5;236;48;5;237m▄▄[48;5;236m [38;5;235;48;5;235m▄[38;5;237;48;5;235m▄[38;5;237;48;5;236m▄[38;5;234;48;5;236m▄[38;5;237;48;5;8m▄[38;5;249;48;5;254m▄[38;5;255;48;5;255m▄▄▄[38;5;250;48;5;250m▄[38;5;187;48;5;187m▄[38;5;187;48;5;223m▄[38;5;187;48;5;254m▄▄[38;5;187;48;5;187m▄▄[38;5;181;48;5;187m▄▄[38;5;187;48;5;187m▄▄▄[m
[38;5;249;48;5;145m▄[38;5;250;48;5;249m▄[38;5;187;48;5;250m▄[38;5;187;48;5;181m▄[38;5;187;48;5;187m▄▄▄[38;5;254;48;5;187m▄[38;5;187;48;5;187m▄▄▄▄▄[38;5;253;48;5;253m▄[38;5;252;48;5;252m▄[38;5;250;48;5;249m▄[38;5;102;48;5;8m▄[38;5;238;48;5;236m▄[38;5;234;48;5;233m▄[38;5;233;48;5;233m▄[38;5;233;48;5;232m▄[38;5;232;48;5;234m▄[38;5;233;48;5;235m▄[38;5;233;48;5;234m▄[38;5;234;48;5;235m▄[38;5;236;48;5;236m▄[38;5;238;48;5;237m▄[38;5;237;48;5;236m▄[38;5;236;48;5;235m▄[38;5;235;48;5;234m▄[38;5;237;48;5;236m▄[38;5;235;48;5;236m▄[38;5;238;48;5;237m▄[38;5;237;48;5;236m▄[38;5;235;48;5;237m▄[38;5;233;48;5;236m▄[38;5;234;48;5;235m▄[38;5;235;48;5;234m▄[38;5;238;48;5;234m▄[38;5;8;48;5;237m▄[38;5;251;48;5;249m▄[38;5;254;48;5;255m▄▄[38;5;255;48;5;255m▄[38;5;250;48;5;250m▄[38;5;249;48;5;250m▄[38;5;250;48;5;181m▄▄[38;5;181;48;5;181m▄▄▄▄[38;5;187;48;5;181m▄[38;5;187;48;5;187m▄▄▄[m
[38;5;187;48;5;250m▄[38;5;187;48;5;181m▄[38;5;187;48;5;187m▄[38;5;254;48;5;253m▄[38;5;254;48;5;254m▄[38;5;255;48;5;254m▄▄[38;5;254;48;5;254m▄[48;5;187m [38;5;187;48;5;187m▄▄▄▄[38;5;187;48;5;253m▄[38;5;250;48;5;7m▄[38;5;240;48;5;243m▄[38;5;238;48;5;242m▄[38;5;239;48;5;242m▄[38;5;234;48;5;235m▄[38;5;232;48;5;232m▄[38;5;232;48;5;233m▄[38;5;233;48;5;232m▄▄[38;5;232;48;5;232m▄[38;5;232;48;5;233m▄[38;5;232;48;5;235m▄▄[38;5;233;48;5;236m▄[38;5;234;48;5;237m▄[38;5;234;48;5;236m▄[38;5;233;48;5;235m▄[38;5;233;48;5;234m▄[38;5;232;48;5;236m▄[38;5;232;48;5;234m▄[38;5;232;48;5;232m▄[38;5;233;48;5;233m▄[38;5;234;48;5;234m▄[38;5;233;48;5;233m▄[38;5;233;48;5;237m▄[38;5;238;48;5;246m▄[38;5;8;48;5;252m▄[38;5;249;48;5;251m▄[38;5;253;48;5;254m▄[38;5;255;48;5;255m▄[48;5;249m [38;5;249;48;5;249m▄[38;5;250;48;5;250m▄[48;5;250m [38;5;181;48;5;181m▄▄[38;5;187;48;5;181m▄[38;5;187;48;5;187m▄▄[38;5;223;48;5;187m▄[38;5;223;48;5;223m▄▄[m
[38;5;254;48;5;187m▄[38;5;254;48;5;254m▄▄[38;5;255;48;5;254m▄[38;5;255;48;5;255m▄[38;5;230;48;5;255m▄[38;5;255;48;5;255m▄[38;5;254;48;5;254m▄[38;5;187;48;5;187m▄▄▄▄▄▄[38;5;251;48;5;250m▄[38;5;240;48;5;239m▄[38;5;234;48;5;236m▄[38;5;233;48;5;234m▄[38;5;233;48;5;233m▄▄[38;5;232;48;5;233m▄[38;5;234;48;5;237m▄[38;5;234;48;5;234m▄[38;5;236;48;5;59m▄[38;5;233;48;5;234m▄[38;5;232;48;5;232m▄[38;5;233;48;5;232m▄▄[38;5;234;48;5;233m▄[38;5;235;48;5;233m▄[38;5;234;48;5;233m▄[38;5;233;48;5;232m▄[38;5;233;48;5;233m▄[38;5;238;48;5;242m▄[38;5;234;48;5;235m▄[38;5;235;48;5;236m▄[38;5;235;48;5;238m▄[38;5;233;48;5;233m▄[38;5;234;48;5;233m▄[38;5;235;48;5;235m▄[38;5;239;48;5;237m▄[38;5;247;48;5;246m▄[38;5;253;48;5;252m▄[38;5;254;48;5;255m▄[38;5;249;48;5;249m▄▄▄[38;5;250;48;5;250m▄[38;5;181;48;5;181m▄[38;5;187;48;5;181m▄[38;5;187;48;5;187m▄▄[38;5;223;48;5;223m▄▄[38;5;254;48;5;224m▄[38;5;254;48;5;223m▄[m
[38;5;230;48;5;255m▄▄▄▄[38;5;230;48;5;230m▄▄[38;5;255;48;5;230m▄[38;5;255;48;5;254m▄[38;5;254;48;5;187m▄▄▄[38;5;187;48;5;187m▄▄[38;5;254;48;5;187m▄[38;5;188;48;5;251m▄[38;5;245;48;5;242m▄[38;5;236;48;5;235m▄[38;5;233;48;5;233m▄[48;5;233m [38;5;233;48;5;233m▄▄[38;5;234;48;5;233m▄[38;5;233;48;5;233m▄▄[38;5;233;48;5;232m▄[38;5;232;48;5;233m▄[38;5;232;48;5;232m▄▄[38;5;234;48;5;235m▄[38;5;236;48;5;236m▄[38;5;234;48;5;234m▄[38;5;233;48;5;234m▄[38;5;234;48;5;234m▄[38;5;236;48;5;234m▄▄[38;5;235;48;5;235m▄[38;5;236;48;5;234m▄▄[38;5;235;48;5;234m▄[38;5;235;48;5;235m▄[38;5;241;48;5;239m▄[38;5;251;48;5;249m▄[38;5;253;48;5;254m▄[38;5;254;48;5;254m▄[38;5;249;48;5;249m▄▄▄▄[38;5;250;48;5;250m▄[38;5;250;48;5;181m▄[38;5;181;48;5;187m▄[38;5;187;48;5;187m▄▄▄[38;5;187;48;5;223m▄▄[m
[38;5;230;48;5;230m▄▄▄▄▄▄▄[38;5;255;48;5;230m▄[38;5;254;48;5;254m▄▄[38;5;254;48;5;255m▄[38;5;254;48;5;224m▄[38;5;254;48;5;187m▄[38;5;254;48;5;254m▄[38;5;254;48;5;253m▄[38;5;250;48;5;246m▄[38;5;240;48;5;236m▄[38;5;234;48;5;233m▄[38;5;233;48;5;233m▄▄▄▄▄▄▄[38;5;232;48;5;232m▄▄[38;5;233;48;5;233m▄[38;5;235;48;5;235m▄[38;5;235;48;5;237m▄[48;5;235m [38;5;234;48;5;233m▄[38;5;234;48;5;234m▄[38;5;235;48;5;236m▄[38;5;236;48;5;236m▄[38;5;236;48;5;235m▄[38;5;236;48;5;236m▄▄[38;5;235;48;5;235m▄[38;5;236;48;5;236m▄[38;5;8;48;5;59m▄[38;5;188;48;5;7m▄[38;5;255;48;5;254m▄[38;5;252;48;5;188m▄[38;5;249;48;5;249m▄▄▄▄▄[38;5;181;48;5;181m▄▄▄[38;5;187;48;5;187m▄▄▄▄[m
[38;5;230;48;5;230m▄▄▄▄▄▄[38;5;255;48;5;255m▄[38;5;254;48;5;254m▄▄[48;5;253m [38;5;187;48;5;253m▄[38;5;187;48;5;187m▄[38;5;187;48;5;253m▄[38;5;253;48;5;254m▄▄[38;5;7;48;5;251m▄[38;5;243;48;5;243m▄[38;5;235;48;5;234m▄[38;5;232;48;5;233m▄[38;5;232;48;5;232m▄[38;5;232;48;5;233m▄▄[38;5;232;48;5;232m▄[38;5;233;48;5;233m▄[38;5;232;48;5;233m▄[38;5;233;48;5;232m▄▄[48;5;233m [38;5;235;48;5;235m▄[38;5;237;48;5;237m▄[38;5;236;48;5;236m▄[38;5;236;48;5;234m▄[38;5;235;48;5;234m▄[38;5;234;48;5;235m▄▄[38;5;234;48;5;234m▄[38;5;234;48;5;235m▄▄[38;5;237;48;5;236m▄[38;5;239;48;5;238m▄[38;5;246;48;5;246m▄[38;5;253;48;5;253m▄[38;5;255;48;5;255m▄[38;5;7;48;5;251m▄[38;5;249;48;5;249m▄[38;5;145;48;5;249m▄▄[38;5;249;48;5;249m▄▄▄[38;5;181;48;5;181m▄▄[38;5;187;48;5;187m▄▄▄▄[m
[38;5;230;48;5;230m▄▄▄▄▄▄[38;5;230;48;5;255m▄[38;5;254;48;5;255m▄[38;5;254;48;5;254m▄▄[38;5;254;48;5;253m▄[38;5;253;48;5;187m▄[38;5;187;48;5;187m▄▄[38;5;188;48;5;188m▄[38;5;249;48;5;249m▄[38;5;239;48;5;241m▄[38;5;234;48;5;235m▄[38;5;236;48;5;234m▄[38;5;239;48;5;235m▄[38;5;95;48;5;235m▄[38;5;239;48;5;234m▄[38;5;95;48;5;234m▄[38;5;239;48;5;233m▄[38;5;237;48;5;232m▄[38;5;235;48;5;233m▄[38;5;233;48;5;234m▄[38;5;232;48;5;233m▄[38;5;232;48;5;234m▄[38;5;234;48;5;236m▄[38;5;235;48;5;234m▄[38;5;238;48;5;237m▄[38;5;95;48;5;234m▄▄[38;5;144;48;5;238m▄[38;5;181;48;5;240m▄▄[38;5;180;48;5;240m▄[38;5;180;48;5;101m▄[38;5;245;48;5;101m▄[38;5;247;48;5;246m▄[38;5;253;48;5;253m▄[38;5;255;48;5;255m▄[38;5;7;48;5;250m▄[38;5;249;48;5;249m▄▄[38;5;249;48;5;145m▄[38;5;249;48;5;249m▄▄▄▄[38;5;181;48;5;181m▄▄[38;5;187;48;5;187m▄▄▄[m
[38;5;230;48;5;230m▄▄▄▄▄[48;5;230m [38;5;255;48;5;255m▄[38;5;254;48;5;254m▄▄[48;5;254m [38;5;254;48;5;254m▄[38;5;254;48;5;253m▄[38;5;253;48;5;253m▄[38;5;187;48;5;187m▄[38;5;188;48;5;188m▄[38;5;250;48;5;249m▄[38;5;59;48;5;240m▄[38;5;234;48;5;235m▄[38;5;233;48;5;235m▄[38;5;237;48;5;238m▄[38;5;95;48;5;95m▄▄[38;5;95;48;5;137m▄▄[38;5;95;48;5;131m▄[38;5;95;48;5;238m▄[38;5;95;48;5;236m▄▄[38;5;137;48;5;238m▄[38;5;138;48;5;95m▄▄[38;5;137;48;5;137m▄[38;5;174;48;5;180m▄[38;5;180;48;5;180m▄[38;5;180;48;5;181m▄[38;5;181;48;5;181m▄▄[38;5;181;48;5;180m▄[38;5;137;48;5;180m▄[38;5;95;48;5;8m▄[38;5;243;48;5;242m▄[38;5;7;48;5;251m▄[38;5;254;48;5;255m▄[38;5;181;48;5;250m▄[38;5;249;48;5;249m▄▄▄▄▄[38;5;181;48;5;249m▄[38;5;181;48;5;181m▄▄▄[38;5;187;48;5;187m▄▄▄[m
[38;5;230;48;5;255m▄[38;5;230;48;5;230m▄▄▄▄[38;5;255;48;5;255m▄[38;5;255;48;5;230m▄[48;5;254m [38;5;254;48;5;254m▄▄▄[38;5;253;48;5;253m▄▄[38;5;254;48;5;253m▄▄[38;5;7;48;5;251m▄[38;5;240;48;5;241m▄[38;5;235;48;5;235m▄[38;5;234;48;5;234m▄[38;5;237;48;5;238m▄[38;5;239;48;5;239m▄[38;5;239;48;5;95m▄▄[38;5;95;48;5;95m▄[38;5;237;48;5;95m▄[38;5;236;48;5;95m▄[38;5;234;48;5;95m▄[38;5;52;48;5;137m▄[38;5;52;48;5;174m▄[38;5;236;48;5;174m▄▄[38;5;237;48;5;180m▄[38;5;137;48;5;180m▄▄[38;5;138;48;5;180m▄[38;5;180;48;5;180m▄▄[38;5;181;48;5;180m▄[38;5;245;48;5;138m▄[38;5;242;48;5;243m▄[38;5;247;48;5;247m▄[38;5;251;48;5;251m▄[38;5;255;48;5;254m▄[38;5;251;48;5;7m▄[38;5;181;48;5;181m▄[38;5;181;48;5;249m▄[38;5;181;48;5;181m▄▄[38;5;181;48;5;249m▄[38;5;181;48;5;181m▄▄▄▄[38;5;187;48;5;187m▄▄▄[m
[38;5;230;48;5;230m▄▄▄▄[48;5;230m [38;5;255;48;5;255m▄[38;5;230;48;5;255m▄[38;5;255;48;5;255m▄[38;5;254;48;5;254m▄▄▄▄▄[38;5;254;48;5;253m▄[38;5;254;48;5;254m▄[38;5;145;48;5;250m▄[38;5;238;48;5;240m▄[38;5;237;48;5;236m▄[38;5;237;48;5;237m▄[38;5;234;48;5;238m▄[38;5;237;48;5;239m▄[38;5;95;48;5;95m▄[38;5;95;48;5;131m▄[38;5;95;48;5;95m▄[38;5;238;48;5;238m▄[38;5;237;48;5;238m▄[38;5;239;48;5;95m▄[38;5;95;48;5;137m▄[38;5;95;48;5;174m▄[38;5;95;48;5;180m▄[38;5;137;48;5;180m▄▄[38;5;137;48;5;174m▄▄[38;5;138;48;5;137m▄[38;5;137;48;5;180m▄[38;5;180;48;5;180m▄[38;5;138;48;5;181m▄[38;5;238;48;5;246m▄[38;5;245;48;5;243m▄[38;5;249;48;5;248m▄[38;5;247;48;5;145m▄[38;5;254;48;5;254m▄[38;5;187;48;5;187m▄[38;5;187;48;5;181m▄[38;5;181;48;5;181m▄▄▄▄[48;5;181m [38;5;181;48;5;181m▄▄▄[38;5;187;48;5;181m▄[38;5;187;48;5;187m▄▄[m
[38;5;230;48;5;230m▄▄▄▄▄▄▄[38;5;255;48;5;255m▄[38;5;254;48;5;255m▄[38;5;255;48;5;254m▄▄[38;5;254;48;5;254m▄▄[38;5;255;48;5;254m▄[38;5;254;48;5;254m▄[38;5;248;48;5;145m▄[38;5;239;48;5;239m▄[38;5;236;48;5;236m▄[38;5;235;48;5;236m▄[38;5;233;48;5;234m▄[38;5;233;48;5;236m▄[38;5;236;48;5;238m▄[38;5;239;48;5;95m▄[38;5;95;48;5;95m▄▄▄▄▄[38;5;137;48;5;95m▄[38;5;137;48;5;131m▄[38;5;137;48;5;137m▄[38;5;138;48;5;137m▄▄▄[38;5;138;48;5;138m▄[38;5;138;48;5;137m▄[38;5;95;48;5;138m▄[38;5;234;48;5;8m▄[38;5;236;48;5;237m▄[38;5;243;48;5;8m▄[38;5;250;48;5;250m▄[38;5;251;48;5;247m▄[38;5;251;48;5;254m▄[38;5;254;48;5;188m▄[38;5;187;48;5;187m▄[38;5;187;48;5;181m▄▄[38;5;181;48;5;181m▄▄▄▄▄▄[38;5;187;48;5;187m▄▄▄[m
[38;5;230;48;5;230m▄▄[48;5;230m [38;5;230;48;5;230m▄▄▄[38;5;255;48;5;230m▄[38;5;255;48;5;255m▄▄▄[38;5;230;48;5;255m▄[38;5;255;48;5;255m▄[38;5;255;48;5;254m▄[38;5;255;48;5;255m▄[38;5;252;48;5;253m▄[38;5;242;48;5;246m▄[38;5;236;48;5;239m▄[38;5;235;48;5;235m▄[38;5;233;48;5;234m▄[38;5;233;48;5;233m▄[38;5;232;48;5;233m▄[38;5;232;48;5;234m▄[38;5;235;48;5;238m▄[38;5;237;48;5;239m▄▄[38;5;240;48;5;95m▄[38;5;95;48;5;95m▄[38;5;138;48;5;137m▄[38;5;138;48;5;138m▄[38;5;138;48;5;180m▄[38;5;180;48;5;174m▄[38;5;138;48;5;138m▄▄[38;5;137;48;5;138m▄[38;5;137;48;5;137m▄[38;5;239;48;5;137m▄[38;5;234;48;5;238m▄[38;5;234;48;5;234m▄▄[38;5;237;48;5;239m▄[38;5;242;48;5;145m▄[38;5;59;48;5;145m▄[38;5;243;48;5;8m▄[38;5;254;48;5;254m▄[38;5;187;48;5;187m▄▄▄▄[38;5;187;48;5;181m▄[38;5;181;48;5;181m▄▄▄[38;5;187;48;5;187m▄▄▄▄[m
[38;5;230;48;5;230m▄[38;5;255;48;5;230m▄▄[38;5;230;48;5;230m▄[38;5;255;48;5;230m▄▄[38;5;255;48;5;255m▄▄▄[38;5;251;48;5;255m▄[38;5;8;48;5;255m▄[38;5;241;48;5;255m▄[38;5;59;48;5;187m▄[38;5;239;48;5;249m▄[38;5;235;48;5;243m▄[38;5;233;48;5;237m▄[38;5;233;48;5;233m▄▄[38;5;232;48;5;232m▄▄▄▄[38;5;232;48;5;233m▄[38;5;233;48;5;236m▄[38;5;235;48;5;236m▄[38;5;237;48;5;238m▄[38;5;240;48;5;95m▄[38;5;101;48;5;137m▄[38;5;137;48;5;137m▄[38;5;131;48;5;137m▄[38;5;137;48;5;138m▄[38;5;138;48;5;138m▄[38;5;101;48;5;138m▄[38;5;95;48;5;137m▄[38;5;235;48;5;95m▄[38;5;233;48;5;234m▄▄[38;5;232;48;5;233m▄▄[38;5;233;48;5;235m▄[38;5;234;48;5;235m▄[38;5;235;48;5;236m▄[38;5;237;48;5;241m▄[38;5;247;48;5;253m▄[38;5;7;48;5;187m▄[38;5;145;48;5;187m▄[38;5;187;48;5;187m▄▄▄▄[38;5;187;48;5;181m▄[38;5;181;48;5;181m▄▄[38;5;181;48;5;187m▄[38;5;187;48;5;187m▄▄[m
[38;5;230;48;5;255m▄▄[38;5;255;48;5;230m▄[38;5;255;48;5;255m▄[38;5;254;48;5;255m▄[38;5;249;48;5;255m▄[38;5;243;48;5;188m▄[38;5;239;48;5;246m▄[38;5;236;48;5;241m▄[38;5;235;48;5;238m▄[38;5;234;48;5;234m▄[38;5;233;48;5;233m▄▄[38;5;233;48;5;234m▄[38;5;233;48;5;233m▄[38;5;232;48;5;233m▄[38;5;232;48;5;232m▄[38;5;232;48;5;233m▄[48;5;233m [38;5;232;48;5;232m▄▄[38;5;232;48;5;0m▄[38;5;232;48;5;232m▄[38;5;0;48;5;0m▄[38;5;0;48;5;232m▄[38;5;232;48;5;235m▄[38;5;233;48;5;239m▄[38;5;234;48;5;95m▄▄[38;5;235;48;5;95m▄▄[38;5;234;48;5;95m▄[38;5;232;48;5;236m▄[38;5;232;48;5;235m▄[38;5;232;48;5;232m▄▄▄▄▄[38;5;233;48;5;233m▄[38;5;235;48;5;234m▄[38;5;235;48;5;235m▄[38;5;234;48;5;235m▄[38;5;234;48;5;238m▄[38;5;59;48;5;248m▄[38;5;236;48;5;240m▄[38;5;237;48;5;101m▄[38;5;239;48;5;138m▄[38;5;95;48;5;187m▄[38;5;144;48;5;187m▄[38;5;181;48;5;187m▄[38;5;187;48;5;181m▄▄[38;5;187;48;5;187m▄▄▄[m
[38;5;59;48;5;255m▄[38;5;236;48;5;253m▄[38;5;235;48;5;242m▄[38;5;235;48;5;239m▄[38;5;235;48;5;238m▄[38;5;235;48;5;236m▄[38;5;235;48;5;235m▄[38;5;234;48;5;234m▄▄[38;5;233;48;5;234m▄[38;5;233;48;5;233m▄▄▄[38;5;232;48;5;232m▄▄▄▄▄▄▄▄▄▄▄▄▄▄[38;5;233;48;5;232m▄▄[38;5;233;48;5;233m▄▄▄[38;5;233;48;5;232m▄▄[48;5;233m [38;5;233;48;5;232m▄[38;5;233;48;5;233m▄▄▄[38;5;235;48;5;233m▄[38;5;235;48;5;235m▄[38;5;234;48;5;234m▄[38;5;233;48;5;234m▄[38;5;234;48;5;234m▄[38;5;234;48;5;235m▄[38;5;234;48;5;234m▄[38;5;234;48;5;235m▄[38;5;235;48;5;237m▄[38;5;236;48;5;238m▄[38;5;237;48;5;239m▄[38;5;238;48;5;95m▄[38;5;240;48;5;144m▄[38;5;242;48;5;187m▄[38;5;187;48;5;187m▄▄▄[m
[38;5;235;48;5;238m▄[38;5;234;48;5;235m▄[38;5;234;48;5;234m▄▄▄▄▄[38;5;234;48;5;233m▄▄[38;5;234;48;5;234m▄[38;5;234;48;5;233m▄[38;5;233;48;5;233m▄▄▄[38;5;233;48;5;232m▄[38;5;232;48;5;233m▄[38;5;232;48;5;232m▄[48;5;232m [38;5;232;48;5;232m▄▄▄▄▄▄▄▄[48;5;232m [38;5;232;48;5;232m▄[38;5;232;48;5;233m▄[38;5;233;48;5;233m▄▄[38;5;232;48;5;233m▄[48;5;232m [38;5;233;48;5;233m▄▄▄▄[38;5;234;48;5;233m▄[38;5;234;48;5;234m▄[38;5;234;48;5;235m▄[38;5;233;48;5;234m▄[38;5;233;48;5;233m▄[38;5;234;48;5;233m▄[38;5;233;48;5;233m▄▄[38;5;233;48;5;234m▄[38;5;234;48;5;234m▄▄[38;5;234;48;5;235m▄▄[38;5;235;48;5;236m▄[38;5;235;48;5;237m▄[38;5;236;48;5;238m▄[38;5;236;48;5;239m▄[38;5;237;48;5;246m▄[38;5;238;48;5;188m▄[m
[38;5;234;48;5;234m▄▄▄[38;5;234;48;5;235m▄[38;5;234;48;5;234m▄▄▄▄▄▄[38;5;233;48;5;234m▄[38;5;233;48;5;233m▄[48;5;233m [38;5;233;48;5;233m▄[48;5;233m [38;5;232;48;5;232m▄[38;5;233;48;5;232m▄▄▄[38;5;232;48;5;232m▄[48;5;232m [38;5;232;48;5;232m▄▄▄▄▄▄▄▄▄[38;5;233;48;5;232m▄[38;5;233;48;5;233m▄▄[38;5;233;48;5;234m▄[38;5;233;48;5;233m▄▄[38;5;234;48;5;234m▄[38;5;234;48;5;235m▄▄[38;5;233;48;5;234m▄[38;5;233;48;5;233m▄[48;5;233m [38;5;233;48;5;234m▄▄[38;5;234;48;5;234m▄[38;5;234;48;5;233m▄[38;5;233;48;5;233m▄[38;5;234;48;5;233m▄[38;5;234;48;5;234m▄▄▄▄[38;5;234;48;5;235m▄▄▄▄[m
[38;5;235;48;5;234m▄[38;5;234;48;5;234m▄▄▄▄▄▄▄▄▄▄[38;5;233;48;5;233m▄▄▄▄▄▄▄▄[38;5;233;48;5;232m▄▄[48;5;232m [48;5;233m [38;5;233;48;5;233m▄▄▄▄▄▄▄▄[48;5;233m [38;5;233;48;5;233m▄[48;5;233m [38;5;233;48;5;233m▄[48;5;234m [38;5;233;48;5;234m▄▄[48;5;233m [38;5;233;48;5;233m▄[38;5;234;48;5;233m▄▄[38;5;233;48;5;233m▄[48;5;233m [38;5;233;48;5;233m▄▄▄[38;5;234;48;5;234m▄▄▄[38;5;235;48;5;234m▄[38;5;236;48;5;233m▄[38;5;237;48;5;235m▄[38;5;236;48;5;235m▄[38;5;236;48;5;236m▄▄[m
[38;5;234;48;5;233m▄[38;5;234;48;5;234m▄[38;5;234;48;5;235m▄[38;5;233;48;5;235m▄[38;5;234;48;5;234m▄[38;5;235;48;5;235m▄[38;5;235;48;5;234m▄[38;5;234;48;5;234m▄▄▄▄[38;5;233;48;5;233m▄[38;5;234;48;5;234m▄▄▄[38;5;234;48;5;233m▄▄[38;5;233;48;5;233m▄[38;5;232;48;5;233m▄[48;5;233m  [38;5;233;48;5;233m▄[38;5;233;48;5;232m▄▄[38;5;233;48;5;233m▄▄[48;5;233m [38;5;233;48;5;233m▄▄▄▄▄▄▄[38;5;233;48;5;234m▄[38;5;233;48;5;233m▄▄▄▄[38;5;233;48;5;234m▄▄▄[38;5;233;48;5;233m▄▄[38;5;234;48;5;233m▄[38;5;237;48;5;233m▄[38;5;236;48;5;234m▄[38;5;236;48;5;236m▄▄[38;5;236;48;5;235m▄[38;5;236;48;5;236m▄[38;5;235;48;5;237m▄[38;5;235;48;5;236m▄[38;5;234;48;5;235m▄▄▄[m
[38;5;236;48;5;235m▄[38;5;235;48;5;235m▄[38;5;237;48;5;236m▄[38;5;237;48;5;235m▄[38;5;238;48;5;236m▄[38;5;236;48;5;234m▄[38;5;237;48;5;233m▄[38;5;234;48;5;234m▄[38;5;233;48;5;234m▄[38;5;233;48;5;235m▄▄[38;5;234;48;5;234m▄▄▄[38;5;235;48;5;235m▄[48;5;235m [38;5;235;48;5;235m▄▄[38;5;235;48;5;234m▄[38;5;235;48;5;233m▄▄[38;5;234;48;5;233m▄[38;5;233;48;5;233m▄▄▄▄[38;5;234;48;5;233m▄[38;5;235;48;5;234m▄[38;5;234;48;5;234m▄▄[38;5;234;48;5;233m▄[38;5;235;48;5;234m▄▄[38;5;234;48;5;234m▄[38;5;234;48;5;233m▄[48;5;233m [38;5;233;48;5;233m▄▄▄[38;5;234;48;5;233m▄[38;5;238;48;5;233m▄[38;5;240;48;5;233m▄[38;5;239;48;5;237m▄[38;5;238;48;5;238m▄[38;5;238;48;5;237m▄[38;5;237;48;5;238m▄[38;5;235;48;5;237m▄[38;5;235;48;5;236m▄[38;5;234;48;5;236m▄[38;5;234;48;5;234m▄[38;5;235;48;5;234m▄▄[38;5;236;48;5;234m▄▄[38;5;236;48;5;235m▄[38;5;235;48;5;235m▄[m\
`,
	skelingtonWar: `[37m[40m                                 [m
[37m[40m              [90m[40m####[37m[40m               [m
[37m[40m            [90m[40m/##[37m[40m   [90m[40m###[37m[40m [90m[40m\\[37m[40m         [m
[37m[40m        [90m[40m///##[37m[40m      [90m[40m▒#[37m[40m  [90m[40m\[37m[40m         [m
[37m[40m       [90m[40m//#[37m[40m          [90m[40m▒#[37m[40m [90m[40m\\\\[37m[40m      [m
[37m[40m      [90m[40m//[37m[40m        [97m[40m▲[37m[40m    [90m[40m▒▒#[37m[40m  [90m[40m\\[37m[40m     [m
[37m[40m    [90m[40m///#[37m[40m        [97m[40m║[37m[40m      [90m[40m▒▒#[37m[40m [90m[40m\\\[37m[40m   [m
[37m[40m   [90m[40m//[37m[40m [90m[40m#[37m[40m      _[31m[40m♦[37m[40m ║        [90m[40m▒▒#[37m[40m [90m[40m\\[37m[40m  [m
[37m[40m   [90m[40m/[37m[40m        [97m[43m▀[37m[40m░[97m[40m≡/[33m[40m↓[37m[40m          [90m[40m▒[37m[40m  [90m[40m\[37m[40m  [m
[37m[40m   [90m[40m/[37m[40m        [33m[40m▀[90m[40m▓[97m[40mÇ[37m[40m        [93m[40m⌂⌂[37m[40m  [90m[40m▒[37m[40m  [90m[40m\[37m[40m  [m
[37m[40m   [90m[40m/[37m[40m [90m[40m▒[37m[40m       [97m[40m││[37m[40m      [93m[40m⌂⌂⌂⌂⌂[37m[40m  [90m[40m▒[37m[40m [90m[40m\[37m[40m  [m
[37m[40m                                 [m\
`,
	skelington: `\
[37m[40m                                  [m
[37m[40m              [90m[40m####[37m[40m                [m
[37m[40m            [90m[40m/##[37m[40m   [90m[40m###[37m[40m [90m[40m\\[37m[40m          [m
[37m[40m        [90m[40m///##[37m[40m      [90m[40m▒#[37m[40m  [90m[40m\[37m[40m          [m
[37m[40m       [90m[40m//#[37m[40m          [90m[40m▒#[37m[40m [90m[40m\\\\[37m[40m       [m
[37m[40m      [90m[40m//[37m[40m             [90m[40m▒▒#[37m[40m  [90m[40m\\[37m[40m      [m
[37m[40m    [90m[40m///#[37m[40m        [97m[40m↑[37m[40m      [90m[40m▒▒#[37m[40m [90m[40m\\\[37m[40m    [m
[37m[40m   [90m[40m//[37m[40m [90m[40m#[37m[40m      [30m[40m░[31m[40m♦[37m[40m │        [90m[40m▒▒#[37m[40m [90m[40m\\[37m[40m   [m
[37m[40m   [90m[40m/[37m[40m        [97m[40m│≡≡/[33m[40m↓[37m[40m          [90m[40m▒[37m[40m  [90m[40m\[37m[40m   [m
[37m[40m   [90m[40m/[37m[40m         [90m[40m▓[97m[40mÇ[37m[40m        [93m[40m⌂⌂[37m[40m  [90m[40m▒[37m[40m  [90m[40m\[37m[40m   [m
[37m[40m   [90m[40m/[37m[40m [90m[40m▒[37m[40m       [97m[40m││[37m[40m      [93m[40m⌂⌂⌂⌂⌂[37m[40m  [90m[40m▒[37m[40m [90m[40m\[37m[40m   [m
[37m[40m                                  [m\
`,
	...GenericEnemiesArt //superset of all art and custom per creature art
})
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
export const monsters = Object.freeze({
	gobo: new monster({
		name: "goblin",
		hitDie: 1,
		ac: 8,
		morale: 6,
		weapon: "pointy stick",
		dmgDie: 4,
		aggro: 7,
		rarity: 1,
		art: enemiesArt.gobo
	}),
	goboNice: new monster({
		name: "friendly goblin",
		hitDie: 1,
		ac: 8,
		morale: 6,
		weapon: "pointy stick",
		dmgDie: 4,
		aggro: 0,
		rarity: 1,
		art: enemiesArt.gobo
	}),
	skelington: new monster({
		name: "skeleton",
		hitDie: 1,
		ac: 10,
		morale: 12,
		weapon: "rusty sword",
		dmgDie: 4,
		aggro: 12,
		rarity: 1,
		art: enemiesArt.skelington
	}),
	chook: new monster({
		name: "zelda chicken",
		hitDie: 1,
		ac: 12,
		morale: 5,
		weapon: "wattles",
		dmgDie: 4,
		aggro: 10,
		rarity: 1,
		art: enemiesArt.chicken
	}),
	undergraduate: new monster({
		name: "undergraduate",
		hitDie: 1,
		ac: 10,
		morale: 6,
		weapon: "textbook",
		dmgDie: 4,
		aggro: 7,
		rarity: 1,
		art: enemiesArt.computerman //temp
	}),
	bandit: new monster({
		name: "disguised bandit",
		hitDie: 1,
		ac: 10,
		morale: 6,
		weapon: "pig sticker",
		dmgDie: 4,
		aggro: 7,
		rarity: 1,
		art: enemiesArt.genericHumaniod
	}),
	rat: new monster({
		name: "skeever",
		hitDie: 1,
		ac: 10,
		morale: 5,
		weapon: "yellow teeth",
		dmgDie: 4,
		aggro: 9,
		rarity: 1,
	}),
	batman: new monster({
		name: "batman",
		hitDie: 2,
		ac: 12,
		morale: 5,
		weapon: "NA NA NA NA NA NA NA NA NA NA ... BATMAN!",
		dmgDie: 6,
		aggro: 7,
		rarity: 1,
		art: enemiesArt.batman
	}),
	guard: new monster({
		name: "guard",
		hitDie: 2,
		ac: 12,
		morale: 3,
		weapon: "sword",
		dmgDie: 2,
		aggro: 7,
		rarity: 1,
		art: enemiesArt.guard
	}),
	frenlyguard: new monster({
		name: "friendly guard",
		hitDie: 2,
		ac: 12,
		morale: 3,
		weapon: "sword",
		dmgDie: 2,
		aggro: 0,
		rarity: 1,
		art: enemiesArt.guard
	}),
	SkyrimNerd: new monster({
		name: "nerd",
		hitDie: 1,
		ac: 10,
		morale: 1,
		weapon: "fus ro dah",
		dmgDie: 4,
		aggro: 7,
		rarity: 0.4,
		art: enemiesArt.computerman
	}),
	redditNerd: new monster({
		name: "reddit neckbeard",
		hitDie: 1,
		ac: 10,
		morale: 1,
		weapon: "aggresive downvoting",
		dmgDie: 4,
		aggro: 7,
		rarity: .2,
		art: enemiesArt.computerman
	}),
	weeb: new monster({
		name: "weeb",
		hitDie: 1,
		ac: 6,
		morale: 12,
		weapon: "body pillow",
		dmgDie: 10,
		aggro: 12,
		rarity: 0.2,
		art: enemiesArt.computerman
	}),
	imp: new monster({
		name: "imp",
		hitDie: 2,
		ac: 12,
		morale: 5,
		weapon: "firebolt",
		dmgDie: 6,
		aggro: 9,
		rarity: 1,
	}),
	spooder: new monster({
		name: "spooder",
		hitDie: 2,
		ac: 12,
		morale: 5,
		weapon: "bite",
		dmgDie: 6,
		aggro: 9,
		rarity: 1,
	}),
	giantbirb: new monster({
		name: "giantbirb",
		hitDie: 2,
		ac: 8,
		morale: 5,
		weapon: "beak",
		dmgDie: 8,
		aggro: 10,
		rarity: 1,
		art: enemiesArt.chicken //temp
	}),
	zambie: new monster({
		name: "zombie",
		hitDie: 2,
		ac: 8,
		morale: 12,
		weapon: "bite",
		dmgDie: 4,
		aggro: 12,
		rarity: 1,
	}),
	fundie: new monster({
		name: "fundie",
		hitDie: 2,
		ac: 10,
		morale: 9,
		weapon: "bible",
		dmgDie: 2,
		aggro: 9,
		rarity: 1,
	}),
	riodedfundie: new monster({
		name: "enraged fundie",
		hitDie: 2,
		ac: 10,
		morale: 9,
		weapon: "spiked lead bible",
		dmgDie: 10,
		aggro: 12,
		rarity: 1,
	}),
	blacksmith: new monster({
		name: "blacksmith",
		hitDie: 2,
		ac: 10,
		morale: 9,
		weapon: "steel hammer",
		dmgDie: 4,
		aggro: 0,
		rarity: 0.5,
	}),
	familyman: new monster({
		name: "family man",
		hitDie: 2,
		ac: 10,
		morale: 7,
		weapon: "parental guidance",
		dmgDie: 6,
		aggro: 4,
		rarity: 0.5,
	}),
	divorcedFather: new monster({
		name: "divorced father",
		hitDie: 2,
		ac: 4,
		morale: 4,
		weapon: "child support payments",
		dmgDie: 10,
		aggro: 4,
		rarity: 0.5,
	}),
	phdStudent: new monster({
		name: "dumb phd student",
		hitDie: 2,
		ac: 10,
		morale: 10,
		weapon: "crippling student debt",
		dmgDie: 8,
		aggro: 4,
		rarity: 0.5,
		art: enemiesArt.computerman //temp
	}),
	smartPdgStudent: new monster({
		name: "phd student",
		hitDie: 2,
		ac: 10,
		morale: 10,
		weapon: "thesis",
		dmgDie: 4,
		aggro: 5,
		rarity: 0.5,
		art: enemiesArt.computerman //temp
	}),
	skelingtonWarrior: new monster({
		name: "skeleton warrior",
		hitDie: 2,
		ac: 12,
		morale: 12,
		weapon: "sabre",
		dmgDie: 6,
		aggro: 12,
		rarity: 1,
		art: enemiesArt.skelingtonWar 
	}),
})
const enemyArray = Object.values(monsters)
const enemyRarity = enemyArray.map((enemy) => {
	return enemy.rarity
})
//alias 
export function pickEnemy() {
	return _.cloneDeep(pickRandom(enemyArray, enemyRarity))
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

*/
const genericEnemyNames = Object.freeze([
	"lurker",
	""
])
//               make
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
	'mean-spirited',
	'kind-hearted',
	'fierce',
	'fearless',
	'fearful',
	'frightened',
	'extraverted',
	'introverted',
	'humble',
	'arrogant',
	'brave',
	'cowardly',
	'courageous',
	'melancholy',
	'demonic',
	'angelic',
	'politically active',
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
	'inbecilic',
	'insane',
	'insipid',
	'insufferable',
	'irritating',
	'irresponsible',
	'irresolute',
	'irreverent',
	'irrepressible',
	'irreproachable',
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
	'zealous',
	'devout',
	'faithful',
	'pious',
	'god-fearing',
	'godless',
	'godly',
	'godlike',
	'agnostic',
	'heathenous',
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
	"walk",
	"sprint",
	"worm",
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
	"caverns",
	"ravines",
	"crumbling stone buildings",
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
	"playing 4d chess",
	"contemplating the meaning of life and 42",
	"playing a game of solitaire",
	"solving poverty",
	"creating world peace",
	"solving the climate crisis",
	"eating a sandwich",
	"eating a burrito",
	"drinking tequila shots",
	"writing a novel",
	"drinking a beer",
	"playing russian roulette",
	"playing russian roulette with a fully loaded gun",
	"contemplating the meaning of letuce and how this relates to prime ministers",
	"eating raw pork",
	"playing the fiddle",
	"daydreaming",
	"wilting",
	"dancing",
	"dining",
	"painting a work of art",
	"painting a masterpiece",
	"handing out pamphlets",
	"handing out flyers",
	"handing out leaflets",
	"advertising fraudeulent products",
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
	"contemplating",
	"waiting",
	"siting",
	"standing guard",
	"monologing",
	"brooding",
	"hiding",
	"looming",
	"snoozing",
])
const throughAlt = Object.freeze([
	"through",
	"along",
	"past",
	"between"
])
const roomWords = Object.freeze([
	"room",
	"area",
	"chamber",
])
const blockingWords = Object.freeze([
	"obstructing your path",
	"blocking your way",
	"blocking the way forwards",
	"blocking the door ahead",
])
//horrible code
function pickEnemyVerb() {
	return monsterRandom.pickone(verbOpts)
}
function pickPathName() {
	return monsterRandom.pickone(pathName)
}
function pickMoveWord() {
	return monsterRandom.pickone(moveWord)
}
function pickEnemyAdjective() {
	return monsterRandom.pickone(enemyAdjective)
}
function pickThroughAlt() {
	return monsterRandom.pickone(throughAlt)
}
function pickRoomWord() {
	return monsterRandom.pickone(roomWords)
}
function pickBlockingWords() {
	return monsterRandom.pickone(blockingWords)
}
export function makeRoomText(monster) {
	let roomText =
		`\
you attempt to ${pickMoveWord()} your way ${pickThroughAlt()} the ${pickPathName()} to get to the next ${pickRoomWord()}.    
A ${pickEnemyAdjective()} ${monster.name} is ${pickEnemyVerb()} here... ${pickBlockingWords()}.
Choose your next move.\
`
	return roomText
}





/*
   ▄▄▄▄███▄▄▄▄    ▄█     ▄████████  ▄████████         ▄████████    ▄████████     ███     
 ▄██▀▀▀███▀▀▀██▄ ███    ███    ███ ███    ███        ███    ███   ███    ███ ▀█████████▄ 
 ███   ███   ███ ███▌   ███    █▀  ███    █▀         ███    ███   ███    ███    ▀███▀▀██ 
 ███   ███   ███ ███▌   ███        ███               ███    ███  ▄███▄▄▄▄██▀     ███   ▀ 
 ███   ███   ███ ███▌ ▀███████████ ███             ▀███████████ ▀▀███▀▀▀▀▀       ███     
 ███   ███   ███ ███           ███ ███    █▄         ███    ███ ▀███████████     ███     
 ███   ███   ███ ███     ▄█    ███ ███    ███        ███    ███   ███    ███     ███     
  ▀█   ███   █▀  █▀    ▄████████▀  ████████▀         ███    █▀    ███    ███    ▄████▀   
                                                                  ███    ███             
*/


export const miscArt=Object.freeze({
	potion: 
`\
 [33m[40m{▄}[m
 [97m[40m█${chalk.hex('ff2d57')('█')}[97m[40m█[m
 [37m[40m [97m[40m▀[37m[40m [m\
`
,
})


































//
//
//
//
// Not urgent but eventually make functions to generate boxes that work with escape sequences
// currently a pain coz strin.length includes esc sequences and you need to make a copy with out escapes
// using a regex




export const border =
	`\
╭╼────────────────────────╾╮
│                          │
│                          │
│                          │
│                          │
│                          │
╰╼────────────────────────╾╯
`

//shorthand for replacing escape sequences
Object.defineProperty(String.prototype, 'cleanANSI', {
    value() {
        return this.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,'')
    }
});

function centerText(text, width) {
    let pad = Math.floor((width - text.cleanANSI().length) / 2);
    return (' '.repeat(pad) + text);
}
export function dynamicBox(text='', width=20, center=false,gradientFunction=gradient.pastel, vertLn='36454f') {
	let str = text
	let lines = str.split('\n');
    if(center) {
        lines=lines.map(line => centerText(line, width))
    }
    let max = lines.reduce((a, b) => a.cleanANSI().length > b.cleanANSI().length ? a : b, '').cleanANSI().length;
    //console.log(lines.reduce((a, b) => a.cleanANSI().length > b.cleanANSI().length ? a : b, '')+`${max}`)
    assert(max<=width,"STRING TO WIDE FOR THE GIVEN WIDTH OF THE BOX")
    max+=(width-max)
    //console.log(max)
    lines = lines.map((line, ind) => {
		var diff = max - line.cleanANSI().length;
		if (ind === 1) {
			// console.log(line)
			// console.log(chalk.hex(vertLn)('│') + line + ' '.repeat(diff) + chalk.hex(vertLn)('│'))
		}
		return chalk.hex(vertLn)('│') + line + ' '.repeat(diff) + chalk.hex(vertLn)('│');
	})
    let top,bot;
    if(!gradientFunction){
        top = chalk.hex(vertLn)('╭')+'╾' + '─'.repeat(lines[0].cleanANSI().length - 4) + '╼'+chalk.hex(vertLn)('╮');
        bot = chalk.hex(vertLn)('╰')+'╾' + '─'.repeat(lines[0].cleanANSI().length - 4) + '╼'+chalk.hex(vertLn)('╯');
    }else{
        top = chalk.hex(vertLn)('╭')+ gradientFunction('╾' + '─'.repeat(lines[0].cleanANSI().length - 4) + '╼') + chalk.hex(vertLn)('╮');
        bot = chalk.hex(vertLn)('╰')+ gradientFunction('╾' + '─'.repeat(lines[0].cleanANSI().length - 4) + '╼') + chalk.hex(vertLn)('╯');
    }
	let res = top + '\n' +
		lines.join('\n') + '\n' +
		bot;
	return (res)
}

export function escLeftByNum(num) {
	return `[${num}D`
}

export function escRightByNum(num) {
	return `[${num}C`
}

export function escUpByNum(num) {
	return `[${num}A`
}

export function escDownByNum(num) {
	return `[${num}B`
}