import styled from 'styled-components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';


import axios from 'axios';
import UserContext from '../Context/userContext';

export default function Product(){
   const { productID } = useParams();
   const { products, setProducts } = useContext(UserContext);

   const navigate = useNavigate();

   const product = products.filter(product => {
        console.log(productID === product._id)    
        console.log(productID)

        return productID === product._id
    })

    function putOnCart(id){
        console.log(id)
        try{
        const body = { productId: id }
        axios.post(process.env.REACT_APP_LINK_BACKEND+"/cart", body);
         
            navigate("/carrinho");
        
        }catch(error){
            console.log(error)  
        }
    }

    return(
        <Poster>
            <img src={product[0].imageUrl} />
            <p style={{fontSize: "26px"}}>{product[0].name}</p>
            <p style={{color:"#4F4F4F"}}>{product[0].author}</p>
            <p style={{width: "450px", color:"	#808080"}}>{product[0].description}</p>
            <p >{product[0].price}</p>
            <span onClick={() => putOnCart(product[0]._id)}>Colocar no carrinho</span>
        </Poster>
    )
}

const Poster = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    font-family:'Roboto', sans-serif;
    font-weight: 700; 
    text-align: justify;

    img{
        width: 220px;
        height: 300px;
        margin-top: 14px;
        margin-bottom: 18px;
        border-radius: 5px;
        box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    }

    p{
        margin-bottom: -4px;
    }

    span{
        width: auto;
        height: 38px;
        padding: 10px;
        background-color: #fa9500;
        color: #7c6a0a;
        text-align: center;
        border-radius: 5px;
        box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
        margin-top: 20px;
    }
`