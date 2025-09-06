
import { useState, useEffect } from 'react';

export const useSmartLoading = (isLoading, minDelay = 300) => {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let timer;
    
    if (isLoading) {
      
      timer = setTimeout(() => {
        setShowLoading(true);
      }, minDelay);
    } else {
      setShowLoading(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading, minDelay]);

  return showLoading;
};

//  Use in your components
const SomeComponent = () => {
  const { isLoading } = useAuth();
  const showSpinner = useSmartLoading(isLoading, 500); // Only show after 500ms

  if (showSpinner) {
    return <LoadingSpinner />;
  }

  return <YourContent />;
};
