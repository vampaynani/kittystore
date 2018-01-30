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

function initListeners() {
  $('.js-gallery-list').on('click', '.kitty', function () {
    var id = $(this).attr('class').split(' ')[1];
    console.log(id);
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
  });
  $('.js-btn-buy').on('click', function () {
    $('.modal').removeClass('hidden');
    $('.js-btn-cart').removeClass('hidden');
    $('.js-shopping-cart').addClass('hidden');
    $('.js-btn-close').addClass('hidden');
  });
  $('.js-btn-modal-close').on('click', function(e){
    e.preventDefault();
    $('.modal').addClass('hidden');
  });
  $('.js-btn-checkout').on('click', function (e){
    console.log('checkout');
  });
}

$(function () {
  render();
  initListeners();
});