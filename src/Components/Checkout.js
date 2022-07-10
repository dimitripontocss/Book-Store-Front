import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext,useState } from "react";
import { ThreeDots } from  'react-loader-spinner'

import UserContext from "../Context/userContext";


export default function Checkout(){

    const{ token,username,selectedProducts,total,setToken,setUsername } = useContext(UserContext);

    const navigate = useNavigate();

    const [menu,setMenu] = useState(false);
    const [loading, setLoading] = useState(false);
    const [done,setDone] = useState(false);
    if(token === null || username === null || selectedProducts === []){
        navigate("/");
    }


    async function checkout(){
        await axios.post(process.env.REACT_APP_LINK_BACKEND+"/checkout",
        {
            username:username,
            products:selectedProducts,
            total:total
        }
        ,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setLoading(false);
        setDone(true);
    }

    return(
        <Container>
            <Header>
                <div onClick={()=>navigate(-1)}><ion-icon name="arrow-back-outline"></ion-icon></div>
                <Link to="/"><h1>BookStore</h1></Link>
                <User username={username} token={token} setMenu={setMenu} menu={menu}/>              
                <MenuUser menu={menu} setMenu={setMenu} navigate={navigate} setToken={setToken} setUsername={setUsername}/>
            </Header>
            {
                loading ? 
                    <ThreeDots
                    height="50"
                    width="150"
                    color='#BABD8D'
                    ariaLabel='loading'
                    />
                : done ?
                    <Completed style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                        <p style={{fontSize:20, color:"#BABD8D", fontWeight:700}}>Sua compra foi concluída, e um recibo será enviado para o seu email.</p>
                        <Link to="/"><p style={{fontSize:20, color:"#BABD8D", fontWeight:700}}>Voltar para a tela inicial.</p></Link>
                    </Completed>
                :
                    <Content>
                        <p style={{fontSize:20, color:"#BABD8D", fontWeight:700}}>De uma última olhada no seu pedido antes de confirmar!</p>
                        <Products>
                            {selectedProducts.map((value,index)=><Product value={value} key={index} />)}
                        </Products>
                        <Confirmation> 
                            <div style={{display:"flex",justifyContent:"space-between"}}>
                                <p style={{fontSize:20, color:"#BABD8D", fontWeight:700}}>Seu Total:</p>
                                <p style={{fontSize:20, color:"#BABD8D", fontWeight:700}}>R$ {total}</p>
                            </div>
                            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                                <div onClick={()=>{setLoading(true); checkout()}}><p style={{fontSize:18, color:"#BABD8D", fontWeight:700}}>Tá tudo ok? Confirmar compra!</p></div>
                                <Link to="/"><p style={{fontSize:16, color:"#BABD8D", fontWeight:700}}>Cancelar compra :(</p></Link>
                            </div>
                        </Confirmation>
                    </Content>
            }
        </Container>
    )
}

function Product({value}){
    return(
        <CartProd>
            <img src={value.imageUrl} />
            <div style={{minWidth:150}}>
                <p style={{fontSize:16, color:"black", fontWeight:700}}>{value.name}</p>
                <p>{value.price}</p>
            </div>
        </CartProd>
    )
}

function User({username,token,setMenu,menu}){
    return(
        <>
        {
            !token ? <Link to="/login"><p style={{color:"#ffffff",fontSize:"12px",fontWeight:700,textShadow:"1px 1px 2px #7C6A0A", textAlign:"center"}}>Clique aqui e<br/> faça seu Login!</p></Link> 
            :
            <UserArea>
                <p style={{color:"#ffffff",fontSize:"18px",fontWeight:700,marginRight:10}}>Olá {username}</p>
                {
                    menu ? <></> : <div onClick={()=> {setMenu(true)}}><ion-icon name="caret-down-outline"></ion-icon></div>
                }
            </UserArea>
        }
        </>
    )
}

function MenuUser({menu,setMenu,navigate,setToken,setUsername}){
    return(
        <>
        {
            menu ?  <PopUp>
                        <Link to="/"><p>Voltar para a página inicial!</p></Link>
                        <div onClick={()=>{localStorage.clear();setToken(null);setUsername(null);navigate("/")}}><p>Sair</p></div>
                        <div onClick={()=>{setMenu(false)}}><ion-icon name="caret-up-outline"></ion-icon></div>
                    </PopUp>
                    :
                    <></>
        }
        </>
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

const CartProd = styled.div`
display: flex;
justify-content: space-around;
align-items: center;

margin: 20px 20px;
border-bottom: 2px solid #BABD8D;
    img{
        max-width:80px;
        max-height:100px;
        width: auto;
        height: auto;
        margin-right: 20%;
    }
`

const Header = styled.div`
width: 100%;
height: 60px;

position: fixed;
top: 0;

background-color: #BABD8D;

display: flex;
justify-content: space-between;
align-items: center;

padding-left: 5%;
padding-right: 5%;

box-shadow: 1px 3px 10px 1px rgba(0, 0, 0, 0.2);

    h1{
        font-family:'Josefin Sans', sans-serif;
        font-size: 24px;
        color: #FFFFFF;
        text-shadow: 1px 1px 2px #7C6A0A;  
        padding-left: 30%;
    }
    ion-icon{
        font-size: 20px;
        color: #FFFFFF;
    }
`

const PopUp = styled.div`
position: fixed;
right: 3%;
top: 60px;

min-width: 140px;
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

const UserArea = styled.div`
display: flex;
align-items: center;
`

const Products = styled.div`
width: 50%;
min-height: fit-content;
max-height: 70%;

margin-top: 30px;
border: 3px solid #BABD8D;
border-radius: 8px;

overflow-y: scroll;
    ::-webkit-scrollbar{
        width: 0;
    }
`

const Content = styled.div`
width: 80%;
height: 80%;

display: flex;
flex-direction: column;
align-items: center;
`

const Confirmation = styled.div`
display: flex;
flex-direction: column;

width: 45%;
`

const Completed = styled.div`
`