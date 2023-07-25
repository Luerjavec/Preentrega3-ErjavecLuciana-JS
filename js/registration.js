// Dato

Swal.fire({
    html: `</p>Se puede crear un usuario nuevo o usar uno precargado de prueba:
    <br>profe@gmail.com, contraseña: profe </br> alumno@gmail.com, contraseña: alumno</br>`,
    icon: 'info',
    iconColor: '#0a2451',
    confirmButtonText: 'OK'
})

// Tomamos los usuarios y ejercicios cargados en el localstorage

usuarios = JSON.parse(localStorage.getItem("usuariosMV"));
ejercicios = JSON.parse(localStorage.getItem("ejerciciosMV"));

// animaciones intercambiantes formulario ingresar vs. crear cuenta

const registrationContainer = document.querySelector(".registration-container");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");

registerLink.addEventListener("click", () => {
    registrationContainer.classList.add("active");
});
loginLink.addEventListener("click", () => {
    registrationContainer.classList.remove("active");
});

// interaccion con el DOM para iniciar sesión o para registrarse

const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    iniciarSesion();
});

const registerForm = document.querySelector(".register-form");
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    crearCuenta();
    registerForm.reset();
});

function crearCuenta() {
    const registerNombre = document.querySelector("#register-user").value.toLowerCase();
    const registerMail = document.querySelector("#register-mail").value.toLowerCase();
    const registerPassword = document.querySelector("#register-password").value;
    const registerPerfil = document.querySelector('input[name=perfil]:checked').value;

    if ((usuarios.some(u => u.email == registerMail.toLowerCase())) == true) {
        Swal.fire({
            title: `Mail existente`,
            text: `El mail ${registerMail} ya se encuentra registrado`,
            icon: 'warning',
            iconColor: '#6a1635',
            confirmButtonText: 'OK'
        })
    } else {
        usuarioToArray(registerPerfil, registerNombre, registerMail, registerPassword);
        Swal.fire({
            title: `Cuenta creada`,
            text: `Listo ${registerNombre}, ya podés usar tu cuenta para iniciar sesión`,
            icon: 'success',
            iconColor: '#0a5124',
            confirmButtonText: 'OK'
        })
    }
};

function iniciarSesion() {
    const loginMail = document.querySelector("#login-mail").value;
    const loginPassword = document.querySelector("#login-password").value;
    let userExists = (usuarios.some(u => u.email == loginMail.toLowerCase()));
    let indexUs = usuarios.findIndex(u => u.email == loginMail.toLowerCase());

    if (userExists == true && usuarios[indexUs].password == loginPassword) {
        sessionStorage.setItem("sesionMV", JSON.stringify(usuarios[indexUs])); //guarda los datos del usuario en la sesión para recuperarlos en el dashboard
            window.location = "dashboard-home.html";        
    } else {
        Swal.fire({
            title: 'Datos incorrectos',
            icon: 'error',
            iconColor: '#6a1635',
            confirmButtonText: 'OK'
        })
    }
};