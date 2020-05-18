export default class Build {

    constructor() {
        console.log('PACMAN stated');
        this.map = [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,7,8,8,9,0,7,8,8,9,0,7,8,8,9,0,0],
            [0,1,2,2,3,0,1,2,2,3,0,1,2,2,3,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,7,9,0,12,0,0,12,0,7,9,0,0,0,0],
            [0,0,0,4,6,0,46,0,0,46,0,4,6,0,0,0,0],
            [0,0,0,1,3,0,1,82,82,3,0,1,3,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,12,0,0,7,8,9,0,0,7,8,9,0,0,12,0,0],
            [0,46,0,0,1,2,3,0,0,1,2,3,0,0,46,0,0],
            [0,18,0,0,0,0,0,0,0,0,0,0,0,0,18,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ];
        
        this.unitSize = 50;
        this.isInit = false;
        this.sizeMap = {
            width: parseInt(window.map.offsetWidth),
            height: parseInt(window.map.offsetHeight)
        }
        this.direction = 3;

        this.animate = {
            currentTimeLine: 0,
            endTimeLine: 30
        }

        this.sound = {
            chmop: document.getElementById("chomp")
        }
        this.sound.chmop.volume = 0;
    }

    build() {
        const n = this.map.length;
        console.log('build');
        const size = this.unitSize;

        for (let y = 0; y < n; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                if (this.map[y][x] === 5) {

                    this.appendBlock(y+''+x, x, y)

                }else if (this.map[y][x] === 7) {

                    this.appendBlock(y+''+x, x, y, [
                        'border-block-lt'
                    ])
                } else if (this.map[y][x] === 8) {

                    this.appendBlock(y+''+x, x, y, [
                        'border-block-t'
                    ])
                } else if (this.map[y][x] === 6) {

                    this.appendBlock(y+''+x, x, y, [
                        'border-block-r'
                    ])
                } else if (this.map[y][x] === 4) {

                    this.appendBlock(y+''+x, x, y, [
                        'border-block-l'
                    ])
                } else if (this.map[y][x] === 1) {

                    this.appendBlock(y+''+x, x, y, [
                        'border-block-lb'
                    ])
                } else if (this.map[y][x] === 3) {

                    this.appendBlock(y+''+x, x, y, [
                        'border-block-rb'
                    ])
                } else if (this.map[y][x] === 2) {

                    this.appendBlock(y+''+x, x, y, [
                        'border-block-b'
                    ])
                } else if (this.map[y][x] === 9) {

                    this.appendBlock(y+''+x, x, y, [
                        'border-block-rt'
                    ])
                } else if (this.map[y][x] === 12) {

                    this.appendBlock(y+''+x, x, y, [
                        'border-block-xt'
                    ])
                } else if (this.map[y][x] === 46) {

                    this.appendBlock(y+''+x, x, y, [
                        'border-block-x'
                    ])
                } else if (this.map[y][x] === 82) {

                    this.appendBlock(y+''+x, x, y, [
                        'border-block-y'
                    ])
                } else if (this.map[y][x] === 18) {

                    this.appendBlock(y+''+x, x, y, [
                        'border-block-xb'
                    ])
                }
            }
        }
        this.appendPacman(7,8, 25,25);
        this.PACMAN = document.querySelector('#pacman');
    }

}