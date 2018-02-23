function CartFactory(kitties){
  let order = {};
  const removeFromShoppingCart = item => {
    item.remove(1);
    if(item.count <= 0){
      delete order[item.id];
    }
  }
  const addToShoppingCart = item => { 
    alert('Add Kitty');
    if(!order[item.id]){
      order[item.id] = item;
    }
    item.add(1);
  }
  const calculateCartTotal = () => {
    var total = 0;
    for(var key in order){
      var kitty = order[key];
      total += kitty.getSubtotal();
    }
    return total;
  }
  const renderShoppingCartItems = () => {
    var items = [];
    for(var key in order){
      var kitty = order[key];
      var item = kitty.renderAsCartItem();
      items.push(item);
    }
    var total = calculateCartTotal();
    items.push(HTMLRenderer.renderCartTotal(total));
    items.push(HTMLRenderer.renderCartButton());
    $('.js-shopping-cart').html(items.join(''));
  }
  return {
    addKittyToOrder: function(e) {
      var id = $(e.currentTarget).attr('class').split(' ')[1];
      var selectedKitty = kitties.getSelectedKitty(id);
      if(selectedKitty){
        addToShoppingCart(selectedKitty);
        renderShoppingCartItems();
      }
    },
    removeKittyFromOrder: function(e){
      var id = $(e.currentTarget).attr('class').split(' ')[1];
      var selectedKitty = kitties.getSelectedKitty(id);
      if(selectedKitty){
        removeFromShoppingCart(selectedKitty);
        renderShoppingCartItems();
      }
    },
    showShoppingCart: function() {
      renderShoppingCartItems();
      $('.js-btn-close').removeClass('hidden');
      $('.js-shopping-cart').removeClass('hidden');
      $('.js-btn-cart').addClass('hidden');
    },
    hideShoppingCart: function() {
      $('.js-btn-cart').removeClass('hidden');
      $('.js-shopping-cart').addClass('hidden');
      $('.js-btn-close').addClass('hidden');
    },
    checkoutOrder: function(e){
      var items = [];
      for(var key in order){
        var kitty = order[key];
        items.push(kitty.orderRepresentation());
      }
      console.log('checkout', items);
    },
    getOrder: function(){
      return order;
    }
  }
}

function ModalFactory(cart){
  const calculateModalTotal = order => {
    var total = 0;
    for(var key in order){
      var kitty = order[key];
      total += kitty.getSubtotal();
    }
    return total;
  }
  const renderModalItems = () => {
    var order = cart.getOrder();
    var items = [];
    for(var key in order){
      var kitty = order[key];
      var item = kitty.renderAsModalItem();
      items.push(item);
    }
    var total = calculateModalTotal(order);
    $('.modal ul').html(items.join(''));
    $('.modal footer span').html(`Total: $${total}`);
  }
  return {
    showBuyModal: function() {
      renderModalItems();
      $('.modal').removeClass('hidden');
      $('.js-btn-cart').removeClass('hidden');
      $('.js-shopping-cart').addClass('hidden');
      $('.js-btn-close').addClass('hidden');
    },  
    closeBuyModal: function(e){
      e.preventDefault();
      $('.modal').addClass('hidden');
    }
  }
}

function KittyFactory(){
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

  var kittyObjects = [];
  for(var i = 0; i < kitties.length; i++){
    kittyObjects.push(new Kitty(kitties[i]));
  }

  return {
    kitties: kittyObjects,
    getAll: function(){
      return this.kitties;
    },
    getSelectedKitty: function(key){
      for(var i = 0; i < this.kitties.length; i++){
        if(this.kitties[i].id === key){
          return this.kitties[i];
        }
      }
      return;
    }
  }
}

function Kitty(rawObject){
  this.id = rawObject.id;
  this.name = rawObject.name;
  this.thumbnail = rawObject.thumbnail;
  this.price = rawObject.price;
  this.count = 0;
  this.add = function(num){
    return this.count += num;
  };
  this.remove = function(num){
    this.count -= num;
    if(this.count < 0) {
      this.count = 0;
    }
    return this.count;
  }
  this.orderRepresentation = function(){
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      count: this.count,
      subtotal: this.getSubtotal()
    }
  };
  this.getSubtotal = function(){
    return this.count * this.price;
  };
  this.renderAsListItem = function(){
    return HTMLRenderer.renderKittyItem(this)
  };
  this.renderAsCartItem = function(){
    return HTMLRenderer.renderCartItem(this);
  };
  this.renderAsModalItem = function(){
    return HTMLRenderer.renderModalItem(this);
  }
}

const HTMLRenderer = {
  renderKittyItem: function(item){
    return `
    <li class="kitty ${item.id}">
      <h3 class="title">${item.name}</h3>
      <img src="https://www.cryptokitties.co/images/${item.thumbnail}"/>
      <p>$${item.price}</p>
    </li>
    `;
  },
  renderCartTotal: function(total){
    return `<li>
      <span>
        <strong>Total</strong>
      </span>
      <span>$${total}</span>
    </li>`;
  },
  renderCartButton: function(){
    return `<li>
      <a class="btn js-btn-buy" href="#">Buy!</a>
    </li>`;
  },
  renderCartItem: function(selectedItem){
    return `<li>
      <span>${selectedItem.count} x ${selectedItem.name}</span>
      <span>$${selectedItem.price}</span>
      <a href="#" class="js-btn-delete ${selectedItem.id}">[ - ]</a>
    </li>`;
  },
  renderModalItem: function(selectedItem){
    return `<li>
      <span>${selectedItem.count} x ${selectedItem.name}</span>
      <span>$${selectedItem.price}</span>
    </li>`;
  }
}

const Page = {
  renderItems: function(items) {
    var renderedItems = [];
    for (var i = 0; i < items.length; i++) {
      renderedItems.push(items[i].renderAsListItem(items[i]));
    }
    $('.js-gallery-list').html(renderedItems.join(''));
  },
  initListeners: function(cart, modal) {
    $('.js-gallery-list').on('click', '.kitty', cart.addKittyToOrder);
    $('.js-shopping-cart').on('click', '.js-btn-delete', cart.removeKittyFromOrder);
    $('.js-btn-cart').on('click', cart.showShoppingCart);
    $('.js-btn-close').on('click', cart.hideShoppingCart);
    $('.js-shopping-cart').on('click', '.js-btn-buy', modal.showBuyModal);
    $('.js-btn-modal-close').on('click', modal.closeBuyModal);
    $('.js-btn-checkout').on('click', cart.checkoutOrder);
  }
}

$(function () {
  const Kitties = KittyFactory();
  const Cart = CartFactory(Kitties);
  const Modal = ModalFactory(Cart);
  Page.renderItems(Kitties.getAll());
  Page.initListeners(Cart, Modal);
});