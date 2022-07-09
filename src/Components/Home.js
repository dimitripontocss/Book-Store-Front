import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from 'axios';

import UserContext from "../Context/userContext";
import ProductContext from "../Context/productContext";


export default function Home(){
    
    const {products, setProducts} = useContext(ProductContext);
    const{ token,username } = useContext(UserContext);
    const [menu,setMenu] = useState(false);


    useEffect(() => getProducts(), [])

    async function getProducts(){
        try {
            const response = await axios.get(process.env.REACT_APP_LINK_BACKEND+"/home");
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
                    <User username={username} token={token} setMenu={setMenu} menu={menu}/>              
                    <MenuUser menu={menu} setMenu={setMenu}/>                       
                </Header>
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

function User({username,token,setMenu,menu}){
    return(
        <>
        {
            !token ? <Link to="/login"><p style={{color:"#ffffff", fontSize:"20px",fontWeight:700,textShadow:"1px 1px 2px #7C6A0A", textAlign:"center"}}><ion-icon name="person-outline"></ion-icon></p></Link> 
            :
            <UserArea>
                <p style={{color:"#ffffff",fontSize:"18px",fontWeight:700,marginRight:10}}>Olá {username}!</p>
                {
                    menu ? <></> : <div onClick={()=> {setMenu(true)}}><ion-icon name="caret-down-outline" style={{color:"#ffffff"}}></ion-icon></div>
                }
            </UserArea>
        }
        </>
    )
    }

function MenuUser({menu,setMenu}){
    return(
        <>
        {
            menu ?  <PopUp>
                        <Link to="/carrinho"><p>Ir para o Carrinho!</p></Link>
                        <div onClick={()=>alert("Não foi implementado ainda!")}><p>Sair</p></div>
                        <div onClick={()=>{setMenu(false)}}><ion-icon name="caret-up-outline" style={{color:"#ffffff"}}></ion-icon></div>
                    </PopUp>
                    :
                    <></>
        }
        </>
    )
}

const PopUp = styled.div`
position: fixed;
right: 6%;
top: 60px;

min-width: 120px;
width: 11%;
height: fit-content;

border-radius: 7px;
background-color: #BABD8D;

display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
text-align: center;

    p{
        font-size: 14px;
        color: #ffffff;
    }

`

const Header = styled.div`

    position: fixed;
    top: 0;
    left: 0;
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

const UserArea = styled.div`
display: flex;
align-items: center;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
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
    margin-top: 78px;
    margin-left: 20px;
    font-family:'Roboto', sans-serif;
    font-weight: 600;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    color: black;

    p{
        color: 	#1C1C1C;
        text-align: center;
    }

`
