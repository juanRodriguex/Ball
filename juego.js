//---------------------------
//Configuración
//---------------------------
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#121218',
    scene: {
        preload:preload,
        create: create,
        update: update
    }
};

//---------------------------
//preload
//---------------------------
function preload () {
   this.load.image (
        "jugador",
        "assets/img/jugador.png"
    
    )
}

//---------------------------
//Variables 
//---------------------------

let jugador;
let teclaDerecha;
let teclaIzquierda;
let salto;
let bajar;
let dash;

let objetivo1_elem;
let objetivo2_elem; // Segundo objetivo
let obstaculos = [];

const POS_INICIAL_X = 400;
const POS_INICIAL_Y = 300;

//---------------------------
//funciones
//---------------------------

// Comprobación de objetivos y colisiones

function verificarObjetivos() {
    const circuloJugador = new Phaser.Geom.Circle(jugador.x, jugador.y, 50);
    
    // Geometría del Objetivo 1 (Círculo)
    const circuloObjetivo1 = new Phaser.Geom.Circle(objetivo1_elem.x, objetivo1_elem.y, 30);

    // Geometría del Objetivo 2 (Rectángulo)
    const rectObjetivo2 = new Phaser.Geom.Rectangle(
        objetivo2_elem.x - objetivo2_elem.width / 2,
        objetivo2_elem.y - objetivo2_elem.height / 2,
        objetivo2_elem.width,
        objetivo2_elem.height
    );

    // Tocar el Objetivo 1
    if (Phaser.Geom.Intersects.CircleToCircle(circuloJugador, circuloObjetivo1)) {
        console.log("¡Has tocado el Objetivo Amarillo!");
    }

    // Tocar el Objetivo 2 (Nuevo)
    if (Phaser.Geom.Intersects.CircleToRectangle(circuloJugador, rectObjetivo2)) {
        console.log("¡Has tocado el Objetivo Magenta!");
    }

    // Colisión con obstáculos (Perder y reiniciar)
    for (let obs of obstaculos) {
        const rectObstaculo = new Phaser.Geom.Rectangle(
            obs.x - obs.width / 2,
            obs.y - obs.height / 2,
            obs.width,
            obs.height
        );

        if (Phaser.Geom.Intersects.CircleToRectangle(circuloJugador, rectObstaculo)) {
            console.log("¡Has tocado un obstáculo! Reiniciando...");
            jugador.setPosition(POS_INICIAL_X, POS_INICIAL_Y);
            break;
        }
    }
}

//---------------------------
//create
//---------------------------
function create() {
    //jugador
    jugador = this.add.image(POS_INICIAL_X, POS_INICIAL_Y, "jugador");
    jugador.setDisplaySize(100,100)
    // Objetivo 1: Círculo amarillo
    objetivo1_elem = this.add.circle(700, 300, 30, 0xffff00);
    
    // Objetivo 2: Cuadrado magenta (Nuevo objetivo)
    objetivo2_elem = this.add.rectangle(100, 100, 50, 50, 0xff00ff);

    // Obstáculo original + 2 nuevos obstáculos
    obstaculos.push(this.add.rectangle(500, 300, 50, 150, 0x000000));
    obstaculos.push(this.add.rectangle(250, 150, 60, 120, 0x000000));
    obstaculos.push(this.add.rectangle(250, 450, 60, 120, 0x000000));

    salto = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    bajar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    teclaDerecha = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    teclaIzquierda = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    dash = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
}

//---------------------------
//update
//---------------------------

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

    jugador.x = Phaser.Math.Clamp(jugador.x, 50, 750);
    jugador.y = Phaser.Math.Clamp(jugador.y, 50, 550);

    verificarObjetivos();
}

//---------------------------
//juego
//---------------------------

const game = new Phaser.Game(config);