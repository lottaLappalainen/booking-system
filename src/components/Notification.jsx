import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (notification) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 15000); // Show for 15 seconds
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'success':
        return 'notification-success';
      case 'error':
        return 'notification-error';
      case 'loading':
        return 'notification-loading';
      default:
        return '';
    }
  };

  return isVisible && notification ? (
    <div className={`notification ${getStatusClass(notification.requestStatus)}`}>
      {notification.message}

      <style>
        {`
          .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: bold;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            color: white;
            z-index: 1000;
            transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
            opacity: 1;
            transform: translateY(0);
          }

          .notification-success {
            background-color: #28a745; /* Green for success */
          }

          .notification-error {
            background-color: #dc3545; /* Red for error */
          }

          .notification-loading {
            background-color: #ffc107; /* Yellow for loading */
            color: black;
          }

          .notification.hidden {
            opacity: 0;
            transform: translateY(-20px);
            pointer-events: none;
          }
        `}
      </style>
    </div>
  ) : null;
};

export default Notification;
