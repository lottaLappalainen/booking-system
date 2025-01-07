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
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return isVisible ? (
    <div data-testid={`${notification.stateType}-${notification.requestStatus}-notification`}>
      {notification.message}
    </div>
  ) : null;
};

export default Notification;
