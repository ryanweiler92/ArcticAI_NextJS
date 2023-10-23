'use client';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MapProvider } from '@context/MapContext';
import { useAppDispatch } from '@redux/hooks';
import { setIsAuthenticated } from '@redux/slices/userSlice';
import { verifyAuth } from '@handlers/authHandlers';

const OLMap = dynamic(() => import('@components/ol-map/OLMap'), {
  ssr: false,
});

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await verifyAuth();
      if (auth) {
        dispatch(setIsAuthenticated(auth));
      }
    };
    checkAuth();
  }, []);

  return (
    <MapProvider>
      <OLMap />
    </MapProvider>
  );
}
