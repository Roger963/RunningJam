Candy.MainMenu = function(game){};
Candy.MainMenu.prototype = {
	create: function(){
		// display images
		this.add.sprite(0, 0, 'fondo');
		this.add.sprite(0,0, 'estrellas')
		//this.add.sprite(-130, Candy.GAME_HEIGHT-514, 'monster-cover');
		this.add.sprite((Candy.GAME_WIDTH-1220)/2, -80, 'RunningJam');
		// add the button that will start the game
		this.add.button(Candy.GAME_WIDTH-601-10, Candy.GAME_HEIGHT-343-10, 'play', this.startGame, this, 1, 0, 2);
		//this.add.button(Candy.GAME_WIDTH-401-10, Candy.GAME_HEIGHT-143-10, 'button-start', this.startGame, this, 1, 0, 2);
	},
	startGame: function() {
		// start the Game state
		this.state.start('Game');
	}
};