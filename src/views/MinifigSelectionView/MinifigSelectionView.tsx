import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { Minifig, MinifigsResponse } from '../../lib/types';
import { API_BASE, API_KEY } from '../../lib/consts';
import axios from 'axios';
import { ErrorText } from '../../components/ErrorText';
import { generateRandomNumbers } from '../../lib/utils';
import { Container } from '../../components/Container';

export const MinifigSelectionView = () => {
  const [minifigs, setMinifigs] = useState<Minifig[]>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [minifigsCount, setMinifigsCount] = useState(0);
  const [selectedMinifig, setSelectedMinifig] = useState<Minifig>();
  const [error, setError] = useState<string>();

  const navigate = useNavigate();

  const getRandomMinifigs = async () => {
    setIsProcessing(true);
    const minifigsList: Minifig[] = [];

    const randomMinifigNumbers = generateRandomNumbers(minifigsCount);

    for (let i = 0; i < 3; i++) {
      try {
        const { data } = await axios.get<MinifigsResponse<Minifig>>(
          `${API_BASE}?key=${API_KEY}&in_theme_id=246&page_size=1&page=${randomMinifigNumbers[i]}`,
        );

        minifigsList.push(data?.results[0]);
      } catch {
        setError('Something went wrong. Try again later');
      }
    }

    setMinifigs(minifigsList);
    setIsProcessing(false);
  };

  const getMinifigsCount = async () => {
    setIsProcessing(true);

    try {
      const { data } = await axios.get<MinifigsResponse<Minifig>>(
        `${API_BASE}?key=${API_KEY}&in_theme_id=246`,
      );

      await setMinifigsCount(data.count);
    } catch {
      setError('Something went wrong. Try again later');
    }

    setIsProcessing(false);
  };

  useEffect(() => {
    if (minifigsCount > 0) {
      getRandomMinifigs();
    } else {
      getMinifigsCount();
    }
  }, [minifigsCount]);

  return (
    <Container className='flex items-center justify-center flex-col lg:h-screen'>
      {error && <ErrorText>{error}</ErrorText>}
      <h1 className='uppercase pb-12 text-2xl font-bold'>
        Choose Your Minifig
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {isProcessing || !minifigs
          ? Array.from(Array(3), (_, i) => (
              <div
                key={i}
                className={`bg-slate-300 rounded-3xl w-[275px] h-[275px]`}
              />
            ))
          : minifigs?.map((minifig) => (
              <button
                key={minifig.name}
                className={`bg-white text-black rounded-3xl flex flex-col items-center justify-around p-8 pb-0 w-[275px] h-[275px] border-s-4 ${
                  minifig.name === selectedMinifig?.name
                    ? 'shadow-[0px_0px_10px_10px] shadow-orange-500'
                    : 'shadow-none'
                }`}
                onClick={() => setSelectedMinifig(minifig)}
              >
                {minifig?.set_img_url ? (
                  <img src={minifig?.set_img_url} width={100} />
                ) : (
                  <div className='block w-[100px]' />
                )}
                <h5 className='font-bold'>{minifig?.name}</h5>
                <a
                  className='py-6 text-orange-500'
                  href={minifig.set_url}
                  onClick={(e) => e.stopPropagation()}
                  rel='noreferrer'
                  target='_blank'
                >
                  Show details
                </a>
              </button>
            ))}
      </div>
      <Button
        className='mt-12 uppercase'
        disabled={!selectedMinifig || isProcessing}
        onClick={() =>
          navigate('/order-form', {
            state: { minifig: selectedMinifig },
          })
        }
      >
        Proceed to shipment
      </Button>
    </Container>
  );
};
