import React from 'react';
import classes from './Reviews.module.css'

const Reviews = () => {
    return ( 
    <div className={classes.container}>
        <h2>Отзывы</h2>
  
        <div className={classes.videoReviews}>
          <h3>Видео отзывы</h3>
          <input type="file" accept="video/mp4" className={classes.input} />
          <button className={classes.button}>Загрузить</button>
        </div>
  
        <div className={classes.recommendationLetters}>
          <h3>Рекомендательные письма</h3>
          <input type="file" accept=".pdf,.doc,.docx" className={classes.input} />
          <button className={classes.button}>Загрузить</button>
        </div>
  
        <div className={classes.clientLogos}>
          <h3>Логотипы клиентов</h3>
          <img src="logo1.png" alt="Логотип 1" className={classes.logo} />
          <img src="logo2.png" alt="Логотип 2" className={classes.logo} />
          <img src="logo3.png" alt="Логотип 3" className={classes.logo} />
        </div>
    </div>
    );
}
 
export default Reviews;