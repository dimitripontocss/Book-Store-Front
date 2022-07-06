import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Home(){


    

    return(
            <Content>
                <h1>BookStore</h1>
                <Input placeholder="Pesquisar"></Input>          
                
                <Link to="/login">Auth</Link>
                <Link to="">Cart</Link>
            </Content>
    )
}


const Content = styled.div`
    width: 100%;
    background-color: #BABD8D;
    height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 1px 3px 10px 1px rgba(0, 0, 0, 0.2);

    h1{
        font-family:'Josefin Sans', sans-serif;
        font-size: 24px;
        color: #FFFFFF;
        text-shadow: 1px 1px 2px #7C6A0A;

        
        
    }
`

const Input = styled.input`
    width: 40%;
    height: 25px;
    border: none;
    border-radius: 5px;
    background-color: #FFFFFF;
    padding: 10px;
    
`


