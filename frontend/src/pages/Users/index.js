import React, { useState } from 'react';
import logo from '../../assets/LOGO DNA-01.png';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import '../Users/styles.css';
import api from '../../services/api';

export default function Home() {
    const history = useHistory();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [idade, setIdade] = useState('')
    const [whats, setWhats] = useState('');

    const ministry_id = localStorage.getItem('id');


    async function handleNewMember(e) {
        e.preventDefault();

        const data = {
            nome,
            email,
            idade,
            whats
        };

        try {
            await api.post(`/ministries/${ministry_id}/users`, data);
            alert('Membro Cadastrado com Sucesso');
            history.push('/home');
        } catch (err) {
            alert('Cadastro não realizado, Tente Novamente!');
        }
    }

    return (
        <div className="home-container">
            <div className="content">
                <section>
                    <img src={logo} alt="DNA Logo"></img>
                </section>
                <form onSubmit={handleNewMember}>
                    <h1>Cadastrar Membro</h1>
                    <input className="form-input" placeholder="Nome" type="text" value={nome} onChange={e => setNome(e.target.value)}></input>
                    <input className="form-input" placeholder="Idade" type="number" value={idade} onChange={e => setIdade(e.target.value)}></input>
                    <input className="form-input" placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)}></input>
                    <input className="form-input" placeholder="WhatsApp" type="number" value={whats} onChange={e => setWhats(e.target.value)}></input>
                    <button className="btn btn-danger" type="submit">Cadastrar</button>
                    <Link className="link" to="/home">
                        <FiArrowLeft size={16} color="#e02041"></FiArrowLeft>
                        Voltar
                    </Link>
                </form>
            </div>
        </div>
    )
}
