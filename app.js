/* 
  Qué necesitamos!
  Un factory de gatitos 
  Un factory para el carrito 
  Por qué usar un factory: https://stackoverflow.com/a/628959
  * Sabemos las propiedades y metodos que deberían tener. 
  * Será mas sencillo agregar las que el raw data no tiene aún en el caso de los gatos.
*/
/*CAT FACTORY*/

// function kitties1(id, name, thumbnail, price){
  // kitties = new kitty.ConstructForKitty(count, totalPrice);
  // this.count = count;
  // this.totalPrice = tPrice;

  // const unique = [];

  // function addUnique(){
    
  // }
// }





function itemFactory (){
  // haremos una copia de los objetos en kitties con otras propiedades, así no modificamos la data original. https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/assign
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
  var catsObject = []; 
  for(var i = 0 ; i < kitties.length; i ++){
    catsObject.push(Object.assign({}, new Kitty(kitties[i])));
  }
  return catsObject;
}
function Kitty (item) {
  this.id = item.id;
  this.name = item.name;
  this.thumbnail = item.thumbnail;
  this.count = 0; 
  this.price = item.price;
  this.subtotal = function(){
    return this.price * this.count;
  }
  this.add = function(){
    return this.count += 1;
  }
  this.remove = function () {
    return this.count -= 1;
  }
};
/*
Ahora, como también necesitamos un carrito deberíamos hacer su factory, la cosa, es que este factory depende de los datos del gatito. Pues todos sus metodos son correspecto a los items que se agregan o no.*/
function CartFactory (items){
  this.order = [];
  this.addItem = function(id){
    // console.log(this.order);
    var itemSelected = items.filter(item => item.id === id);
    //Esto filtra al gatito por id
    var itemAdded = this.order.filter((ko) => {return ko.id == id});
    if(itemAdded.length >= 1){
      console.log(this, this.order);
      this.order.map(function(i){
        if(i.id === itemSelected[0].id){
          itemSelected[0].add();
        }
      });
    }else{
      //Si es la primera vez que se selecciona un gatito entonces se agrega al carrito
      itemSelected[0].add();
      this.order.push(itemSelected[0]);
    }
  };
  this.removeItem = function(){
    item.remove();
    item.subtotal -= item.subtotal();
  };
};
function render(items) {
  for (var i = 0; i < items.length; i++) {
    var kitty = items[i];

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
const Kitties = itemFactory();
const Cart = new CartFactory(Kitties);
render(Kitties);
$('.js-gallery-list').on('click', '.kitty', function () {
  var id = $(this).attr('class').split(' ')[1];
  Cart.addItem(id);
});
