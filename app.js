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
var order = {};

function renderItems(items) {
  var renderedItems = [];
  for (var i = 0; i < items.length; i++) {
    renderedItems.push(renderKittyItem(items[i]));
  }
  $('.js-gallery-list').html(renderedItems.join(''));
}

function renderKittyItem(item){
  return `
  <li class="kitty ${item.id}">
    <h3 class="title">${item.name}</h3>
    <img src="https://www.cryptokitties.co/images/${item.thumbnail}"/>
    <p>$${item.price}</p>
  </li>
  `;
}

function addKittyToOrder() {
  var id = $(this).attr('class').split(' ')[1];
  addToShoppingCart(id);
}

function removeKittyFromOrder(){
  var id = $(this).attr('class').split(' ')[1];
  removeFromShoppingCart(id);
}

function removeFromShoppingCart(id){
  order[id] -= 1;
  if(order[id] <= 0){
    delete order[id];
  }
  renderShoppingCartItems();
}

function addToShoppingCart(id){ 
  alert('Add Kitty');
  if(!order[id]){
    order[id] = 1;
  }else{
    order[id] += 1;
  }
  renderShoppingCartItems();
}

function showShoppingCart() {
  renderShoppingCartItems();
  $('.js-btn-close').removeClass('hidden');
  $('.js-shopping-cart').removeClass('hidden');
  $('.js-btn-cart').addClass('hidden');
}

function renderShoppingCartItems(){
  var items = [];
  for(var key in order){
    var item = renderCartItem(order, key);
    items.push(item);
  }
  items.push(renderCartTotal(order));
  items.push(renderCartButton());
  $('.js-shopping-cart').html(items.join(''));
}

function renderCartTotal(order){
  var total = 0;
  for(var key in order){
    var kitty = getSelectedKitty(key);
    total += order[key] * kitty.price;
  }
  return `<li>
    <span>
      <strong>Total</strong>
    </span>
    <span>$${total}</span>
  </li>`;
}

function renderCartButton(){
  return `<li>
    <a class="btn js-btn-buy" href="#">Buy!</a>
  </li>`;
}

function renderCartItem(order, key){
  var selected = getSelectedKitty(key);
  if(!selected) return;
  return `<li>
    <span>${order[key]} x ${selected.name}</span>
    <span>$${selected.price}</span>
    <a href="#" class="js-btn-delete ${selected.id}">[ - ]</a>
  </li>`;
}

function getSelectedKitty(key){
  for(var i = 0; i < kitties.length; i++){
    if(kitties[i].id === key){
      return kitties[i];
    }
  }
  return;
}

function hideShoppingCart() {
  $('.js-btn-cart').removeClass('hidden');
  $('.js-shopping-cart').addClass('hidden');
  $('.js-btn-close').addClass('hidden');
}

function showBuyModal() {
  renderModalItems();
  $('.modal').removeClass('hidden');
  $('.js-btn-cart').removeClass('hidden');
  $('.js-shopping-cart').addClass('hidden');
  $('.js-btn-close').addClass('hidden');
}

function renderModalItems(){
  var items = [];
  for(var key in order){
    var item = renderModalItem(order, key);
    items.push(item);
  }
  var total = calculateModalTotal(order);
  $('.modal ul').html(items.join(''));
  $('.modal footer span').html(`Total: $${total}`);
}

function renderModalItem(order, key){
  var selected = getSelectedKitty(key);
  if(!selected) return;
  return `<li>
    <span>${order[key]} x ${selected.name}</span>
    <span>$${selected.price}</span>
  </li>`;
}

function calculateModalTotal(order){
  var total = 0;
  for(var key in order){
    var kitty = getSelectedKitty(key);
    total += order[key] * kitty.price;
  }
  return total;
}

function closeBuyModal(e){
  e.preventDefault();
  $('.modal').addClass('hidden');
}

function checkoutOrder(e){
  var items = [];
  for(var key in order){
    var kitty = getSelectedKitty(key);
    items.push({
      kitty,
      count: order[key]
    })
  }
  console.log('checkout', items);
}

function initListeners() {
  $('.js-gallery-list').on('click', '.kitty', addKittyToOrder);
  $('.js-btn-cart').on('click', showShoppingCart);
  $('.js-btn-close').on('click', hideShoppingCart);
  $('.js-shopping-cart').on('click', '.js-btn-buy', showBuyModal);
  $('.js-shopping-cart').on('click', '.js-btn-delete', removeKittyFromOrder);
  $('.js-btn-modal-close').on('click', closeBuyModal);
  $('.js-btn-checkout').on('click', checkoutOrder);
}

$(function () {
  renderItems(kitties);
  initListeners();
});