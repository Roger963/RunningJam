Space.Preloader = function(game){
	// define width and height of the game
	Space.GAME_WIDTH = 1055;
	Space.GAME_HEIGHT = 703;
};
Space.Preloader.prototype = {
	preload: function(){
		// set background color and preload image
		this.stage.backgroundColor = '#B4D9E7';
		this.preloadBar = this.add.sprite((Space.GAME_WIDTH-311)/2, (Space.GAME_HEIGHT-27)/2, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
		// load images
		this.load.image('fondo', 'img/fondo.png');
		this.load.image('estrellas', 'img/estrellas.png');
		this.load.image('astronauta', 'img/astronauta.png');
		this.load.image('RunningJam', 'img/RunningJam.png');
		this.load.image('game-over', 'img/gameover.png');
		this.load.image('score-bg', 'img/score-bg.png');
		this.load.image('button-pause', 'img/button-pause.png');
		// load spritesheets
		this.load.spritesheet('enemy', 'img/enemy.png', 82, 98);
		this.load.spritesheet('monster-idle', 'img/monster-idle.png', 103, 131);
		this.load.spritesheet('play', 'img/play.png', 401, 143);
	},
	create: function(){
		// start the MainMenu state
		this.state.start('MainMenu');
	}
};