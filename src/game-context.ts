import { SelectedChallenge, ConnectedPlayer, Challenge } from './@types/game';
import React from 'react';


interface GameContextProps {
    playerId: string | null,
    isGameStarted: boolean,
    isRoomAdmin: boolean,
    selectedChallenge: SelectedChallenge | null,
    roundPlayer: ConnectedPlayer | null,
    canSelectChallenge: boolean,
    setCanSelectChallenge: (canSelect: boolean) => void,
    connectedPlayers: ConnectedPlayer[],
    challenges: Challenge[]
}

export const GameContext = React.createContext<GameContextProps | null>(null);
