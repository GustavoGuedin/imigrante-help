import { Button, Card, Stack } from "react-bootstrap";
import Topbar from "../components/Topbar";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ForumPost() {
  const { t } = useTranslation();
  const { auth } = useContext(AuthContext);

  const [listTopic, setListTopic] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [postagem, setPostagem] = useState('');
  const [username, setUsername] = useState('');
  const { idForum } = useParams();

  useEffect(() => {
      recuperarForum();
      recuperarRespostas();
  }, []);

  const navigate = useNavigate();

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

function deleteForum(idForum) {
  const resultado = window.confirm(`Deseja excluir esta postagem?`);

  if (!resultado) return;

  fetch(`http://localhost:3333/forum/remove/${idForum}`, {
      method: 'DELETE',
  }).then((res) => {
      console.log(res);
      navigate('/forum');
  }).catch(err => {
      console.error('Erro: ', err);
  });
}

function deleteReply(id) {
  const resultado = window.confirm(`Deseja excluir esta postagem?`);

  if (!resultado) return;

  fetch(`http://localhost:3333/forum/removeReply/${id}`, {
      method: 'DELETE',
  }).then((res) => {
      console.log(res);
      recuperarRespostas();
  }).catch(err => {
      console.error('Erro: ', err);
  });
}

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
          setUsername(content.username);
          
      }).catch(err => {
          console.error('Erro: ', err)
      })
  };

  return(
    <div className="ForumPost">
      <style type="text/css">
        {`
          a {
            color: #606060;
          }
        `}
      </style>
      <Topbar/>
      <div style={{maxWidth: '800px', margin: '36px auto'}}>
        <h2>{ titulo }</h2>

        <Card style={{ margin: '24px 0'}}>
          <Card.Header>
            <Stack direction="horizontal" gap={2}>
              <div>{ username }</div>
              {(() => {
                if (!localStorage.getItem("user")) {
                  return <></>
                } else {
                  if (JSON.parse(localStorage.getItem("user")).admin === true) {
                    return <>
                      <div className="ms-auto"><a href={'/forumedit/' + idForum}>{t('Editar')}</a></div> {'•'}
                      <div><a href="#" onClick={() => deleteForum(idForum)}>{t('Excluir')}</a></div>
                    </>
                  } else {
                    return <></>
                  }
                }
              })()}
              
            </Stack>
          </Card.Header>
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
                      <Card.Header>
                        <Stack direction="horizontal" gap={2}>
                          <div>{ topic.username }</div>
                            {(() => {
                              if (!localStorage.getItem("user")) {
                                return <></>
                              } else {
                                if (JSON.parse(localStorage.getItem("user")).admin === true) {
                                  return <>
                                    <div className="ms-auto"><a href="#" onClick={() => deleteReply(topic.id)}>{t('Excluir')}</a></div>
                                  </>
                                } else {
                                  return <></>
                                }
                              }
                            })()}
                            
                          </Stack>
                        </Card.Header>
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