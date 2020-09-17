import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Challenge, ConnectedPlayer, GameInfo, SelectedChallenge, ServerRoom } from '../../@types/game';
import logo from '../../assets/logo.svg';
import Aside from '../../components/Aside';
import CardList from '../../components/CardList';
import WaitingAnotherPlayer from '../../components/WaitingAnotherPlayer';
import { GameContext } from '../../game-context';
import { SocketContext } from '../../socket-context';
import './styles.scss';

toast.configure();

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Game: React.FC = () => {
    let query = useQuery();
    const history = useHistory();

    const io = useContext(SocketContext);

    // ID do jogador desta sessão
    const [playerId, setPlayerId] = useState<string | null>(null);
    // Define se o jogo foi iniciado
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
    // Define se o usuário desta sessão é o administrador da partida
    const [isRoomAdmin, setIsRoomAdmin] = useState<boolean>(false);
    // Define quem é o jogador da rodada
    const [roundPlayer, setRoundPlayer] = useState<ConnectedPlayer | null>(null);
    // Define todos os jogadores conectados
    const [connectedPlayers, setConnectedPlayers] = useState<ConnectedPlayer[]>([]);
    // Define a challenge que foi selecioanda
    const [selectedChallenge, setSelectedChallenge] = useState<SelectedChallenge | null>(null);
    // Define se o usuário pode selecionar uma challenge
    const [canSelectChallenge, setCanSelectChallenge] = useState<boolean>(false);
    // Define todas as challenges da sala
    const [challenges, setChallenges] = useState<Challenge[]>([]);

    /**
     * Effects
     */
    useEffect(() => {
        const playername = sessionStorage.getItem('playername');
        const roomId = query.get('roomId');

        if (!playername || !roomId) {
            history.push("/identify");
            return;
        }

        if (io) {
            console.log("Entrando na sala", roomId);

            // Se conecta a sala
            io?.on('connect', () => {
                history.push("/identify");
                toast.error("Sua conexão com o servidor caiu!", {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            })

            io?.emit('connect_to_room', { roomId, playername });

            // Se a sala não existir
            io?.on('non_existent_room', () => {
                history.push("/identify");

                toast.error("Sala inexistente!", {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            })

            // Recebe as informações iniciais da sala
            io?.on('room_info', ({ room, playerId }: { room: ServerRoom, playerId: string }) => {
                console.log("room_info", room, playerId)
                setConnectedPlayers(room.players);
                setPlayerId(playerId);
                setIsGameStarted(room.game_started);
                setRoundPlayer(room.round_player);
                setChallenges(room.challenges);

                setIsRoomAdmin(room.players.length === 1 ? true : false);
            })

            // Quando um jogador entra na partida (sala)
            io?.on('player_connect', (player: ConnectedPlayer) => {
                // Adiciona o novo jogador
                console.log("player_connect", player);

                toast.info(`${player.name} entrou no jogo.`, {
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    className: "color-toast"
                })

                setConnectedPlayers(players => {
                    console.log("PLAYER CONECTOU", players);
                    return [...players, player];
                })
            })

            // Quando um jogador sai da partida
            io?.on('player_disconnect', (player: ConnectedPlayer) => {
                // Remove um jogador
                console.log("player_disconnect", player);

                toast.info(`${player.name} saiu do jogo.`, {
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    className: "color-toast"
                })

                setConnectedPlayers(players => {
                    console.log("PLAYER DESCONECTOU", players);
                    const filteredPlayers = players.filter(connected_player => connected_player.id !== player.id);
                    return [...filteredPlayers];
                })
            })

            // Quando o jogo é iniciado
            io?.on('game_started', (started: boolean) => {
                if (started) {
                    toast.info(`Jogo iniciado.`, {
                        position: "top-left",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        className: "color-toast"
                    })
                }

                setIsGameStarted(started);
            })

            // Quando é a vez do jogador desta sessão jogar
            io?.on('round_player', (player: ConnectedPlayer) => {
                setRoundPlayer(player);
                setCanSelectChallenge(true);
            })

            // Quando o um jogador selecionou uma challenge
            io?.on('selected_challenge', (challenge: SelectedChallenge) => {
                console.log("selected_challenge", challenge)
                setSelectedChallenge(challenge);
                setCanSelectChallenge(false);
            })
        }

        return () => {
            io?.emit('disconnect_room');
        }
    }, [io])


    /**
     * Handles
     */

    return (
        <GameContext.Provider value={{
            selectedChallenge,
            roundPlayer,
            canSelectChallenge,
            setCanSelectChallenge,
            isGameStarted,
            isRoomAdmin,
            playerId,
            connectedPlayers,
            challenges
        }}>
            <div id="game">
                <main className="dashboard">
                    <header>
                        <img src={logo} alt="Pixel Happy Hour" />
                    </header>

                    <div id="content">
                        {
                            // Jogo não foi iniciado
                            !isGameStarted ?
                                <div>
                                    <h1>Aguardando o jogo começar...</h1>
                                    <div style={{
                                        background: "#61155D",
                                        padding: 20
                                    }}>
                                        <h3 style={{ margin: 0 }}>
                                            Como funciona o game?
                                        </h3>
                                        <p style={{ marginBottom: 0 }}>
                                            O jogo vai iniciar quando o admin da sala (o primeiro jogador que entrar na partida) apertar no botão “começar jogo”. Depois disso, o jogo automaticamente vai definir por ordem de chegada na sala da partida quem é o próximo da rodada. Quando for sua vez de jogar você deverá escolher um dos cards ao lado e clicar sobre ele, quando clicar o desafio do card será revelado e todos na partida serão avisados de qual é ele. Cumpra-o e siga para o próximo jogador.
                                        </p>
                                    </div>
                                </div>
                                :

                                // Jogo foi iniciado mas está aguardando outro jogador escolher o desafio
                                roundPlayer?.id !== playerId ?
                                    <WaitingAnotherPlayer />
                                    :
                                    // Jogo foi iniciado e é a rodada do jogador desta sessão
                                    <CardList />
                        }
                    </div>
                </main>
                {/* Menu lateral */}
                <Aside />
            </div>
        </GameContext.Provider>
    );
}

export default Game;