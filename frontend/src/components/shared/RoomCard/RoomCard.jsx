import React from 'react';
import styles from './RoomCard.module.css';
import { useNavigate } from 'react-router-dom';
import bubble from '../../../images/chat-bubble.png';
import usericon from '../../../images/user-icon.png';


const RoomCard = ({ room }) => {
    const history = useNavigate();
    return (
        <div
            onClick={() => {
                history(`/room/${room.id}`);
            }}
            className={styles.card}
        >
            <h3 className={styles.topic}>{room.topic}</h3>
            <div
                className={`${styles.speakers} ${
                    room.speakers.length === 1 ? styles.singleSpeaker : ''
                }`}
            >
                <div className={styles.avatars}>
                    {room.speakers.map((speaker) => (
                        <img
                            key={speaker.id}
                            src={speaker.avatar}
                            alt="speaker-avatar"
                        />
                    ))}
                </div>
                <div className={styles.names}>
                    {room.speakers.map((speaker) => (
                        <div key={speaker.id} className={styles.nameWrapper}>
                            <span>{speaker.name}</span>
                            <img
                                src={bubble}
                                alt="chat-bubble"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.peopleCount}>
                <span>{room.totalPeople}</span>
                <img src={usericon} alt="user-icon" />
            </div>
        </div>
    );
};

export default RoomCard;