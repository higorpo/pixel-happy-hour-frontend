import React, { FormEvent, useState, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';

import logo from '../../assets/logo.svg';

import './styles.scss';

const Auth: React.FC = () => {
    const history = useHistory();

    const [playername, setPlayername] = useState<string>("");

    function handleChangePlayername(event: ChangeEvent<HTMLInputElement>) {
        setPlayername(event.target.value);
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        sessionStorage.setItem('playername', playername);
        history.push("/");
    }

    return (
        <form id="identify" onSubmit={handleSubmit}>
            <div>
                <img src={logo} alt="Pixel Happy Hour" />
                <fieldset className="field">
                    <label htmlFor="name">Digite seu nome</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        title="Digite seu nome!"
                        value={playername}
                        onChange={handleChangePlayername} />
                </fieldset>

                <button type="submit">
                    Entrar no jogo
                </button>
            </div>
        </form>
    );
}

export default Auth;