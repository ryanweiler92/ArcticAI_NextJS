'use client';
import { useEffect } from 'react';
import Navbar from '@components/landing-page/Navbar';
import Hero from '@components/landing-page/Hero';
import Screenshot from '@components/landing-page/Screenshot';
import Features from '@components/landing-page/Features';
import FutureDevelopment from '@components/landing-page/FutureDevelopment';
import { useAppDispatch } from '@redux/hooks';
import { setIsAuthenticated } from '@redux/slices/userSlice';
import { verifyAuth } from '@handlers/authHandlers';

export default function LandingPage({}) {
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
    <>
      <Navbar />
      <Hero />
      <Screenshot />
      <Features />
      <FutureDevelopment />
    </>
  );
}
