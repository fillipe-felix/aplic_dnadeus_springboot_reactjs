import React, { useState } from 'react';
import '../Events/styles.css';
import Logo from '../../assets/LOGO DNA-01.png';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

export default function Event() {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [street, setStreet] = useState('');
    const [numero, setNumero] = useState([]);
    const [bairro, setBairro] = useState('');
    const [date, setDate] = useState([]);
    const [horario, setHorario] = useState('');

    const history = useHistory();
    const ministry_id = localStorage.getItem('id');

    async function handleEvent(e) {
        e.preventDefault();

        const data = {
            nome,
            descricao,
            zipCode,
            street,
            numero,
            bairro,
            date,
            horario,
            ministry_id
        };

        try {
            await api.post(`/ministries/${ministry_id}/events`, data);
            alert('Evento Agendado!');
            history.push('/home');
        } catch (err) {
            alert('Não foi possível criar Evento, Tente Novamente!');
        }
    }

    return (
        <div className="event-container">
            <div className="content">
                <section>
                    <img src={Logo} alt="DNA LOGO"></img>
                </section>
                <form onSubmit={handleEvent}>
                    <h1>Cadastrar Novo Evento</h1>
                    <input className="form-input" placeholder="Nome do Evento" type="text" value={nome} onChange={e => setNome(e.target.value)}></input>
                    <input className="form-input" placeholder="Descrição do Evento" type="text" value={descricao} onChange={e => setDescricao(e.target.value)}></input>
                    <input className="form-input" placeholder="CEP " type="text" value={zipCode} onChange={e => setZipCode(e.target.value)}></input>
                    <input className="form-input" placeholder="Rua" type="text" value={street} onChange={e => setStreet(e.target.value)}></input>
                    <input className="form-input" placeholder="Número" type="number" value={numero} onChange={e => setNumero(e.target.value)}></input>
                    <input className="form-input" placeholder="Bairro" type="text" value={bairro} onChange={e => setBairro(e.target.value)}></input>
                    <input className="form-input" type="date" value={date} onChange={e => setDate(e.target.value)}></input>
                    <input className="form-input" placeholder="Horário" type="text" value={horario} onChange={e => setHorario(e.target.value)}></input>
                    <button className="btn btn-danger" type="submit">Cadastrar</button>
                    <Link className="link" to="/home">
                        <FiArrowLeft size={16} color="#e02041"></FiArrowLeft>
                        Voltar
                    </Link>
                </form>
            </div>
        </div>
    );


}
