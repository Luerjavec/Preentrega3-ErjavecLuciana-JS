// Buscamos cuál ejercicio eligió para mostrar la plataforma según ese ejercicio

const numEjer = JSON.parse(sessionStorage.getItem("ejercicioElegido"));
const ejer = ejercicios[numEjer]

// CARGA DE LA PLATAFORMA
// Mostramos la imagen y las preguntas correspondientes al ejercicio elegido. El usuario = profesor no tiene el botón de enviar.

function mostrarPlataforma() {
    const enviarBtn = document.querySelector("#enviar-ejercicio");
    usuarios[indexUs].perfil == "profesor" && enviarBtn.classList.add("d-none");

    const imagen = document.querySelector("#ejercicio-img-display");
    ejer.imagen.includes("fake") == false ? imagen.src = `../media/ejercicios/${ejer.imagen}` : imagen.src = `../media/ejercicios/imagen-falsa.avif`
    ;

    const preguntasTitulo = document.querySelector(".subtitulo-plataforma");
    preguntasTitulo.innerText = ejer.titulo;
}

function mostrarPreguntas() {
    const preguntasLista = document.querySelector(".preguntas-lista");
    ejer.preguntas.forEach(pregunta => {
        preguntasLista.innerHTML += `
        <li>
            <div class="form-group">
                <label>${pregunta.pregunta}</label>
                <select id=pregunta class="form-select">
                    <option value="0">-Elegí la respuesta correcta-</option>
                    <option value="1">${pregunta.opc1}</option>
                    <option value="2">${pregunta.opc2}</option>
                    <option value="3">${pregunta.opc3}</option>
                </select>
            </div>
        </li>
            `;
    })
}

mostrarPlataforma();
mostrarPreguntas();

// PASO 3: FUNCIONES QUE PERMITEN INTERACCIÓN DEL USUARIO CON EL MICROSCOPIO
// Hacemos que la imagen se edite cuando el usuario interaccionar con los Sliders del microscopio

const voltimetroSlider = document.querySelector("#voltimetroSlider");
const diafragmaSlider = document.querySelector("#diafragmaSlider");
const macrometricoSlider = document.querySelector("#macrometricoSlider");
const objetivo = document.querySelector("#lenteObjetivo");

// Valores iniciales:
let brightness = voltimetroSlider.value = 20;
let contrast = diafragmaSlider.value = 200;
let enfoque = macrometricoSlider.value = 25;
objetivo.value = "4";
let zoom = objetivo.value / 4;

function aplicarFiltro() {
    const imagen = document.querySelector("#ejercicio-img-display");
    imagen.style.filter = `contrast(${contrast}%) brightness(${brightness}%) blur(${enfoque}px)`;
    imagen.style.transform = `scale(${zoom})`;
}

aplicarFiltro();

// Algunos ajustes de brillo, contraste y enfoque que hacen que el efecto sea más realista al microscopio real

function actualizarFiltro() {
    if (voltimetroSlider.value > 100) {
        brightness = voltimetroSlider.value;
        contrast = (diafragmaSlider.value - (voltimetroSlider.value) / 7);
    }
    if (voltimetroSlider.value <= 100) {
        brightness = voltimetroSlider.value;
        contrast = diafragmaSlider.value;
    } else {
        brightness = voltimetroSlider.value;
        contrast = diafragmaSlider.value;
    }
    enfoque = macrometricoSlider.value > 0 ? macrometricoSlider.value : macrometricoSlider.value * (-1);
    zoom = objetivo.value / 4;

    aplicarFiltro();
}

voltimetroSlider.addEventListener("input", actualizarFiltro);
diafragmaSlider.addEventListener("input", actualizarFiltro);
macrometricoSlider.addEventListener("input", actualizarFiltro);
objetivo.addEventListener("input", actualizarFiltro);

// FUNCIONES QUE LE DAN LAS NOTAS
// Al tocar el botón enviar, guardamos la nota (que sale del promedio del enfoque y la pregunta contestada por el alumno)

function darNotaEnfoque() {
    //Defino rubrica aprobación, el valor es la nota y el índex del array es cuánto se alejó el usuario del valor ideal.
    const rubricaNotas = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

    let difVoltimetroIdeal = Math.round((ejer.voltimetro - voltimetroSlider.value) / 10); //(la nota baja 1 pto cada 10 unidades que se aleja)
    if (difVoltimetroIdeal < 0) { difVoltimetroIdeal = difVoltimetroIdeal * (-1) };

    let difDiafragmaIdeal = Math.round((ejer.diafragma - diafragmaSlider.value) / 10); //(la nota baja 1 pto cada 10 unidades que se aleja)
    if (difDiafragmaIdeal < 0) { difDiafragmaIdeal = difDiafragmaIdeal * (-1) };

    let difMacrometricoIdeal = Math.round((ejer.enfoque - macrometricoSlider.value)); //(la nota baja 1 pto cada 1 unidad que se aleja)
    if (difMacrometricoIdeal < 0) { difMacrometricoIdeal = difMacrometricoIdeal * (-1) };

    let notaVoltimetro = rubricaNotas[difVoltimetroIdeal] || 0;
    let notaDiafragma = rubricaNotas[difDiafragmaIdeal] || 0;
    let notaMacrometrico = rubricaNotas[difMacrometricoIdeal] || 0;

    return Math.round((notaVoltimetro + notaDiafragma + notaMacrometrico) / 3);
}

function darNotaPreguntas() {
    const opcion = document.querySelector("#pregunta"); //la opción correcta siempre es la 1
    let notaPreguntas = opcion.value == 1 ? 10 : 0;
    return notaPreguntas;
}

//Obtenemos la nota y fecha y la guardamos en el array de notas del usuario en el LocalStorage. Luego redirige al dashboard de ejercicios

function notaToArray() {
    const respuesta = document.querySelector(".preguntas-form")
    respuesta.addEventListener("submit", (e) => {
        e.preventDefault();
        let notaEnfoque = darNotaEnfoque();
        let notaPreguntas = darNotaPreguntas()
        let notaFinal = Math.round((notaEnfoque + notaPreguntas) / 2);
        let fecha = new Date().toLocaleDateString('en-GB');

        const nuevaNota = new Nota(notaFinal, fecha);
        usuarios[indexUs].notas.splice(numEjer, 1, nuevaNota);
        localStorage.setItem("usuariosMV", JSON.stringify(usuarios));

        Swal.fire({
            title: `${notaFinal}`,
            text: `Nota enfoque: ${notaEnfoque}, Nota pregunta: ${notaPreguntas}. Nota final : ${notaFinal}`,
            icon: 'success',
            iconColor: '#0a5124',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location = "dashboard-ejercicios.html";
            }
        })
    });
}

notaToArray();