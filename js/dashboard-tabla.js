// DASHBOARD TABLA
//Si es perfil = profesor, la tabla va a mostrar a los alumnos y notas, si es alumno, una lista de los ejercicios y sus notas

const tituloPrincipal = document.querySelector("#titulo-principal");
tituloPrincipal.innerText = usuarios[indexUs].perfil == "profesor" ? "Mis alumnos" : "Mis notas";
const tableHead = document.querySelector("thead");
const tableBody = document.querySelector("tbody");

//Creación dinámica del header de las tablas
let headers = usuarios[indexUs].perfil == "profesor" ? ["#","Nombre","Notas","Promedio"] : ["#","Ejercicio","Estado","Nota"];

function createTable (headers) {
    const cols = headers;
    let tags = "<tr>";
        for (i=0; i < cols.length; i++) {
            tags += `<th>${cols[i]}</th>`;
        }
    tags += "</tr>";
    tableHead.innerHTML = tags;
    usuarios[indexUs].perfil == "profesor" ? tableBodyProfe() : tableBodyAlumno();
}

//Creación dinámica del body de las tablas
console.log(usuarios)

function tableBodyAlumno() {
    let tags = "";
    ejercicios.map(d => {
        let nota = usuarios[indexUs].notas[d.num].nota
        tags += `<tr>
                <td>${d.num+1}</td>
                <td>${d.titulo}</td>
                <td>${nota == 0 ? "Incompleto" : "Completo"}</td>
                <td>${nota}</td>
            </tr>`;
    })
    tableBody.innerHTML = tags;
}

function tableBodyProfe() {
    let tags = "";
    usuarios.map(d => {
        const numero = usuarios.findIndex(u => u == d) + 1
        const notas = d.notas.map(n=>n.nota).join(" - ");
        const promedio = d.perfil == "alumno" ? (d.notas.map(n=>n.nota)).reduce((a,b)=>a+b, 0)/d.notas.length : "Profe";
        tags += `<tr>
                <td>${numero}</td>
                <td>${d.nombre}</td>
                <td>${notas}</td> 
                <td>${promedio}</td>
            </tr>`;
    })
    tableBody.innerHTML = tags;
}

createTable(headers);