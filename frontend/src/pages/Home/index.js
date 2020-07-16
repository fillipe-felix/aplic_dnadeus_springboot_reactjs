import React, { useState, useEffect } from 'react';
import logo from '../../assets/LOGO DNA-01.png';
import { useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiUserPlus, FiCalendar } from 'react-icons/fi';
import '../Home/styles.css';
import api from '../../services/api';

export default function Home() {
    const history = useHistory();
    const ministry_id = localStorage.getItem('id');
    const ministry_name = localStorage.getItem('nome');
    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([]);

    async function handleNewEvent() {
        history.push('/event');
    }

    async function handleNewMember() {
        history.push('/user');
    }

    async function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    useEffect(() => {
        api.get(`/ministries/${ministry_id}/events`)
            .then(response => {
                setEvents(response.data);
            })
    }, [])

    useEffect(() => {
        api.get(`/ministries/${ministry_id}/users`)
            .then(response => {
                setUsers(response.data);
            })
    }, [])

    async function handleDeleteUser(id) {
        try {
            await api.delete(`/ministries/${ministry_id}/users/${id}`);
            alert('Membro Deletado com Sucesso!');
            setUsers(users.filter(user => user.id !== id));
        } catch (err) {
            alert('Não foi possível deletar Membro, Tente Novamente!');
        }
    }

    async function handleDeleteEvent(id) {
        try {
            await api.delete(`/ministries/${ministry_id}/events/${id}`);
            alert('Evento Deletado com Sucesso!');
            setEvents(events.filter(event => event.id !== id));
        } catch (error) {
            alert('Não foi possível Deletar Evento, Tente Novamente!');
        }
    }

    return (
        <div className="home-container">
            <div className="content">
                <section>
                    <div className="header">
                        <img src={logo} alt="DNA Logo"></img>
                        <span id="data-hora"></span>
                        <button type="button" className="logout-button">
                            <FiPower onClick={handleLogout} size={50} color="#e02041"></FiPower>
                        </button>
                    </div>
                    <h3>Bem vindo(a)</h3>
                    <h3>Ministério {ministry_name}</h3>
                    <h3>ID do Minitério {ministry_id}</h3>
                    <br />
                    <br />
                    <br />
                    <h1>Home</h1>
                    <div className="table-description">
                        <h1 id="tablemembertitle" className="table-title">Membros</h1>
                        <button className="btn btn-danger" type="button" onClick={handleNewMember}><FiUserPlus size={20} color="#FFF" style={{ marginTop: 10 }} /><span>Novo Membro</span></button>
                    </div>
                    <table id="tablemember" className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">NOME</th>
                                <th scope="col">IDADE</th>
                                <th scope="col">E-MAIL</th>
                                <th scope="col">WhatsApp</th>
                                <th scope="col">Deletar</th>
                            </tr>
                        </thead>
                        {users.map(user => (
                            <tbody key={user.id}>
                                <tr>
                                    <td>{user.nome}</td>
                                    <td>{user.idade}</td>
                                    <td>{user.email}</td>
                                    <td>{user.whats}</td>
                                    <button type="button" onClick={() => handleDeleteUser(user.id)}>
                                        <FiTrash2 size={20} color="#000" />
                                    </button>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                    <br />
                    <br />
                    <div className="table-description">
                        <h1 id="tableeventtitle" className="table-title">Eventos</h1>
                        <button className="btn btn-danger" type="button" onClick={handleNewEvent}><FiCalendar color="#FFF" size={20} style={{ marginTop: 10 }} /><span>Novo Evento</span></button>
                    </div>
                    <table id="tableevent" className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">NOME</th>
                                <th scope="col">DESCRIÇÃO</th>
                                <th scope="col">RUA</th>
                                <th scope="col">NÚMERO</th>
                                <th scope="col">BAIRRO</th>
                                <th scope="col">DATA</th>
                                <th scope="col">HORÁRIO</th>
                                <th scope="col">Deletar</th>
                            </tr>
                        </thead>
                        {events.map(event => (
                            <tbody key={event.id}>
                                <tr>
                                    <td>{event.nome}</td>
                                    <td>{event.descricao}</td>
                                    <td>{event.street}</td>
                                    <td>{event.numero}</td>
                                    <td>{event.bairro}</td>
                                    <td>{event.date}</td>
                                    <td>{event.horario}</td>
                                    <button type="button" onClick={() => handleDeleteEvent(event.id)}>
                                        <FiTrash2 size={20} color="#000" />
                                    </button>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </section>
            </div>
        </div>
    )
}
