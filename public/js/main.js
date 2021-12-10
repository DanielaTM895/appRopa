const promiseOfSomeData = fetch("https://ropaserver.herokuapp.com/api/ropa", {
  mode: "no-cors",
}).then((data) => {
  console.log("in async");
  return data;
});

let espacioDama = document.getElementById("espacioDama");
let damaTemplate = "";
let espacioCaballero = document.getElementById("espacioCaballero");
let caballeroTemplate = "";
let espacioInfantil = document.getElementById("espacioInfantil");
let infantilTemplate = "";

window.onload = async () => {
  let someData = await promiseOfSomeData;
  console.log("onload: " + someData);
  someData.map((p) => {
    console.log(p.categoria);
    let card = `<div class="ropaCard">
            <div class=" item card" style="width: 14rem">
              <img src="${p.imagen}"  class=" item-image card-img-top ropaImage" alt="Imagen de ropa" />
              <div class="card-body">
                <h5 class="card-title item-title">${p.nombre}</h5>
                <p class="item-price card-text">
                  ${p.descripcion}
                </p>
                <p class="card-text">
                  $${p.precio}
                </p>
                <div class="card-body">
                  <button onclick="obtener(${p.id})" class="btn btn-outline-primary btn-sm" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">Ver articulo</button>
                </div>
              </div>
            </div>
          </div>`;

    switch (p.categoria) {
      case "dama":
        damaTemplate = damaTemplate + card;
        break;
      case "caballero":
        caballeroTemplate = caballeroTemplate + card;
        break;
      case "infantil":
        infantilTemplate = infantilTemplate + card;
        break;
      default:
        break;
    }

    espacioDama.innerHTML = damaTemplate;
    espacioCaballero.innerHTML = caballeroTemplate;
    espacioInfantil.innerHTML = infantilTemplate;
  });
};

let newServiceWorker;

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("service-worker.js")
      .then((registerEvent) => {
        registerEvent.addEventListener("updatefound", () => {
          newServiceWorker = registerEvent.installing;

          newServiceWorker.addEventListener("statechange", () => {
            /* if (newServiveWorker.state === 'installed') {

            } */
            switch (newServiceWorker.state) {
              case "installed":
                showSnackbarUpdate();
                break;
            }
          });
        });
      });
  });
}

function showSnackbarUpdate() {
  // Get the snackbar DIV
  let x = document.getElementById("snackbar");

  // Add the "show" class to DIV
  x.className = "show";
}

let launchUpdate = document.getElementById("launchUpdate");
launchUpdate.addEventListener("click", () => {
  newServiceWorker.postMessage({
    action: "skipWaiting",
  });
  window.reload();
});
