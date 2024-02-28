document.addEventListener('DOMContentLoaded', ()  => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const CartItemCount =document.querySelector('.cart-icon span');
    const CartItemList =document.querySelector('.cart-items');
    const CartTotal =document.querySelector('.cart-total');
    const CartIcon =document.querySelector('.cart-icon');
      const Sidebar =document.getElementById('sidebar');

    let cartItems = [];
    let totalAmount = 0;
    addToCartButtons.forEach((button,index) => {
        button.addEventListener('click',() => {
            const item = {
                name:document.querySelectorAll('.card .card-title')[index].textContent,
                price:parseFloat(
                    document.querySelectorAll('.price')[index].textContent.slice(1),
                ),
                quantity: 1,   
            };
        const existingItem=cartItems.find(
            (cartItem) => cartItem.name === item.name,
        );
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push(item);
        }

        totalAmount += item.price

        updateCartUI();
        });
        function updateCartUI(){
            updateCartItemCount(cartItems.length);
            updateCartItemList();
            updateCartTotal();
        }

        function updateCartItemCount(count) {
            CartItemCount.textContent = count;
        }
        function updateCartItemList() {
            CartItemList.innerHTML ='';
            cartItems.forEach((item, index)=> {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item','individual-cart-item');
                cartItem.innerHTML = `<span>(${item.quantity}x)${item.name}</span>
                <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}
                <button class="remove-btn" data-index="${index}"><i class="fa-solid fa-times"
                </i>
                </button>
                </span>`;

                CartItemList.append(cartItem);
            });

            const removeButton = document.querySelectorAll('.remove-item');
            removeButton.forEach((button) =>{
                button.addEventListener('click',(event) => {
                    const index = event.target.dataset.index;
                    removeItemFromCart(index);
               });
            });
        } 
        function removeItemFromCart(index){
            const removeItem =cartItems.splice(index,1)[0];
            totalAmount -=removeItem.price * removeItem.quantity;
            updateCartUI();
        }   
        function updateCartTotal(){
            CartTotal.textContent =`$${totalAmount.toFixed(2)}`;
        }
        CartIcon.addEventListener('click',() => {
            Sidebar.classList.toggle('open');
        });
        const closeButton =document.querySelector('.sidebar-close');
        closeButton.addEventListener('click',()=>{
            Sidebar.classList.remove('open');

        });
        removeButton.forEach((button) => {
            const index =Event.target.dataset.index;
            removeItemFromCart(index);
        });
      });
});