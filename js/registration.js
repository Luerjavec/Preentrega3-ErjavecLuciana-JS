// Tomamos los usuarios y ejercicios cargados en el localstorage

usuarios = JSON.parse(localStorage.getItem("usuariosMV"));
ejercicios = JSON.parse(localStorage.getItem("ejerciciosMV"));

console.log(usuarios);
console.log(ejercicios);

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
        alert("El mail " + registerMail + "ya se encuentra registrado. Ingrese otro mail");
    } else {
        usuarioToArray(registerPerfil, registerNombre, registerMail, registerPassword);
        alert("Listo " + registerNombre + "! Tu cuenta ha fue creada. Para ingresar a tu cuenta, tocá aceptar.");
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
        alert("datos incorrectos");
    }
};