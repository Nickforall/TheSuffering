import debuff from '../../resources/debuff'
export default class deBuff{
    constructor(){

    }
    checkValue(player){
        if(player.value == 100){
            randomDeBuff();
        }else{
            console.log('lol niet genoeg velue')
        }
    }
    //this function is to choose a random debuff
    randomDeBuff() {
        
        //getting random number for the buffs
        let id = Math.floor((Math.random() * debuff.length) + 1) -1;

        //checking which function to actived
        switch(debuff[id].name){
            case 'noJump':
                this.gun();
            break;
            case 'slowing' :
                this.slowing();
            break;
            case 'freeze' :
                this.freeze();
            break;
        }
    }
    noJump(){
        console.log('no jump')
    }
    slowing(){
        console.log('slowing')
    }
    freeze(){
        console.log('freeze')
    }
}

