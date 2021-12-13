const d = document;
let total = 0;

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
  const rowCarrito = d.createElement("div");
  let containerCarrito = d.querySelector(".containerCarrito");
  let divTotal = d.getElementById("total");

  let size = d.getElementById("size").value;
  let color = d.getElementById("color").value;
  let cantidad = d.getElementById("cantidad").value;

  sData.map((data) => {
    if (id == data.id) {
      total = total + data.precio * cantidad;
      divTotal.innerHTML = "Total a pagar: $" + total;

      console.log("Hola!" + data.id + " total: " + total);
      let item = `<div class="col-sm-3">
                <img
                  class="w-75 img-fluid"
                  src="${data.imagen}"
                  alt=""
                />
              </div>
              <div class="col-sm-4">
                <p class="fw-bolder">${data.nombre}</p>
                <p class="fst-italic">Precio unitario: $${data.precio}</p>
                <p class="fst-italic">Cantidad: ${cantidad}</p>
                <p class="fst-italic">Color: ${color}</p>
                <p class="fst-italic">Tama&ntilde;o: ${size}</p>
              </div>
              <div class="col-sm-4">
                <p class="fw-bolder">Opciones del articulo</p>
                <button onclick="borrarItem(itemCarrito${id})" class="btn btn-outline-danger">
                  <i class="bi bi-trash"></i> Eliminar
                </button>
              </div>`;
      rowCarrito.innerHTML = item;
    }
  });

  if (!rowCarrito.classList.contains("row")) {
    rowCarrito.className += "row itemCarrito";
    rowCarrito.setAttribute("id", "itemCarrito" + id);
  }

  d.getElementById("formCarrito").reset();

  let h = d.createElement("hr");
  rowCarrito.append(h);
  containerCarrito.append(rowCarrito);

  let btnAddPedido = d.querySelector(".addPedido");
  btnAddPedido.removeAttribute("disabled");

  alert("Agregado al carrito correctamente. ");
  d.getElementById("btnCloseCanvas").click();
});

formP.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Hola desde el formPedido");
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

function borrarItem(objeto) {
  let divTotal = d.getElementById("total");
  var items = d.querySelectorAll(".itemCarrito");

  divTotal.innerHTML = "";

  console.log(objeto.id);

  imagen = document.getElementById(objeto.id);
  if (!imagen) {
    alert("El elemento selecionado no existe");
  } else {
    padre = imagen.parentNode;
    padre.removeChild(imagen);
  }

  /* for (let i = 0; i < items.length; i++) {
    if (objeto === items[i].id) {
      var parent = items[i].parentElement;
      parent.removeChild(items[i]);
    } else {
      alert("No existe el objeto");
    }
  } */
}

let btnAddPedido = d.querySelector("addPedido");

/* btnAddPedido.addEventListener("click", () => {
  var div = document.getElementById("containerCarrito");
  if (div.hasChildNodes()) {
    
  } else {
    alert("El carrito no tiene elementos para hacer un pedido.");
  }
}); */
