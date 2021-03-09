Space.MainMenu = function(game){};
Space.MainMenu.prototype = {
	create: function(){
		// mostrar imágenes
		this.add.sprite(0, 0, 'fondo');
		this.add.sprite(0,0, 'estrellas');
		this.add.sprite(90, Space.GAME_HEIGHT-414, 'astronauta');
		this.add.sprite((Space.GAME_WIDTH-820)/2, -80, 'RunningJam');
		// agrega el botón que iniciará el juego
		this.add.button(Space.GAME_WIDTH-600-10, Space.GAME_HEIGHT-280-10, 'play', this.startGame, this, 1, 0, 2);
		//this.add.button(Space.GAME_WIDTH-401-10, Space.GAME_HEIGHT-143-10, 'button-start', this.startGame, this, 1, 0, 2);
	},
	startGame: function() {
		// iniciar la escena del juego
		this.state.start('Game');
	}
};
