import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext,useState } from "react";

import UserContext from "../Context/userContext";

export default function Cart(){

    const [menu,setMenu] = useState(false);
    const{ token,username } = useContext(UserContext);
    
    return(
        <Container>
            <Header>
                <ion-icon name="arrow-back-outline"></ion-icon>
                <Link to="/"><h1>BookStore</h1></Link>
                <User username={username} token={token} setMenu={setMenu} menu={menu}/>              
                <MenuUser menu={menu} setMenu={setMenu}/>
            </Header>
            
        </Container>
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

function MenuUser({menu,setMenu}){
    return(
        <>
        {
            menu ?  <PopUp>
                        <Link to="/"><p>Voltar para a página inicial!</p></Link>
                        <div onClick={()=>alert("Não foi implementado ainda!")}><p>Sair</p></div>
                        <div onClick={()=>{setMenu(false)}}><ion-icon name="caret-up-outline"></ion-icon></div>
                    </PopUp>
                    :
                    <></>
        }
        </>
    )
}

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
const UserArea = styled.div`
display: flex;
align-items: center;
`
