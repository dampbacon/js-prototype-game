
var defaults={'id':0,'body':'','toScreen':'','buttons':[[]]}

//to factory event builder

export class game_event{
    constructor({'id':id,'body':body,'toScreen':toScreen,'buttons':buttons}={defaults}){
        this.id=id
        this.body=body
        this.toScreen=toScreen
        this.buttons=buttons
        //buttons are in the format of [[event_id,"button label", enabled_always=true]]        
    }
    disableButton(number){
        this.buttons[number-1][2]=false
    }
    test = () => console.log("mmmmmmmmmmmmmmmmmmmmmm!!")

}

export class game_event_gain_item extends game_event{
    constructor({'id':id,'body':body,'toScreen':toScreen,'buttons':buttons,'arryItems':arryItems}={...defaults,arryItems:[]}){
        super(id,body,toScreen,buttons)
        this.arryItems=arryItems;
    }
}

export class game_event_enemy extends game_event{
    constructor({'id':id,'body':body,'toScreen':toScreen,'buttons':buttons,'arryEnemy':arryEnemy}={...defaults,arryEnemy:[]}){
        super(id,body,toScreen,buttons)
        this.arryEnemy=arryEnemy;
    }
}

//stub
export class game_event_skillcheck extends game_event{
    constructor({'id':id,'body':body,'toScreen':toScreen,'buttons':buttons,'arrySkillCheck':arrySkillCheck}={...defaults,arrySkillCheck:[]}){
        super(id,body,toScreen,buttons)
        this.arrySkillCheck=arrySkillCheck;
    }
}