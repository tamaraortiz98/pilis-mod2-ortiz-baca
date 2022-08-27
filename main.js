console.log('main.js success');

const APP_ID = '40d9ba1e0bbd81c9f28c60308da60a39';
const LAT = '-24.184014695495744';
const LON = '-65.33153392590026';

const $ = (element) => document.getElementById(element);

/* PROMESA CON .THEN Y .CATCH */
/* function clima() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${APP_ID}&units=metric&lang=es`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let ubicacion = document.getElementById('ubicacion');
      ubicacion.innerHTML = data.name;
      let descripcion = document.getElementById('descripcion');
      let string = data.weather[0].description;
      descripcion.innerHTML = string.charAt(0).toUpperCase() + string.slice(1);
      let temperatura = document.getElementById('temperatura');
      temperatura.innerHTML = 'Temperatura: ' + Math.round(data.main.temp) + ' °C';
      let humedad = document.getElementById('humedad');
      humedad.innerHTML = 'Humedad: ' + data.main.humidity + '%';
      let presion = document.getElementById('presion');
      presion.innerHTML = 'Presión: ' + data.main.pressure + ' hPa';
    })
    .catch((error) => console.log(error));
} */

/* PROMESA CON ASYNC Y AWAIT */
async function clima() {
  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${APP_ID}&units=metric&lang=es`
    );
    let data = await response.json();
    console.log(data);
    $('ubicacion').innerHTML = data.name;
    let descripcion = data.weather[0].description;
    $('descripcion').innerHTML = descripcion.charAt(0).toUpperCase() + descripcion.slice(1);
    $('temperatura').innerHTML = 'Temperatura: ' + Math.round(data.main.temp) + ' °C';
    $('humedad').innerHTML = 'Humedad: ' + data.main.humidity + '%';
    $('presion').innerHTML = 'Presión: ' + data.main.pressure + ' hPa';
  } catch (error) {
    console.log('Algo paso, no se pudo resolver...');
  }
}

clima();

/* FORMULARIO DE REGISTRO */
function onClick(event) {
  event.preventDefault(); /* anula la opcion enviar del boton y permite procesar los datos */

  const mensaje = {
    comercio: $('comercio').value,
    titular: $('titular').value,
    celular: $('celular').value,
  };
  console.log(mensaje);

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(mensaje),
    headers: {'Content-type': 'application/json; charset=UTF-8'},
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      Swal.fire('Enviado', 'Luego te contactaremos.', 'success');
      cleanForm();
      /* redirectUrl(); */
    })
    .catch((err) => console.log(err));
}

function cleanForm() {
  let formulario = $('formulario');
  formulario.reset();
}

/* function redirectUrl() {
  window.location.href = 'https://google.com';
} */

let boton = document.getElementById('enviar');
boton.addEventListener('click', onClick);
