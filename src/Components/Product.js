import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Product(props){

    const { imageUrl, name, price} = props
    return(
        <Poster>
            <img src={imageUrl} alt={name}/>
        </Poster>
    )
}

const Poster = styled.div`


img{
    width: 130px;
    height: 190px;
}
`