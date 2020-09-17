import React, { useContext } from 'react';
import { GameContext } from '../../game-context';
import './styles.scss';

const WaitingAnotherPlayer: React.FC = () => {
    const gameContext = useContext(GameContext);

    return (
        <div id="waiting-another-player">
            {
                gameContext?.selectedChallenge === null ?
                    <>
                        <h1>Aguardando {gameContext?.roundPlayer?.name} jogar...</h1>
                        <p>Aguarde até que {gameContext?.roundPlayer?.name} escolha seu card para ver o que ele tirou!</p>
                    </>
                    :
                    <>
                        <h3 data-tip={`Isso foi o que ${gameContext?.roundPlayer?.name} tirou nos cards!`}>{gameContext?.roundPlayer?.name} tirou...</h3>
                        <h1 style={{ marginTop: 20 }}>{gameContext?.selectedChallenge?.title}</h1>
                        <p>{gameContext?.selectedChallenge?.description}</p>
                    </>
            }
        </div>
    );
}

export default WaitingAnotherPlayer;