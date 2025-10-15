import React from 'react';

const Alert = ({ alert }) => {
    const capitalize = (word) => {
        if (word === 'danger') word = 'error';
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    const getAlertIcon = (type) => {
        switch (type) {
            case 'success':
                return 'fas fa-check-circle';
            case 'danger':
                return 'fas fa-exclamation-triangle';
            case 'warning':
                return 'fas fa-exclamation-circle';
            case 'info':
                return 'fas fa-info-circle';
            default:
                return 'fas fa-bell';
        }
    };

    const getAlertClass = (type) => {
        switch (type) {
            case 'success':
                return 'alert-success';
            case 'danger':
                return 'alert-danger';
            case 'warning':
                return 'alert-warning';
            case 'info':
                return 'alert-info';
            default:
                return 'alert-primary';
        }
    };

    if (!alert) {
        return <div style={{ height: '60px' }}></div>;
    }

    return (
        <div className="container mt-3">
            <div
                className={`alert ${getAlertClass(alert.type)} border-0 shadow-sm d-flex align-items-center`}
                role="alert"
                style={{
                    animation: 'slideInDown 0.3s ease-out',
                    borderRadius: '10px'
                }}
            >
                <i className={`${getAlertIcon(alert.type)} me-3 fs-5`}></i>
                <div className="flex-grow-1">
                    <strong className="me-2">{capitalize(alert.type)}:</strong>
                    {alert.msg}
                </div>
            </div>

            <style jsx>{`
        @keyframes slideInDown {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .alert {
          margin-bottom: 0;
        }
      `}</style>
        </div>
    );
};

export default Alert;