1. [Proyecto Integrador]




<details>
  <summary>Mover una Imagen</summary>
  
  <br/>
  

  
    
  **Juego, imagen , movimiento
this.load.spritesheet('coete', './img/coete.png' 35, 90);

 this.image = this.physics.add.image(500, 500, 'Jupiter');
        this.image.body.allowGravity = false;

        this.cursors = this.input.keyboard.createCursorKeys();
        
Este es el create para mover el personaje con flechas, parte 1

update() {
        if(this.cursors.left.isDown) {
            this.Jupiter = this.image.setVelocityX(-500);
        }
        else if (this.cursors.right.isDown) {
            this.Jupiter = this.image.setVelocityX(500);
        }
        else {
            this.Jupiter = this.image.setVelocityX(0);
        }
        if(this.cursors.up.isDown) {
            this.Jupiter = this.image.setVelocityY(-500);
        }
        else if (this.cursors.down.isDown) {
            this.Jupiter = this.image.setVelocityY(500);
        }
        else {
            this.image.setVelocityY(0);
        }
    }
Esto es para que el personaje se mueva con las flechas, parte 2**
  

  **Apuntes de la clase:**
  <br/>
  <img width="500" src="" alt="notas clase 1">
</details>






**   **