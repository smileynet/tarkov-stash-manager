import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from '../components/Main';

const Page: React.FC = () => {
    return (
        <div>
            <Header/>
            <Main/>
            <Footer/>
        </div>
    );
};

export default Page;
