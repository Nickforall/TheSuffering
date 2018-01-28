import Buff from '../../resources/buff.json'
export default class Buffs {
    constructor(player) {
        this.player = player;

        //checking player is Top or bottom
    }
    //checking value if your xp bar = 100
    checkValue(){
        if(this.player.experience >= 100){
            this.randomBuff();
            this.player.xpBar.addXP(-100);
        }else{
            console.log('lol niet genoeg velue');
        }
    }
    //this function is to choose a random buff 
    randomBuff() {
        
        //getting random number for the buffs
        let id = Math.floor((Math.random() * Buff.length) + 1) -1;

        //checking which function to actived
        switch(Buff[id].name){
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