import Accordion from 'react-bootstrap/Accordion';
import Topbar from '../components/Topbar';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function FAQ() {
  const [listFaq, setListFaq] = useState([]);
  const { t } = useTranslation();
  let seq = 0;

  useEffect(() => {
    recoverAllFAQ();
  }, []);

  function recoverAllFAQ() {
    fetch('http://localhost:3333/faq/recoverAll', {
        method: 'GET',
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        throw res
    }).then(data => {
      setListFaq(data.Content)
    }).catch(err => {
        console.error('Erro: ', err)
    })
  };  

  return (
    <div className='FAQ'>
      <Topbar />
      <Accordion defaultActiveKey="0" style={{maxWidth: '1000px', margin: '0 auto'}}>
        <h1 style={{margin: '48px 0'}}>{t('perguntasFrequentes')}</h1>
        {typeof listFaq !== "undefined" && 
          listFaq.map((faq) => {
            seq = seq + 1;
            return <Accordion.Item eventKey={`"${seq}"`}>
                   <Accordion.Header>{ faq.pergunta }</Accordion.Header>
                      <Accordion.Body>
                          { faq.resposta }
                      </Accordion.Body>
                   </Accordion.Item>
          })
        }
      </Accordion>
    </div>
  );
}

export default FAQ;