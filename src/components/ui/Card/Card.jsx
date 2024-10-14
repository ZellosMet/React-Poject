import styles from"./Card.module.css";

/**
* Компонент "Карточка"
*{reviews && <span> ({reviews} reviews)</span>}
* @param {object} props - Параметры компонента
* @param {string} props.name - Название карточки
* @param {string} props.description - Описание карточки
* @param {string} props.price - Цена карточки
* @param {string} props.rating - Рейтинг карточки
* @param {string} props.reviews - Отзывы пользователей
* @param {string} props.imgSrc - Путь к изображению
* @return {JSX.Element} - Элемент JSX
*/
const Card = (props) => {const { name, category, description, price, rating, imgSrc, isFavorite } = props.details;
const { onCardClick } = props;
    return (
    <div onClick={onCardClick} id="card" className={`${styles.flex} ${styles.card} ${styles.pay}`}>
        <div className={isFavorite ? styles.featured_isCheck : styles.featured}>Featured</div>
        {imgSrc && <img src = {imgSrc} alt = {name} />}
        <div className={styles.p_20}>
            {name && <h2 className={styles.text_font_24}>{name}</h2>}
            <div className={styles.color_text_gray}>
                {description && <p>{description}</p>}        
                {category && <p>{category}</p>}        
                {rating && <span>⭐{rating}</span>}                
            </div>
            <div className={`${styles.flex} ${styles.pt_20}` }>
                {price && <span className={styles.text_font_24}><b>${price}</b></span>}
                <button className={styles.button} type ="button"> Details </button>            
            </div>          
        </div>
    </div>
    );
};

Card.displayName = "Card";
export default Card;