// INICIO DE REFACTORIZACION NAV Y FOOTER
async function incluir(contenedor){
    const ruta = contenedor.dataset.include;

    try{
        const respuesta = await fetch(ruta);
        if (!respuesta.ok) throw new Error(`No se pudo cargar ${ruta} (${respuesta.status})`)
        
            // El div se remplaza por el componente (<header> o <footer> directamente en el body)
        contenedor.outerHTML = await respuesta.text()
    } catch (error) {
        console.error(error)
    }
}

function marcarEnlaceActivo(){
    const paginaActual = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("#header .nav-link").forEach(enlace => {
        const esActivo = enlace.getAttribute("href") === paginaActual;
        enlace.classList.toggle("active", esActivo)

        if(esActivo) enlace.setAttribute("aria-current", "page")
        else enlace.removeAttribute("aria-current")
    })
}

document.addEventListener("DOMContentLoaded", async () => {
    // Cargar Todos los componentes en paralelo y espera a que terminen de cargar
    await Promise.all([...document.querySelectorAll("[data-include]")].map(incluir))

    // Solo se ejecuta cuando el header ya existe
    marcarEnlaceActivo()
})

const correo = document.getElementById("email")
const contraseña = document.getElementById("login-password")
const formulario = document.getElementById("login-form")


function validarEmail(correo) {
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$/;
    if (!regex.test(correo)) {
        return false;
    }
    return true;
}

function validarContraseña(cantraseña){
  const reglas = {
    longitud: password.length >= 8,
    mayuscula: /[A-Z]/.test(contraseña),
    minuscula: /[a-z]/.test(contraseña),
    numero: /\d/.test(contraseña),
    simbolo: /[!@#$%^&*(),.?":{}|<>]/.test(contraseña),
  };

  const esValida = Object.values(reglas).every(Boolean);
  return { esValida, reglas };
}