let usuarios = [];
let votos = Array(10).fill(0);
let usuarioActual = null;

// Crear cuenta
const formCrear = document.getElementById('formCrearCuenta');
formCrear.addEventListener('submit', function(e) {
  e.preventDefault();
  const usuario = {
    ci: ci.value,
    nombre: nombre.value,
    apellido: apellido.value,
    correo: correo.value,
    departamento: departamento.value,
    fechaNacimiento: fechaNacimiento.value,
    fechaVotacion: fechaVotacion.value,
    votoEmitido: false
  };
  usuarios.push(usuario);
  alert('Cuenta registrada con éxito.');
  formCrear.reset();
});
const fechaNacLabel = document.querySelector('label[for="fechaNacimiento"]');
if (fechaNacLabel) {
  fechaNacLabel.innerHTML = '<strong>Fecha de nacimiento</strong>';
}
const fechaVotLabel = document.querySelector('label[for="fechaVotacion"]');
if (fechaVotLabel) {
  fechaVotLabel.innerHTML = '<strong>Fecha de votación</strong>';
}

// Login
const formLogin = document.getElementById('formLogin');
formLogin.addEventListener('submit', function(e) {
  e.preventDefault();
  const ci = loginCI.value;
  const correo = loginCorreo.value;
  const usuario = usuarios.find(u => u.ci === ci && u.correo === correo);
  if (usuario) {
    usuarioActual = usuario;
    alert('Login exitoso. Puede votar.');
  } else {
    alert('Usuario no encontrado.');
  }
});

// Recuperar contraseña
function recuperarPassword() {
  const dato = document.getElementById('recuperarDato').value;
  const usuario = usuarios.find(u => u.ci === dato || u.correo === dato);
  if (usuario) {
    alert(`Simulación: Se envió la contraseña a ${usuario.correo}`);
  } else {
    alert('Usuario no encontrado.');
  }
}

// Mostrar candidatos
const candidatos = [
  { nombre: "Eduardo del Castillo - (MAS)", foto: "img/eduardo.jpg" },
  { nombre: "Jorge 'Tuto' Quiroga - (Alianza Libre)", foto: "img/jorge.jpg" },
  { nombre: "Samuel Doria Medina - (Alianza Unida)", foto: "img/samuel.jpg" },
  { nombre: "Manfred Reyes Villa (Autonomía para Bolivia - Súmate)", foto: "img/manfred.jpg" },
  { nombre: "Rodrigo Paz - (PDC)", foto: "img/rodrigo.jpg" },
  { nombre: "Jhonny Fernandez - (Alianza La Fuerza del Pueblo)", foto: "img/jhonny.jpg" },
  { nombre: "Paulo Rodriguez Folster - (Libertad y Progreso)", foto: "img/paulo.jpg" },
  { nombre: "Jaime Dunn - (Nuev Generación Patriótica)", foto: "img/jaime.jpg" },
  { nombre: "Eva Copa - Movimiento Renovación Nacional - Morena)", foto: "img/eva.jpg" },
  { nombre: "Blanco", foto: "img/blanco.jpg" }
];

candidatos.forEach((candidato, i) => {
  const div = document.createElement('div');
  div.className = 'col-md-3 card-candidato';
  div.innerHTML = `
    <img src="${candidato.foto}" alt="${candidato.nombre}" class="mb-2">
    <div>${candidato.nombre}</div>
    <input type="radio" name="candidato" value="${i}">
  `;
  candidatosContainer.appendChild(div);
});


// Enviar voto
const formVotar = document.getElementById('formVotar');
formVotar.addEventListener('submit', function(e) {
  e.preventDefault();
  if (!usuarioActual) {
    alert('Debe iniciar sesión.');
    return;
  }
  if (usuarioActual.votoEmitido) {
    alert('Ya ha votado.');
    return;
  }
  const seleccionado = document.querySelector('input[name="candidato"]:checked');
  if (!seleccionado) {
    alert('Seleccione un candidato.');
    return;
  }
  const index = parseInt(seleccionado.value);
  votos[index]++;
  usuarioActual.votoEmitido = true;
  alert('Voto registrado.');
  actualizarGrafico();
});

// Mostrar estadísticas
function actualizarGrafico() {
  const grafico = document.getElementById('grafico');
  grafico.innerHTML = '';
votos.forEach((voto, i) => {
  const porcentaje = voto * 10;
  grafico.innerHTML += `
    <div>${candidatos[i].nombre}: ${voto} votos</div>
    <div class="barra" style="width: ${porcentaje}%">${voto}</div>
  `;
});

}

actualizarGrafico();
