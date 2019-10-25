function fruit(){
	this.x;
	this.y;
}
function addFruit(inputArray){
	this.fr=new fruit();
	this.fr.x=Math.floor(Math.random()*fieldWidth);
	this.fr.y=Math.floor(Math.random()*fieldHeight);
	this.good=false;
	while(!this.good){
		this.good=true;
		if(snake1.x==this.fr.x&&snake1.y==this.fr.y){
			this.good=false;
			this.fr.x=Math.floor(Math.random()*fieldWidth);
			this.fr.y=Math.floor(Math.random()*fieldHeight);
			break;
		}
		if(this.good){
			for(var i = 0 ; i < snake1.tailPeaces.length ; i++ ){
				if(snake1.tailPeaces[i].x==this.fr.x&&snake1.tailPeaces[i].y==this.fr.y){
					this.good=false;
					this.fr.x=Math.floor(Math.random()*fieldWidth);
					this.fr.y=Math.floor(Math.random()*fieldHeight);
					break;
				}
			}
		}
		if(this.good&&snake2!=false){
			if(snake2.x==this.fr.x&&snake2.y==this.fr.y){
				this.good=false;
				this.fr.x=Math.floor(Math.random()*fieldWidth);
				this.fr.y=Math.floor(Math.random()*fieldHeight);
				break;
			}
			if(this.good){
				for(var i = 0 ; i < snake2.tailPeaces.length ; i++ ){
					if(snake2.tailPeaces[i].x==this.fr.x&&snake2.tailPeaces[i].y==this.fr.y){
						this.good=false;
						this.fr.x=Math.floor(Math.random()*fieldWidth);
						this.fr.y=Math.floor(Math.random()*fieldHeight);
						break;
					}
				}
			}
		}
	}
	inputArray.push(this.fr);
}