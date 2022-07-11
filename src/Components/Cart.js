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
        setTimeout(()=>{setRefresh(refresh + 1);setLoading(false)}, 1700);
    },[])  
    
    return(
        <Container>
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
            <Intro>
                {
                    username ? <p>Aqui está seu carrinho, {username}</p> : <p>Faça login para ver seu carrinho!</p>
                }
            </Intro>
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
                                <p style={{fontSize:20, color:"#EB6424", fontWeight:700}}>Seu Total:</p>
                                <p style={{fontSize:20, color:"green", fontWeight:600}}>R$ {total}</p>
                            </div>
                            <div style={{display:"flex", flexDirection: "column", alignItems:"center"}}>
                                <Link to="/finalizar"><p style={{
                                    fontSize:16, 
                                    color:"#FFFFFF", 
                                    fontWeight:700, 
                                    width: "auto", 
                                    backgroundColor: "#EB6424", 
                                    padding: "6px",
                                    borderRadius: "5px",
                                    opacity: "0.6",
                                    boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)"                                    
                                    
                                }}>Fazer Checkout</p></Link>
                                
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
                                }}>Continuar comprando</p></Link>
                            </div>
                        </>
                }
            </Checkout>
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

const Intro = styled.div`
    color: #EB6424;
    font-weight: 600;
    font-size: 24px;
`

const Checkout = styled.div`
display: flex;
flex-direction: column;
text-align: center;

width: 30%;
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
width: auto;
height: auto;
padding: 10px;

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
