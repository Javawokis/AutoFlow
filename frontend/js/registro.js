// registro.js
// Validación del formulario de registro (#formRegistro) usando las clases
// is-valid / is-invalid de Bootstrap y los .invalid-feedback del HTML.

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formRegistro");
    if (!form) return;

    const nombre = document.getElementById("nombreCompleto");
    const telefono = document.getElementById("telefono");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmar = document.getElementById("confirmarPassword");

    // Se desactiva la validación nativa del navegador para usar la de Bootstrap
    form.setAttribute("novalidate", "");

    /* ---------- Reglas de validación ---------- */
    // Cada función devuelve un mensaje de error, o "" si el campo es válido.

    const validarNombre = () => {
        const valor = nombre.value.trim();
        if (valor === "") return "Ingresa tu nombre completo.";
        if (valor.length < 3) return "El nombre es demasiado corto.";
        // Letras (con acentos y ñ), espacios, apóstrofes y guiones
        if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]+$/.test(valor))
            return "El nombre solo puede contener letras.";
        if (valor.split(/\s+/).length < 2)
            return "Ingresa nombre y apellido.";
        return "";
    };

    const validarTelefono = () => {
        const valor = telefono.value.trim();
        if (valor === "") return "Ingresa tu número de teléfono.";
        if (!/^[0-9]{10}$/.test(valor)) return "Ingresa un teléfono de 10 dígitos.";
        return "";
    };

    const validarEmail = () => {
        const valor = email.value.trim();
        if (valor === "") return "Ingresa tu correo electrónico.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor))
            return "Ingresa un correo válido.";
        return "";
    };

    const validarPassword = () => {
        const valor = password.value;
        if (valor === "") return "Ingresa una contraseña.";
        if (valor.length < 8) return "La contraseña debe tener al menos 8 caracteres.";
        if (!/[A-Za-z]/.test(valor) || !/[0-9]/.test(valor))
            return "Usa al menos una letra y un número.";
        return "";
    };

    const validarConfirmar = () => {
        if (confirmar.value === "") return "Confirma tu contraseña.";
        if (confirmar.value !== password.value) return "Las contraseñas no coinciden.";
        return "";
    };

    /* ---------- Mostrar resultado en pantalla ---------- */

    // Busca el .invalid-feedback que acompaña al input (en el mismo
    // contenedor, ya sea div.mb-3 o .input-group).
    const obtenerFeedback = (input) =>
        input.parentElement.querySelector(".invalid-feedback");

    const marcar = (input, mensaje) => {
        const feedback = obtenerFeedback(input);
        if (mensaje) {
            input.classList.add("is-invalid");
            input.classList.remove("is-valid");
            if (feedback) feedback.textContent = mensaje;
            return false;
        }
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        return true;
    };

    // Relaciona cada input con su regla
    const campos = [
        { input: nombre, validar: validarNombre },
        { input: telefono, validar: validarTelefono },
        { input: email, validar: validarEmail },
        { input: password, validar: validarPassword },
        { input: confirmar, validar: validarConfirmar },
    ];

    const validarCampo = ({ input, validar }) => marcar(input, validar());

    /* ---------- Validación en tiempo real ---------- */

    campos.forEach((campo) => {
        // Al salir del campo se valida
        campo.input.addEventListener("blur", () => validarCampo(campo));
        // Si ya tenía error, se re-valida mientras escribe
        campo.input.addEventListener("input", () => {
            if (campo.input.classList.contains("is-invalid")) validarCampo(campo);
        });
    });

    // El teléfono solo acepta números
    telefono.addEventListener("input", () => {
        telefono.value = telefono.value.replace(/\D/g, "").slice(0, 10);
    });

    // Si cambia la contraseña, se re-valida la confirmación (si ya se escribió)
    password.addEventListener("input", () => {
        if (confirmar.value !== "") validarCampo(campos[4]);
    });

    /* ---------- Botones de ojo (mostrar/ocultar contraseña) ---------- */

    const configurarOjo = (boton, input) => {
        if (!boton) return;
        boton.addEventListener("click", () => {
            const mostrar = input.type === "password";
            input.type = mostrar ? "text" : "password";
            const icono = boton.querySelector("i");
            icono.classList.toggle("fa-eye", mostrar);
            icono.classList.toggle("fa-eye-slash", !mostrar);
        });
    };

    configurarOjo(document.getElementById("btnVerPassword"), password);
    configurarOjo(document.getElementById("btnVerConfirmar"), confirmar);

    /* ---------- Envío del formulario ---------- */

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Se validan todos (sin cortar en el primero) para mostrar todos los errores
        const resultados = campos.map(validarCampo);
        const todoValido = resultados.every(Boolean);

        if (!todoValido) {
            // Lleva el foco al primer campo con error
            const primerError = form.querySelector(".is-invalid");
            if (primerError) primerError.focus();
            return;
        }

        // Datos listos para enviar (aquí iría el fetch a tu API)
        const datos = {
            nombreCompleto: nombre.value.trim(),
            telefono: telefono.value.trim(),
            email: email.value.trim().toLowerCase(),
            password: password.value,
        };
        console.log("Registro válido:", datos);

        alert("¡Cuenta creada con éxito!");
        form.reset();
        form.querySelectorAll(".is-valid, .is-invalid").forEach((el) =>
            el.classList.remove("is-valid", "is-invalid")
        );
    });
});