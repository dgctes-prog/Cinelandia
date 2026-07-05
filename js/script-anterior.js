document.addEventListener("DOMContentLoaded", () => {

    iniciarModoOscuro();

    iniciarFormulario();

});

/*==============================
=            DARK MODE         =
==============================*/

function iniciarModoOscuro(){

    const boton = document.getElementById("darkModeBtn");

    if(!boton) return;

    const tema = localStorage.getItem("theme");

    if(tema==="dark"){

        document.body.classList.add("dark");

        boton.textContent="☀️";

    }

    boton.addEventListener("click",()=>{

        document.body.classList.toggle("dark");

        if(document.body.classList.contains("dark")){

            localStorage.setItem("theme","dark");

            boton.textContent="☀️";

        }else{

            localStorage.setItem("theme","light");

            boton.textContent="🌙";

        }

    });

}

/*==============================
=          CONTACTO            =
==============================*/

function iniciarFormulario(){

    const formulario=document.getElementById("contactoForm");

    if(!formulario) return;

    formulario.addEventListener("submit",async(e)=>{

        e.preventDefault();

        const respuesta=document.getElementById("respuesta");

        const boton=document.getElementById("btnEnviar");

        boton.disabled=true;

        boton.textContent="Enviando...";

        const datos={

            nombre:document.getElementById("nombre").value,

            email:document.getElementById("email").value,

            mensaje:document.getElementById("mensaje").value

        };

        try{

            const envio=await fetch(

                "https://formspree.io/f/mvzjdygn",

                {

                    method:"POST",

                    headers:{

                        "Content-Type":"application/json",

                        "Accept":"application/json"

                    },

                    body:JSON.stringify(datos)

                }

            );

            if(envio.ok){

                respuesta.style.color="green";

                respuesta.innerHTML="Mensaje enviado correctamente.";

                formulario.reset();

            }else{

                respuesta.style.color="red";

                respuesta.innerHTML="No fue posible enviar el mensaje.";

            }

        }catch(error){

            respuesta.style.color="red";

            respuesta.innerHTML="Error de conexión.";

        }

        boton.disabled=false;

        boton.textContent="Enviar";

    });

}