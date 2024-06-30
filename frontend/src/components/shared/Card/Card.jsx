import React from 'react';
import styles from './Card.module.css';
import Logo from '../../../images/logo (1).png'
const Card = ({ title, icon, children }) => {
    return (
        <div className={styles.card}>
            <div className={styles.headingWrapper}>
                <img src={Logo} alt="Logo" />
                <h1 className={styles.heading}>{title}</h1>
            </div>
            {children}
        </div>
    );
};

export default Card;