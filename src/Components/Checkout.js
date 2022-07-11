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
                        <Link to="/"><p style={{fontSize:20, color:"#BABD8D", fontWeight:700, backgroundColor: "#FA9500", color: "#FFFFFF", borderRadius: "5px", padding: "10px"}}>Voltar para a tela inicial.</p></Link>
                    </Completed>
                :
                    <Content>
                        <p style={{fontSize:24, color:"#EB6424", fontWeight:600}}>Revise seu pedido antes de confirmar!</p>
                        <Products>
                            {selectedProducts.map((value,index)=><Product value={value} key={index} />)}
                        </Products>
                        <Confirmation> 
                            <div style={{display:"flex",justifyContent:"space-between"}}>
                                <p style={{fontSize:20, color:"#EB6424", fontWeight:700}}>Seu Total:</p>
                                <p style={{fontSize:20, color:"green", fontWeight:600}}>R$ {total}</p>
                            </div>
                            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                                <div onClick={()=>{setLoading(true); checkout()}}><p style={{
                                    fontSize:16, 
                                    color:"#FFFFFF", 
                                    fontWeight:700, 
                                    width: "auto", 
                                    backgroundColor: "#EB6424", 
                                    padding: "6px",
                                    borderRadius: "5px",
                                    opacity: "0.6",
                                    boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
                                    textAlign: "center"                                  
                                  
                                    
                                }}>Tá tudo ok? Confirmar compra!</p></div>
                                <Link to="/"><p style={{
                                    fontSize:16, 
                                    color:"#FFFFFF", 
                                    fontWeight:700,
                                    backgroundColor: "#FA9500", 
                                    padding: "6px",
                                    borderRadius: "5px",
                                    marginLeft: "10px",
                                    opacity: "0.6",
                                    boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)"
                                }}>Cancelar compra :(</p></Link>
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

const Products = styled.div`
width: auto;
height: auto;
padding-left:20px;


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

width: 40%;
`

const Completed = styled.div`
`