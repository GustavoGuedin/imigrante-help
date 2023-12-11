import Topbar from "../components/Topbar";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function Locais() {
    const [link, setLink] = useState([]);
    const [local, setLocal] = useState('');

    function createLocation() {
        if (!local) {
            toast.error('Informe o nome do local')
            return
        };

        if (!link) {
            toast.error('Insira um link do local no mapa')
            return
        };

        const dto = {
            local: local,
            link: link
        }

        salvarDados(dto);

        setLocal('');
        setLink('');
    };

    const navigate = useNavigate()

    async function salvarDados(dto) {
        await fetch('http://localhost:3333/locais/create', {
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
                        <Form.Control type="text" placeholder="Nome do local" value={local} onChange={e => setLocal(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="text" placeholder="Link do local no mapa" value={link} onChange={e => setLink(e.target.value)}/>
                    </Form.Group>

                </form>
                    <button onClick={createLocation} style={{backgroundColor: "#0d6efd", border: "none", borderRadius: "5px", color: "white", width: "100px", height: "38px"}}>Cadastrar</button>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Locais