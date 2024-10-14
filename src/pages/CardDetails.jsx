import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Alert from "../components/ui/Alert/Alert";
import useDisclosure from "../components/hooks/useDisclosure";
import useProducts from "../store/useProducts";

const CardDetails = () => {
   // Показ/скрытие компонента Alert
   const alertData = useDisclosure();

   // Получение данных о карточке
   const { state } = useLocation();
 
   // Достаем метод добавления из стора
   const { addToCart } = useProducts();
 
   // Обработчик добавления товара в корзину
   const handleAddToCart = () => {
     // Добавляем товар в стор
     addToCart(state);
 
     // Уведомляем пользователя
     alertData?.onOpen();
   };
  return (
    <section>
      <Link to="/cards" className="inline-flex w-25 text-indigo-500 hover:text-indigo-600 mb-8 px-20" >◀️ Go Products </Link>
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between mb-4"> 
          <h2 className="mb-4 text-4xl font-bold text-zinc-800">{state?.name}</h2>
          <button 
            className={
                state?.isFavorite ? 
                "bg-fuchsia-600 text-white rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:hover:bg-fuchsia-700" : 
                "bg-teal-500 text-white rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:hover:bg-teal-600"
            }>Featured</button>
        </div >
        <img src={state?.imgSrc} alt={state?.name}/>               
        <div className="px-6 py-4">
            <p className="text-gray-600 text-lg mb-2">{state?.description}</p>
            <p className="text-gray-600 text-lg mb-2">Category: {state?.category}</p>
            {state?.rating && (
              <div className="text-yellow-500 text-2xl mb-2">
                {"★".repeat(Math.floor(state?.rating)) +
                  "☆".repeat(5 - Math.floor(state?.rating))}
              </div>
            )}
          <div className="flex justify-between text-lg font-bold mb-2">${state?.price}
            <button onClick={handleAddToCart} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
              Add to Cart
            </button>
            </div>
        </div>
      </div>
      <Alert
        variant="info"
        title="Добавление товара"
        subtitle="Товар был добавлен!"
        isOpen={alertData?.isOpen}
        onClose={alertData?.onClose}
      />
    </section>
  );
};

export default CardDetails;
