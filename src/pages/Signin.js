import Topbar from "../components/Topbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel"
import { useState } from "react";
import { redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Signin() {
    const [username, setUsername] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [datanascimento, setDatanascimento] = useState();
    const { t } = useTranslation();

    function criarUser() {
        if (!(password === password2)) {
            alert('As senhas digitadas não conferem!');
            return
        };

        if (!password || !password2) {
            alert('Digite uma senha para realizar esta ação!')
            return
        };

        if (!username) {
            alert('Digite um nome de usuário para realizar esta ação!')
            return
        };

        if (!email) {
            alert('Digite um e-mail para realizar esta ação!')
            return
        };

        if (!datanascimento) {
            alert('Digite sua data de nascimento para realizar esta ação!')
            return
        };

        //const hashedPassword = bcrypt.hash(password, 10);

        const dto = {
            username: username,
            email: email,
            password: password,
            datanascimento: datanascimento
        }

        salvarDados(dto);
        redirect('/login');

        setDatanascimento('');
        setPassword2('');
        setPassword('');
        setEmail('');
        setUsername('');
    };

    async function salvarDados(dto) {
        await fetch('http://localhost:3333/signin/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(dto)
        }).then((res) => {
            console.log(res)
        }).catch(err => {
            console.error('Erro: ', err)
        })
    };

    return(
        <div className="Signin">
            <Topbar />

            <div className='LoginContainer' style={{maxWidth: '320px', margin: '0 auto'}}>
                <h1 style={{margin: '48px 0'}}>{t('Cadastro')}</h1>
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

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" placeholder={t('Confirme sua senha')} value={password2} onChange={e => setPassword2(e.target.value)}/>
                    </Form.Group>

                    <Button variant="primary" type="Button" onClick={criarUser}>
                        {t('Cadastrar')}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Signin