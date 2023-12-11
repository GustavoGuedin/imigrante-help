import Topbar from "../components/Topbar";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function ForumAdd() {
    const [titulo, setTitulo] = useState([]);
    const [postagem, setPostagem] = useState('');

    function createPost() {
        if (!titulo) {
            toast.error('Informe o título da postagem')
            return
        };

        if (!postagem) {
            toast.error('Informe sua postagem')
            return
        };

        const user_id = JSON.parse(localStorage.getItem("user")).id;

        const dto = {
            titulo: titulo,
            postagem: postagem,
            user_id: user_id
        }

        salvarDados(dto);

        setPostagem('');
        setTitulo('');
    };

    const navigate = useNavigate()

    async function salvarDados(dto) {
        await fetch('http://localhost:3333/forum/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(dto)
        }).then((res) => {
            console.log(res)
            navigate('/forum')
        }).catch(err => {
            console.error('Erro: ', err)
        })
    };

    return(
        <div className="Signin">
            <Topbar />

            <div className='LoginContainer' style={{maxWidth: '600px', margin: '5em auto'}}>
                <form>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="text" placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="text" as="textarea" rows={5} placeholder="Postagem" value={postagem} onChange={e => setPostagem(e.target.value)}/>
                    </Form.Group>

                </form>
                    <button onClick={createPost} style={{backgroundColor: "#0d6efd", border: "none", borderRadius: "5px", color: "white", width: "100px", height: "38px"}}>Criar</button>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ForumAdd