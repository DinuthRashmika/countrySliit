import React from 'react';

const SimpleCountryCard = () => {
    return (
        <div data-testid="simple-card">
            <div data-testid="simple-name">Sample Country</div>
            <button data-testid="simple-btn">
                ♡
            </button>
        </div>
    );
};

export default SimpleCountryCard;