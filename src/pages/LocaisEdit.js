import Topbar from "../components/Topbar";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function LocaisEdit() {
    const [link, setLink] = useState([]);
    const [local, setLocal] = useState('');
    const { idLocation } = useParams();
    const { t } = useTranslation();

    useEffect(() => {
        recuperarLocation();
    }, []);

    const recuperarLocation = () => {
        fetch(`http://localhost:3333/locais/readById/${idLocation}`, {
            method: 'GET',
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw res
        }).then(data => {
            const content = data.Content[0];
            
            setLink(content.link);
            setLocal(content.local);
            
        }).catch(err => {
            console.error('Erro: ', err)
        })
    };

    function updateLocation() {
        if (!local) {
            alert('Informe o nome do local para realizar esta ação!')
            return
        };

        if (!link) {
            alert('Insira um link do local no mapa para realizar esta ação!')
            return
        };

        const dto = {
            id: idLocation,
            local: local,
            link: link
        }

        editarDados(dto);

        setLocal('');
        setLink('');
    };

    async function editarDados(dto) {
        await fetch('http://localhost:3333/locais/edit', {
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
                        <Form.Control type="text" placeholder={t('Nome do local')} value={local} onChange={e => setLocal(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="text" placeholder={t('Link do local no mapa')}value={link} onChange={e => setLink(e.target.value)}/>
                    </Form.Group>

                </form>
                    <button onClick={updateLocation} style={{backgroundColor: "#0d6efd", border: "none", borderRadius: "5px", color: "white", width: "100px", height: "38px"}}>{t('Editar')}</button>
            </div>
        </div>
    )
}

export default LocaisEdit