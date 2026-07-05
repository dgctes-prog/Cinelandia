document.addEventListener("DOMContentLoaded", () => {
    cargarHeader();
    cargarFooter();

});

async function cargarHeader(){
    const contenedor =
        document.getElementById("header-container");
    if(!contenedor) return;
    const respuesta =
        await fetch("/Cinelandia/components/header.html");
    contenedor.innerHTML =
        await respuesta.text();

}

async function cargarFooter(){
    const contenedor =
        document.getElementById("footer-container");
    if(!contenedor) return;
    const respuesta =
        await fetch("/Cinelandia/components/footer.html");
    contenedor.innerHTML =
        await respuesta.text();

}

const pagina =
window.location.pathname;

const links =
document.querySelectorAll(".navbar a");
links.forEach(link=>{

if(pagina.includes(link.getAttribute("href"))){
link.classList.add("active");
}

});

const basePath = window.location.hostname.includes("github.io")
    ? "/Cinelandia"
    : "";

const headerUrl = `${basePath}/components/header.html`;
const footerUrl = `${basePath}/components/footer.html`;