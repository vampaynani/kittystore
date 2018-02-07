let kitties = [
  {
    id: 'ky-0',
    name: 'Kitty 1',
    thumbnail: 'landing-kitty01.svg',
    price: 150
  },
  {
    id: 'ky-1',
    name: 'Kitty 2',
    thumbnail: 'landing-kitty03.svg',
    price: 250
  },
  {
    id: 'ky-2',
    name: 'Kitty 3',
    thumbnail: 'landing-kitty05.svg',
    price: 250
  },
  {
    id: 'ky-3',
    name: 'Kitty 4',
    thumbnail: 'landing-kitty07.svg',
    price: 250
  },
  {
    id: 'ky-4',
    name: 'Kitty 5',
    thumbnail: 'landing-kitty09.svg',
    price: 250
  },
  {
    id: 'ky-5',
    name: 'Kitty 6',
    thumbnail: 'landing-kitty11.svg',
    price: 250
  },
  {
    id: 'ky-6',
    name: 'Kitty 7',
    thumbnail: 'landing-kitty13.svg',
    price: 250
  },
  {
    id: 'ky-7',
    name: 'Kitty 8',
    thumbnail: 'landing-kitty15.svg',
    price: 250
  }
];

var order = [];

function render() {
  for (var i = 0; i < kitties.length; i++) {
    var kitty = kitties[i];
    $('.js-gallery-list').append(`
    <li class="kitty ${kitty.id}">
      <h3 class="title">${kitty.name}</h3>
      <img src="https://www.cryptokitties.co/images/${kitty.thumbnail}"/>
      <p>$${kitty.price}</p>
    </li>
    `);
  }
}
function attrKitties(){
  for(var i of kitties){
    i.clicks = 0;
    i.cart = 0;
  }
  console.log(kitties);
}
function contarElementos(kittieData){
  kittieData.clicks += 1;
}
function obtenerDatos (kittieId){
  let kittieIndex = kittieId.split('-')[1];
  let kittieData = kitties[kittieIndex];
  return kittieData;
}
function calcularPrecio(kittie){
  kittie.cart = kittie.price * kittie.clicks;
  // console.log(kittie.cart);
} 
function initListeners() {
  $('.js-gallery-list').on('click', '.kitty', function () {
    var id = $(this).attr('class').split(' ')[1];
    console.log(id);
    //Con cada click sobre un gatito, se deben obtener sus datos[x]
    //Primero del html, después de la BD kitties. [x]
    //Cuando se tengan estos datos, se debe calcular el precio gatitoxcantidad[x]
    var selectedKittie = obtenerDatos(id);
    contarElementos(selectedKittie);
    calcularPrecio(selectedKittie);
  });
  $('.js-btn-cart').on('click', function () {
    $('.js-btn-close').removeClass('hidden');
    $('.js-shopping-cart').removeClass('hidden');
    $('.js-btn-cart').addClass('hidden');
    //Crear un elemento de la lista carrito de compras
    //con el numero de elementos seleccionados, con su precio. 
    /*
    <li>
        `<span>${cantidadElementos} x ${kittieName}</span>`
        <span>${kittiePrice * cantidadElementos}</span>
    </li>
    */
    // mostrarCantidadPrecio();
    /* 
        <span>
          <strong>Total</strong>
        </span>
        `<span id='totalSC'>${totalKittiePrice}</span>`
    */
    // mostrarTotal();
  });
  $('.js-btn-close').on('click', function () {
    $('.js-btn-cart').removeClass('hidden');
    $('.js-shopping-cart').addClass('hidden');
    $('.js-btn-close').addClass('hidden');
  });
}


$(function () {
  attrKitties();
  render();
  initListeners();
});