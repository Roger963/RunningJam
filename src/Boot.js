var Space = {};
Space.Boot = function(game){};
Space.Boot.prototype = {
	preload: function(){
		// Cargue el indicador de carga primero, antes que cualquier cosa
		this.load.image('preloaderBar', 'img/loading-bar.png');
	},
	create: function(){
		// Establecemos las opciones de escala
		this.input.maxPointers = 1;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.setScreenSize(true);
		// Se inicia la escena de precargador o preload
		this.state.start('Preloader');
	}
};
