import { Accordion, Table } from 'react-bootstrap';
import Topbar from '../components/Topbar';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function FAQ() {
  const [listFaq, setListFaq] = useState([]);
  const [listLocations, setListLocations] = useState([]);
  const { t } = useTranslation();
  let seq = 0;

  useEffect(() => {
    recoverAllFAQ();
    recoverAllLocations();
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

  function recoverAllLocations() {
    fetch('http://localhost:3333/locais/recoverAll', {
        method: 'GET',
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        throw res;
    }).then(data => {
        setListLocations(data.Content);
    }).catch(err => {
        console.error('Erro: ', err);
    });
}

  return (
    <div className='FAQ'>
      <Topbar />
      <Accordion defaultActiveKey="0" style={{maxWidth: '1000px', margin: '0 auto'}}>
        <h1 style={{margin: '48px 0'}}>{t('perguntasFrequentes')}</h1>
        {typeof listFaq !== "undefined" && 
          listFaq.map((faq) => {
            seq = seq + 1;
            return <Accordion.Item eventKey={`"${seq}"`}>
                   <Accordion.Header><b>{ faq.pergunta }</b></Accordion.Header>
                      <Accordion.Body>
                          { faq.resposta }
                      </Accordion.Body>
                   </Accordion.Item>
          })
        }
        <h1 style={{margin: '48px 0'}}>{t('Locais comuns')}</h1>
        <Table striped bordered style={{ margin: '24px 0 0 0' }}>
          <tbody>
              <tr>
                  <th>{t('Local')}</th>
                  <th>{t('Link')}</th>
              </tr>
              {typeof listLocations !== "undefined" &&
                  listLocations.map((location) => {
                      return <>
                      <tr>
                        <td>{location.local}</td>
                        <td><a href={location.link} target="_blank">{location.link}</a></td>
                      </tr>
                      </>
                  })
              }
            </tbody>
          </Table>  

      </Accordion>

    </div>
  );
}

export default FAQ;