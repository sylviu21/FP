import React, { useEffect, useState } from 'react';

interface LazyInfiniteScrollProps {
  onLoadMore: () => void;
}

const withLazyInfiniteScroll = (
  WrappedComponent: React.ComponentType<LazyInfiniteScrollProps>,
  threshold: number = 100
) => {
  const LazyInfiniteScroll: React.FC<LazyInfiniteScrollProps> = (
    props
  ) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;

        if (
          !isLoading &&
          totalHeight - (scrollY + windowHeight) < threshold
        ) {
          setIsLoading(true);
          props.onLoadMore();
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [isLoading, props]);

    const handleLoadMore = () => {
      setIsLoading(false);
    };

    return (
      <WrappedComponent {...props} onLoadMore={handleLoadMore} />
    );
  };

  return LazyInfiniteScroll;
};

export default withLazyInfiniteScroll;
