import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';

import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import MysteryBoxImg from '../../assets/mystery-box.webp';

export const HomeView = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state?.success === true) {
      toast.success('Your order has been submitted successfully!', {
        position: toast.POSITION.TOP_CENTER,
      });
      window.history.replaceState({}, document.title);
    }
  }, []);

  return (
    <div className='flex items-center justify-center flex-col h-screen'>
      <ToastContainer />
      <h1 className='uppercase pb-4 text-2xl font-bold'>
        Lego minifigs mystery box
      </h1>
      <img alt='Mystery Box Image' src={MysteryBoxImg} />
      <Button onClick={() => navigate('/figure-selection')}>
        Let&apos;s go!
      </Button>
    </div>
  );
};
