document.addEventListener("DOMContentLoaded", () => {

    iniciarMenuMobile();
    iniciarModoOscuro();
    iniciarFormulario();

});


/*====================================================
=            MENÚ RESPONSIVE
====================================================*/

function iniciarMenuMobile() {

    const bar = document.getElementById("bar");
    const navbar = document.getElementById("navbar");

    if (!bar || !navbar) return;

    bar.addEventListener("click", () => {

        navbar.classList.toggle("active");

    });

}


/*====================================================
=            MODO OSCURO
====================================================*/

function iniciarModoOscuro() {

    const boton = document.getElementById("darkModeBtn");

    if (!boton) return;

    const tema = localStorage.getItem("theme");

    if (tema === "dark") {

        document.body.classList.add("dark");
        boton.textContent = "☀️";

    }

    boton.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            localStorage.setItem("theme", "dark");
            boton.textContent = "☀️";

        } else {

            localStorage.setItem("theme", "light");
            boton.textContent = "🌙";

        }

    });

}


/*====================================================
=            FORMULARIO CONTACTO
====================================================*/

function iniciarFormulario() {

    const formulario = document.getElementById("contactoForm");

    if (!formulario) return;

    const respuesta = document.getElementById("respuesta");
    const boton = document.getElementById("btnEnviar");

    formulario.addEventListener("submit", async (e) => {

        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        if (nombre.length < 3) {

            mostrarMensaje("Ingresá un nombre válido.", false);
            return;

        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {

            mostrarMensaje("Correo electrónico inválido.", false);
            return;

        }

        if (mensaje.length < 10) {

            mostrarMensaje("El mensaje debe tener al menos 10 caracteres.", false);
            return;

        }

        boton.disabled = true;
        boton.textContent = "Enviando...";

        try {

            const envio = await fetch(
                "https://formspree.io/f/mvzjdygn",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        nombre,
                        email,
                        mensaje
                    })
                }
            );

            if (envio.ok) {

                mostrarMensaje(
                    "✅ Mensaje enviado correctamente.",
                    true
                );

                formulario.reset();

            } else {

                mostrarMensaje(
                    "No fue posible enviar el mensaje.",
                    false
                );

            }

        } catch (error) {

            console.error(error);

            mostrarMensaje(
                "Error de conexión.",
                false
            );

        }

        boton.disabled = false;
        boton.textContent = "Enviar";

    });

    function mostrarMensaje(texto, ok) {

        if (!respuesta) return;

        respuesta.innerHTML = texto;
        respuesta.style.color = ok ? "#0a8f3d" : "#d62828";

    }

}