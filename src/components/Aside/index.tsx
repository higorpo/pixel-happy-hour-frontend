import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { GameContext } from '../../game-context';
import api from '../../services/api';
import Avatar from '../Avatar';
import './styles.scss';


const Aside: React.FC = () => {
    const gameContext = useContext(GameContext);

    /**
     * Handles
     */

    // Função para iniciar o jogo
    function handleStartGame() {
        if (gameContext?.connectedPlayers && gameContext?.connectedPlayers.length < 2) {
            toast.error("Não é possível iniciar o jogo pois são necessarias pelo menos 2 pessoas para jogar!", {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            return;
        }

        api.post(`/startgame`)
            .catch(() => {
                toast.error("Não foi possível iniciar o jogo!", {
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

    // Função para resetar o jogo
    function handleResetGame() {
        api.post(`/resetgame`)
            .catch(() => {
                toast.error("Não foi possível reiniciar o jogo!", {
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

    function handleToggleSidebar() {
        const sidebarElement = document.querySelector('#game-sidebar');
        if (sidebarElement?.classList.contains('open')) {
            sidebarElement?.classList.add('close');
            sidebarElement?.classList.remove('open');
        } else {
            sidebarElement?.classList.add('open');
            sidebarElement?.classList.remove('close');
        }
    }

    return (
        <div id="game-sidebar" className="open">
            <button onClick={handleToggleSidebar} className="open-close-sidebar">
                <span>&gt;</span>
            </button>
            <aside id="sidebar">
                {
                    (gameContext?.isGameStarted && gameContext?.roundPlayer != null) &&
                    <div className="content">
                        <h1 data-tip="Pessoa que irá jogar nesta rodada">Jogador desta rodada</h1>
                        <div className="player-round">
                            <Avatar name={gameContext?.roundPlayer.name} />
                            <span>{gameContext?.roundPlayer.id === gameContext?.playerId ? "Você" : gameContext?.roundPlayer.name}</span>
                        </div>
                    </div>
                }
                {
                    gameContext?.isRoomAdmin &&
                    <div className="content">
                        <h1>Administrar sala</h1>
                        {
                            gameContext?.isGameStarted ?
                                <button
                                    data-tip="Reseta um jogo em andamento"
                                    style={{ marginTop: 10, width: "100%" }}
                                    onClick={handleResetGame}
                                    disabled={!gameContext?.isGameStarted}>
                                    Resetar jogo
                            </button>
                                :
                                <button
                                    data-tip="Quando todos os seus amigos tiverem entrado, pressione o botão para começar o jogo!"
                                    style={{ marginTop: 10, width: "100%" }}
                                    onClick={handleStartGame}
                                    disabled={gameContext?.isGameStarted}>
                                    Começar jogo
                            </button>
                        }
                    </div>
                }

                <div className="content">
                    <h1>Jogadores ({gameContext?.connectedPlayers.length})</h1>
                    <div className="players">
                        {
                            gameContext?.connectedPlayers.map((player, index) => (
                                <div key={index} className="player">
                                    <Avatar name={player.name} />
                                    <span>{player.id === gameContext?.playerId ? "Você" : player.name}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </aside>
        </div>
    );
}

export default Aside;