var input = [];

function setPrice() {
  $('.input').html( inputAsNumber() );
};

function inputAsNumber() {
  var combined = _.reduce(input, function(memo, n) { return memo + n.toString(); }, '');
  return parseInt(combined, 10);
}

function press(key) {
  input.push(key);
}

$(function() {
  $('.keyrow a').click(function(){
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
  });
});
