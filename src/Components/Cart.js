import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext,useEffect,useState } from "react";
import { ThreeDots } from  'react-loader-spinner'

import UserContext from "../Context/userContext";

export default function Cart(){
    const{ token,username,setToken,setUsername,selectedProducts,setSelectedProducts,total,setTotal } = useContext(UserContext);

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    if(user !== null){
        setToken(user.token)
        setUsername(user.name)
    }else{
        navigate("/");
    }
    
    const [menu,setMenu] = useState(false);
    const [refresh,setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    console.log(selectedProducts);

    async function deleteProduct(id){
        if(window.confirm("Vai mesmo tirar esse livro do carrinho?")){
            await axios.delete(process.env.REACT_APP_LINK_BACKEND+`/cart/${id}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setRefresh(refresh + 1);
        }
    }
    
    useEffect(() => {
        const promise = axios.get(process.env.REACT_APP_LINK_BACKEND+"/cart", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        promise.then((response) => {setSelectedProducts(response.data.products);setTotal(response.data.totalFixed)} );
        promise.catch(()=>{setSelectedProducts([])});
    },[refresh])   
    useEffect(() => {
        setTimeout(()=>{setRefresh(refresh + 1);setLoading(false)}, 1000);
    },[])  
    
    return(
        <Container>
            <Header>
                <div onClick={()=>navigate(-1)}><ion-icon name="arrow-back-outline"></ion-icon></div>
                <Link to="/"><h1>BookStore</h1></Link>
                <User username={username} token={token} setMenu={setMenu} menu={menu}/>              
                <MenuUser menu={menu} setMenu={setMenu} navigate={navigate} setToken={setToken} setUsername={setUsername}/>
            </Header>
            <Content>
                {
                    loading ? <div style={{marginTop:300}}>
                                <ThreeDots
                                height="50"
                                width="150"
                                color='#BABD8D'
                                ariaLabel='loading'
                                /> 
                            </div>
                    :
                    <ContentCart username={username} selectedProducts={selectedProducts} deleteProduct={deleteProduct} total={total}/>
                }
                    
            </Content>
        </Container>
    )
}

function ContentCart({username,selectedProducts,deleteProduct,total}){
    return(
        <>
            {
                username ? <p>Aqui está seu carrinho, {username}</p> : <p>Faça login para ver seu carrinho!</p>
            }
            <Products>
                {
                    selectedProducts.length === 0 
                        ?
                        <div style={{textAlign:"center",fontSize:20, color:"#BABD8D", fontWeight:700,marginTop:100}}>
                            <p>Seu carrinho está vazio!</p>
                            <Link to="/"><p style={{color:"#BABD8D",marginTop:175}}>Voltar para a home!</p></Link>
                        </div>
                        :
                        selectedProducts.map((value,index)=><Product value={value} key={index} deleteProduct={deleteProduct}/>)
                }
            </Products>
            <Checkout>
                {
                    selectedProducts.length === 0 
                        ?
                        <></>
                        :
                        <>
                            <div style={{display:"flex",justifyContent:"space-between"}}>
                                <p style={{fontSize:20, color:"#BABD8D", fontWeight:700}}>Seu Total:</p>
                                <p style={{fontSize:20, color:"#BABD8D", fontWeight:700}}>R$ {total}</p>
                            </div>
                            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                                <Link to="/finalizar"><p style={{fontSize:18, color:"#BABD8D", fontWeight:700}}>Fazer Checkout</p></Link>
                                <Link to="/"><p style={{fontSize:16, color:"#BABD8D", fontWeight:700}}>Continuar comprando</p></Link>
                            </div>
                        </>
                }
            </Checkout>
        </>
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

function Product({value,deleteProduct}){
    return(
        <CartProd>
            <img src={value.imageUrl} />
            <div style={{minWidth:150}}>
                <p style={{fontSize:16, color:"black", fontWeight:700}}>{value.name}</p>
                <p>{value.price}</p>
            </div>
            <div onClick={()=>{deleteProduct(value._id)}}style={{display:"flex",alignItems:"center"}}>
                <ion-icon style={{fontSize:30}}name="trash-outline"></ion-icon>
            </div>
        </CartProd>
    )
}

const Checkout = styled.div`
display: flex;
flex-direction: column;

width: 45%;
`

const CartProd = styled.div`
display: flex;
justify-content: space-between;
align-items: center;

margin: 20px 20px;
border-bottom: 2px solid #BABD8D;
    img{
        max-width:80px;
        max-height:100px;
        width: auto;
        height: auto;
        margin-right: 10%;
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
const Content = styled.div`
width: 80%;
height: 80%;

display: flex;
flex-direction: column;
align-items: center;
    >p{
        font-size: 20px;
        color: #BABD8D;
        font-weight: 700;
    }
`
const Products = styled.div`
width: 50%;
min-height: fit-content;
max-height: 70%;

margin-top: 30px;
border: 3px solid #BABD8D;
border-radius: 8px;

overflow-y: scroll;
    >p{
        margin-top: 100px;
    }
    ::-webkit-scrollbar{
        width: 0;
    }
`
