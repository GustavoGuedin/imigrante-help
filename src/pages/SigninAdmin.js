import Topbar from "../components/Topbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel"
import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function SigninAdmin() {
    const [username, setUsername] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [datanascimento, setDatanascimento] = useState();
    const { t } = useTranslation();

    function criarUser() {
        if (!password) {
            toast.error('Digite uma senha válida')
            return
        };

        if (!username) {
            toast.error('Digite um nome de usuário')
            return
        };

        if (!email) {
            toast.error('Digite um e-mail')
            return
        };

        if (!datanascimento) {
            toast.error('Digite sua data de nascimento')
            return
        };

        const dto = {
            username: username,
            email: email,
            password: password,
            datanascimento: datanascimento
        }

        salvarDados(dto);
        redirect('/login');

        setDatanascimento('');
        setPassword('');
        setEmail('');
        setUsername('');
    };

    const navigate = useNavigate();

    async function salvarDados(dto) {
        await fetch('http://localhost:3333/signin/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(dto)
        }).then((res) => {
            console.log(res)
            navigate('/admin')
        }).catch(err => {
            console.error('Erro: ', err)
        })
    };

    return(
        <div className="Signin">
            <Topbar />

            <div className='LoginContainer' style={{maxWidth: '320px', margin: '5em auto'}}>
                <form>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Control type="text" placeholder={t('Nome')} value={username} onChange={e => setUsername(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDate">
                        <FloatingLabel className="mb-3" label={t('Data de nascimento')}>
                            <Form.Control type="date" value={datanascimento} onChange={e => setDatanascimento(e.target.value)}/>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder={t('E-mail')} value={email} onChange={e => setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" placeholder={t('Senha')} value={password} onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>

                    <Button variant="primary" type="Button" onClick={criarUser}>
                        {t('Cadastrar')}
                    </Button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default SigninAdmin