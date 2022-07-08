import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function SignUp(){

    const navigate = useNavigate()

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
	const [senha2, setSenha2] = useState("");
    const [error, setError] = useState("");
    const [status, setStatus] = useState("");

    function signUp(event){
        event.preventDefault();
        const body = {
            email: email,
            name: nome,
            password: senha,
            passwordConfirmation: senha2
        }
        const promise = axios.post(
            process.env.REACT_APP_LINK_BACKEND+"/sign-up",
            body
          );
          promise.then((a)=> {navigate("/login")})
          .catch((e)=>
            {
                setError(e.response.data);
                setStatus(e.response.status); 
            })
    }

    return(
        <Container>
            <Content>
                <Link to="/"><h1>BookStore</h1></Link>
                <form onSubmit={signUp}>
                    <Input placeholder="Nome"  type="text" required value={nome} onChange={e => setNome(e.target.value)}></Input>
                    <Input placeholder="E-mail"  type="email" required value={email} onChange={e => setEmail(e.target.value)}></Input>
                    {
                        status === 400 ? <p>{error}</p> :<></>
                    }
                    <Input placeholder="Senha" type="password" required value={senha} onChange={e => setSenha(e.target.value)}></Input>
                    <Input placeholder="Confirme a senha" type="password" required value={senha2} onChange={e => setSenha2(e.target.value)}></Input>
                    {
                        status === 406 ? <p>{error}</p> : status === 422 ? <p>{error}</p> : <></>
                    }
                    <Button>Cadastrar</Button>
                </form>
                <Link to="/login"><p style={{color:"#ffffff",fontSize:"14px", fontWeight:700}}>Já tem uma conta? Entre agora!</p></Link>          
            </Content>
        </Container>
    )
}

const Container = styled.div`
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;

h1{
    font-family: 'Josefin Sans', sans-serif;
    font-size: 46px; 
    color: #FFFFFF;
    text-shadow: 1px 1px 2px #7C6A0A;   
}
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 72%;
    background-color: #BABD8D;
    border-radius: 20px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    form{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        p{
            color: #ffffff;
            font-weight: 700;
            font-size: 14px;
        }
    }
`

const Input = styled.input`
    width: 80%;
    height: 40px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: none;
    padding: 10px;
`

const Button = styled.button`
    width: 80%;
    height: 30px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: none;
`
