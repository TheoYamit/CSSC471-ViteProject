import React from 'react';
import './mainpagebody.css'
import saleBanner from '../../assets/sale.png'
import WebFont from 'webfontloader'

const MainPageBody = () => {
    WebFont.load({
        google: {
            families: ['Fredoka: 300, 400, 700']
        }
    });
    return (
        <main className="main-page">
            <div className="relative flex justify-center items-center p-8">
                <img src={saleBanner}/>
                
            </div>
        </main>
        
    );
};

export default MainPageBody