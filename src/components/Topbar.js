import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
  
function Topbar() {
  const { t } = useTranslation();
  const { setAuth, auth } = useContext(AuthContext)

  function logout() {
    setAuth(false)
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Imigrante Help</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <div style={{margin: '0 8px 0 8px'}}>
              <LanguageSelector />
            </div>
        <Navbar.Collapse className="justify-content-end">
          <Nav className="justify-content-end">
            <Nav.Link href="/">{t('Início')}</Nav.Link>
            <Nav.Link href="/forum">{t('Fórum')}</Nav.Link>
            <Nav.Link href="/FAQ">{t('FAQ')}</Nav.Link>

            {(() => {
              if (auth){
                  return (
                    <>
                      <Nav.Link href="/mapa">{t('Mapa')}</Nav.Link>
                    </>
                  )
              } else {
                  return (
                    <>
                    </>
                  )
              }
            })()}

            {(() => {
              if (!localStorage.getItem("user")) {
                return <></>
              } else {
                if (JSON.parse(localStorage.getItem("user")).admin === true) {
                  return <Nav.Link href="/admin">{t('Painel Admin')}</Nav.Link>
                } else {
                  return <></>
                }
              }
            })()}

            {(() => {
              if (auth){
                  return (
                    <>
                    <NavDropdown title={JSON.parse(localStorage.getItem("user")).username} id="basic-nav-dropdown">
                      <NavDropdown.Item href='/' onClick={() => logout()}>Sair</NavDropdown.Item>
                    </NavDropdown>
                    </>
                  )
              } else {
                  return (
                    <>
                    <Button variant='outline-primary' href='/login' style={{margin: '0 8px 0 8px'}}>{t('Login')}</Button>
                    <Button variant='primary' href='/signin'>{t('Cadastro')}</Button>
                    </>
                  )
              }
            })()}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Topbar;