Space.Game = function(game){
	// define needed variables for Candy.Game
	this._player = null;
	this._candyGroup = null;
	this._spawnSpaceTimer = 0;
	this._fontStyle = null;
	// define Candy variables to reuse them in Candy.item functions
	Space._scoreText = null;
	Space._score = 0;
	Space._health = 0;
};
Space.Game.prototype = {
	create: function(){
		// start the physics engine
		this.physics.startSystem(Phaser.Physics.ARCADE);
		// set the global gravity
		this.physics.arcade.gravity.y = 200;
		// display images: background, floor and score
		this.add.sprite(0, 0, 'fondo');
		this.add.sprite(-30, Space.GAME_HEIGHT-160, 'floor');
		this.add.sprite(10, 5, 'score-bg');
		// add pause button
		this.add.button(Space.GAME_WIDTH-96-10, 5, 'button-pause', this.managePause, this);
		// create the player
		this._player = this.add.sprite(5, 760, 'monster-idle');
		// add player animation
		this._player.animations.add('idle', [0,1,2,3,4,5,6,7,8,9,10,11,12], 10, true);
		// play the animation
		this._player.animations.play('idle');
		// set font style
		this._fontStyle = { font: "40px Arial", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };
		// initialize the spawn timer
		this._spawnSpaceTimer = 0;
		// initialize the score text with 0
		Space._scoreText = this.add.text(120, 20, "0", this._fontStyle);
		// set health of the player
		Space._health = 10;
		// create new group for candy
		this._enemyGroup = this.add.group();
		// spawn first enemy
		Space.item.spawnSpace(this);
	},
	managePause: function(){
		// pause the game
		this.game.paused = true;
		// add proper informational text
		var pausedText = this.add.text(100, 250, "Game paused.\nTap anywhere to continue.", this._fontStyle);
		// set event listener for the user's click/tap the screen
		this.input.onDown.add(function(){
			// remove the pause text
			pausedText.destroy();
			// unpause the game
			this.game.paused = false;
		}, this);
	},
	update: function(){
		// update timer every frame
		this._spawnSpaceTimer += this.time.elapsed;
		// if spawn timer reach one second (1000 miliseconds)
		if(this._spawnSpaceTimer > 1000) {
			// reset it
			this._spawnSpaceTimer = 0;
			// and spawn new enemy
			Space.item.spawnSpace(this);
		}
		// loop through all enemy on the screen
		this._enemyGroup.forEach(function(enemy){
			// to rotate them accordingly
			enemy.angle += enemy.rotateMe;
		});
		// if the health of the player drops to 0, the player dies = game over
		if(!Space._health) {
			// show the game over message
			this.add.sprite((Space.GAME_WIDTH-594)/2, (Space.GAME_HEIGHT-271)/2, 'game-over');
			// pause the game
			this.game.paused = true;
		}
	}
};

Space.item = {
	spawnSpace: function(game){
		// calculate drop position (from 0 to game width) on the x axis
		var dropPos = Math.floor(Math.random()*Space.GAME_WIDTH);
		// define the offset for every enemy
		var dropOffset = [-27,-36,-36,-38,-48];
		// randomize enemy type
		var enemyType = Math.floor(Math.random()*5);
		// create new enemy
		var enemy = game.add.sprite(dropPos, dropOffset[enemyType], 'enemy');
		// add new animation frame
		enemy.animations.add('anim', [enemyType], 10, true);
		// play the newly created animation
		enemy.animations.play('anim');
		// enable enemy body for physic engine
		game.physics.enable(enemy, Phaser.Physics.ARCADE);
		// enable enemy to be clicked/tapped
		enemy.inputEnabled = true;
		// add event listener to click/tap
		enemy.events.onInputDown.add(this.clickSpace, this);
		// be sure that the enemy will fire an event when it goes out of the screen
		enemy.checkWorldBounds = true;
		// reset enemy when it goes out of screen
		enemy.events.onOutOfBounds.add(this.removeSpace, this);
		// set the anchor (for rotation, position etc) to the middle of the enemy
		enemy.anchor.setTo(0.5, 0.5);
		// set the random rotation value
		enemy.rotateMe = (Math.random()*4)-2;
		// add enemy to the group
		game._enemyGroup.add(enemy);
	},
	clickSpace: function(enemy){
		// kill the enemy when it's clicked
		enemy.kill();
		// add points to the score
		Space._score += 1;
		// update score text
		Space._scoreText.setText(Space._score);
	},
	removeSpace: function(enemy){
		// kill the enemy
		enemy.kill();
		// decrease player's health
		Space._health -= 10;
	}
};
