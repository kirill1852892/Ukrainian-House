let products = [
    {
        "title":"холодильник",
        "description":"Side-by-side холодильник BOSCH KAI93VI304",
        "price":85799,
        "image":"https://content1.rozetka.com.ua/goods/images/big/181827426.jpg",
    },
    {
        "title":"Шафа",
        "description":"Side-by-side шафа BOSCH KAI93VI304",
        "price":68999,
        "image":"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTqIc7dKkuYs1NBWW40hPmhpkm6m-CC1LO5Z9EujVVn9gz8ZhLAvBCB0D2uX2gGxbd56RKeC0EIQRTKF7uzQwsI2PUkf2yZGuzQ6NnLX5UuZP-QBX0mf2sN8A&usqp=CAc",
    },
    {
        "title":"Пральна машина",
        "description":"Side-by-side пральна машина BOSCH KAI93VI304",
        "price":663062,
        "image":"https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTRR-RMfOACcIry7FGVk7AUH5nLcp34BxqM9u82ruVeQ7cLaWYd1rl4fPbBr-p7gGlF1nxvkXwHLyMVBMQ2nlltIaq7YZ5_NB9UeZdjlbiv5VLvX2NUAOHkJxWcDvHdectRUptclvvpUIs&usqp=CAc",
    },
    {
        "title":"Ліжко",
        "description":"Side-by-side лшжко BOSCH KAI93VI304",
        "price":9963,
        "image":"https://matras.kiev.ua/image/cache/catalog/products/NEW%20PHOTO/1220/krovat-siti-city-2-1050x700.jpg",
    },
    {
        "title":"Стіл",
        "description":"Side-by-side стіл BOSCH KAI93VI304",
        "price":5969,
        "image":"https://mebeloffice.com.ua/products_pictures/large_Atribut02_urban.jpg",
    },
    {
        "title":"Стільці",
        "description":"Side-by-side стільці BOSCH KAI93VI304",
        "price":364695,
        "image":"https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSeQlyVUw7Xd90TzLPv7BndpV_NFydLNe6wwNTIaR7E6H8TGjDVmKKh18_RFmMkIdDU9Qk2VJ4ZTf0VRzlgPTswODLrH-uoaZqDNSkvvo70ShQyAYl4pgg-7BYluA&usqp=CAc",
    },
    {
        "title":"Диван",
        "description":"Side-by-side диван BOSCH KAI93VI304",
        "price":78472,
        "image":"https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS4vXhVSqygcA1njhNzd1KeAt-1FlGkxBDfzMjCu0WQIPQkVmZgcSg9j4I-Qa2IRMnPZ0aacLF4ye8II92ewQcGr2jJsqGV_KRXsPgPc3TEsncl8UBM3fQQmA&usqp=CAc",
    },
    {
        "title":"Пилисос",
        "description":"Side-by-side пилисос BOSCH KAI93VI304",
        "price":17999,
        "image":"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSIWRvsTw7iokAYKzllUxO0RgG-JnbdmTYaulKTQo2Cpelf3bMRWMwHBZKClcfkvpcUQ0lZXeUSgEit3ioEckxIFzf-uEbNP09L34CmInt5SG2088pL7emzHMCgSUAhEpszhUbkD6JmNi4&usqp=CAc",
    },
]

// Функція для отримання значення кукі за ім'ям
function getCookieValue(cookieName) {
   // Розділяємо всі куки на окремі частини
   const cookies = document.cookie.split(';');


   // Шукаємо куки з вказаним ім'ям
   for (let i = 0; i < cookies.length; i++) {
       const cookie = cookies[i].trim(); // Видаляємо зайві пробіли


       // Перевіряємо, чи починається поточне кукі з шуканого імені
       if (cookie.startsWith(cookieName + '=')) {
           // Якщо так, повертаємо значення кукі
           return cookie.substring(cookieName.length + 1); // +1 для пропуску символу "="
       }
   }
   // Якщо кукі з вказаним іменем не знайдено, повертаємо порожній рядок або можна повернути null
   return '';
}


//створюємо класс кошику з усіма властивостями та методами(діями)
class Cart{
   constructor(){
       this.products = []
       this.cartCounter = document.querySelector('.cart-container span');// отримуємо лічильник кількості товарів у кошику
       this.loadCartFromCookies(); // завантажуємо з кукі-файлів раніше додані в кошик товари
   }
   addItem(productIndex) {//додання товару в кошик
       let productInCart = this.products.find(product => product.productIndex === productIndex);//перевіярємо чи вже існує цей товар в корзині
       if (productInCart) {//якщо існує то збільшуємо його кількість
           productInCart.quantity += 1;
       }else {//якщо товара нема то додаємо його та вказуємо кількість 1
           this.products.push({
               productIndex,
               quantity:1
           });
       }
       this.updateCounter(); // Оновлюємо лічильник товарів
       this.saveCartToCookies();// зберегаємо в кукі
   }


   updateCounter() {//оновлення загальної кількості товарів
       let count = 0;
       for (let i = 0;i < this.products.length;i++) { // проходимося по всіх товарах
           count += this.products[i].quantity; // рахуємо кількість усіх товарів
       }
       this.cartCounter.innerHTML = count; // оновлюємо лічильник на сторінці
   }
   // Зміна кількості одного товара
   updateQuantity(productIndex, newQuantity) {
       let productInCart = this.products.find(product => product.productIndex === productIndex);//перевіярємо чи вже існує цей товар в корзині
       if (productInCart) {
           productInCart.quantity = newQuantity;
           if (productInCart.quantity == 0) {
               this.products = this.products.filter(product => product.productIndex !== productIndex);
           }
           this.updateCounter();
           this.saveCartToCookies();
       }
   }
   saveCartToCookies() {//збереження кошику в кукі
       let cartJSON = JSON.stringify(this.products);
       document.cookie = `cart=${cartJSON}; max-age=${60 * 60 * 24 * 7}; path=/`;
   }
   loadCartFromCookies() {
       let cartCookie = getCookieValue('cart');
       if (cartCookie && cartCookie !== '') {
           this.products = JSON.parse(cartCookie);
           this.updateCounter();
       }
   }
   calculateTotal(){
       let total = 0;
       for(let i = 0;i < this.products.length;i++){
           total += products[this.products[i].productIndex].price * this.products[i].quantity;
       }
      
       return total;
   }
}
const cart = new Cart();


function getProductCart(product){
   return `<article class="item">
           <img src="${product.image}">
           <h2>${product.title}</h2>
           <p class="item-desc">${product.description}</p>
           <p class="item-price">
               <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-currency-hryvnia"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M8 7a2.64 2.64 0 0 1 2.562 -2h3.376a2.64 2.64 0 0 1 2.562 2a2.57 2.57 0 0 1 -1.344 2.922l-5.876 2.938a3.338 3.338 0 0 0 -1.78 3.64a3.11 3.11 0 0 0 3.05 2.5h2.888a2.64 2.64 0 0 0 2.562 -2"></path><path d="M6 10h12"></path><path d="M6 14h12"></path></svg>
               ${product.price}
           </p>
           <button class="item-buy">
               <svg class="bell" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path><path d="M12.5 17h-6.5v-14h-2"></path><path d="M6 5l14 1l-.86 6.017m-2.64 .983h-10.5"></path><path d="M16 19h6"></path><path d="M19 16v6"></path></svg>
               Купити
           </button>
       </article>`
}
//виведення на екран всіх товарів
function printProducts(_products) {
   let localProducts = _products || products
   //контейнер в якому знаходяться всі товари
   let itemsContainer = document.querySelector(".items");
   itemsContainer.innerHTML = "";
   if(!localProducts.length) {
       itemsContainer.innerHTML = "<h1>Нема товару</h1>";
       return;
   }
   //проходимось по всім товарам та додаємо верстку зі значеннями кожного товару
   for(let i = 0;i < localProducts.length;i++){
       itemsContainer.innerHTML += getProductCart(localProducts[i]);
   }
   //отримуємо всі кнопки "купити" та додаємо на кожну кнопку подію для додання в кошик
   let buyButtons = document.querySelectorAll(".item-buy");
   for(let i = 0;i < buyButtons.length;i++){
       buyButtons[i].addEventListener("click",() => cart.addItem(i))
   }
}


printProducts();


let search = document.querySelector(".search");


function onSearch(event){
   let localProducts = products.filter(product => product.title.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()));
   console.log(localProducts,event.target.value)


   printProducts(localProducts);
}
search.addEventListener("input",onSearch)





