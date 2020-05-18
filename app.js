import Build from './lib/Build.class.js'


class Main extends Build{
    
    constructor(){
        super();
    }

    appendBlock(id, x, y, arrClass=[]) {
        let mapElm = document.querySelector('#map')

        let div = document.createElement("div");
        div.classList.add("block");
        div.classList.add("collider");

        for (const key in arrClass) {
            div.classList.add(arrClass[key]);
        }

        div.id = 'block'+id;
        div.style.marginLeft = (x*this.unitSize)+'px'
        div.style.marginTop = (y*this.unitSize)+'px'
        mapElm.appendChild(div);
    }

    appendPacman(x, y, marginLeft=0, marginTop=0) {
        let mapElm = document.querySelector('#map')

        let div = document.createElement("div");
        div.classList.add("collider");
        div.id = 'pacman';
        div.style.marginLeft = ((x*this.unitSize)+marginLeft)+'px'
        div.style.marginTop = ((y*this.unitSize)+marginTop)+'px'
        mapElm.appendChild(div);
    }

    anim() {
        
        return {
            pacman:() => {
                let pacman = this.PACMAN;
                
                let myTimeline = this.animate.currentTimeLine % 15;
                let limit1 = 5, limit2 = 10, limit3 = 15

                if(myTimeline > 0 && myTimeline <= limit1)
                pacman.style.backgroundPosition = '0px 0px';

                if(myTimeline > limit1 && myTimeline <= limit2)
                pacman.style.backgroundPosition = '-50px 0px';

                if(myTimeline > limit2 && myTimeline <= limit3)
                pacman.style.backgroundPosition = '-100px 0px';

            }
        }
    }

    timeline() {
        
        this.animate.currentTimeLine++;
        if (this.animate.currentTimeLine >= this.animate.endTimeLine) {
            this.animate.currentTimeLine = 0;
        }
    }

    pacman() {

        this.anim().pacman();

        let pacman = this.PACMAN;
        let vx = parseFloat(pacman.style.marginLeft);
        let vy = parseFloat(pacman.style.marginTop);
        

        let posX = vx / this.unitSize;
        let posY = vy / this.unitSize;

        

        let top = parseInt(pacman.style.marginTop)
        let left = parseInt(pacman.style.marginLeft)


        if (top < -50) {
            pacman.style.marginTop = '750px';
            return;
        }

        if (left < -50) {
            pacman.style.marginLeft = '750px';
            return;
        }

        if (top > 800) {
            pacman.style.marginTop = '0px';
            return;
        }

        if (left > 800) {
            pacman.style.marginLeft = '0px';
            return;
        }

        let pacman2 = document.querySelector('#pacman2');
        
        
        // permet d'afficher le faux pacman au moment où le
        // vrai pacman sort de la map
        if (left > 750 || left < 0 || top > 750 || top < 0) {
            pacman2.style.display = 'block'
        } else {
            pacman2.style.display = 'none'
        }
        
        return {
            up: (direction) => {

                if (this.isLoseControl(posX+0.2, posY+0.2, posX+0.8, posY)) return;

                // effet visuel du faux pacman qui revient par le bas
                pacman2.style.marginLeft =  (left)+'px';
                pacman2.style.marginTop = (top+800)+'px';
                pacman2.style.transform = ' rotate(0.75turn)'

                vy = vy + direction
                pacman.style.marginTop = vy+'px'
                pacman.style.transform = ' rotate(0.75turn)'
                
            },
            down: (direction) => {
                
                if (this.isLoseControl(posX, posY+1, posX+0.8, posY+1)) return;

                // effet visuel du faux pacman qui revient par le haut
                pacman2.style.marginLeft =  (left)+'px';
                pacman2.style.marginTop = (top-800)+'px';
                pacman2.style.transform = ' rotate(0.25turn)'

                vy = vy + direction
                pacman.style.marginTop = vy+'px'
                pacman.style.transform = ' rotate(0.25turn)'
                
            },
            left: (direction) => {
                
                if (this.isLoseControl(posX, posY, posX, posY+0.8)) return;

                // effet visuel du faux pacman qui revient par la gauche
                pacman2.style.marginLeft =  (left+800)+'px';
                pacman2.style.marginTop = (top)+'px';
                pacman2.style.transform = ' rotate(0turn)  scaleX(-1)'

                vx = vx + direction
                pacman.style.marginLeft = vx+'px'
                pacman.style.transform = ' rotate(0turn)  scaleX(-1)'
                
            },
            right: (direction) => {
                
                if (this.isLoseControl(posX+1, posY, posX+1, posY+0.8)) return;

                // effet visuel du faux pacman qui revient par la droite
                pacman2.style.marginLeft =  (left-800)+'px';
                pacman2.style.marginTop = (top)+'px';
                pacman2.style.transform = ' rotate(0turn)'

                vx = vx + direction
                pacman.style.marginLeft = vx+'px'
                pacman.style.transform = ' rotate(0turn)'
                
            }
        }
    }

    /**
     * Renseigne si la prochaine position du pacman est libre
     * pour avancer vers cette case de la matrice
     * 
     * @param {float} posX // coin top left position x de l'index de la matrice
     * @param {float} posY // coin top left position y de l'index de la matrice
     * @param {float} posX1 // coin bottom right position x de l'index de la matrice
     * @param {float} posY1 // coin bottom right position y de l'index de la matrice
     */
    isLoseControl(posX, posY, posX1, posY1) {
        /*
            Modulo 16 car la taille de la map est de 800px divisé par le nombres de block
            de taille 50px. Modulo 16 permet un effet d'overflow qui retourne obligatoirement
            à zéro car de 0 à 15 cela fait 16 mais index 16 n'est pas sensé exister par contre zero oui
        */
        let posXSafe = (parseInt(posX) < 0 ) ? 0 : parseInt(posX)%16;
        let posYSafe = (parseInt(posY) < 0 ) ? 0 : parseInt(posY)%16;
        let posXSafe1 = (parseInt(posX1) < 0 ) ? 0 : parseInt(posX1)%16;
        let posYSafe1 = (parseInt(posY1) < 0 ) ? 0 : parseInt(posY1)%16;
        
        if (this.map[posYSafe][posXSafe] !== 0) return true;
        if (this.map[posYSafe1][posXSafe1] !== 0) return true;

        return false;
    }

    init() {

        if(this.isInit) return false;

        this.isInit = true;
        
        return  {
            control: () => {
                console.log('INIT CONTROL');
                document.addEventListener('keypress', (e) => {
                    this.timeline()
                    switch (e.key) {
                        case 'z':
                            this.pacman().up(-this.direction);
                            break;
                        case 'S':
                            this.pacman().up(-this.direction);
                            break;
                        case 's':
                            this.pacman().down(this.direction);
                            break;
                        case 'S':
                            this.pacman().down(this.direction);
                            break;
                        case 'q':
                            this.pacman().left(-this.direction);
                            break;
                        case 'Q':
                            this.pacman().left(-this.direction);
                            break;
                        case 'd':
                            this.pacman().right(this.direction);
                            break;
                        case 'D':
                            this.pacman().right(this.direction);
                            break;
                    
                        default:
                            break;
                    }

                });

                document.addEventListener('keyup', (e) => {
                    this.sound.chmop.volume = 0;
                })

                document.addEventListener('keydown', (e) => {
                    
                    if([
                        'ArrowUp', 
                        'ArrowDown', 
                        'ArrowLeft', 
                        'ArrowRight',
                        'z', 'Z',
                        'q', 'Q', 
                        'd', 'D',
                        's', 'S'
                    ].includes(e.key)) this.sound.chmop.volume = 1;
                    
                    switch (e.key) {
                        case 'ArrowUp':
                            this.pacman().up(-this.direction);
                            break;
                        case 'ArrowDown':
                            this.pacman().down(this.direction);
                            break;
                        case 'ArrowLeft':
                            this.pacman().left(-this.direction);
                            break;
                        case 'ArrowRight':
                            this.pacman().right(this.direction);
                            break;
                    
                        default:
                            break;
                    }

                });
            }
        }
        
    }
}

document.body.onload = function () {
    const main = new Main();

    main.init().control();
    main.build();
}



