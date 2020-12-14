import { useEffect } from 'react';

export default (name) => {
  useEffect(() => {
    console.log(`${name} mount`);
    return () => console.log(`${name} unmount`);
  }, []);
};
