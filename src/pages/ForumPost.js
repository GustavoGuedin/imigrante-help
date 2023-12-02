import { Button, Card, ListGroup } from "react-bootstrap";
import Topbar from "../components/Topbar";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ForumPost() {
  const { t } = useTranslation();
  const { auth } = useContext(AuthContext);

  const [listTopic, setListTopic] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [postagem, setPostagem] = useState('');
  const [resposta, setResposta] = useState('');
  const { idForum } = useParams();

  useEffect(() => {
      recuperarForum();
      recuperarRespostas();
  }, []);

  const recuperarRespostas = () => {
    fetch(`http://localhost:3333/forum/lerRespostas/${idForum}`, {
        method: 'GET',
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        throw res
    }).then(data => {
        setListTopic(data.Content);
    }).catch(err => {
        console.error('Erro: ', err)
    })
};

  const recuperarForum = () => {
      fetch(`http://localhost:3333/forum/readById/${idForum}`, {
          method: 'GET',
      }).then((res) => {
          if (res.ok) {
              return res.json();
          }
          throw res
      }).then(data => {
          const content = data.Content[0];
          
          setTitulo(content.titulo);
          setPostagem(content.postagem);
          
      }).catch(err => {
          console.error('Erro: ', err)
      })
  };

  return(
    <div className="ForumPost">
      <Topbar/>
      <div style={{maxWidth: '850px', margin: '36px auto'}}>
        <h2>{ titulo }</h2>

        <Card style={{ margin: '24px 0'}}>
          <Card.Header>Ruby</Card.Header>
          <Card.Body>
              <p>
                {' '}
                { postagem }
                {' '}
              </p>
          </Card.Body>
        </Card>

        {typeof listTopic !== "undefined" && 
          listTopic.map((topic) => { 
            return <Card style={{ margin: '24px 0 0 48px' }}>
                      <Card.Header>Luea</Card.Header>
                        <Card.Body>
                          <p>
                            {' '}
                            { topic.resposta }
                            {' '}
                          </p>
                  </Card.Body>
                </Card>
          })
        }

        {auth && <Button variant="primary" href={'/postadd/' + idForum} style={{margin: '24px 0 0 0'}}>{t('Responder')}</Button>}
      </div>
    </div>
  )
}

export default ForumPost;