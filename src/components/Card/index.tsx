import React, { useState, useContext } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';

import { GameContext } from '../../game-context';

import './styles.scss';

interface CardProps {
    index: number;
    title: string;
    description: string;
}

const Card: React.FC<CardProps> = (props) => {
    const gameContext = useContext(GameContext);

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

        api.post(`/selectchallenge`, {
            title,
            description
        })
            .catch(() => {
                toast.error("Não foi possível selecionar a challenge!", {
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            });
    }

    function handleChallengeConcluded(event: React.MouseEvent<HTMLButtonElement>) {
        api.post(`/challengeconcluded`)
            .catch(() => {
                toast.error("Não foi possível selecionar a challenge!", {
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            });
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