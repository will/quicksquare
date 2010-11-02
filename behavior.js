var input = [];

function setPrice() {
  var inputPrice = inputAsNumber();
  var swipePrice = priceWithFee(inputPrice, 1.0275);
  var typedPrice = priceWithFee(inputPrice, 1.0350);
  $('.input').html(inputPrice);
  $('.charge.swipe').html(swipePrice);
  $('.charge.type').html(typedPrice);
};

function inputAsNumber() {
  var combined = _.reduce(input, function(memo, n) { return memo + n.toString(); }, '');
  combined = (combined === '' ? '0' : combined);
  return (parseInt(combined, 10)/100).toFixed(2);
}

function priceWithFee(price, rate) {
  return ((price * rate) + 0.15).toFixed(2);
}

function press(key) {
  input.push(key);
}

var pressEvent = function(){
    var special = $(this).attr('data-special');

    if (special === '00') {
      press('0');
      press('0');
    } else if (special === 'del') {
      input.pop();
    } else {
      press( $(this).html() );
    }

    setPrice();
    return false;
  };
$(function() {
  $('.keyrow a').click(pressEvent);
  $('.keyrow a').bind('touchstart', pressEvent);
  setPrice();
});
