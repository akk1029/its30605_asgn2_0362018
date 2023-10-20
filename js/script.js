// global varaiable
var total = 0.00;

// calculateTotal() function
document.addEventListener('DOMContentLoaded', function calculateTotal() {
    // variable declaration
    let type_value = 0.00;
    let design_value = null;
    let cart = document.getElementById('value');
    let payment = document.getElementById('total_value');
    let embroidery = document.getElementById('embroidery');
    let logo = document.getElementById('logo');
    let shirt_type_form = document.shirt_type_form.shirt_type;
    let design = document.getElementById('design');
    let prev = null;
    

    // radio button selection
    for (let i = 0; i < shirt_type_form.length; i++) {
        shirt_type_form[i].addEventListener('change', function(){
            type_value = parseFloat(this.value);
            total = total + type_value;
            // error handling for previously selected value
            (prev) ? total = total - prev.value : null;
            (this !== prev) ? prev = this : null;
            cart.innerHTML = `RM ${total.toFixed(2)}`;
            payment.innerHTML = `RM ${total.toFixed(2)}`;
        })
    }

    // embroidery adding and subtracting
    embroidery.addEventListener('change', function(){
        (embroidery.checked) ? total = total + 10 : total = total - 10;
        cart.innerHTML = `RM ${total.toFixed(2)}`;
        payment.innerHTML = `RM ${total.toFixed(2)}`;
    })

    // logo adding and subtracting
    logo.addEventListener('change', function(){
        (logo.checked) ? total = total + 25 : total = total - 25;
        cart.innerHTML = `RM ${total.toFixed(2)}`;
        payment.innerHTML = `RM ${total.toFixed(2)}`;
    })

    // design selection
    design.addEventListener('change', function(event){
        // subtract pre-existing value for error handling
        (design_value == null) ? null: total = total - design_value;
        design_value = parseFloat(event.target.value);
        total = design_value + total;
        cart.innerHTML = `RM ${total.toFixed(2)}`;
        payment.innerHTML = `RM ${total.toFixed(2)}`;
    })
})



// totalPayment Function
function totalPayment(){
    let tee = document.getElementById('tee');
    let polo = document.getElementById('polo');
    let button = document.getElementById('button');
    let hoodie = document.getElementById('hoodie');
    let grand_total = document.getElementById('total_value');

    // haven't selected shirt type --> no payment
    if (tee.checked == false && polo.checked == false && button.checked == false && hoodie.checked == false){
        alert("Please select your fav shirt type.")
    }
    
    else if (total > 150){
        alert(`You are eligible for 10% discount!!\nYour new total is ${(total - total/10).toFixed(2)}`)
        grand_total.innerHTML = `RM ${(total - total/10).toFixed(2)}`
    }

    else{
        alert("Thank you for your purchase!!")
    }
}