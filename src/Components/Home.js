import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from 'axios';

import UserContext from "../Context/userContext";


export default function Home(){
    
    const [products, setproducts] = useState([]);
    const{ token,username } = useContext(UserContext);
    const [menu,setMenu] = useState(false);


    useEffect(() => getProducts(), [])

    async function getProducts(){
        try {
            const response = await axios.get("http://localhost:5000/home");
            setproducts(response.data);        
            console.log(response.data)
        } catch (error) {
          alert(`Erro ao buscar produtos: ${error.message}`);
            
        }  
    }    

    return(
            <Content>
                <Header>
                    <h1>BookStore</h1>
                    <Input placeholder="Pesquisar"></Input>          
                    
                    <Link to="/login">Auth</Link>
                    <Link to="">Cart</Link>
                </Header>
                <Container>
    
                    {products.map(product => (
                    <Box>
                        <img src={product.imageUrl} />
                        <p>{product.name}</p>
                        <p>{product.price}</p>
                    </Box>))}
                    
                </Container>
            </Content>
    )
}

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Header = styled.div`
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

const Container = styled.div`
    width: 90%;
    height: 100vh;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

img{
    width: 120px;
    height: 140px;
    margin-top: 14px;
    margin-bottom: 18px;
    border-radius: 5px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}
`
const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 160px;
    height: 270px;
    background-color: #FA9500;
    border-radius: 5px;
    margin-top: 18px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    
`
