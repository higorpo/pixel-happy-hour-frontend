import React, { useState, useContext } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';

import { GameContext } from '../../game-context';

import './styles.scss';
import { SocketContext } from '../../socket-context';
import { useLocation } from 'react-router-dom';

interface CardProps {
    index: number;
    title: string;
    description: string;
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Card: React.FC<CardProps> = (props) => {
    let query = useQuery();

    const gameContext = useContext(GameContext);
    const io = useContext(SocketContext);

    const [isSelected, setIsSelected] = useState<boolean>(false);

    // Função da seleção do desafio
    function handleSelectChallenge(): void {
        const {
            title,
            description
        } = props;

        console.log({ title, description });

        if (isSelected) return;
        if (!gameContext?.canSelectChallenge) return;

        gameContext.setCanSelectChallenge(false);
        setIsSelected(true);

        const roomId = query.get('roomId');

        io?.emit('selected_challenge', {
            roomId,
            title,
            description
        })
    }

    function handleChallengeConcluded(event: React.MouseEvent<HTMLButtonElement>) {
        const roomId = query.get('roomId');

        io?.emit('challenge_conclude', roomId);
    }

    return (
        <div
            className={!isSelected ? "card flip-container" : "card flip-container flip-active"}
            onClick={() => handleSelectChallenge()}>
            <div
                className="flipper">
                <div className="front">
                    <span>{props.index}</span>
                </div>
                <div className="back">
                    <h3>O seu desafio é...</h3>
                    <h1>{props.title}</h1>
                    <p>{props.description}</p>

                    <div className="buttons">
                        <button onClick={handleChallengeConcluded} style={{ marginRight: 10 }}>Fiz o desafio <span role="img" aria-label="Joinha">👍</span></button>
                        {/* <button>Não fiz o desafio 😢</button> */}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Card;