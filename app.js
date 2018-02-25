/* 
  Qué necesitamos!
  Un factory de gatitos 
  Un factory para el carrito 
  Por qué usar un factory: https://stackoverflow.com/a/628959
  * Sabemos las propiedades y metodos que deberían tener. 
  * Será mas sencillo agregar las que el raw data no tiene aún en el caso de los gatos.
*/
/*CAT FACTORY*/

function itemFactory (){
  // haremos una copia de los objetos en kitties con otras propiedades, así no modificamos la data original.
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
};
const Kitties = itemFactory();
console.log(Kitties);
