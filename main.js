// Constructor de objetos
class Libro {
    constructor(id, nombre, autor, imagen, precio) {
      this.id = id;
      this.nombre = nombre;
      this.autor = autor;
      this.imagen = imagen;
      this.precio = precio;
      this.vendido = false;
      this.stock = true;
    }
  
    SumarIva() {
      this.precio = this.precio * 1.21;
    }
  
    vender() {
      this.vendido = true;
    }
  }
  
  $(document).ready(function () {
    console.log("El DOM estÃ¡ listo para usarse ");
  });
  
  // Instanciamos los objetos

  const libro1 = new Libro(
    1,
    "Harry Potter y la piedra filosofal",
    "JK Rowling",
    "imgs/Harry-potter.jpg",
    1500
  );
  const libro2 = new Libro(
    2, 
    "IT", 
    "Stephen King", 
    "imgs/IT.jpg", 
    2700
    );
  const libro3 = new Libro(
    3,
    "Rayuela",
    "Julio CortÃ¡zar",
    "imgs/Rayuela.png",
    1500
  );
  const libro4 = new Libro(
    4,
    "El sobrino del mago",
    "C.S. Lewis",
    "imgs/Narnia.jpg",
    1000
  );
  const libro5 = new Libro(
    5,
    "El seÃ±or de los anillos: la comunidad del anillo",
    "J. R. R. Tolkien",
    "imgs/El-señor-de-los-anillos.jpg",
    1200
  );
  const libro6 = new Libro(
    6,
    "Juego de tronos",
    "George R. R. Martin",
    "imgs/Juego-de-tronos.jpg",
    2500
  );
  
  // Construimos un array con los objetos como elementos

  // Creamos la vista de los productos con la info de los objetos instanciados //

  const stock = [libro1, libro2, libro3, libro4, libro5, libro6];
  
  // En esta variable vamos acumulando los templates generados por el ciclo
  let acumuladorStockHTML = ``;
  
  // En este ciclo vamos generando un template por cada producto en stock
  for (let i = 0; i < stock.length; i++) {
    let template = `
      <div class="card" style="width:200px">
          <img class="card-img-top" src=${
            stock[i].imagen
          } alt="Card image" style="width:100%">
          <div class="card-body">
              <h4 class="card-title">${stock[i].nombre}</h4>
              <p class="card-text">Precio $${stock[i].precio}</p>
              <button 
                class="btn btn-primary" 
                data-id=${stock[i].id}
                data-nombre=${stock[i].nombre.replaceAll(" ", "_")}
                data-precio=${stock[i].precio} 
                data-imagen=${stock[i].imagen} 
                onclick="agregarProducto(event)"
              >Comprar</button>
          </div>
      </div>
      `;
  
    acumuladorStockHTML += template; // Acá concatenamos cada template con los acumulados
  }
  
  // Enviamos los templates acumulados al HTML
  document.querySelector("#stock").innerHTML = acumuladorStockHTML;
  

  // Creamos el carrito //

// Creamos el array vacío del carrito
  let carrito = [];
  

  // Creamos la función para la vista del carrito en el HTML
  function mostrarCarrito() {
    console.log(carrito);
    let acumuladorCarritoHTML = ``;
  
    for (let i = 0; i < carrito.length; i++) {
      let template = `
          <div class="card" style="width:200px" id=${carrito[i].nombre}-${
        carrito[i].id
      }>
              <img class="card-img-top" src=${
                carrito[i].imagen
              } alt="Card image" style="width:100%">
              <div class="card-body">
                  <h4 class="card-title">${carrito[i].nombre.replaceAll(
                    "_",
                    " "
                  )}</h4>
                  <p class="card-text">Precio $${carrito[i].precio}</p>
                  <button 
                  class="btn btn-danger" 
                  data-id=${carrito[i].id}
                  data-nombre=${carrito[i].nombre} 
                  data-precio=${carrito[i].precio} 
                  data-imagen=${carrito[i].imagen} 
                  onclick="eliminarProducto(event)"
                  >Eliminar</button>
              </div>
          </div>
          `;
  
      acumuladorCarritoHTML += template;
    }
  
    document.querySelector("#carrito").innerHTML = acumuladorCarritoHTML;
  }
  
  // Creamos la función para agregar productos al carrito
  function agregarProducto(event) {
    let libroSeleccionado = new Libro(
      `${event.target.dataset.id}${Math.floor(Math.random() * 100)}`,
      event.target.dataset.nombre,
      event.target.dataset.autor,
      event.target.dataset.imagen,
      event.target.dataset.precio
    );
    carrito.push(libroSeleccionado);
    mostrarCarrito();
  }
  
  // Eliminar un producto del carrito
  function eliminarProducto(event) {
    console.log(
      "event.target",
      event.target.dataset,
      `#${event.target.dataset.nombre}-${event.target.dataset.id}`
    );
    carrito = carrito.filter((item) => item.id != event.target.dataset.id);
    $(`#${event.target.dataset.nombre}-${event.target.dataset.id}`).fadeOut(
      "normal",
      function () {
        mostrarCarrito();
      }
    );
  }
  
  // vaciar el carrito
  function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
  }
  
  // Modal para seleccionar la localidad del envío gratuito
  const cambiaElSelect = (event) => {
    console.log("=============", event.target.value);
    getAllCities(event.target.value);
  };
  
  const cambiaElSelect2 = (event) => {
    console.log("=============", event.target.value);
  };
  function mostrarProvincias(provincias) {
    let acumuladorCarritoHTML = `         
   <select class="form-select" aria-label="Default select example" onchange="cambiaElSelect(event)">
  `;
  
    for (let i = 0; i < provincias.length; i++) {
      let template = `
                  <option id=${provincias[i].nombre}-${provincias[i].id} value="${provincias[i].id}">${provincias[i].nombre} </option>
  
          `;
  
      acumuladorCarritoHTML += template;
    }
  
    acumuladorCarritoHTML += "</select>";
  
    document.querySelector("#carritoDeProvincias").innerHTML =
      acumuladorCarritoHTML;
  }
  
  function mostrarMunicipios(cities) {
    let acumuladorCarritoHTML = `         
   <select class="form-select" aria-label="Default select example" onchange="cambiaElSelect2(event)">
  `;
  
    for (let i = 0; i < cities.length; i++) {
      let template = `
                  <option id=${cities[i].nombre}-${cities[i].id} value="${cities[i].id}">${cities[i].nombre} </option>
  
          `;
  
      acumuladorCarritoHTML += template;
    }
  
    acumuladorCarritoHTML += "</select>";
  
    document.querySelector("#carritoDeMunicipios").innerHTML =
      acumuladorCarritoHTML;
  }
  
  const printCity = (id) => {
    console.log("LALA", id);
  };
  
  const getAllCities = async (cityID) => {
    console.log(cityID);
    const url = `https://apis.datos.gob.ar/georef/api/municipios?provincia=${cityID}&campos=id,nombre&max=1000`;
  
    try {
      const response = await fetch(url);
      const { municipios } = await response.json();
      console.log(municipios);
      mostrarMunicipios(municipios);
    } catch (err) {
      console.log("===============", err);
    }
  };
  
  const getAllStates = async () => {
    try {
      const response = await fetch(
        "https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre"
      );
      const { provincias } = await response.json();
      console.log("ANDAAAA");
      mostrarProvincias(provincias);
    } catch (err) {
      console.log("===============", err);
    }
  };

  // Finalizar compra

  const finalizarCompra = () => {
    getAllStates();
  };