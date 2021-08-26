// Constructor de objetos
class Libro {
    constructor(id, nombre, autor, imagen, precio) {
        this.id = id
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

$( document ).ready(function () 
{
    console.log( 'El DOM está listo para usarse ');
});

// Objetos instanciados
const libro1 = new Libro(1, 'Harry Potter y la piedra filosofal', 'JK Rowling', "imgs/Harry-potter.jpg", 1500);
const libro2 = new Libro(2, 'IT', 'Stephen King', "imgs/IT.jpg", 2700);
const libro3 = new Libro(3, 'Rayuela', 'Julio Cortázar', "imgs/Rayuela.png", 1500);
const libro4 = new Libro(4, 'El sobrino del mago', 'C.S. Lewis', 'imgs/Narnia.jpg', 1000);
const libro5 = new Libro(5, 'El señor de los anillos: la comunidad del anillo', 'J. R. R. Tolkien', 'imgs/El-señor-de-los-anillos.jpg', 1200);
const libro6 = new Libro(6, 'Juego de tronos', 'George R. R. Martin', "imgs/Juego-de-tronos.jpg", 2500);

const stock = [libro1, libro2, libro3, libro4, libro5, libro6];


let acumuladorStockHTML = ``;

for (let i = 0; i < stock.length; i++) {
    let template = `
    <div class="card" style="width:200px">
        <img class="card-img-top" src=${stock[i].imagen} alt="Card image" style="width:100%">
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

    acumuladorStockHTML += template;  
}

document.querySelector('#stock').innerHTML = acumuladorStockHTML;

let carrito = [];


function mostrarCarrito() {
    console.log(carrito)
    let acumuladorCarritoHTML = ``;

    for (let i = 0; i < carrito.length; i++) {
        let template = `
        <div class="card" style="width:200px" id=${carrito[i].nombre}-${carrito[i].id}>
            <img class="card-img-top" src=${carrito[i].imagen} alt="Card image" style="width:100%">
            <div class="card-body">
                <h4 class="card-title">${carrito[i].nombre.replaceAll("_", " ")}</h4>
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

    document.querySelector('#carrito').innerHTML = acumuladorCarritoHTML;
}


function agregarProducto(event) {
    let libroSeleccionado = new Libro(`${event.target.dataset.id}${Math.floor(Math.random()*100)}`,
                                        event.target.dataset.nombre,
                                        event.target.dataset.autor,
                                        event.target.dataset.imagen,
                                        event.target.dataset.precio);
    carrito.push(libroSeleccionado);
    mostrarCarrito();
}

// Eliminar un producto del carrito
function eliminarProducto(event) {
    console.log('event.target', event.target.dataset, `#${event.target.dataset.nombre}-${event.target.dataset.id}`)
    carrito = carrito.filter(item => item.id != event.target.dataset.id);
    $(`#${event.target.dataset.nombre}-${event.target.dataset.id}`).fadeOut("normal", function() {
        mostrarCarrito()
    });
}

// vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
}
