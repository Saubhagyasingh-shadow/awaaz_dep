import React from 'react';
import styles from './Button.module.css';
import Arrow from '../../../images/arrow-forward.png'
const Button = ({ text, onClick }) => {
    return (
        <button onClick={onClick} className={styles.button}>
            <span>{text}</span>
            <img
                className={styles.arrow}
                src={Arrow}
                alt="arrow"
            />
        </button>
    );
};
export default Button;