import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Modal from "../components/ui/Modal/Modal";

const CardDetails = () => {
  const { state } = useLocation();
  const [isOpenImage, setOpenImage] = useState(false);

  return (
    <section>
      <Link to="/cards" className="inline-flex w-25 text-indigo-500 hover:text-indigo-600 mb-8 px-20" >◀️ Go back </Link>
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
        <img onClick={() => setOpenImage(true)} src={state?.imgSrc} alt={state?.name}/>
        {isOpenImage && (
            <Modal
              onClose={() => setOpenImage(false)}
              title={state?.name}
              isOpen={isOpenImage}
            >              
              <img className="max-h-full rounded" src={state?.imgSrc} alt={state?.name}/>
            </Modal>
          )}
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
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
              Buy
            </button>
            </div>
        </div>
      </div>
      <Link to="/cards" className="inline-flex w-25 text-indigo-500 hover:text-indigo-600 mb-8 px-20" >◀️ Go back </Link>
    </section>
  );
};

export default CardDetails;
