import Topbar from "../components/Topbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function SigninEdit() {
    const [username, setUsername] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [date, setDate] = useState();
    const { idUser } = useParams();
    const { t } = useTranslation();

    const navigate = useNavigate();
    
    useEffect(() => {
        recuperaUser();
    }, []);

    const recuperaUser = () => {
        fetch(`http://localhost:3333/users/readById/${idUser}`, {
            method: 'GET',
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw res
        }).then(data => {
            const content = data.Content[0];

            const dataInicial = new Date(content.datanascimento);

            const ano = dataInicial.getFullYear();
            const mes = (dataInicial.getMonth() + 1).toString().padStart(2, '0');
            const dia = dataInicial.getDate().toString().padStart(2, '0');

            const dataFormatada = `${ano}-${mes}-${dia}`;
            
            setDate(dataFormatada);
            setPassword(content.password);
            setEmail(content.email);
            setUsername(content.username);
            
        }).catch(err => {
            console.error('Erro: ', err)
        })
    };

    function editUser() {

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

        if (!date) {
            toast.error('Digite sua data de nascimento')
            return
        };

        const dto = {
            id: idUser,
            username: username,
            email: email,
            password: password,
            datanascimento: date
        }

        salvarDadosEditados(dto);

        setDate('');
        setPassword('');
        setEmail('');
        setUsername('');
    };

    async function salvarDadosEditados(dto) {
        await fetch('http://localhost:3333/user/edit', {
            method: 'PUT',
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
                        <Form.Control type="text" placeholder="Nome" value={username} onChange={e => setUsername(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDate">
                        <FloatingLabel className="mb-3" label="Data de nascimento">
                            <Form.Control type="date" value={date} onChange={e =>  setDate(e.target.value)}/>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Senha" onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>

                </form>
                    <button onClick={editUser} style={{backgroundColor: "#0d6efd", border: "none", borderRadius: "5px", color: "white", width: "100px", height: "38px"}}>Editar</button>
            </div>
            <ToastContainer />
        </div>
    )
}

export default SigninEdit