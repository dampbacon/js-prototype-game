




export class game_event{
    constructor(id=null,body,buttons){
        this.id=id
        this.body=body
        this.buttons=buttons
        // buttons are in the format of {event_id:"button label"}
    }
}

export class game_event_gain_item extends game_event{
    constructor(id=null,body,buttons,arryItems){
        super(id,body,buttons)
        this.arryItems=arryItems;
    }
}

export class game_event_enemy extends game_event{
    constructor(id=null,body,buttons,arryenemy){
        super(id,body,buttons)
        this.arryenemy=arryenemy;
    }
}
