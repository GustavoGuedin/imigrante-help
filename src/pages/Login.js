import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Topbar from '../components/Topbar'
import { useState, useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onClickLogar() {
    if (!email || !password) alert('Digite um e-mail e uma senha válida!');

    const dto = {
      email: email,
      password: password
    };

    verificarAcesso(dto);
  };

  const { setAuth, auth } = useContext(AuthContext)
  console.log('auth', auth)

  const navigate = useNavigate();

  async function verificarAcesso(dto) {
    await fetch('http://localhost:3333/login/acesso', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(dto)
        }).then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            toast.error('Falha ao fazer login. Verifique suas credenciais.');
          }
          throw res;
        }).then(data => {
          setAuth(true);
            localStorage.setItem("auth", true);
            localStorage.setItem("user", JSON.stringify(data.content));
            navigate('/');
        }).catch(err => {
          toast.error('Falha ao fazer login. Verifique suas credenciais.');
        })
  };

  return (
      <div className='Login'>
        <Topbar />
        <div className='LoginContainer' style={{maxWidth: '320px', margin: '0 auto'}}>
        <h1 style={{margin: '48px 0'}}>Login</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)}/>
          </Form.Group>
        </Form>

        <Button variant="primary" type="submit" onClick={onClickLogar}>
          Fazer Login
        </Button>
        <ToastContainer />
        </div>
    </div>
  );
}

export default Login;