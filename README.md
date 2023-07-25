# Preentrega3-ErjavecLuciana
Tercera preentrega - curso javascript coder

<b><h1>Microscopio virtual</h1></b>
Esta app web intenta simular un microscopio virtual de biología. 

Los microscopios funcionan como editores de video, mediante distintos controladores tipo ruedita o slider van cambiando el brillo (mediante el voltímetro), contraste (mediante el diafragma), enfoque o blur (mediante el macrométrico).

<b><h2>Estructura de los datos</h2></b>
Los datos que usa el proyecto salen de dos arrays de objetos: 
Array de usuarios. Los objetos “usuario” de este array tienen como propiedades nombre, mail, contraseña, notas y perfil. El perfil puede ser de alumno o de profesor, y la plataforma se va a mostrar diferente de acuerdo a cuál tengan.
Array de ejercicios. Los ejercicios tienen como propiedades título, fecha de vencimiento, parámetros de enfoque ideales y preguntas con opciones.

Los objetos dentro de cada array se crean a partir de clases constructoras definidas en el archivo usuarios&objetos.js. Además, se crea una función para guardar cada objeto nuevo en el array correspondiente. En el mismo archivo se detecta si no existen usuarios o ejercicios y se crean algunos de prueba. Al final se guardan ambos arrays en el LocalStorage.
Este archivo es linkeado primero en todos los .html que los necesiten.

<b><h3>Página de inicio de sesión - registro</h3></b>
En esta página el usuario puede acceder a la plataforma con los datos de un usuario existente o crear un usuario nuevo, que se guarda como nuevo objeto en el array de usuarios del LocalStorage, y luego usar esos datos para acceder a la plataforma. Los datos del usuario que ingresó se guardan en el SesionStorage para recuperarlos en la plataforma. El archivo linkeado para realizar esto es registration.js

<b><h3>Dashboard</h3></b>
En todas las páginas del Dashboard lo primero que necesitamos hacer es recuperar el array de usuarios y de ejercicios y sus clases constructoras (desde el localStorage) y los datos del usuario que ingresó (desde el sesionStorage) para mostrarlos en la plataforma. Si no hay datos, le pedimos al usuario que vuelva a iniciar sesión. El archivo que realiza esto es Dashboard.js y está linkeado en todas las secciones del dashboard.

<b><h3>Dashboard - Inicio</h3></b>
Le da la bienvenida al usuario que ingresó usando las propiedades de nombre y tipo de perfil.

<b><h3>Dashboard - Ejercicios</h3></b>
Muestra la lista de ejercicios disponibles en tarjetas con algunos datos como título, una imagen de vista previa y botones. Para esto crea una plantilla html dentro del archivo de javascript, y usa métodos como create.html y html.append. Esta página está linkeada a usuarios&ejercicios.js y dashboard.js como el resto, pero además a dashboard-ejercicios.js

<li>Si el perfil del usuario es alumno: <br>
En la tarjeta además vé si completó o no el ejercicio, y su nota y fecha en la que lo completó. En la esquina inferior derecha un botón que redirige al usuario a la plataforma para resolver cada ejercicio y obtener una nota. El id del botón del ejercicio es igual a su índice dentro del array de ejercicios, y se guarda en el SesionStorage.

La plataforma muestra la imagen de ese ejercicio, y sus preguntas correspondientes. En la plataforma, el alumno debe ajustar tres parámetros (diafragma, voltímetro, macrométrico) para lograr enfocar la imagen del ejercicio. Esto le da una nota, que se obtiene calculando qué tan alejado estuvo el enfoque del alumno con respecto al enfoque ideal.
Además, a la derecha tiene una pregunta con opciones.
La nota final del ejercicio es el promedio entre la nota del enfoque y la nota de la pregunta. 

<li>Si el perfil de usuario es profesor: <br>
Las tarjetas de los ejercicios muestran la fecha de vencimiento del ejercicio y cuántas preguntas tiene. Cada tarjeta tiene en la esquina inferior derecha un botón para ingresar a la plataforma y previsualizar el ejercicio similar al de los alumnos, y en la esquina inferior izquierda otros dos botones: uno para eliminar el ejercicio y otro para editar los datos del ejercicio. 
Además de las tarjetas de ejercicios, si el usuario es profesor tiene disponible una tarjeta de “Crear ejercicio”, que redirige a una página para crear ejercicios. 
  Nota: <i>El creador permite simular la subida de una imagen, sin embargo, al no trabajar con un servidor <u>la imagen nunca se sube a ningún lado</u>u, es sólo una simulación</i>i

<b><h3>Dashboard - Lista</h3></b>
Crea una lista dinámica de 4 columnas de acuerdo al perfil.
Si el perfil es alumno, muestra los ejercicios disponibles, si lo completó o no y su nota, buscando dentro del array de ejercicios.
Si el perfil es docente, muestra una lista de alumnos, sus notas y su promedio, buscando dentro del array de usuarios.

El proyecto puede visualizarse en:
https://luerjavec.github.io/Preentrega3-ErjavecLuciana-JS/
