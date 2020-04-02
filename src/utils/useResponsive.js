import { useMediaQuery } from 'react-responsive';

const useResponsive = callback => {
  const isDesktop = useMediaQuery(
    {
      query: '(min-width: 1100px)'
    },
    undefined,
    callback
  );

  return { isDesktop };
};

export default useResponsive;
