import add from './modules/add';
import tax from './modules/tax';
import '../scss/style.scss';

const totalPrice = add(3000,1800);
const salesTax = 1.2;
const priceIncludeTax = tax(totalPrice,salesTax);

$('.wrapper').text(priceIncludeTax);
