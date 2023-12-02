import Topbar from "../components/Topbar";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function FaqAdd() {
    const [pergunta, setPergunta] = useState([]);
    const [resposta, setResposta] = useState('');
    const { t } = useTranslation();
    const { idFaq } = useParams();

    function createFaq() {
        if (!pergunta) {
            toast.error('Informe uma pergunta')
            return
        };

        if (!resposta) {
            toast.error('Insira uma resposta')
            return
        };

        const dto = {
            id: idFaq,
            pergunta: pergunta,
            resposta: resposta
        }

        salvarDados(dto);

        setPergunta('');
        setResposta('');
    };

    const navigate = useNavigate();

    async function salvarDados(dto) {
        await fetch('http://localhost:3333/faq/create', {
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
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control as='textarea' rows={5} type="text" placeholder={t('Pergunta')} value={pergunta} onChange={e => setPergunta(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control as='textarea' rows={5} type="text" placeholder={t('Resposta')} value={resposta} onChange={e => setResposta(e.target.value)} />
                    </Form.Group>

                </form>
                    <button onClick={createFaq} style={{backgroundColor: "#0d6efd", border: "none", borderRadius: "5px", color: "white", width: "100px", height: "38px"}}>Cadastrar</button>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default FaqAdd