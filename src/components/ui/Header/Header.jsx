import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import useProducts from "../../../store/useProducts";

/** Роуты меню */
const navItems = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/cards" },
  { name: "Privacy", path: "/privacy" }
];

/**
 * Компонент Шапка.
 * @returns {JSX.Element} Элемент header.
 */
const Header = () => {
  // Состояние для показа/скрытия модалки для входа
  const [isOpenSignIn, setOpenSignIn] = useState(false);
  const [isOpenSignUp, setOpenSignUp] = useState(false);
  
  // Получаем информацию из адресной строки
  const location = useLocation();
  // Хук для направления пользователя в корзину товаров
  const navigate = useNavigate();

  // Получаем данные из хранилища
  const { cart } = useProducts();

  /**
   * Определяет, активна ли ссылка.
   * @param {string} path - Путь ссылки.
   * @returns {boolean} ссылка активна или нет.
   */
  const isActiveLink = (path) => {
    return (
      location?.pathname === path ||
      (path === "/cards" && location?.pathname?.startsWith("/cards"))
    );
  };
  // Переход на страницу Корзины
  const handleOpenCart = () => navigate("/cart");

  return (
    <header className="bg-white shadow fixed top-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex justify-between h-16">
          <nav className="flex justify-between">            
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              {navItems?.length > 0 &&
                navItems?.map((item) => {
                  return (
                    <NavLink
                      to={item?.path}
                      key={item?.path}
                      className={`text-zinc-800 inline-flex items-center px-1 pt-1 text-sm ${
                        isActiveLink(item?.path)
                          ? "text-indigo-500 border-b-2 border-indigo-500"
                          : "hover:text-indigo-500"
                      }`}
                    >
                      {item?.name}
                    </NavLink>
                  );
                })}
            </div>
            </nav>            
            <NavLink to="/" className="flex-shrink-0 flex items-center">
              <img className="w-36 object-contain" src="../../../assets/header/logo.svg" alt="Logo"/>
            </NavLink>

            {/* Отображение значка и переход на страницу корзины*/}
             <div className="flex items-center pr-2">
            <button
              onClick={handleOpenCart}
              id="cart"
              type="button"
              className={`relative bg-transparent p-1 mr-3 rounded-full    ${
                location?.pathname === "/cart"
                  ? "text-indigo-500 hover:text-indigo-600"
                  : "text-gray-400 hover:text-gray-500"
              }`}
            >
              <svg
                fill="currentColor"
                width="24"
                height="24"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path d="M17 24H21V28H17zM24 24H28V28H24zM17 17H21V21H17zM24 17H28V21H24z"></path>
                <path d="M28,11h-6V7c0-1.7-1.3-3-3-3h-6c-1.7,0-3,1.3-3,3v4H4c-0.6,0-1,0.4-1,1c0,0.1,0,0.1,0,0.2l1.9,12.1c0.1,1,1,1.7,2,1.7H15v-2	H6.9L5.2,13H28V11z M12,7c0-0.6,0.4-1,1-1h6c0.6,0,1,0.4,1,1v4h-8V7z"></path>
              </svg>

                {/*Отображение количества товаров в корзине*/}                 
                <span className="w-5 h-5 text-xs px-1 leading-5 text-white inline-flex items-center justify-center bg-indigo-500 rounded-full absolute top-[-4px] right-[-4px]">
                  {cart.length}
                </span> 

            </button>
          </div>      

          <div id="buttons-wrapper" className="inline-flex items-center">
            <button
              type="button"
              onClick={() => setOpenSignIn(true)}
              className="border-2 text-indigo-500 border-indigo-500 font-medium py-2 px-4 rounded"
            >
              Sign in
            </button>
            
            <button
              type="button"
              onClick={() => setOpenSignUp(true)}
              className="ml-3 border-2 border-indigo-500 bg-indigo-500 text-white font-medium py-2 px-4 rounded"
            >
              Sign up
            </button>
          </div>

          {isOpenSignUp && (
            <Modal
              onClose={() => setOpenSignUp(false)}
              title="Регистрация в приложение"
              isOpen={isOpenSignUp}
            >
              <form action="#">
                <div className="flex flex-col">
                  <div className="mb-4">
                    <label htmlFor="full_name">Your login</label>
                    <input
                      type="text"
                      name="login"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      defaultValue=""
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      defaultValue=""
                      placeholder="email@domain.com"
                    />
                  </div>

                  <div className="mb-4 flex justify-end">
                    <button className="border-2 border-indigo-500 bg-indigo-500 text-white font-medium py-2 px-4 rounded">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </Modal>
          )}

{isOpenSignIn && (
            <Modal
              onClose={() => setOpenSignIn(false)}
              title="Вход в приложение"
              isOpen={isOpenSignIn}
            >
              <form action="#">
                <div className="flex flex-col">
                  <div className="mb-4">
                    <label htmlFor="full_name">Your login</label>
                    <input
                      type="text"
                      name="login"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      defaultValue=""
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      defaultValue=""
                      placeholder="email@domain.com"
                    />
                  </div>

                  <div className="mb-4 flex justify-end">
                    <button className="border-2 border-indigo-500 bg-indigo-500 text-white font-medium py-2 px-4 rounded">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </Modal>
          )}
        </div>
      </div>
    </header>
  );
};

Header.displayName = "Header";

export default Header;
