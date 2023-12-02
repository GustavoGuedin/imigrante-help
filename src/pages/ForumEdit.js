import Topbar from "../components/Topbar";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router-dom";

function ForumEdit() {
    const [titulo, setTitulo] = useState([]);
    const [postagem, setPostagem] = useState('');
    const { idForum } = useParams();

    useEffect(() => {
        recuperarForum();
    }, []);

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

    function updateForum() {
        if (!titulo) {
            toast.error('Informe o título da postagem')
            return
        };

        if (!postagem) {
            toast.error('Informe sua postagem')
            return
        };

        const dto = {
            id: idForum,
            titulo: titulo,
            postagem: postagem
        }

        editarDados(dto);

        setTitulo('');
        setPostagem('');
    };

    const navigate = useNavigate()

    async function editarDados(dto) {
        await fetch('http://localhost:3333/forum/edit', {
            method: 'PUT',
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

            <div className='LoginContainer' style={{maxWidth: '320px', margin: '5em auto'}}>
                <form>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="text" placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="text" as="textarea" rows={5} placeholder="Postagem" value={postagem} onChange={e => setPostagem(e.target.value)}/>
                    </Form.Group>

                </form>
                    <button onClick={updateForum} style={{backgroundColor: "#0d6efd", border: "none", borderRadius: "5px", color: "white", width: "100px", height: "38px"}}>Editar</button>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ForumEdit