// CLASES CONSTRUCTORAS Y FUNCIONES CREADORAS
// Array de usuarios + Función constructora + función que agrega cada usuario nuevo al array y lo guarda en localstorage

class Usuario {
    constructor(perfil, nombre, email, password) {
        this.perfil = perfil;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.notas = [];
    }
}

class Nota {
    constructor(nota, fecha) {
        this.nota = nota;
        this.fecha = fecha;
    }
}

function usuarioToArray(perfil, nombre, email, password) {
    if ((usuarios.some(u => u.email == email) == false)) {  //si ese usuario ya existe no lo vuelve a crear
        const newUser = new Usuario(perfil, nombre, email, password);
        usuarios.push(newUser);
    }
    let index = usuarios.length - 1

    //Chequea si ya existen ejercicios cargados, y agrega un 0 como nota en los ejercicios en los que el usuario no tiene nota.
    let faltanNotas = ejercicios !== null ? (0 || ejercicios.length) - (usuarios[index].notas.length) : 0;

    if ((faltanNotas >= 0) && usuarios[index].perfil == "alumno") {
        for (let i = 0; i < faltanNotas; i++) {
            const nuevaNota = new Nota(0, (new Date().toLocaleDateString('en-GB')));
            usuarios[index].notas.push(nuevaNota);
        }
    }

    localStorage.setItem("usuariosMV", JSON.stringify(usuarios));
}

//Array de ejercicios + Función constructora + función que agrega cada ejercicio nuevo al array y los guarda en localstorage

class Ejercicio {
    constructor(vencimiento, titulo, imagen, enfoque, voltimetro, diafragma) {
        this.num = 0;
        this.vencimiento = new Date(vencimiento).toLocaleDateString('en-GB');
        this.titulo = titulo;
        this.imagen = imagen;
        this.enfoque = enfoque;
        this.voltimetro = voltimetro;
        this.diafragma = diafragma;
        this.preguntas = [];
    }
}

class Pregunta {
    constructor(pregunta, opc1, opc2, opc3) {
        this.pregunta = pregunta;
        this.opc1 = opc1;
        this.opc2 = opc2;
        this.opc3 = opc3;
    }
}

function actualizarNum() {
    for (let i = 0; i < ejercicios.length; i++) {
        ejercicios[i].num = + i
    }
}

function ejercicioToArray(vencimiento, titulo, imagen, enfoque, voltimetro, diafragma, pregunta, opc1, opc2, opc3) {
    const nuevoEjercicio = new Ejercicio(vencimiento, titulo, imagen, enfoque, voltimetro, diafragma);
    ejercicios.push(nuevoEjercicio);
    actualizarNum();

    const nuevaPregunta = new Pregunta(pregunta, opc1, opc2, opc3);
    let index = ejercicios.length - 1
    ejercicios[index].preguntas.push(nuevaPregunta);

    localStorage.setItem("ejerciciosMV", JSON.stringify(ejercicios));

    const nuevaNota = new Nota(0, (new Date().toLocaleDateString('en-GB')));    //le pone de nota a todos los usuarios 0 por default
    usuarios.forEach(usuario => {
        usuario.perfil == "alumno" && usuario.notas.push(nuevaNota);
        localStorage.setItem("usuariosMV", JSON.stringify(usuarios));
    })
}



// INTERACCIÓN CON EL LOCALSTORAGE: Recupera usuarios y ejercicios del localstorage
//si no hay, crea por primera vez los arrays e introduce algunos objetos para que haya datos cargados, aunque se pueden crear durante la interacción

let usuarios = JSON.parse(localStorage.getItem("usuariosMV"));
let ejercicios = JSON.parse(localStorage.getItem("ejerciciosMV"));

//Esto sólo ocurre en la página de registro!
if (window.location.href.includes("registration.html") == true) {

    if (usuarios === null) {
        usuarios = [];
        usuarioToArray("profesor", "Profe", "profe@gmail.com", "profe");
        usuarioToArray("alumno", "Luciana", "alumno@gmail.com", "alumno");
        usuarioToArray("alumno", "Álvaro", "alumno2@gmail.com", "alumno2");
        usuarioToArray("alumno", "Mariano", "alumno3@gmail.com", "alumno3");
        usuarioToArray("alumno", "Josefina", "alumno4@gmail.com", "alumno4");
    }

    if (ejercicios === null) {
        ejercicios = [];
        ejercicioToArray("2023-08-10", "Análisis y reconocimiento de tejido vegetal con tinción", "vegetal.avif", 0, 100, 100, "¿Qué tinción se utilizó?", "Safranina-Fast green", "Azul de anilina", "Violeta de Cresilo");
        ejercicioToArray("2023-08-28", "Microscopía de fluorescencia de quistes renales", "ej_fluorescencia.jpg", 0, 100, 100, "¿Qué estructura se reconoce?", "Núcleos", "Tubulina", "Filamentos");
        ejercicioToArray("2023-09-02", "Visualización de preparado de aparato respiratorio", "laringe.jpg", 0, 100, 100, "¿Qué tinción se utilizó?", "Hematoxilina-eosina", "Azul de metileno", "Violeta de Genciana");
        ejercicioToArray("2023-07-30", "Visualización de tejido conectivo con Alcian blue - PAS", "alcian-blue.jpg", 0, 100, 100, "¿Qué estructura se reconoce en azul?", "Cartílago", "Epitelio", "Membrana");
        ejercicioToArray("2023-09-17", "Cálculo del índice mitótico en tinción de tejido vegetal", "mitosis.avif", 0, 100, 100, "¿Cuántas figuras mitóticas encuentra?", "10", "8", "5");

        //Cambio algunas notas y fechas random para que los datos sean más interesantes:
        usuarios.forEach(function (usuario, index, usuarios) {
            usuarios[index].notas.forEach(function (nota, index, notas) {
                notas[index] = {
                    nota: Math.floor(Math.random() * (10 - 0)),
                    fecha: new Date(`2023-06-${Math.floor(Math.random() * (30 - 1) + 1)}`).toLocaleDateString('en-GB')
                }
            })
        })

        localStorage.setItem("usuariosMV", JSON.stringify(usuarios));
    }
}