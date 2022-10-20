import chalk from "chalk"
import _ from "lodash";



export class GlobalMetrics{
    constructor(){
        this.avgHitRate=0
        this.avgDmgPerTurn=0
        this.totalDmgDealt=0
        this.totatDmgTaken=0
        this.PotionsUsed=0
        this.ScrollsUsed=0
    }
    addMetrics(metric){

    }
}
export class combatMetrics extends GlobalMetrics{
    constructor(){
        super();
        this.HMar=[]  //hitmiss array
        this.TdmgAr=[]  //turn damage array,  USE FOR TOTAL DAMAGE DEALT AND DAMAGE AVERAGE
        this.dmgTkn=0 //dmg taken 
        this.pUse=0 //potions
        this.sUse=0 //scrolls
        this.fUse=0 //flask oil
        this.turn=0 //turn


        this.enmyName=""



    }
    calculateHitMissAVG(){
        console.log(_.sum(this.HMar))
        return (_.sum(this.HMar)/this.HMar.length).toPrecision(5)
    }
    calculateTurnDmgAVG(){
        if(this.turn!=0){
            return (_.sum(this.TdmgAr)/this.turn).toPrecision(5)
        }else{
            return (_.sum(this.TdmgAr)).toPrecision(5)
        }
    }
    returnDamageTaken(){
        return this.dmgTkn
    }
    returnDamageDealt(){
        return _.sum(this.TdmgAr)
    }





    AHM(bool){
        let temp=0
        if(bool){temp=1}
        this.HMar.push(temp)
    }
    ATdmg(dmg){
        console.assert(Number.isInteger(dmg),chalk.red("FUCCCKKKKKK"))
        this.TdmgAr.push(dmg)
    }
    AdmgTkn(dmg){
        console.assert(Number.isInteger(dmg),chalk.red("FUCCCKKKKKK"))
        this.dmgTkn += dmg
    }
    APuse(){
        this.pUse++
    }
    AsUse(){
        this.sUse++
    }
    AfUse(){
        this.fUse++
    }
    Aturn(){
        this.turn++
    }
    mergeIntoGlobal(global){
        global.addMetrics(this);
        this.clear()
    }
    clear(){

    }
    getData(){

    }
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

