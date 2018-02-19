var kitties = [
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
var kittyClickCounter=0;
var order = [];
function addProperties (){
  kitties.map(function(kittie){
    kittie['count'] = 0;
    kittie['priceCount']=0;
  });
}
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
function dataObtainer(id){
  var kittie = kitties.filter(function(k){
    return k.id === id;
  });
  //Esto filtra al gatito por id
  var kittieAdded = order.filter(function(ko){
    return ko.id == id;
  });
  // Esto verifica que el gatito está o no está ordenado.

  if(kittieAdded.length >= 1){
    //Si ya existe el gatito en order, se aumenta la propiedad count del gatito existente
    order.map(function(ko){
      if(ko.id === kittie[0].id){
        kittie[0].count +=1
      }
    });
  }else{
    //Si es la primera vez que se selecciona un gatito entonces se agrega al carrito
    order.push(kittie[0]);
  }
};
function renderCart (orden){
  var total = 0;
  for(var i = 0; i < orden.length;i++){
    orden[i].priceCount = (orden[i].count+1) * orden[i].price;
    total += orden[i].priceCount;
      var cartItem = `<li>
        <span class ='close addedItem' data-id = '${orden[i].id}'>&times</span>
        <p>${orden[i].count + 1} x ${orden[i].name}</p>
        <p>${orden[i].priceCount}</p>
      </li>`;
      $('.kittyContainer').prepend(cartItem);
      $('#totalSC').html(total);

  };
}
function cartCleaner(){
  $('.kittyContainer').html(' ');
  $('#totalSC').html(' ');
}
function removeItem (e){
  console.log(order);
  var deleteId = ($(e.target).data('id'));
  var newOrder = order.filter(function(o){
    return o.id !== deleteId
  });
  order = newOrder;
  console.log(order);
  cartCleaner();
  renderCart(order);
}
function initListeners() {
  $('.js-gallery-list').on('click', '.kitty', function () {
    var id = $(this).attr('class').split(' ')[1];
    dataObtainer(id);
  });
  $('.js-btn-cart').on('click', function () {
    $('.js-btn-close').removeClass('hidden');
    $('.js-shopping-cart').removeClass('hidden');
    $('.js-btn-cart').addClass('hidden');
  });
  $('.js-btn-close').on('click', function () {
    $('.js-btn-cart').removeClass('hidden');
    $('.js-shopping-cart').addClass('hidden');
    $('.js-btn-close').addClass('hidden');
    cartCleaner();
  });
  $('#shopping-cart').on('click',function(){
    renderCart(order);
  });
  $('.kitty').on('click',function(){
    kittyClickCounter += 1;
    $('.itemsCounter').html(`${kittyClickCounter}`);
  });
  $(document).on('click','.close',function(event){
    removeItem(event);
  });
}

$(function () {
  render();
  initListeners();
  addProperties();
});
