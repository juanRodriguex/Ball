// Primer movimiento

const config = {


type: Phaser.AUTO,


width:800,


height:600,

backgroundColor:'#0000FF',

scene:{

    create:create,
    update:update

}


};


let jugador;

let teclaDerecha;

let teclaIzquierda

let salto

let bajar

let dash


function create(){


    jugador = this.add.circle(400,300,50,0xff0000);

    objetivo = this.add.circle(

700,

300,

30,

0xffff00

);



obstaculo =

this.add.rectangle(

500,

300,

50,

150,

0x000000
);
    salto = this.input.keyboard.addKey(

        Phaser.Input.Keyboard.KeyCodes.UP

    );


     bajar = this.input.keyboard.addKey(

        Phaser.Input.Keyboard.KeyCodes.DOWN

    );

    teclaDerecha = this.input.keyboard.addKey(

        Phaser.Input.Keyboard.KeyCodes.RIGHT

    );

    teclaIzquierda = this.input.keyboard.addKey(

        Phaser.Input.Keyboard.KeyCodes.LEFT

    );
    
    dash = this.input.keyboard.addKey(

        Phaser.Input.Keyboard.KeyCodes.Q

    );
}


function update() {
    
    const velocidad = dash.isDown ? 20 : 5;

    if (teclaDerecha.isDown) {
        jugador.x += velocidad;
    } else if (teclaIzquierda.isDown) {
        jugador.x -= velocidad;
    }

    if (salto.isDown) {
        jugador.y -= velocidad;
    } else if (bajar.isDown) {
        jugador.y += velocidad;
    }

    jugador.x = Phaser.Math.Clamp(
jugador.x,
50,750
)

jugador.y = Phaser.Math.Clamp(

jugador.y,50,550

)
}



const game = new Phaser.Game(config);