import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import UserContext from "../Context/userContext";

export default function StyleHeader(){
    
    const {products, setProducts, token, setToken, username, setUsername, menu, setMenu} = useContext(UserContext);

    return(
        <Header>
            <User username={username} token={token} setMenu={setMenu} menu={menu}/>              
            <Link to="/"><h1>BookStore</h1></Link>    
            <MenuUser menu={menu} setMenu={setMenu} setToken={setToken} setUsername={setUsername}/>                       
        </Header>
    )

    function User({username,token,setMenu,menu}){
        return(
            <>
            {
                !token ? <Link to="/login"><p style={{color:"#ffffff", fontSize:"20px",fontWeight:700,textShadow:"1px 1px 2px #7C6A0A", textAlign:"center"}}><ion-icon name="person-outline"></ion-icon></p></Link> 
                :
                <UserArea>
                    <p style={{color:"#ffffff",fontSize:"18px",fontWeight:500,marginRight:10}}>Olá, {username}!</p>
                    {
                        menu ? <></> : <div onClick={()=> {setMenu(true)}}><ion-icon name="caret-down-outline" style={{color:"#ffffff"}}></ion-icon></div>
                    }
                </UserArea>
            }
            </>
        )
        }
    
    function MenuUser({menu,setMenu,setToken,setUsername}){
        return(
            <>
            <Link to="/carrinho">
                <ion-icon name="cart-outline" style={{color:"#ffffff", fontSize: "25px"}}></ion-icon>
            </Link>
            
            {
                menu ?  <PopUp>
                            <div onClick={()=>{localStorage.clear();setToken(null);setUsername(null);setMenu(false)}}><p>Sair</p></div>
                            <div onClick={()=>{setMenu(false)}}><ion-icon name="caret-up-outline" style={{color:"#ffffff"}}></ion-icon></div>
                        </PopUp>
                        :
                        <></>
            }
            </>
        )
    }

}

const Header = styled.div`

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #FA9500;
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

const PopUp = styled.div`
position: fixed;
left: 11%;
top: 60px;

min-width: 120px;
width: 11%;
height: fit-content;

border-radius: 5px;
background-color: #FA9500;
opacity: 0.8;

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