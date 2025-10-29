<script>
import * as utils from "../utils.mts";


const calculateItemTotal = function () {
    return list.reduce((total, item) =>
        total + item.quantity
    , 0);
};
const calculateShipping = function () {
    if (itemTotal < 1)
        return 0;
    // $10 for first item, $2 for each additional
    return (itemTotal - 1) * 2 + 10;
};
const calculateOrdertotal = function () {
    return list.reduce((total, item) =>
        total + (item.finalPrice * item.quantity)
    , 0);
};
const calculateTax = function () {
    return orderTotal * 0.06;
};


let list = utils.getCartItems();
let itemTotal = calculateItemTotal();
let shipping = calculateShipping();
let orderTotal = calculateOrdertotal();
let tax = calculateTax();
let overallOrderTotal = orderTotal + tax + shipping;



async function handleSubmit (){

    
};
</script>

<form class="form">
    <div><fieldset class="shipping">
        <legend>Shipping</legend>
        <label>First Name<input type="text" required></label>
        <label>Last Name<input type="text" required></label>
        <label>Street<input type="text" required></label>
        <label>City<input type="text" required></label>
        <label>State<input type="text" pattern="[A-Z]{2}" required></label> 
        <label>Zip<input type="text" pattern="[1-9]{1,5}" placeholder="12345" required></label>
    </fieldset></div>

    <div>
        <fieldset class="payment">
            <legend>Payment</legend>
            <label>Card Number<input type="number" required></label>
            <div style="display: flex; gap: 1rem">
                <label for="expMonth">Expiration
                    <div style="display: flex; gap: 1rem">
                        <input type="text" id="expMonth" name="expMonth" pattern="{'^(0[1-9]|1[0-2])$'}" placeholder="MM" maxlength="2" required>
                        <input type="text" id="expYear" name="expYear" pattern="{'^(2[0-9]{3})$'}" placeholder="YY" maxlength="4" required>
                    </div>
                </label>
                <label>CVC<input type="text" pattern="{'^([0-9]{3})$'}" required></label>
            </div>
        </fieldset>
        <fieldset class="checkout-summary">
            <legend>Order Summary</legend>
            <table><tbody>
                <tr>
                    <td>Item Subtotal ({itemTotal})</td>
                    <td>${orderTotal.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Shipping Estimate</td>
                    <td>${shipping.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Tax</td>
                    <td>${tax.toFixed(2)}</td>
                </tr>
                <tr>
                    <th><b>Order Total</b></th>
                    <th><b>${overallOrderTotal.toFixed(2)}</b></th>
                </tr>
            </tbody></table>
        </fieldset>
    </div>
    <div>
        <input type="submit" value="Checkout">
    </div>
</form>

<style>
.form {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}
.form > div {
    width: 400px;
}
.form fieldset {
    width: 100%;
    margin: 2rem 0;
    border: 1px solid lightgrey;
    border-radius: 6px;
    padding: .5rem 20% 2rem;
}

.form table {
    width: 100%;
    margin-top: 1rem;
    font-size: 1rem;
    text-align: left;
}
.form legend {
    padding: 0 .5rem;
}

.form label {
    display: block;
    padding-top: 1rem;
    font-size: .9rem;
    color: #9c2c13;
}

.form input[type="text"],
.form input[type="date"],
.form select,
.form input[type="number"] {
    background-color: #eee;
    display: block;
    border: solid 1px #999;
    border-radius: 6px;
    padding: .75rem;
    color: #555;
    width: 100%;
}

.form input[type="submit"] {
    border-radius: 7px;
    border: outset;
    background-color: #eee;
    background-image: linear-gradient(#eee, #fff);
    width: 50%;
    color: #445ba9;
    font-weight: bold;
    padding: 5px;
    margin: 0 auto;
    display: block;
    margin-bottom: 30px;
    max-width: 300px;
}

.form input[type="submit"]:hover {
    box-shadow: 1px 1px 4px black;
}

.form input:required {
    border-right: solid 8px red;
}

.form input:required:valid {
    border-right: solid 8px green;
}
</style>
