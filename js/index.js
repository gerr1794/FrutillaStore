// Variables
const carrito = document.querySelector('#carrito');
const listaProductos = document.querySelector('#lista-productos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

// Listeners
cargarEventListeners();

function cargarEventListeners() {
     // salta el evento cuando se presiona "Agregar Carrito"
     listaProductos.addEventListener('click', agregarProducto);

     /* para mostrar los productos con localStorage */
     document.addEventListener('DOMContentLoaded', () =>{
          articulosCarrito = JSON.parse( localStorage.getItem('carrito')) || [];
          carritoHTML();
     })

     // para cuando se elimina un producto del carrito
     carrito.addEventListener('click', eliminarProducto);

     // cuando se vacia el carrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

}

// Funciones
// Función que añade el producto al carrito
function agregarProducto(e) {
     e.preventDefault();
     if(e.target.classList.contains('agregar-carrito')) {
          const producto = e.target.parentElement.parentElement;
          // Envio el producto seleccionado para tomar sus caract
          leerDatosProducto(producto);
     }
}

// Lee las caracteristicas del producto
function leerDatosProducto(producto) {
     const infoProducto = {
          imagen: producto.querySelector('img').src,
          titulo: producto.querySelector('h4').textContent,
          precio: producto.querySelector('.precio span').textContent,
          id: producto.querySelector('a').getAttribute('data-id'),
          cantidad: 1
     }


     if( articulosCarrito.some( producto => producto.id === infoProducto.id ) ) {
          const productos = articulosCarrito.map( producto => {
               if( producto.id === infoProducto.id ) {
                    producto.cantidad++;
                         return producto;
               } else {
                    return producto;
          }
          })
          articulosCarrito = [...productos];
     }  else {
          articulosCarrito = [...articulosCarrito, infoProducto];
     }
     carritoHTML();
}

// para eliminar los productos del carrito en el DOM
function eliminarProducto(e) {
     e.preventDefault();
     if(e.target.classList.contains('borrar-producto') ) {
          const productoId = e.target.getAttribute('data-id')

          // Eliminar del arreglo del carrito
          articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);

          carritoHTML();
     }
}

// como mostrar los productos seleccionados en el carrito
function carritoHTML() {

     vaciarCarrito();

     /* se crea el producto en el icono del carrito */
     articulosCarrito.forEach(producto => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>
                    <img src="${producto.imagen}" width=100>
               </td>
               <td>${producto.titulo}</td>
               <td>$${producto.precio}</td>
               <td>${producto.cantidad} </td>
               <td>
                    <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });
     /* agregando localStorage */
     sincronizarLocalStorage();
}

function sincronizarLocalStorage(){
     localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}


// para eliminar los productos del carrito en el DOM
function vaciarCarrito() {
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
}
}
