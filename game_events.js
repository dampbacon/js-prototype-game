
var defaults={'id':0,'body':'','toScreen':'','buttons':[[]]}


export class game_event{
    constructor({'id':id,'body':body,'toScreen':toScreen,'buttons':buttons}={defaults}){
        this.id=id
        this.body=body
        this.toScreen=toScreen
        this.buttons=buttons
        //buttons are in the format of [event_id,"button label"]
    }
}

export class game_event_gain_item extends game_event{
    constructor({'id':id,'body':body,'toScreen':toScreen,'buttons':buttons,'arryItems':arryItems}={...defaults,arryItems:[]}){
        super(id,body,toScreen,buttons)
        this.arryItems=arryItems;
    }
}

export class game_event_enemy extends game_event{
    constructor({'id':id,'body':body,'toScreen':toScreen,'buttons':buttons,'arryenemy':arryenemy}={...defaults,arryenemy:[]}){
        super(id,body,toScreen,buttons)
        this.arryenemy=arryenemy;
    }
}
