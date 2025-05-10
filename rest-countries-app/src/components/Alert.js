import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ message, type = 'info', showIcon = true }) => {
    return (
        <div className={`alert alert-${type}`} data-testid="alert">
            {showIcon && <span className="alert-icon">ℹ️</span>}
            <span className="alert-message">{message}</span>
        </div>
    );
};

Alert.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
    showIcon: PropTypes.bool
};

export default Alert;