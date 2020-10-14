const verdeazul = document.getElementById('verdeazul')
const fuccia = document.getElementById('fuccia')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 10
const dir = './sounds/'

class Juego{
    constructor(){
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 500)
    }
    inicializar() {
        this.siguienteNivel =  this.siguienteNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        this.toggleBtnEmpezar()
        this.nivel = 1
        document.getElementById("level").innerHTML = this.nivel-1
        this.colores = {
            verdeazul,
            fuccia,
            naranja,
            verde
        }
    }
    toggleBtnEmpezar(){
        if(btnEmpezar.classList.contains('hide'))
        btnEmpezar.classList.remove('hide')
        else
        btnEmpezar.classList.add('hide')
        
    }
    generarSecuencia(){
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random()*4))
    }
    siguienteNivel(){
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }
    transformarNumeroAColor(numero){
        switch (numero){
            case 0: 
                return 'verdeazul'
            case 1: 
                return 'fuccia'
            case 2: 
                return 'naranja'
            case 3:
                return 'verde'
        }
    }
    transformarColorANumero(color){
        switch (color){
            case 'verdeazul': 
                return 0
            case 'fuccia': 
                return 1
            case 'naranja': 
                return 2
            case 'verde':
                return 3
        }
    }
    generarSonido(sonido){
        const a = new Audio(dir+sonido+'.wav'); 
        a.play();
    }
    iluminarSecuencia(){
        //Recorrer el array de secuencia hasta el nivel donde está el user
        for(var i = 0; i<this.nivel; i++){
            const color = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout(()=>{
                this.iluminarColor(color)
                this.generarSonido(this.transformarColorANumero(color))
                },i*700)
        }
    }
    iluminarColor(color){
        this.colores[color].classList.add('light')
        setTimeout(()=>this.apagarColor(color),350)
    }
    apagarColor(color){
        this.colores[color].classList.remove('light')
    }
    agregarEventosClick(){
        this.colores.verdeazul.addEventListener('click', this.elegirColor)
        this.colores.fuccia.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
    }
    eliminarEventoClick(){
        this.colores.verdeazul.removeEventListener('click', this.elegirColor)
        this.colores.fuccia.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)  
    }
    elegirColor(ev){
        const nombreColor =  ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)

        if(numeroColor === this.secuencia[this.subnivel]){
            this.generarSonido(numeroColor)
            this.subnivel++
            if(this.subnivel === this.nivel){
                document.getElementById("level").innerHTML = this.nivel 
                this.nivel++                          
                this.eliminarEventoClick()
                if(this.nivel == (ULTIMO_NIVEL+1)){
                    this.ganoElJuego()
                }else{
                    setTimeout(this.siguienteNivel, 1500)
                }
            }
        }else{
            this.perdioElJuego()
        }
    } 
    ganoElJuego(){         
        
        setTimeout(()=>{
        this.iluminarSecuencia()
        swal('Game', 'Felicitaciones, has ganado!', 'success')
        .then(this.inicializar)
        },500)
        
    }
    perdioElJuego(){
        swal('Game', 'Lo sentimos, has perdido :(', 'error')
        .then(()=>{
            this.eliminarEventoClick()
            this.inicializar()
        })
    }

}
function empezarJuego(){
    //iniciar juego
    window.juego = new Juego()
}
