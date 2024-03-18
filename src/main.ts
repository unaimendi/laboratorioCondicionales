import barajaInicial from "./barajaInicial";

const btnPedirCarta = document.getElementById("btnPedirCarta");
const btnPlantarse = document.getElementById("btnPlantarse");
const contadorPantalla = document.getElementById("contadorPantalla");
const imgCarta = document.getElementById("imgCarta") as HTMLImageElement;
const feedback = document.getElementById("feedback");
const btnVerFuturo = document.getElementById("btnVerFuturo");
const btnReiniciar = document.getElementById("btnReiniciar");

let barajaRestante = [...barajaInicial];
let contador: number = 0;
let btnPlantarseDesactivo: boolean = true;
let modoQueHabriaPasado: boolean = false;
let modoFinalPartida: boolean = false;

const dameCarta = (): void => {
	const posicionArray: number = Math.floor(Math.random() * barajaRestante.length);
	let cartaObtenida = barajaRestante.splice(posicionArray, 1)[0];
	console.log(barajaInicial);
	console.log(barajaRestante);
	sumaValor(cartaObtenida.valor);
	mostrarCarta(cartaObtenida.carta);
	if (modoQueHabriaPasado) {
		modoFinalPartida = true;
		cambiarBotones();
	} else {
		activarDesactivarBoton(true);
	}
};

const mostrarCarta = (carta: string): void => {
	if (imgCarta) imgCarta.src = `/src/assets/${carta.toLowerCase()}.jpg`;
};
const sumaValor = (valorCarta: number): void => {
	contador = contador + valorCarta;
	muestraPuntuacion();
	comprobarCarta();
};

const muestraPuntuacion = (): void => {
	if (contadorPantalla) contadorPantalla.innerText = contador.toString();
};

const comprobarCarta = (): void => {
	if (contador === 7.5) {
		if (modoQueHabriaPasado) {
			mostrarFeedback("¡La hubieras clavado!");
		} else {
			mostrarFeedback("¡Lo has clavado! ¡Enhorabuena!");
		}
		modoFinalPartida = true;
		cambiarBotones();
	} else if (contador > 7.5) {
		if (modoQueHabriaPasado) {
			mostrarFeedback("Hubieras perdido");
		} else {
			mostrarFeedback("Game Over");
		}

		modoFinalPartida = true;
		cambiarBotones();
	} else {
		if (modoQueHabriaPasado) {
			mostrarFeedback("Hubieras mejorado");
		} else {
			mostrarFeedback("¡Vas bien!");
		}
	}
};

const comprobarResultado = (): void => {
	if (!btnPlantarseDesactivo) {
		switch (true) {
			case contador <= 4:
				mostrarFeedback("Has sido muy conservador");
				break;
			case contador > 4 && contador < 6:
				mostrarFeedback("Te ha entrado el canguelo eh?");
				break;
			case contador >= 6 && contador < 7.5:
				mostrarFeedback("Casi casi...");
				break;
			default:
				mostrarFeedback("La has liado");
				break;
		}
		modoQueHabriaPasado = true;
		cambiarBotones();
	}
};

const mostrarFeedback = (mensaje: string): void => {
	if (feedback) feedback.innerText = mensaje;
	cambiarBotones();
};

const reiniciar = (): void => {
	barajaRestante = [...barajaInicial];
	contador = 0;
	modoFinalPartida = false;
	modoQueHabriaPasado = false;
	mostrarFeedback("Volvamos a jugar!");
	if (imgCarta) imgCarta.src = `/src/assets/back.jpg`;
	muestraPuntuacion();
	cambiarBotones();
	activarDesactivarBoton(false);
};

const cambiarBotones = (): void => {
	if (btnPedirCarta && btnPlantarse && btnReiniciar && btnVerFuturo) {
		if (modoFinalPartida) {
			btnPedirCarta.style.display = "none";
			btnPlantarse.style.display = "none";
			btnReiniciar.style.display = "inline-block";
			btnVerFuturo.style.display = "none";
		} else if (modoQueHabriaPasado) {
			btnPedirCarta.style.display = "none";
			btnPlantarse.style.display = "none";
			btnReiniciar.style.display = "inline-block";
			btnVerFuturo.style.display = "inline-block";
		} else {
			btnPedirCarta.style.display = "inline-block";
			btnPlantarse.style.display = "inline-block";
			btnReiniciar.style.display = "none";
			btnVerFuturo.style.display = "none";
		}
	}
};
const activarDesactivarBoton = (activar: boolean): void => {
	if (btnPlantarse) {
		if (activar) {
			btnPlantarse.classList.remove("desactivo");
			btnPlantarseDesactivo = false;
		} else {
			btnPlantarse.classList.add("desactivo");
			btnPlantarseDesactivo = true;
		}
	}
};

muestraPuntuacion();
btnPedirCarta?.addEventListener("click", dameCarta);
btnPlantarse?.addEventListener("click", comprobarResultado);
btnReiniciar?.addEventListener("click", reiniciar);
btnVerFuturo?.addEventListener("click", () => {
	modoQueHabriaPasado = true;
	dameCarta();
});
