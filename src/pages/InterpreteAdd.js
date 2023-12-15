import Topbar from "../components/Topbar";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function InterpreteAdd() {
    const [username, setUsername] = useState([]);
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [endereco, setEndereco] = useState('');
    const [idioma, setIdioma] = useState('');
    const { t } = useTranslation();
    const { idInterprete } = useParams();

    function createInterprete() {
        if (!username) {
            toast.error('Informe um nome')
            return
        };

        if (!endereco) {
            toast.error('Insira um endereco')
            return
        };

        if (!telefone) {
            toast.error('Insira telefone')
            return
        };

        if (!email) {
            toast.error('Insira um email')
            return
        };

        if (!idioma) {
            toast.error('Insira um idioma')
            return
        };

        const dto = {
            id: idInterprete,
            username: username,
            telefone: telefone,
            email: email,
            endereco: endereco,
            idioma: idioma
        }

        salvarDados(dto);

        setUsername('');
        setEmail('');
        setEndereco('');
        setTelefone('');
        setIdioma('');
    };

    const navigate = useNavigate();

    async function salvarDados(dto) {
        await fetch('http://localhost:3333/interprete/create', {
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

            <div className='LoginContainer' style={{maxWidth: '600px', margin: '5em auto'}}>
                <form>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="text" placeholder={t('Nome')} value={username} onChange={e => setUsername(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="text" placeholder={t('Telefone')} value={telefone} onChange={e => setTelefone(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="email" placeholder={t('E-mail')} value={email} onChange={e => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="text" placeholder={t('Endereço')} value={endereco} onChange={e => setEndereco(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="text" placeholder={t('Idioma')} value={idioma} onChange={e => setIdioma(e.target.value)} />
                    </Form.Group>

                </form>
                    <button onClick={createInterprete} style={{backgroundColor: "#0d6efd", border: "none", borderRadius: "5px", color: "white", width: "100px", height: "38px"}}>Cadastrar</button>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default InterpreteAdd