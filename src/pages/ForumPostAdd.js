import Topbar from "../components/Topbar";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router-dom";

function ForumPostAdd() {
    const [resposta, setResposta] = useState([]);
    const { idForum } = useParams();

    function createPost() {
        if (!resposta) {
            toast.error('Informe o título da postagem')
            return
        };

        const user_id = JSON.parse(localStorage.getItem("user")).id;

        const dto = {
            topic_id: idForum,
            resposta: resposta,
            user_id: user_id
        }

        salvarDados(dto);

        setResposta('');
    };

    const navigate = useNavigate()

    async function salvarDados(dto) {
        await fetch('http://localhost:3333/forum/reply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(dto)
        }).then((res) => {
            console.log(res)
            navigate('/post/' + idForum)
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
                        <Form.Control type="text" as="textarea" rows={5} placeholder="Adicione uma resposta" value={resposta} onChange={e => setResposta(e.target.value)}/>
                    </Form.Group>

                </form>
                    <button onClick={createPost} style={{backgroundColor: "#0d6efd", border: "none", borderRadius: "5px", color: "white", width: "100px", height: "38px"}}>Responder</button>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ForumPostAdd