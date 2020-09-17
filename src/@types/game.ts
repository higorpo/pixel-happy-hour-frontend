export interface GameInfo {
    player_id: number;
    connected_players: ConnectedPlayer[],
    game_started: boolean
}

export interface ConnectedPlayer {
    id: number;
    name: string;
    /**
     * Número de vezes que jogou
     */
    played_times: number;
    /**
     * Data de quando se conectou na partida
     */
    sign_in_date: Date;
}

export interface SelectedChallenge {
    title: string;
    description: string;
}