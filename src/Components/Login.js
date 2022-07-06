import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Login(){

    return(
        <Container>
            <Content>
                <h1>BookStore</h1>
                <Input placeholder="E-mail"  type="email" required></Input>
                <Input placeholder="Senha" type="password" required></Input>
                <Button>Entrar</Button>
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