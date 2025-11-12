let loadMoreBtn = document.querySelector("#load-more");
let currentItem = 4;

loadMoreBtn.onclick = () => {
  let boxes = [...document.querySelectorAll(".box-container .box")];
  for (var i = currentItem; i < currentItem + 4; i++) {
    boxes[i].style.display = "inline-block";
  }
  currentItem += 4;

  if (currentItem >= boxes.length) {
    loadMoreBtn.style.display = "none";
  }
};


const carrito = document.querySelector("#carrito");
const elementos1 = document.querySelector("#lista-1");
const lista = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");


cargarEventListeners();

function cargarEventListeners() {
  elementos1.addEventListener("click", comprarElemento);
  carrito.addEventListener("click", eliminarElemento);
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
}

function comprarElemento(e) {
  if (!e.target.classList.contains("agregar-carrito")) return;
  e.preventDefault();

  const elemento = e.target.closest(".box");
  if (!elemento) return;

  leerDatosElemento(elemento);
}

function leerDatosElemento(elemento) {
  const infoElemento = {
    imagen: elemento.querySelector("img")?.src || "",
    titulo: elemento.querySelector("h3")?.textContent.trim() || "",
    precio: elemento.querySelector(".precio")?.textContent.trim() || "",
    id: elemento.querySelector(".agregar-carrito")?.getAttribute("data-id") || null,
  };

  insertarCarrito(infoElemento);
}

function insertarCarrito(elemento) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><img src="${elemento.imagen}" width="100" alt="${elemento.titulo}" /></td>
    <td>${elemento.titulo}</td>
    <td>${elemento.precio}</td>
    <td><a href="#" class="borrar-elemento" data-id="${elemento.id}">X</a></td>
  `;
  lista.appendChild(row);
}

function eliminarElemento(e) {
  if (!e.target.classList.contains("borrar-elemento")) return;
  e.preventDefault();

  const fila = e.target.closest("tr");
  if (fila) fila.remove();
}

function vaciarCarrito() {
  while (lista.firstChild) lista.removeChild(lista.firstChild);
}

const combos = document.querySelectorAll('.breakfast-1');
const panel = document.getElementById('combo-panel');
const bigImg = document.getElementById('combo-big-img');
const text = document.getElementById('combo-text');
const price = document.getElementById('combo-price');

combos.forEach(combo => {
  combo.addEventListener('mouseenter', () => {

    bigImg.src = combo.dataset.img;
    text.textContent = combo.dataset.desc;
    price.textContent = combo.dataset.price;

    combo.insertAdjacentElement('afterend', panel);

    panel.style.display = 'block';

    combos.forEach(c => {
      if (c === combo) c.classList.add('activo');
      else c.classList.add('oculto');
    });
  });
});


document.querySelector('.breakfast').addEventListener('mouseleave', () => {
  panel.style.display = 'none';

    combos.forEach(c => {
    c.classList.remove('oculto', 'activo');
  });
});
