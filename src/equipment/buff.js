import buff from '../../resources/buff.json'
export default class Buffs {
    constructor() {

    }
    checkValue(player){
        if(player.value == 100){
            randomBuff();
        }else{
            console.log('lol niet genoeg velue')
        }
    }
    //this function is to choose a random buff 
    randomBuff() {
        
        //getting random number for the buffs
        let id = Math.floor((Math.random() * buff.length) + 1) -1;

        //checking which function to actived
        switch(buff[id].name){
            case 'gun':
                this.gun();
            break;
            case 'oneHit' :
                this.oneHit();
            break;
            case 'noDamage' :
                this.noDamage();
            break;
        }
        
    }
    gun(){
        console.log('gun')
    }
    oneHit(){
        console.log('one hit')
    }
    noDamage(){
        console.log('no damage')
    }
}