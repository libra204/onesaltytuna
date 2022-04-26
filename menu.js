class Dish {
    constructor (name, price, quantity) {
        this.name = name;
        this.price = Number(price);
        this.quantity = quantity;
    }
}
$('#invoice-no span').html(Math.floor(Math.random()*100000))
$('#invoice-date span').html((new Date()).toDateString())
const dishes = $('#dishes > div')
const dish = []
const selectedDish = []
var total
function table(i) {
    $('#order-table tbody').children().eq(i).children().eq(3).html(dish[i].quantity)
    $('#order-table tbody').children().eq(i).children().eq(4).html(`$ ${dish[i].quantity*dish[i].price}`)
    dishes[i].children[4].children[1].innerHTML = dish[i].quantity
    document.querySelector('#order-table tbody').innerHTML = ''
    total = 0
    selectedDish.forEach(function(item, index) {
        document.querySelector('#order-table tbody').innerHTML += `<tr><td>${index+1}</td><td>${dish[item[1]].name}</td><td>$ ${dish[item[1]].price}</td><td>${dish[item[1]].quantity}</td><td>$ ${dish[item[1]].price*dish[item[1]].quantity}</td></tr>`
        total += dish[item[1]].price*dish[item[1]].quantity
    })
    if (selectedDish.length != 0) {$('#order table tfoot td span').html(`$ ${total}`)} else {$('#order table tfoot td span').html('')}
}
for (let i=0; i < dishes.length-1; i++) {
    dishes[i].innerHTML+='<div class="pick"><p>-</p><p>0</p><p>+</p></div>'
    dish[i] = new Dish(dishes[i].children[1].innerText,dishes[i].children[3].innerText.replace(/\s/g,'').replace('$',''),0)
    $('#order-table tbody').children().eq(i).hide()
    dishes[i].children[4].children[0].onclick = function() {
        if (dish[i].quantity != 0) { // Min = 0
            dish[i].quantity -= 1
            if (dish[i].quantity == 0) {
                selectedDish.forEach(function(item, index) {
                    if (item[1] == i) {selectedDish.splice(index, 1)}
                })
            }
            table(i)
        }
    }
    dishes[i].children[4].children[2].onclick = function() {
        dish[i].quantity += 1
        if (dish[i].quantity == 1) {
            selectedDish.push([$('#order-table tbody').children().eq(i),i])
        }
        table(i)
    }
}