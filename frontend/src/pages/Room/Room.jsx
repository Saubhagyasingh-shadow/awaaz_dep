import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useWebRTC } from '../../hooks/useWebRtc';
import { useParams, useNavigate } from 'react-router-dom';
import { getRoom } from '../../http';
import arrowleft from "../../images/arrow-left.png";
import palm from "../../images/palm.png";
import styles from './Room.module.css';
import win from "../../images/win.png";
import micmute from "../../images/mic-mute.png";
import mic from "../../images/mic.png";

const Room = () => {
    const user = useSelector((state) => state.auth.user);
    const { id: roomId } = useParams();
    const [room, setRoom] = useState(null);

    const { clients, provideRef, handleMute } = useWebRTC(roomId, user);

    const navigate = useNavigate();

    const [isMuted, setMuted] = useState(false);  // Initially unmuted

    useEffect(() => {
        const fetchRoom = async () => {
            const { data } = await getRoom(roomId);
            setRoom((prev) => data);
        };

        fetchRoom();
    }, [roomId]);

    useEffect(() => {
        handleMute(isMuted, user.id);
    }, [isMuted, handleMute, user.id]);

    const handleManualLeave = () => {
        navigate('/rooms');
    };

    const handleMuteClick = (clientId) => {
        if (clientId !== user.id) {
            return;
        }
        setMuted((prev) => !prev);
    };
    // const [clients , setClients] = useState([
    //     {
    //         id: 1,
    //         name: "Sara",
    //     },
    //     {
    //         id: 2,
    //         name: "Sarvffdva",
    //     }
    // ]);


     return (
    //<>
    // //      <h1>all connec</h1>
    // //      {
    //         clients.map((client) => {
    //             return (
    //                 <div key={client.id}>
    //                     <audio controls autoPlay></audio>
    //                     <h3>{client.name}</h3>
    //                 </div>
    //             )

    //         })
    //      }
    // </>
        <div>
            <div className="container">
                <button onClick={handleManualLeave} className={styles.goBack}>
                    <img src={arrowleft} alt="arrow-left" />
                    <span>All voice rooms</span>
                </button>
            </div>
            <div className={styles.clientsWrap}>
                <div className={styles.header}>
                    {room && <h2 className={styles.topic}>{room.topic}</h2>}
                    <div className={styles.actions}>
                        <button className={styles.actionBtn}>
                            <img src={palm} alt="palm-icon" />
                        </button>
                        <button
                            onClick={handleManualLeave}
                            className={styles.actionBtn}
                        >
                            <img src={win} alt="win-icon" />
                            <span>Leave quietly</span>
                        </button>
                    </div>
                </div>
                <div className={styles.clientsList}>
                    {clients.map((client) => (
                        <div className={styles.client} key={client._id}>
                            <div className={styles.userHead}>
                                <img
                                    className={styles.userAvatar}
                                    src={client.avatar}
                                    alt=""
                                />
                                <audio
                                    autoPlay
                                    ref={(instance) => {
                                        provideRef(instance, client.id);
                                    }}
                                />
                                <button
                                    onClick={() => handleMuteClick(client.id)}
                                    className={styles.micBtn}
                                >
                                    {client.muted ? (
                                        <img
                                            className={styles.mic}
                                            src={micmute}
                                            alt="mic"
                                        />
                                    ) : (
                                        <img
                                            className={styles.micImg}
                                            src={mic}
                                            alt="mic"
                                        />
                                    )}
                                </button>
                            </div>
                            <h4>{client.name}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Room;
