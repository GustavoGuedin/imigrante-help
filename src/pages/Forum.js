import { Button, Card, ListGroup } from "react-bootstrap";
import Topbar from "../components/Topbar";
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

function Forum() {
  const [listTopic, setListTopic] = useState([]);
  const { t } = useTranslation();

  const { auth } = useContext(AuthContext)

  useEffect(() => {
    recoverAllForum();
  }, []);

  function recoverAllForum() {
    fetch('http://localhost:3333/forum/lerForum', {
        method: 'GET',
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        throw res
    }).then(data => {
        setListTopic(data.Content)
    }).catch(err => {
        console.error('Erro: ', err)
    })
  }

  return(
    <div className="Forum">
      <Topbar/>
      <div style={{maxWidth: '800px', margin: '0 auto'}}>
        <h1 style={{margin: '48px 0'}}>{t('Fórum')}</h1>
        { auth && <Button variant="primary" href="/forumadd">{t('forum.createTopic')}</Button>}

        <Card style={{ width: '100%', margin: '24px 0 0 0' }}>
          <ListGroup variant="flush">
            {typeof listTopic !== "undefined" && 
              listTopic.map((topic) => { 
                return <>
                <ListGroup.Item className="d-flex justify-content-between align-items-start">
                  <a style={{textDecoration: 'none', color: '#212529'}} href={ "post/" + topic.id }>{ topic.titulo }</a>
                </ListGroup.Item>
                </>
              })
            }
            </ListGroup>
        </Card>
      </div>
    </div>
  )
}

export default Forum;