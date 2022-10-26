import React from 'react';
import Card from './card';

const Column = (props) => {
    return <div className='column'>
        {props.data.map(el => <Card data={el}/>)}
    </div>
}

export default Column;