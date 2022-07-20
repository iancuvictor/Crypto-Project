import React from 'react';
import css from './frontPage.module.css';

function FrontPage() {
    return (
        <div className={css.frontPage}>
            <div className={css.content}>
                <h1>CryptoCurrency Project</h1>
                <p>Find data about CryptoCurrency trading (which is just gambling rebranded)</p>
            </div>
        </div>
    );
};

export default FrontPage;