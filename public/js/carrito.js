const d = document;
const pedidoCarrito = "";

const data = fetch("https://ropaserver.herokuapp.com/api/ropa")
  .then((r) => r.json())
  .then((data) => {
    console.log("in async");
    return data;
  });

const formB = d.querySelector(".formBusqueda");
const formC = d.querySelector(".formCarrito");
const formP = d.querySelector(".formPedido");

formC.addEventListener("submit", async (e) => {
  e.preventDefault();

  let sData = await data;

  let id = d.getElementById("idIndividual").value;

  const infoRow = "";
  let size = d.getElementById("size").value;
  let color = d.getElementById("color").value;
  let cantidad = d.getElementById("cantidad").value;

  sData.map((data) => {
    console.log("Aqui si: " + id + " - " + data.id);
    if (id == data.id) {
      console.log("Hola!" + data.id);
    }
  });

  let containerCarrito = d.querySelector(".containerCarrito");


  alert("Agregado al carrito correctamente");
  d.getElementById("btnCloseCanvas").click();
});

formP.addEventListener("submit", (e) => {
  e.preventDefault();
  let id = d.getElementById("id").value;
  console.log(id);
});

formB.addEventListener("submit", (e) => {
  e.preventDefault();
  let id = d.getElementById("id").value;
  console.log(id);
});

let pintar = "";

const buscar = d.getElementById("inputBuscar");
buscar.addEventListener("keyup", async () => {
  let grid = d.querySelector(".inicio");

  let txt = d.getElementById("inputBuscar").value;
  let sData = await data;

  let texto = capita(txt);

  var hasClase = grid.classList.contains("ropaGrid");

  if (!hasClase) {
    grid.className += " ropaGrid";
  }

  sData.map((data) => {
    if (texto !== "" && data.nombre.includes(texto)) {
      let card = `<div class="ropaCard">
            <div class=" item card" style="width: 14rem">
              <img src="${data.imagen}"  class=" item-image card-img-top ropaImage" alt="Imagen de ropa" />
              <div class="card-body">
                <h5 class="card-title item-title">${data.nombre}</h5>
                <p class="item-price card-text">
                  ${data.descripcion}
                </p>
                <p class="card-text">
                  $${data.precio}
                </p>
                <div class="card-body">
                  <button onclick="obtener(${data.id})" class="btn btn-outline-primary btn-sm" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">Ver articulo</button>
                </div>
              </div>
            </div>
          </div>`;

      pintar = pintar + card;

      grid.innerHTML = pintar;
    }
  });
});

function capita(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function obtener($id) {
  let titulo = d.querySelector(".offcanvas-title");
  let imagen = d.getElementById("imgcanvas");
  let precioStock = d.querySelector(".precioStock");
  let desc = d.querySelector(".desc-canvas");
  let id = d.getElementById("idIndividual");

  let sData = await data;

  id.value = $id;

  sData.map((data) => {
    if (id.value !== "" && data.id === $id) {
      console.log(data.nombre);
      titulo.innerHTML = data.nombre;
      imagen.src = data.imagen;
      precioStock.innerHTML =
        "Precio: $" + data.precio + " - Disponibles: " + data.disponibles;

      desc.innerHTML = data.descripcion;
    }
  });
}
