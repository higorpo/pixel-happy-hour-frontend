export interface GameInfo {
    player_id: number;
    connected_players: ConnectedPlayer[],
    game_started: boolean
}

export interface ConnectedPlayer {
    id: string;
    name: string;
    /**
     * Número de vezes que jogou
     */
    played_times: number;
    /**
     * Data de quando se conectou na partida
     */
    sign_in_date: Date;
    /**
     * Cor do usuário
     */
    color: string;
}

export interface SelectedChallenge {
    title: string;
    description: string;
}

export interface ServerRoom {
    id: string;
    name: string;
    game_started: boolean;
    round_player: ConnectedPlayer | null;
    players: ConnectedPlayer[];
    challenges: Challenge[]
}

export interface Challenge {
    title: string,
    description: string
}