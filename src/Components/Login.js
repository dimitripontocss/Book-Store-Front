import { Link, useNavigate } from "react-router-dom";
import { useContext,useState } from "react";
import styled from "styled-components";
import axios from "axios";

import UserContext from "../Context/userContext.js";

export default function Login(){

    const navigate = useNavigate();

    const{ setToken,setUsername } = useContext(UserContext);
    const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");

    function login(event){
        event.preventDefault();
        const body = {
            email: email,
            password: senha
        }
        const promise = axios.post(
            process.env.REACT_APP_LINK_BACKEND+"/login",
            body
          );
          promise.then((response)=> 
          {
            setToken(response.data.token);
            setUsername(response.data.name);
            navigate("/");
          })
          .catch((e)=>
            {
                alert(e.response.data);  
            })
    }

    return(
        <Container>
            <Content>
                <h1>BookStore</h1>
                <form onSubmit={login}>
                    <Input placeholder="E-mail"  type="email" required value={email} onChange={e => setEmail(e.target.value)}></Input>
                    <Input placeholder="Senha" type="password" required value={senha} onChange={e => setSenha(e.target.value)}></Input>
                    <Button>Entrar</Button>
                </form>
                <Link to="/cadastro">Não tem uma conta? Cadastre-se!</Link>          
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
    height: 60%;
    background-color: #BABD8D;
    border-radius: 20px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    form{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
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
    margin-bottom: 40px;
    border-radius: 5px;
    border: none;
`