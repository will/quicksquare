var input = [];

function setPrice() {
  var inputPrice = inputAsNumber();
  var swipePrice = priceWithFee(inputPrice, 0.0275);
  var typedPrice = priceWithFee(inputPrice, 0.0350);
  $('.input .number').html(inputPrice);
  $('.charge.swipe .number').html(swipePrice);
  $('.charge.swipe a').attr('href', squareURL(swipePrice));
  $('.charge.type .number').html(typedPrice);
  $('.charge.type a').attr('href', squareURL(typedPrice));
};

function inputAsNumber() {
  var combined = _.reduce(input, function(memo, n) { return memo + n.toString(); }, '');
  combined = (combined === '' ? '0' : combined);
  return (parseInt(combined, 10)/100).toFixed(2);
}

function priceWithFee(price, rate) {
  return ((price / (1.0 - rate)) + 0.15).toFixed(2);
}

function squareURL(price) {
  return "square://pay?currency=USD&amount="+price
}

function addDigit(digit) {
  if ( input.length < 8 ) {
    input.push(digit);
  }
}

var press = function(){
  var special = $(this).attr('data-special');

  if (special === '00') {
    addDigit('0');
    addDigit('0');
  } else if (special === 'del') {
    input.pop();
  } else {
    addDigit( $(this).html() );
  }

  setPrice();
  return false;
};

$(function() {
  $('.keyrow a').click(press);
  $('.keyrow a').bind('touchstart', press);
  setPrice();

  $('.topbar a').click(function() {
    $('section').toggleClass('rotate');
  });
});
