import React, { useContext } from 'react';
import { GameContext } from '../../game-context';
import Card from '../Card';
import './styles.scss';

const CardList: React.FC = () => {
    const gameContext = useContext(GameContext);

    return (
        <div>
            <h3 style={{
                textAlign: "center"
            }}>
                Sua vez de jogar, escolha um card para descobrir qual é o seu desafio!
            </h3>
            <div id="card-list">
                {
                    gameContext?.challenges.map((item: any, index: number) => (
                        <Card
                            key={index}
                            index={index + 1}
                            title={item.title}
                            description={item.description}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default CardList;