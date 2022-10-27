import chalk from "chalk"
import _ from "lodash";
export class GlobalMetrics {
	constructor() {
		this.avgHitRate = 0
		this.avgDmgPerTurn = 0
		this.totalDmgDealt = 0
		this.totatDmgTaken = 0
		this.PotionsUsed = 0
		this.ScrollsUsed = 0
	}
	addMetrics(metric) {}
}
export class combatMetrics{
	constructor() {
		this.HitMissArray = [] //hitmiss array
		this.TurnDamageArray = [] //turn damage array,  USE FOR TOTAL DAMAGE DEALT AND DAMAGE AVERAGE
		this.damageTaken = 0 //dmg taken
		this.potionUses = 0 //potions
		this.scrollUses = 0 //scrolls
		this.flaskOilUses = 0 //flask oil
		this.turn = 0 //turn
		this.enemy = null
		this.enemyName = ""
		this.peacefullClr = false
	}
	calculateHitMissAVG() {
		//console.assert(Number.isInteger(_.sum(this.HitMissArray)), "SHit")
		return ((_.sum(this.HitMissArray) / this.HitMissArray.length).toFixed(3))
	}
	calculateTurnDmgAVG() {
		if (this.turn !== 0) {
			return (_.sum(this.TurnDamageArray) / this.turn).toFixed(3)
		} else {
			return (_.sum(this.TurnDamageArray)).toFixed(3)
		}
	}
	returnDamageTaken() {
		return this.damageTaken
	}
	returnDamageDealt() {
		return _.sum(this.TurnDamageArray)
	}
	attackHitMiss(bool) {
		let temp = 0
		if (bool) {
			temp = 1
		}
		this.HitMissArray.push(temp)
	}
	addTurnDamage(dmg) {
		console.assert(Number.isInteger(dmg), chalk.red("FUCCCKKKKKK"))
		this.TurnDamageArray.push(dmg)
	}
	addDamageTaken(dmg) {
		console.assert(Number.isInteger(dmg), chalk.red("FUCCCKKKKKK"))
		this.damageTaken += dmg
	}
	addPotionUse() {
		this.potionUses++
	}
	addScrollUse() {
		this.scrollUses++
	}
	addFlaskOilUse() {
		this.flaskOilUses++
	}
	mergeIntoGlobal(global) {
		global.addMetrics(this);
		this.clear()
	}
	clear() {}
	getData() {}
}
// `\
// ╭╼────────────────────────────────────────────╾╮
// │   ${gradient.instagram("MonsterName")} ${chalk.blue(`deafeated in`)} ${chalk.greenBright(`${4} turns`)}
// │   <${'-'.repeat(38)}>
// │   XP earned:  ${chalk.greenBright(`545`)}
// │
// │   average hit rate: 99.999 % hit chance
// │   average damage dealt per turn: ${chalk.redBright(`999`)} smg
// |
// │   Total dmg dealt; ${chalk.redBright('9999 dmg')}
// │   Total dmg taken: ${chalk.greenBright(`-33`)} dmg
// │
// │   potions used ${chalk.green('  |')} ${chalk.cyan('Elixir')}
// │   scrolls used ${chalk.green('  |')} ${chalk.yellow('ScrollName')}
// │   oil flask used ${chalk.green('|')} ${chalk.redBright('FireOil')}
// ╰╼────────────────────────────────────────────╾╯\
// `