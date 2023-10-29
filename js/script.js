var total = 0.00;

// calculateTotal() function
document.addEventListener('DOMContentLoaded', function calculateTotal() {

    // variable declaration
    let type_value = 0.00;
    let cart = document.getElementById('value');
    let payment = document.getElementById('total_value');
    let embroidery = document.getElementById('embroidery');
    let logo = document.getElementById('logo');
    let design = document.getElementById('design');
    let shirt_type_form = document.shirt_type_form.shirt_type;
    let design_value = null;
    let radio_prev = null;
    let select_prev = null;
    let table = document.getElementById('cart_table');
    let row = null;
    let cell1 = null;
    let cell2 = null;

    // radio button selection
    for (let i = 0; i < shirt_type_form.length; i++) {
        shirt_type_form[i].addEventListener('change', function(){
            type_value = parseFloat(this.value);
            total = total + type_value;
            table.style.display = 'table';
            
            // error handling for previously selected value
            if (radio_prev) {
                total = total - radio_prev.value;
                row = document.getElementById('type');
                row.childNodes[0].innerHTML = `${this.id}`;
                row.childNodes[1].innerHTML = `RM ${type_value}`;
            }

            else{
                row = table.insertRow(1);
                row.id = 'type';
                cell1 = row.insertCell(0);
                cell2 = row.insertCell(1);
                cell1.innerHTML = `${this.id}`;
                cell2.innerHTML = `RM ${type_value}`;
            }


            (this !== radio_prev) ? radio_prev = this : null;
            cart.innerHTML = `RM ${total.toFixed(2)}`;
            payment.innerHTML = `RM ${total.toFixed(2)}`;
            
        })
    }


    // embroidery adding and subtracting
    embroidery.addEventListener('change', function(){

        table.style.display = 'table';

        if (embroidery.checked) {
            total = total + 10;
            row = table.insertRow(-1);
            row.id = 'embroidery_row';
            cell1 = row.insertCell(0);
            cell2 = row.insertCell(1);
            cell1.innerHTML = 'embroidery';
            cell2.innerHTML = 'RM 10';
        }
         
         else {
            total = total - 10;
            document.getElementById('embroidery_row').remove();
        }
        cart.innerHTML = `RM ${total.toFixed(2)}`;
        payment.innerHTML = `RM ${total.toFixed(2)}`;
    })


    // logo adding and subtracting
    logo.addEventListener('change', function(){

        table.style.display = 'table';

        if (logo.checked) {
            total = total + 25;
            row = table.insertRow(-1);
            row.id = 'logo_row';
            cell1 = row.insertCell(0);
            cell2 = row.insertCell(1);
            cell1.innerHTML = 'logo';
            cell2.innerHTML = 'RM 25';
        }

        else {
            total = total - 25;
            document.getElementById('logo_row').remove();
        }
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


        // for table row
        table.style.display = 'table';
        let child = event.target.childNodes;
        for (let i = 1; i < child.length; i += 2){
        
            if (child[i].value == design_value){

                // if there is previous selection
                if (select_prev){

                    if(design_value == 0){
                        document.getElementById('design_row').remove();
                        select_prev = null;
                    }
                    else{
                        let design_row = document.getElementById('design_row');
                        design_row.childNodes[0].innerHTML = `${child[i].id}`;
                        design_row.childNodes[1].innerHTML = `RM ${child[i].value}`;
                    }
                    
                }

                // create row for not having a previous selection
                else{
                    row = table.insertRow(-1);
                    row.id = 'design_row';
                    cell1 = row.insertCell(0);
                    cell2 = row.insertCell(1);
                    cell1.innerHTML = `${child[i].id}`;
                    cell2.innerHTML = `RM ${child[i].value}`;
                    select_prev = child[i].value;
                }
                break;
            }
        }

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