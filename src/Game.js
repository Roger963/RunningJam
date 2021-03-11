Space.Game = function(game){
	// definir las variables necesarias para el espacio.
	this._player = null;
	this._SpaceGroup = null;
	this._spawnSpaceTimer = 0;
	this._fontStyle = null;
	// definir variables espaciales para reutilizarlas en funciones space.item
	Space._scoreText = null;
	Space._score = 0;
	Space._health = 0;
};
Space.Game.prototype = {
	create: function(){
		// arranca el motor del juego
		this.physics.startSystem(Phaser.Physics.ARCADE);
		// establecer la gravedad global
		this.physics.arcade.gravity.y = 200;
		// mostrar imágenes: fondo, y puntuación
		this.add.sprite(0, 0, 'fondo');
		this.add.sprite(0, 0, 'estrellas');

		this.add.sprite(10, 5, 'score-bg');
		// agregar botón de pausa
		this.add.button(Space.GAME_WIDTH-96-10, 5, 'button-pause', this.managePause, this);
		// establecer estilo de fuente
		this._fontStyle = { font: "40px Arial", fill: "#5499C7", stroke: "#333", strokeThickness: 15, align: "center" };
		// inicializar el temporizador de generación
		this._spawnSpaceTimer = 0;
		// inicializar el texto de la partida con 0
		Space._scoreText = this.add.text(120, 20, "0", this._fontStyle);
		// Establecer la vida del jugador
		Space._health = 10;
		// crear un nuevo grupo para el espacio
		this._enemyGroup = this.add.group();
		// generar el primer enemigo
		Space.item.spawnSpace(this);
	},
	managePause: function(){
		// pausar el juego
		this.game.paused = true;
		// agregar texto informativo adecuado
		var pausedText = this.add.text(100, 250, "Juego pausado.\nVuelva clickear para reanudar el juego. \nY F5 para empezar de nuevo.", this._fontStyle);
		// configurar el detector de eventos para el clic / toque del usuario en la pantalla
		this.input.onDown.add(function(){
			// eliminar el texto de pausa
			pausedText.destroy();
			// reanudar el juego
			this.game.paused = false;
		}, this);
	},
	update: function(){
		// actualizar el temporizador en cada cuadro
		this._spawnSpaceTimer += this.time.elapsed;
		// if spawn timer reach one second (1000 miliseconds)
		if(this._spawnSpaceTimer > 1000) {
			// reiniciarlo
			this._spawnSpaceTimer = 0;
			// y generar un nuevo enemigo
			Space.item.spawnSpace(this);
		}
		// recorrer todos los enemigos en la pantalla
		this._enemyGroup.forEach(function(enemy){
			// Girarlos en consecuencia
			enemy.angle += enemy.rotateMe;
		});
		// si la vida del jugador cae a 0, el jugador muere = juego terminado
		if(!Space._health) {
			// mostrar el mensaje de finalización del juego
			this.add.sprite((Space.GAME_WIDTH-350)/2, (Space.GAME_HEIGHT-671)/2, 'game-over');
			// pausar el juego
			this.game.paused = true;
		}
	}
};

Space.item = {
	spawnSpace: function(game){
		//calcular la posición de caída (desde 0 hasta el ancho del juego) en el eje x
		var dropPos = Math.floor(Math.random()*Space.GAME_WIDTH);
		// definir la compensación para cada enemigo
		var dropOffset = [-27,-36,-36,-38,-48];
		// aleatorizar el tipo de enemigo
		var enemyType = Math.floor(Math.random()*5);
		// crear un nuevo enemigo
		var enemy = game.add.sprite(dropPos, dropOffset[enemyType], 'enemy');
		// agregar un nuevo marco de animación
		enemy.animations.add('anim', [enemyType], 10, true);
		// reproducir la animación recién creada
		enemy.animations.play('anim');
		// habilitar el cuerpo enemigo para el motor físico
		game.physics.enable(enemy, Phaser.Physics.ARCADE);
		// Permitir que se haga clic / toque al enemigo
		enemy.inputEnabled = true;
		// agregar oyente de eventos para hacer clic / tocar
		enemy.events.onInputDown.add(this.clickSpace, this);
		// asegúrese de que el enemigo disparará un evento cuando salga de la pantalla
		enemy.checkWorldBounds = true;
		// restablecer enemigo cuando sale de la pantalla
		enemy.events.onOutOfBounds.add(this.removeSpace, this);
		// establecer el ancla (para rotación, posición, etc.) en el medio del enemigo
		enemy.anchor.setTo(0.5, 0.5);
		// establecer el valor de rotación aleatorio
		enemy.rotateMe = (Math.random()*4)-2;
		// agregar enemigo al grupo
		game._enemyGroup.add(enemy);
	},
	clickSpace: function(enemy){
		// mata al enemigo cuando se hace clic
		enemy.kill();
		// sumar puntos a la puntuación
		Space._score += 1;
		// actualizar el texto de la puntuación
		Space._scoreText.setText(Space._score);
	},
	removeSpace: function(enemy){
		// matar al enemigo
		enemy.kill();
		// disminuir la vida del jugador
		Space._health -= 10;
	}
};
