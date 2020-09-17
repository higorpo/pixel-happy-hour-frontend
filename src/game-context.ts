import { SelectedChallenge, ConnectedPlayer } from './@types/game';
import React from 'react';


interface GameContextProps {
    playerId: number,
    isGameStarted: boolean,
    isRoomAdmin: boolean,
    selectedChallenge: SelectedChallenge | null,
    roundPlayer: ConnectedPlayer | null,
    canSelectChallenge: boolean,
    setCanSelectChallenge: (canSelect: boolean) => void,
    connectedPlayers: ConnectedPlayer[]
}

export const GameContext = React.createContext<GameContextProps | null>(null);
