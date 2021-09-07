import React from 'react'
import Layout from '../UI/Layout'
import { Provider } from 'react-redux';
import { store } from '../Store/store';


//////<<<<<------------------------------------------------``


const Chronos = () =>
 {
    
    return (
        
        <Provider store={ store }>
           <Layout/>
        </Provider>
    )
};


//////---------------------------------------------->>>>>


export { Chronos }
