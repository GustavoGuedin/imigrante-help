import Topbar from "../components/Topbar";
import Form from "react-bootstrap/Form";
import { useState } from "react";

function Rotas() {
    const [link, setLink] = useState([]);
    const [local, setLocal] = useState('');

    function createLocation() {
        if (!local) {
            alert('Informe o nome do local para realizar esta ação!')
            return
        };

        if (!link) {
            alert('Insira um link do local no mapa para realizar esta ação!')
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

    async function salvarDados(dto) {
        await fetch('http://localhost:3333/locais/create', {
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
                <h1 style={{margin: '48px 0'}}>Cadastro</h1>
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
        </div>
    )
}

export default Rotas