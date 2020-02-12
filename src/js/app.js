import $ from 'jquery';
import add from './modules/add';
import tax from './modules/tax';
import '../scss/style.scss';

const totalPrice = add(1200,400);
const salesTax = 1.1;
const priceIncludeTax = tax(totalPrice,salesTax);

$('body').text(priceIncludeTax);
