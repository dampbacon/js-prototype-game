//
// Weapon objects
//
//
export class dmgTypeClass{
    constructor({name, /*effectAdverb, */chanceToApply, color, effectDuration, applyEffect}){
        this.name = name;
        //effectAdverb=effectAdverb?effectAdverb:''
        //can be a normal number but can be a list with apply effect function callback
        //this.effectparams = effectparams?effectparams:null;
        this.color = color;
        this.effectDurationMax = effectDuration?effectDuration:0;
        //callback function to apply effect passed as argument
        //
        this.applyEffect = applyEffect?applyEffect:((arg1,this_,arg2,arg3)=>{return ''}); 
        this.chanceToApply = chanceToApply?chanceToApply:0
    }
    
    applyEffectWF(arg1,arg2,arg3){
        return this.applyEffect(arg1,this,arg2,arg3)
    }
}


export class weapon {
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










