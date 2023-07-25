// DASHBOARD - interacción con el DOM

const contenedorDashboard = document.querySelector("#contenedor-dashboard");
const crearBtn = document.querySelector("#crear-btn");
usuarios[indexUs].perfil == "profesor" ? crearBtn.classList.add("visible") : crearBtn.classList.add("oculto");
const ejercicioBoton = document.querySelectorAll(".ejercicio__btn");

function menuEjercicios() {
    ejercicios.forEach(ejercicio => {
        let textRight, textLeft, icon;

        if (usuarios[indexUs].perfil == "profesor") {
            textLeft = `Preguntas: ${ejercicio.preguntas.length}`;
            textRight = `Vence: ${ejercicio.vencimiento}`;
            Btns = `<button class="ejercicio__edit edit-btn" id="${ejercicio.num}"><ion-icon name="settings"></ion-icon></button>
                    <button class="ejercicio__edit delete-btn" id="${ejercicio.num}"><ion-icon name="trash"></ion-icon></button>`
            icon = `<ion-icon name="eye"></ion-icon>`;

        } else {
            textLeft = usuarios[indexUs].notas[ejercicio.num].nota !== 0 ? "Completo" : " Incompleto";
            textRight = `${usuarios[indexUs].notas[ejercicio.num].nota} (${usuarios[indexUs].notas[ejercicio.num].fecha})`;
            Btns = `<div></div>`;
            icon = `<ion-icon class="arrow" name="arrow-up"></ion-icon>`;
        }

        contenedorDashboard.innerHTML += `
            <div class = "ejercicio">
                <div class="ejercicio-header">
                    <img src="../media/ejercicios/${ejercicio.imagen}" alt="${ejercicio.titulo}" class="ejercicio__previewimg"></img>
                    <h3 class="ejercicio__titulo"> ${ejercicio.titulo}</h3>
                </div>
                <div class="ejercicio-detalles">
                    <h5 class="ejercicio__text-left"><ion-icon name="checkmark-circle"></ion-icon></ion-icon> ${textLeft}</h5>
                    <h5 class="ejercicio__text-right"><ion-icon name="flag"></ion-icon> ${textRight}</h5>
                </div>
                <div class="ejercicio-footer">
                    <div class="btn-container"> ${Btns} </div>
                    <button class="ejercicio__btn ver" id="${ejercicio.num}">${icon}</button>
                    
                </div>
            </div>    
            `;
    })
}

// Si elige un ejercicio, guardamos en la sesión cuál eligió para retomarlo en la plataforma

function visualizarEjercicio() {
    const ejercicioBoton = document.querySelectorAll(".ejercicio__btn");
    ejercicioBoton.forEach(boton => {
        boton.addEventListener("click", (e) => {
            sessionStorage.setItem("ejercicioElegido", JSON.stringify(boton.id)); //el id es igual al número de ejercicio
            window.location = "plataforma.html";
        })
    })
}

function editarEjercicio() {
    const editarBoton = document.querySelectorAll(".ejercicio__edit");
    editarBoton.forEach(boton => {
        boton.addEventListener("click", (e) => {
            sessionStorage.setItem("ejercicioElegido", JSON.stringify(boton.id)); //el id es igual al número de ejercicio
            let btnType = boton.classList.toString()

            if (btnType.includes("delete-btn")) {
                alert("delete")
                ejercicios.splice(boton.id, 1);
                actualizarNum();
                localStorage.setItem("ejerciciosMV", JSON.stringify(ejercicios));
                window.location = "dashboard-ejercicios.html"

            } else if (btnType.includes("edit-btn")) {
                sessionStorage.setItem("accionEjercicios", JSON.stringify("editar"))
                window.location = "dashboard-crear.html"
            }
        })
    })
}

function crearEjercicio() {
    const crearBoton = document.querySelector("#crearBtn")
    crearBoton.addEventListener("click", (e) => {
        sessionStorage.setItem("accionEjercicios", JSON.stringify("crear"))
        window.location = "dashboard-crear.html"
    })
}


menuEjercicios();
visualizarEjercicio();
usuarios[indexUs].perfil == "profesor" && crearEjercicio();
usuarios[indexUs].perfil == "profesor" && editarEjercicio();