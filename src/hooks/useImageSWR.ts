import React from 'react';


export default function useImageSWR(url: string) {

  const [q, setQ] = React.useState(0);

  React.useEffect(() => {
    const i = setInterval(() => {
      setQ((q) => q + 1);
    }, 2000);
    return () => {
      clearInterval(i);
    };
  }, []);


  return `${url}?q=${q}`;
}
