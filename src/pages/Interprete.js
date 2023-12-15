import { Accordion, Table } from 'react-bootstrap';
import Topbar from '../components/Topbar';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function Interprete() {
  const [listInterprete, setListInterprete] = useState([]);
  const { t } = useTranslation();
  let seq = 0;

  useEffect(() => {
    recoverAll();
  }, []);

  function recoverAll() {
    fetch('http://localhost:3333/interprete/recoverAll', {
        method: 'GET',
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        throw res
    }).then(data => {
      setListInterprete(data.Content)
    }).catch(err => {
        console.error('Erro: ', err)
    })
  };

  return (
    <div className='FAQ'>
      <Topbar />
      <Accordion defaultActiveKey="0" style={{maxWidth: '1000px', margin: '0 auto'}}>
        <h1 style={{margin: '48px 0'}}>{t('Interpretes')}</h1>
        {typeof listInterprete !== "undefined" && 
          listInterprete.map((interprete) => {
            seq = seq + 1;
            return <Accordion.Item eventKey={`"${seq}"`}>
                   <Accordion.Header><b>{ interprete.username }</b></Accordion.Header>
                      <Accordion.Body>
                          <b>• Telefone:</b> { interprete.telefone } <br/>
                          <b>• E-mail:</b> { interprete.email } <br/>
                          <b>• Endereço:</b> { interprete.endereco } <br/>
                          <b>• Idioma:</b> { interprete.idioma }
                      </Accordion.Body>
                   </Accordion.Item>
          })
        }
      </Accordion>

    </div>
  );
}

export default Interprete