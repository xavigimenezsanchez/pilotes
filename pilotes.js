'use strict';

// Exemple de càlcul de trajectòries després de col·lisió 
// amb la paret del canves
// fent servir la POO clàsica en javaScript


/*******************************************************
 *
 *          Classe CanvasEmement
 *  
 *******************************************************/



function CanvasElement(x,y,w,h,mx,my,v) {
    /*
     * Un trist element del canvas
     * */
    this.x = x;  
    this.y = y;
    this.w = w;
    this.h = h;
    this.v = v;  // velocitat
    this.mx = mx;  // màxim valor de la x, és a dir el width del canvas
    this.my = my;  // màxim valor de la y, és a dir, el  height del vanvas
}

CanvasElement.prototype.collisio = function() {
    /*
     * Funció que detecta col·lisións de cada pilota 
     * amb les parets del canvas
     * */
    var noCollisio = -1, dalt = 0,dreta=1, baix = 2, esquerra = 3;
    if ((this.x + this.w) >= this.mx) {
        this.x = this.mx -this.w;
        return dreta;
    } else if ((this.x-this.w) <= 0) {
        this.x = this.w;
        return esquerra;
        
    } else if ((this.y-this.h) <= 0) {
        this.y = this.h;   //per que no aparegi una pilota pintada per la mitat
        return dalt;
    } else if ((this.y+this.h) >= this.my) {
        this.y = this.my - this.h;
        return baix;
    } else {
        return noCollisio;
    }
}

/*******************************************************
 *
 *          Classe Pilota
 *  
 *******************************************************/


function Pilota(x,y,r,angle, mx,my,v,color) {
    CanvasElement.call(this,x,y,r,r,mx,my,v); //amb això heretem de la classe CanvasElement
    this.angle = angle;
    this.color = color;
}

Pilota.prototype = Object.create(CanvasElement.prototype);  // Heretem el prototype de CanvasElement
Pilota.prototype.constructor = Pilota  // Corretgim el constructor de Pilota


Pilota.prototype.pintar = function(ctx) {
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.w,0,2*Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
} 


Pilota.prototype.moure = function () {
    /*  Canviar la direcció si ha 
     * col·lisionat amb la paret
     *                            */
    var dalt = 0,dreta=1, baix = 2, esquerra = 3;
    var pi = Math.PI;
    
    /* Aquí podeu comprovar la màgia de les matemàtiques
     * la formula per la dreta i la esquerra és la mateixa
     * i la formula per dalt i baix és la mateixa, 
     * increïble i apasionant, les matemàtiques són unes
     * de les portes que obren el coneixment i la apretura
     * de la nostra ment
     * */
    switch (this.collisio()) {
        case dreta:
            this.angle = pi - this.angle;
            break;
        case esquerra:
            this.angle = pi - this.angle;
            break;
        case baix:
            this.angle = 2 * pi - this.angle;
            break;
        case dalt:
            this.angle = 2 * pi - this.angle;
            break;
    }
    
    
    
    
    this.x += Math.cos(this.angle) * this.v;
    this.y += Math.sin(this.angle) * this.v;
}



/*******************************************************
 *
 *          Classe Joc
 *  
 *******************************************************/


function Joc() {
    /*
     * La classe Joc és la que contè el canvas,
     * les pilotetes i la que s'encarrega d'animar
     * les pilotes.
     * */
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.pilotes = [];
    var that = this;
    this.animar = function () {
        that.pintar();
        window.requestAnimationFrame(that.animar);
    }
}

Joc.prototype.pintar = function() {
    var that=this;
    this.ctx.fillStyle ='#000';
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
    this.pilotes.forEach(function(p) {
        // Hem de fer servir una referència al objecte Joc
        // dintre del ForEach this és igual al objecte pilota
        p.pintar(that.ctx);
        p.moure(that.ctx);
    })
}

Joc.prototype.crearPilotes = function() {
    /*
     * Creem pilotetes de diferents 
     * colors, velocitats i angle de partida
     * super-mega-divertit!!!!!!
     * */
    var aleatori;
    var colors = ['#801515','#5B0F4D','#FF6C00','#FFBB00','#70ED00','#1157C5','#CD00AD','#FD0006','#93F200','#00C973'];
    
    for (var i = 0 ; i < 150; i++) {
        aleatori = Math.random() * 10;
        this.pilotes.push(new Pilota(this.canvas.width/2,
                                     this.canvas.height/2,
                                     15,
                                     Math.PI/3 * aleatori,
                                     window.innerWidth,
                                     window.innerHeight,
                                     Math.PI * aleatori,
                                     colors[Math.round(aleatori)]
                                        ));
        console.log(aleatori+ ' ' + Math.round(aleatori));
    }
}

/*******************************************************
 *
 *          Creem un objecte joc
 *  
 *******************************************************/


var joc = new Joc();
joc.crearPilotes();
joc.animar();