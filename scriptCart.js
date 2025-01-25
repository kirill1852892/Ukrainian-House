let cart_items_element = document.querySelector(".cart-items");
let cart_total = document.querySelector('.total-price')


function get_cart_item(item) {
   return `<article class="cart-item">
       <div class="cart-item-left">
           <img src="${products[item.productIndex].image}">
           <h2>${products[item.productIndex].title}</h2>
       </div>
       <div class="cart-item-middle">
           <span>Кількість</span>
           <input class="quantity-input" type="number"  value="${item.quantity}">
       </div>
       <p class="cart-item-total">${products[item.productIndex].price * item.quantity} грн</p>
   </article>`
}


function showCartList() {
   cart_items_element.innerHTML = ''
   for (let i = 0;i < cart.products.length;i++) { // проходимося по всіх ключах об'єкта cart.items
       cart_items_element.innerHTML += get_cart_item(cart.products[i])
   }
   cart_total.innerHTML = cart.calculateTotal() + " грн"


   let quantityInputs = document.querySelectorAll(".quantity-input");
   console.log(quantityInputs)
   for(let i = 0;i < quantityInputs.length;i++){
       quantityInputs[i].addEventListener("change",(e) => {
       console.log('f',cart.products[i].productIndex,+e.target.value,)
           cart.updateQuantity(cart.products[i].productIndex,+e.target.value);
           showCartList();
       });
   }
}


showCartList();


cart_items_element.addEventListener('change', (event) => {
   let target = event.target
   const itemTitle = target.getAttribute('data-item')
   const newQuantity = +target.value
   if (newQuantity > 0) {
       cart.updateQuantity(itemTitle, newQuantity)
       showCartList() // Оновити список товарів у кошику
   }
});

