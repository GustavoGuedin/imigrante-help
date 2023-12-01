import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Topbar from "../components/Topbar";
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function AdminPanel() {
    const [listUsers, setListUsers] = useState([]);
    const [listLocations, setListLocations] = useState([]);
    const [listFaq, setListFaq] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        recoverAllUsers();
        recoverAllLocations();
        recoverAllFAQ();
    }, []);

    function recoverAllUsers() {
        fetch('http://localhost:3333/users/recoverAll', {
            method: 'GET',
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw res;
        }).then(data => {
            setListUsers(data.Content);
        }).catch(err => {
            console.error('Erro: ', err);
        });
    }

    function recoverAllLocations() {
        fetch('http://localhost:3333/locais/recoverAll', {
            method: 'GET',
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw res;
        }).then(data => {
            setListLocations(data.Content);
        }).catch(err => {
            console.error('Erro: ', err);
        });
    }

    function recoverAllFAQ() {
        fetch('http://localhost:3333/faq/recoverAll', {
            method: 'GET',
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw res;
        }).then(data => {
            setListFaq(data.Content);
        }).catch(err => {
            console.error('Erro: ', err);
        });
    }

    function deleteUser(idUser, username) {
        const resultado = window.confirm(`Deseja excluir o usuario ${username} ?`);

        if (!resultado) return;

        fetch(`http://localhost:3333/user/remove/${idUser}`, {
            method: 'DELETE',
        }).then((res) => {
            console.log(res);
            recoverAllUsers();
        }).catch(err => {
            console.error('Erro: ', err);
        });
    }

    function deleteLocation(idLocation, location) {
        const resultado = window.confirm(`Deseja excluir o local ${location} ?`);

        if (!resultado) return;

        fetch(`http://localhost:3333/locais/remove/${idLocation}`, {
            method: 'DELETE',
        }).then((res) => {
            console.log(res);
            recoverAllLocations();
        }).catch(err => {
            console.error('Erro: ', err);
        });
    }

    return (
        <div className="AdminPanel">
            <Topbar />
            <Tab.Container id="left-tabs-example" defaultActiveKey="um">
                <Row style={{ maxWidth: '95%', margin: '48px auto' }}>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="um">{t('Controle de Usuario')}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="dois">{t('Controle de Locais')}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="tres">{t('Informacoes FAQ')}</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="um">
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div></div>
                                    <Button variant='success' href='/signin'>{t('Adicionar usuario')}</Button>
                                </div>
                                <Table striped bordered style={{ margin: '24px 0 0 0' }}>
                                    <thead>
                                        <tr>
                                            <th>{t('Usuario')}</th>
                                            <th>{t('Email')}</th>
                                            <th>{t('Data de nascimento')}</th>
                                            <th>{t('Operacoes')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {typeof listUsers !== "undefined" &&
                                            listUsers.map((user) => {
                                                const datanascimento = new Date(user.datanascimento);

                                                const dia = datanascimento.getUTCDate().toString().padStart(2, '0');
                                                const mes = (datanascimento.getUTCMonth() + 1).toString().padStart(2, '0');
                                                const ano = datanascimento.getUTCFullYear();

                                                const dataFormatada = `${dia}/${mes}/${ano}`;

                                                return <tr>
                                                    <td>{user.username}</td>
                                                    <td>{user.email}</td>
                                                    <td>{dataFormatada}</td>
                                                    <td>
                                                        <Button variant="primary" size='sm' href={'/signin/' + user.id}>{t('Editar')}</Button>{' '}
                                                        <Button variant="danger" size='sm' onClick={() => deleteUser(user.id, user.username)}>{t('Excluir')}</Button>
                                                    </td>
                                                </tr>;
                                            })
                                        }

                                    </tbody>
                                </Table>
                            </Tab.Pane>

                            <Tab.Pane eventKey="dois">
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div></div>
                                    <Button variant='success' href='/locais'>{t('Adicionar local')}</Button>
                                </div>
                                <Table striped bordered style={{ margin: '24px 0 0 0' }}>
                                    <tbody>
                                        <tr>
                                            <th>{t('Local')}</th>
                                            <th>{t('Link')}</th>
                                            <th>{t('Operacoes')}</th>
                                        </tr>

                                        {typeof listLocations !== "undefined" &&
                                            listLocations.map((location) => {
                                                return <tr>
                                                    <td>{location.local}</td>
                                                    <td><a href={location.link} target="_blank">{location.link}</a></td>
                                                    <td>
                                                        <Button variant="primary" size='sm' href={'/locais/' + location.id}>{t('Editar')}</Button>{' '}
                                                        <Button variant="danger" size='sm' onClick={() => deleteLocation(location.id, location.local)}>{t('Excluir')}</Button>
                                                    </td>
                                                </tr>;
                                            })
                                        }

                                    </tbody>
                                </Table>
                            </Tab.Pane>

                            <Tab.Pane eventKey='tres'>
                                <Table striped bordered style={{ margin: '24px 0 0 0' }}>
                                    <tbody>
                                        <tr>
                                            <th>{t('Pergunta')}</th>
                                            <th>{t('Resposta')}</th>
                                            <th>{t('Operacoes')}</th>
                                        </tr>
                                        {typeof listFaq !== "undefined" &&
                                            listFaq.map((faq) => {
                                                return <tr>
                                                    <td>{faq.pergunta}</td>
                                                    <td>{faq.resposta}</td>
                                                    <td>
                                                        <Button variant="primary" size='sm' href={'/faq/' + faq.id}>{t('Editar')}</Button>
                                                    </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    );
}

export default AdminPanel;