import { toast } from 'react-toastify';
import React from 'react';
import socket from 'socket.io-client';

const socketApi = 'http://10.1.1.105:3333';
const io = socket(socketApi, {
    query: {
        name: sessionStorage.getItem('playername')
    }
});

io.connect();

io?.on('connect', () => {
    console.log('Conectado ao servidor com sucesso');
})

io?.on('connect_error', () => {
    toast.error("Não foi possível estabelecer uma conexão com o servidor! Vamos tentar uma nova conexão em alguns segundos!", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
})

export const connection = io;

export const SocketContext = React.createContext<SocketIOClient.Socket | null>(null);