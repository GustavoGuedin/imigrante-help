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

    function deleteForum(idForum) {
      const resultado = window.confirm(`Deseja excluir esta postagem?`);

      if (!resultado) return;

      fetch(`http://localhost:3333/forum/remove/${idForum}`, {
          method: 'DELETE',
      }).then((res) => {
          console.log(res);
          recoverAllForum();
      }).catch(err => {
          console.error('Erro: ', err);
      });
  }

  return(
    <div className="Forum">
      <Topbar/>
      <div style={{maxWidth: '1000px', margin: '0 auto'}}>
        <h1 style={{margin: '48px 0'}}>{t('Fórum')}</h1>
        { auth && <Button variant="primary" href="/forumadd">{t('forum.createTopic')}</Button>}

        <Card style={{ width: '100%', margin: '24px 0 0 0' }}>
          <ListGroup variant="flush">
            {typeof listTopic !== "undefined" && 
              listTopic.map((topic) => { 
                return <>
                <ListGroup.Item className="d-flex justify-content-between align-items-start"><a href={ "post/" + topic.id }>{ topic.titulo }</a>
                  <div>
                  <Button variant="primary" size='sm' href={'/forumedit/' + topic.id}>{t('Editar')}</Button>
                  <Button variant="danger" size='sm' onClick={() => deleteForum(topic.id, topic.titulo)}>{t('Excluir')}</Button>
                  </div>
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