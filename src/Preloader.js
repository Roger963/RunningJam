Space.Preloader = function(game){
	// definir ancho y alto del juego
	Space.GAME_WIDTH = 1055;
	Space.GAME_HEIGHT = 703;
};
Space.Preloader.prototype = {
	preload: function(){
		// establecer el color de fondo y la imagen de precarga
		this.stage.backgroundColor = '#B4D9E7';
		this.preloadBar = this.add.sprite((Space.GAME_WIDTH-311)/2, (Space.GAME_HEIGHT-27)/2, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
		// cargar imágenes
		this.load.image('fondo', 'img/fondo.png');
		this.load.image('estrellas', 'img/estrellas.png');
		this.load.image('astronauta', 'img/astronauta.png');
		this.load.image('RunningJam', 'img/RunningJam.png');
		this.load.image('game-over', 'img/game-over.png');
		this.load.image('score-bg', 'img/score-bg.png');
		this.load.image('button-pause', 'img/button-pause.png');
		// cargar imagenes
		this.load.spritesheet('enemy', 'img/enemy.png', 82, 98);
		this.load.spritesheet('play', 'img/play.png', 401, 143);
	},
	create: function(){
		// iniciar el estado MainMenu
		this.state.start('MainMenu');
	}
};
