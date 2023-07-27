// PASO 1) CARGA DE USUARIOS Y EJERCICIOS
// Tomamos los usuarios y ejercicios cargados en el localstorage

usuarios = JSON.parse(localStorage.getItem("usuariosMV"));
ejercicios = JSON.parse(localStorage.getItem("ejerciciosMV"));

// PASO 2) Chequeamos que se haya iniciado sesión, sino lo redirigimos al inicio de sesión. Si inición sesión nos quedamos con el index del usuario

const sesion = JSON.parse(sessionStorage.getItem("sesionMV"));

if ((usuarios === null) || sesion === null) {
    Swal.fire({
        title: `Sesión caducada`,
        text: `Volvé a iniciar sesión para acceder`,
        icon: 'warning',
        iconColor: '#6a1635',
        confirmButtonText: 'OK'
    }).then(() => {
        window.location = "registration.html";
    })
}

let indexUs = usuarios.findIndex(u => u.email == sesion.email);

//PASO 3) MOSTRAMOS EL MENÚ
// Dependiendo si es profe o alumno el menú de la izquierda cambia un poquito

function mostrarMenuLateral() {
    const menu = document.querySelector("#notas");
    usuarios[indexUs].perfil == "profesor" && (menu.innerHTML = '<ion-icon name="people"></ion-icon> Mis Alumnos');
    const account = document.querySelector(".account-name");
    account.innerHTML = `<ion-icon name="person"></ion-icon> Sesión: ${usuarios[indexUs].nombre}`;
}

// Siempre al tocar salir vuelve a la página de registro y elimina la sesión del sessionStorage

function cerrarSesion() {
    const salir = document.querySelector("#salir");
    salir.addEventListener("click", () => {
        sessionStorage.removeItem("sesionMV");
        window.location = "registration.html";
    })
}

window.location.href.includes("dashboard") == true && (mostrarMenuLateral(), cerrarSesion())

// Sólo si estamos en la página de inicio, le da la bienvenida

if (window.location.href.includes("dashboard-home.html") == true) {
    const bienvenida = document.querySelector("#bienvenida");
    const perfil = document.querySelector("#perfil");

    bienvenida.innerText = `¡Bienvenido al microscopio virtual ${usuarios[indexUs].nombre}! `
    perfil.innerText = `Perfil : ${usuarios[indexUs].perfil}`
}