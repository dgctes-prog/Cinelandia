// ==================== FORMULARIO CONTACTO ====================

const formulario = document.getElementById("contactoForm");

if(formulario){

    formulario.addEventListener("submit", async function(e){

        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const mensaje = document.getElementById("mensaje").value;

        const respuesta = document.getElementById("respuesta");

        try{

            const envio = await fetch(
                "https://formspree.io/f/mvzjdygn",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({
                        nombre:nombre,
                        email:email,
                        mensaje:mensaje
                    })
                }
            );

            if(envio.ok){

                respuesta.innerText =
                "Mensaje enviado correctamente";

                formulario.reset();

            }else{

                respuesta.innerText =
                "No se pudo enviar el mensaje";

            }

        }catch(error){

            respuesta.innerText =
            "Error de conexión";

            console.log(error);

        }

    });

}