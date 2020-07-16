import React, { useState } from 'react';
import Logo from '../../assets/LOGO DNA-01.png';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import '../Register/styles.css';

export default function Register() {
    const [nome, setNome] = useState('');
    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        try {
            const response = await api.post('ministries', { nome });
            alert(`Seu ID de acesso é: ${response.data.id}`);
            history.push('/');
        } catch (err) {
            alert("Deu ruim");
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={Logo} alt="Logo DNA" />
                </section>
                <form onSubmit={handleRegister}>
                    <h1>Realize seu Cadastro</h1>
                    <input type="text" className="form-input" placeholder="Nome do Ministério..." value={nome} onChange={e => setNome(e.target.value)}></input>
                    <button className="btn btn-danger" type="submit">Cadastrar</button>
                    <br />
                    <Link className="link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        <span>Voltar</span>
                    </Link>
                </form>
            </div>
        </div>
    )

}
