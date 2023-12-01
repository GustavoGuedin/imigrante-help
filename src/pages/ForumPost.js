import { Button, Card, ListGroup } from "react-bootstrap";
import Topbar from "../components/Topbar";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

function ForumPost() {
  const { t } = useTranslation();

  const { auth } = useContext(AuthContext);

  return(
    <div className="ForumPost">
      <Topbar/>
      <div style={{maxWidth: '850px', margin: '36px auto'}}>
        <h2>Não consigo encontrar a Assistência Social no mapa</h2>

        <Card style={{ margin: '24px 0'}}>
          <Card.Header>Ruby</Card.Header>
          <Card.Body>
              <p>
                {' '}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                posuere erat a ante.{' '}
              </p>
          </Card.Body>
        </Card>

        <Card style={{ margin: '24px 0 0 48px' }}>
          <Card.Header>Luea</Card.Header>
          <Card.Body>
              <p>
                {' '}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                posuere erat a ante.{' '}
              </p>
          </Card.Body>
        </Card>

        {auth && <Button variant="primary" style={{margin: '24px 0 0 0'}}>{t('Responder')}</Button>}
      </div>
    </div>
  )
}

export default ForumPost;