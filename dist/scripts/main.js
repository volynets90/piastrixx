var button = document.querySelector('.btn');
var mail = document.querySelector('.inputEmail');
var reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
var amount = document.querySelector('.amount');
var currency = document.querySelector('.currency');
var description = document.querySelector('.submitForm__description');
var payway = document.querySelector('.payway');
var shop_id = document.querySelector('.shop_id');
var shop_order_id = document.querySelector('.shop_order_id');
var sign = document.querySelector('.sign');
var mailForm = document.querySelector('.mailForm');
var submitForm = document.querySelector('.submitForm');
var submitButton = document.querySelector(".submitForm .btn");

button.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('yes');
    console.log(mail.value);
    if (reg.test(mail.value) == false) {
        alert('Введите корректный e-mail');
        return false;
    }
    else {
        mailForm.classList.add('hide');
        fetch("https://test-telega.piastrix24.com/api/get_data", {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: "email=" + mail.value
        })
            .then((response) => response.text())
            .then((responseText) => {
                let resp = JSON.parse(responseText);
                console.log(responseText);
                console.log(resp.description + "description");
                amount.value = resp.amount;
                currency.value = resp.currency;
                description.value = resp.description;
                payway.value = resp.payway;
                shop_id.value = resp.shop_id;
                shop_order_id.value = resp.shop_order_id;
                sign.value = resp.sign;
                submitForm.classList.remove('hide');
            })
            .catch((error) => {
                console.error(error);
            });
    }
})

submitButton.addEventListener('click', function(e){
    e.preventDefault();
    console.log("PRESSED!!");
    fetch("https://pay.piastrix.com/ru/pay", {
        method: 'POST'
    })
        .then((response) => response.text())
        .then((responseText) => {
           // let resp = JSON.parse(responseText);
           document.location.href="index.html";
        })
        .catch((error) => {
            console.error(error);
        });

})