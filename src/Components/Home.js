import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from 'axios';

import UserContext from "../Context/userContext";


export default function Home(){
    
    const {products, setProducts, setToken, setUsername, menu, setMenu} = useContext(UserContext);
    const{ token, username } = useContext(UserContext);
    

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    if(user !== null){
        setToken(user.token)
        setUsername(user.name)
    }

    useEffect(() => getProducts(), [])

    async function getProducts(){
        try {
            const response = await axios.get(process.env.REACT_APP_LINK_BACKEND+"/home");
            setProducts(response.data);        
            console.log(response)
        } catch (error) {
          alert(`Erro ao buscar produtos: ${error.message}`);
            
        }  
    }    

    return(
            <Content>
                <Container>
    
                    {products.map(product => (
                    <Link to={`/produto/${product._id}`}>
                        <Box>
                            <img src={product.imageUrl} />
                            <p>{product.name}</p>
                            <p>Preço: <span style={{color:"green"}}>{product.price}</span></p>
                        </Box>                    
                    </Link>))}
                    
                </Container>
            </Content>
    )
}

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Container = styled.div`
    width: 90%;
    height: 100vh;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 60px;

img{
    width: 100px;
    height: 140px;
    margin-top: 14px;
    margin-bottom: 18px;
    border-radius: 5px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    margin-bottom: -1px;
}
`
const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 160px;
    height: 270px;
    background-color: #BABD8D;
    border-radius: 5px;
    margin-top: 60px;
    margin-left: 20px;
    font-family:'Roboto', sans-serif;
    font-weight: 600;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    color: black;
    position:relative;
    :hover{top:-2px;box-shadow:0 2px 2px #666}
    z-index: -1;

    p{
        color: 	#1C1C1C;
        text-align: center;
    }

`
