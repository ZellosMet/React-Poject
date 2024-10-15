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
        //Получаем индекс элемента массива если он уже есть в массиве корзины 
        const index = updatedCart.findIndex(find => find.id === product.id)
        if(index != -1)
        {
            //Если есть, то увеличиваем значение количества товара
            updatedCart[index].cartQuantity++;
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

  /**
   * Функция подсчёта всего товара в корзине
   * @returns {number} - количество всего товара в корзине
   */
    const getTotalQuantity = () =>
    {
        const totalQuantity = get().cart.reduce( function (sum, productQuantity)
        {
          return sum += productQuantity.cartQuantity;
        },0)
        return totalQuantity
    }

  /**
   * Функция увеличения количества определённого товара в корзине
   * @param {string} productId - id товара.
   * @returns {void}
   */
    const incrementQuantity = (productId) =>
    {
      let updatedCart = get().cart;
      const index = updatedCart.findIndex(find => find.id === productId)
      updatedCart[index].cartQuantity++;
      localStorage?.setItem("cart", JSON?.stringify( updatedCart));
      set({ cart: updatedCart });
    }

  /**
   * Функция уменьшения количества определённого товара в корзине
   * @param {string} productId - id товара.
   * @returns {void}
   */
    const decrementQuantity = (productId) =>
    {
      let updatedCart = get().cart;
      const index = updatedCart.findIndex(find => find.id === productId)
      updatedCart[index].cartQuantity--;
      localStorage?.setItem("cart", JSON?.stringify( updatedCart));
      set({ cart: updatedCart });
    }

  return {
    products,
    cart: storedCart,
    addToCart,
    deleteFromCart,
    getTotalQuantity,
    incrementQuantity,
    decrementQuantity
  };
});

export default useProducts;