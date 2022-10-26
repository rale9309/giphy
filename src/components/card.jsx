import React from 'react';

const Card = (props) => {
    return <div className='card'>
        <img src={props.data.images.original.url} className='slika' alt='slika'></img>
    </div>
}

export default Card