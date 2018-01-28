
export default class xpbar{ 
    constructor(player) {
        //getting player from instances in world.js
        this.player = player;
        //making xp bar for the players
        if(this.player.world.isTop()){
            //adding xpbar toe player
            this.player.experienceBar = document.getElementById('xpbarTop') 
            //value of bar is 0 in beginning
            this.player.experience = 0;
            //value of player is equel to bar value
            this.player.experienceBar.value = this.player.experience;
        }
        if(this.player.world.isBottom()){
            //adding xpbar toe player
            this.player.experienceBar = document.getElementById('xpbarBottom') 
            //value of bar is 0 in beginning
            this.player.experience = 0;
            //value of player is equel to bar value
            this.player.experienceBar.value = this.player.experience;
        }        
    }
    addXP(xp){
<<<<<<< HEAD
       this.player.experience += xp;
       this.player.experienceBar.value = this.player.experience;
    //    console.log('xp is added' + xp);
=======
        if(this.player.experience >=99){
            this.player.experience = 100;
        }{
            this.player.experience += xp;
            this.player.experienceBar.value = this.player.experience;
        }
>>>>>>> 02511fe1caf92b99e57cca7fa95e1583352e4296
    }
}
