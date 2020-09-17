import React, { FormEvent, useState, ChangeEvent, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { SocketContext } from '../../socket-context';
import { ServerRoom } from '../../interfaces/game';

import logo from '../../assets/logo.svg';

import './styles.scss';
import { toast } from 'react-toastify';

const Auth: React.FC = () => {
    const history = useHistory();

    const io = useContext(SocketContext);

    /**
     * States
     */
    const [serverRooms, setServerRooms] = useState<ServerRoom[]>([]);
    const [playername, setPlayername] = useState<string>("");
    const [roomName, setRoomName] = useState<string>("");

    /**
     * Effects
     */
    useEffect(() => {
        // Pega todas as salas disponíveis do servidor
        if (io) {
            io?.on('server_rooms', (rooms: ServerRoom[]) => {
                console.log("Salas", rooms);
                setServerRooms(rooms);
            })

            io?.on('on_room_created', (room: ServerRoom) => {
                setServerRooms(rooms => [room, ...rooms]);
            })

            io?.on('on_room_deleted', (roomId: string) => {
                setServerRooms(rooms => rooms.filter(room => room.id != roomId));
            })

            io?.on('update_room', (room: ServerRoom) => {

                setServerRooms(rooms => {
                    const roomIndex = rooms.findIndex(serverRoom => serverRoom.id == room.id);
                    rooms[roomIndex] = room;
                    return [...rooms];
                })
            })
        }

    }, [io])

    /**
     * Handles
     */
    function handleChangePlayername(event: ChangeEvent<HTMLInputElement>) {
        setPlayername(event.target.value);
    }

    function handleChangeRoomName(event: ChangeEvent<HTMLInputElement>) {
        setRoomName(event.target.value);
    }

    function handleCreateRoom() {
        if (playername.trim().length == 0 || roomName.trim().length == 0) {
            return;
        }

        sessionStorage.setItem('playername', playername); // Salva o nome do jogador

        io?.emit('create_room', roomName);

        io?.on('created_room', (room: ServerRoom) => {
            toast.info(`Sala criada com sucesso!`, {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                className: "color-toast"
            })
            history.push(`/?roomId=${room.id}`);
        })
    }

    function handleEnterInRoom(room: ServerRoom) {
        if (playername.trim().length == 0) {
            return;
        }

        sessionStorage.setItem('playername', playername); // Salva o nome do jogador

        history.push(`/?roomId=${room.id}`);
    }

    return (
        <div id="identify">
            <img src={logo} alt="Pixel Happy Hour" />

            <label htmlFor="name">Digite seu nome</label>
            <input
                type="text"
                id="name"
                name="name"
                required
                title="Digite seu nome!"
                placeholder="Seu nome"
                value={playername}
                onChange={handleChangePlayername} />

            <div className="rooms" style={{
                width: "100%"
            }}>
                <label htmlFor="room_name">Crie uma sala</label>
                <input
                    type="text"
                    id="room_name"
                    name="room_name"
                    required
                    title="Nome da sala"
                    placeholder="Nome da sala"
                    value={roomName}
                    onChange={handleChangeRoomName} />

                <button onClick={handleCreateRoom} style={{ width: "100%", marginTop: 10 }}>
                    Criar sala
                </button>

                {
                    serverRooms.length > 0 &&
                    <>
                        <p>Escolha uma sala</p>
                        <ul className="room-list">
                            {
                                serverRooms.map(room => (
                                    <li key={room.id}>
                                        <div>
                                            <p>{room.name}</p>
                                            <p>{room.players.length} jogadores</p>
                                        </div>
                                        <button onClick={() => handleEnterInRoom(room)}>Entrar</button>
                                    </li>
                                ))
                            }
                        </ul>
                    </>
                }
            </div>
        </div>
    );
}

export default Auth;