import { create } from "zustand";

const useProducts = create((set, get) => {
  let products;
  const storedCart = JSON?.parse(localStorage?.getItem("cart")) || [];
  /**
   * Функция добавления товаров в корзину
   * @param {Object} product - Данные товара.
   * @returns {void}
   */
  const addToCart = (product) => 
    {
        let updatedCart = get().cart;
        //Получаем элемент массива если он уже есть в массиве корзины 
        const findProduct = updatedCart.find(find => find.id === product.id)
        console.log("find ",findProduct);
        console.log("update ",updatedCart);
        if(findProduct)
        {
            //Если есть, то удаляем найденный элемен из массива корзины и записываем этот элемент с увеличенным количеством
            updatedCart = updatedCart.filter(product => product?.id !== findProduct.id);
            findProduct.cartQuantity++;
            updatedCart = [...updatedCart, findProduct]
        }
        else
        {
            //Если нет, то записываем переданный элемент в массив корзины
            updatedCart = [...updatedCart, product];
        }
        //const updatedCart = [...get().cart, { ...product, cartQuantity: 1 }];        
        localStorage?.setItem("cart", JSON?.stringify(updatedCart));
        set({ cart: updatedCart });
        console.log("Cart after set:", get().cart);
    };

  /**
   * Функция удаления товара из корзины
   * @param {string} productId - id товара.
   * @returns {void}
   */
  const deleteFromCart = (productId) => 
    {
        const updatedCart = get()?.cart?.filter(product => product?.id !== productId);
        localStorage?.setItem("cart", JSON?.stringify(updatedCart));
        set({ cart: updatedCart });
    };

    const cartCount = () =>
    {
        get().cart.length;
    }

  return {
    products,
    cart: storedCart,
    addToCart,
    deleteFromCart,
    cartCount
  };
});

export default useProducts;