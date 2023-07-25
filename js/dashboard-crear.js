// Buscamos si está creando un ejercicio o si está editando un ejercicio

const accion = JSON.parse(sessionStorage.getItem("accionEjercicios"));
accion.includes("edit-btn")

const numEjer = JSON.parse(sessionStorage.getItem("ejercicioElegido"));
const ejer = ejercicios[numEjer]


// Interacción con el DOM - parte de la derecha: Carga de imagen para el ejercicio.

const elegirImagenBtn = document.querySelector(".choose-img");
const elegirImagenInput = document.querySelector(".file-input");
const previewImg = document.querySelector(".preview-img img");
const crearBtn = document.querySelector("#crear-ejercicio-button");

function loadImage() {
    let file = elegirImagenInput.files[0];
    if (!file) return;
    previewImg.className = "visible";
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", (e) => {
        e.preventDefault();

    });
}

elegirImagenInput.addEventListener("change", loadImage);
elegirImagenBtn.addEventListener("click", () => elegirImagenInput.click());

// Interacción con el DOM - parte de la izquierda: formulario con inputs de datos
// Seleccionamos los inputs del formulario desde el DOM y creamos variables

const nuevoTitulo = document.querySelector("#nuevo-titulo");

const nuevaImagen = document.querySelector("#nueva-imagen");
const nuevaPregunta = document.querySelector("#nueva-pregunta");
const opc1 = document.querySelector("#nueva-opc1");
const opc2 = document.querySelector("#nueva-opc2");
const opc3 = document.querySelector("#nueva-opc3");

// Si está editando el ejercicio, mostramos el formulario ya completo con los datos previos del ejercicio.

function mostrarEditarEjercicio() {
    nuevoTitulo.value = ejer.titulo;
    document.querySelector("#nuevo-vencimiento").value = new Date().toISOString().split('T')[0];
    nuevaPregunta.value = ejer.preguntas[0].pregunta;
    opc1.value = ejer.preguntas[0].opc1;
    opc2.value = ejer.preguntas[0].opc2;
    opc3.value = ejer.preguntas[0].opc3;
}

// Al tocar submit, si está editando se edita un objeto existente en el array. Si está creando, se crea un objeto nuevo.

function editarEjercicio() {
    const form = document.querySelector(".crear-form")
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let nuevoVencimiento = new Date(document.querySelector("#nuevo-vencimiento").value)
        nuevoVencimiento = nuevoVencimiento.setDate(nuevoVencimiento.getDate() + 1);
        
        ejer.titulo = nuevoTitulo.value;
        ejer.vencimiento = new Date(nuevoVencimiento).toLocaleDateString('en-GB');
        ejer.preguntas[0].pregunta = nuevaPregunta.value;
        ejer.preguntas[0].opc1 = opc1.value;
        ejer.preguntas[0].opc2 = opc2.value;
        ejer.preguntas[0].opc3 = opc3.value;

        localStorage.setItem("ejerciciosMV", JSON.stringify(ejercicios));
        window.location = "dashboard-ejercicios.html";
    });
}

function crearEjercicio() {
    const form = document.querySelector(".crear-form")
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        let nuevoVencimiento = new Date(document.querySelector("#nuevo-vencimiento").value)
        nuevoVencimiento = nuevoVencimiento.setDate(nuevoVencimiento.getDate() + 1);

        ejercicioToArray(nuevoVencimiento, nuevoTitulo.value, nuevaImagen.value, 0, 100, 100,
            nuevaPregunta.value, opc1.value, opc2.value, opc3.value);
        window.location = "dashboard-ejercicios.html";
    });
}

accion.includes("editar") && mostrarEditarEjercicio()
accion.includes("editar") ? editarEjercicio() : crearEjercicio()