import React, { useState } from 'react';
import logo from '../../assets/LOGO DNA-01.png';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';
import '../Logon/styles.css';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });
            localStorage.setItem('id', id);
            localStorage.setItem('nome', response.data.nome);
            history.push('home');
        } catch (err) {
            alert('Erro ao Efetuar o Login, Tente Novamente!');
        }
    }

    return (
        <div className="logon-container">
            <img src={logo} alt="DNADeus Logo"/>
            <section className="form">
                <form onSubmit={handleLogin}>
                    <h1>Realize seu Logon</h1>
                    <input placeholder="Informe seu ID..." id="idinput" name="id" className="form-input" value={id} onChange={e => setId(e.target.value)}></input>
                    <br/>
                    <button className="btn btn-danger" type="submit">Entrar</button>
                    <Link className="link" to="/register"><FiLogIn size={16} color="#e02041" /><span>Não possuo cadastro!</span></Link>
                </form>
            </section>
        </div>
    )
}
