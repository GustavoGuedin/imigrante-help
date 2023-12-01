import Topbar from "../components/Topbar";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function FaqEdit() {
    const [pergunta, setPergunta] = useState([]);
    const [resposta, setResposta] = useState('');
    const { t } = useTranslation();
    const { idFaq } = useParams();

    useEffect(() => {
        recuperarFaq();
    }, []);

    const recuperarFaq = () => {
        fetch(`http://localhost:3333/faq/readById/${idFaq}`, {
            method: 'GET',
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw res
        }).then(data => {
            const content = data.Content[0];
            
            setPergunta(content.pergunta);
            setResposta(content.resposta);
            
        }).catch(err => {
            console.error('Erro: ', err)
        })
    };

    function updateFaq() {
        if (!pergunta) {
            alert('Informe uma pergunta para realizar esta ação!')
            return
        };

        if (!resposta) {
            alert('Insira uma resposta para realizar esta ação!')
            return
        };

        const dto = {
            id: idFaq,
            pergunta: pergunta,
            resposta: resposta
        }

        editarDados(dto);

        setPergunta('');
        setResposta('');
    };

    async function editarDados(dto) {
        await fetch('http://localhost:3333/faq/edit', {
            method: 'PUT',
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
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="text" placeholder={t('Pergunta')} value={pergunta} onChange={e => setPergunta(e.target.value)} style={{width: "600px"}}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="text" placeholder={t('Resposta')} value={resposta} onChange={e => setResposta(e.target.value)} style={{width: "600px"}}/>
                    </Form.Group>

                </form>
                    <button onClick={updateFaq} style={{backgroundColor: "#0d6efd", border: "none", borderRadius: "5px", color: "white", width: "100px", height: "38px"}}>{t('Editar')}</button>
            </div>
        </div>
    )
}

export default FaqEdit