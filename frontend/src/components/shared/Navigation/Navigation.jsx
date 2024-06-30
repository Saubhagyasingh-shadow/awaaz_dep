import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';
import Logo from '../../../images/logo (1).png'
import { logout } from '../../../http';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../../../store/authSlice';
import monkey from "../../../images/monkey-avatar.png"
import lgout from "../../../images/logout.png"


const Navigation = () => {
    const brandStyle = {
        color: '#fff',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '22px',
        display: 'flex',
        alignItems: 'center',
    };

    const logoText = {
        marginLeft: '10px',
    };

    const dispatch = useDispatch();
    const { isAuth, user } = useSelector((state) => state.auth);
    console.log(user)

    async function logoutUser() {
        try {
            const { data } = await logout();

            dispatch(setAuth(data));
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <nav className={`${styles.navbar} container`}>
            <Link style={brandStyle} to="/">
                <img src={Logo} alt="logo" />
                <span style={logoText}>Codershouse</span>
            </Link>

            {isAuth && (
                
                <div className={styles.navRight}>
                    {/* <h1 style={{color:"white"}}>{user.avatar}</h1> */}
                    <h3>{user?.name}</h3>
                    
                    <Link to="/">
                        <img
                            className={styles.avatar}
                            src={
                                user.avatar
                                    ? user.avatar
                                    : monkey
                            }
                            width="80"
                            height="130"
                            alt="avatar"
                        />
                    </Link>
                    <button
                        className={styles.logoutButton}
                        onClick={logoutUser}
                        style={{borderRadius:"30px"}}
                    >
                        <img src={lgout} alt="logout" />
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navigation;