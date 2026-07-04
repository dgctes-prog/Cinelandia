document.addEventListener("DOMContentLoaded",()=>{

menuMobile();

modoOscuro();

contacto();

buscador();

});

const boton=document.getElementById("darkModeBtn");

const modoGuardado= localStorage.getItem("modo");

if(modoGuardado==="dark"){

document.body.classList.add("dark");

}

boton.addEventListener("click",()=>{

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){

localStorage.setItem("modo","dark");

}else{

localStorage.setItem("modo","light");

}

});

// ===================== FORMULARIO CONTACTO ====================

document.addEventListener("DOMContentLoaded", () => {

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
            mostrarError("Ingresá un nombre válido.");
            return;
        }

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regexEmail.test(email)) {
            mostrarError("Ingresá un correo electrónico válido.");
            return;
        }

        if (mensaje.length < 10) {
            mostrarError("El mensaje debe tener al menos 10 caracteres.");
            return;
        }

        boton.disabled = true;
        boton.textContent = "Enviando...";

        try {

            const response = await fetch(
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

            if (response.ok) {

                respuesta.textContent =
                    "✅ ¡Gracias! Tu mensaje fue enviado correctamente.";

                respuesta.style.color = "#0f9d58";

                formulario.reset();

            } else {

                mostrarError("No fue posible enviar el mensaje.");

            }

        } catch (error) {

            console.error(error);

            mostrarError("Error de conexión. Intentá nuevamente.");

        }

        boton.disabled = false;
        boton.textContent = "Enviar mensaje";

    });

    function mostrarError(texto) {

        respuesta.textContent = texto;
        respuesta.style.color = "#d93025";

    }

});