import { useEffect, useState } from 'react';
import { DeliverySchema, deliverySchema } from '../../lib/schemas';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../components/Button';
import { InputField } from '../../components/InputField';
import { useLocation, useNavigate } from 'react-router-dom';
import { MinifigsResponse, Part } from '../../lib/types';
import { API_BASE, API_KEY } from '../../lib/consts';
import axios from 'axios';
import { ErrorText } from '../../components/ErrorText';
import { Container } from '../../components/Container';

export const OrderFormView = () => {
  const schema = deliverySchema();
  const [isFetchingParts, setIsFetchingParts] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>();
  const [parts, setParts] = useState<Part[]>();
  const navigate = useNavigate();
  const { state } = useLocation();
  const minifig = state?.minifig;
  const setNumber = minifig?.set_num;
  const isLoading = isFetchingParts || isProcessing;

  const formCtx = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const { formState, handleSubmit, reset } = formCtx;

  const hasErrors = Object.keys(formState.errors).length > 0;

  const handleSubmitForm: SubmitHandler<DeliverySchema> = async (data) => {
    setIsProcessing(true);

    const order = {
      address: data,
      minifigParts: parts,
    };

    // In reality this would be a post request, this is only a simulation
    setTimeout(() => {
      setIsProcessing(false);
      reset();
      navigate('/', {
        state: { success: true, order },
      });
    }, 2000);
  };

  const fetchParts = async () => {
    setIsFetchingParts(true);

    if (!setNumber) return;

    try {
      const { data } = await axios.get<MinifigsResponse<Part>>(
        `${API_BASE}${setNumber}/parts/?key=${API_KEY}&in_theme_id=246`,
      );

      setParts(data.results);
    } catch (error) {
      setError('Something went wrong. Try again later');
    }
    setIsFetchingParts(false);
  };

  useEffect(() => {
    fetchParts();
  }, [setNumber]);

  return (
    <FormProvider {...formCtx}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Container className='grid grid-cols-1 lg:grid-cols-3 gap-4 w-screen h-screen'>
          <div className='lg:col-span-2 lg:p-4 lg:m-4'>
            {error && <ErrorText>{error}</ErrorText>}
            <h2 className='text-2xl font-bold uppercase'>Shipping details</h2>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 pt-8'>
              <InputField label='Name' name='name' />
              <InputField label='Surname' name='surname' />
              <InputField
                className='lg:col-span-2'
                label='Phone number'
                name='phoneNumber'
                type='tel'
              />
              <InputField
                className='lg:col-span-2'
                label='Email'
                name='email'
              />
              <InputField
                className='lg:col-span-2'
                label='Date of birth'
                name='dateOfBirth'
                type='date'
              />
              <InputField
                className='lg:col-span-2'
                label='Address'
                name='address'
              />
              <InputField className='lg:col-span-2' label='City' name='city' />
              <InputField label='State' name='state' />
              <InputField label='Zip code' name='zipcode' />
            </div>
          </div>
          <div className='col-span-1 bg-white text-black rounded-3xl mt-8 lg:mt-0 p-8 flex flex-col justify-between'>
            <div>
              <h2 className='text-2xl font-bold uppercase'>Summary</h2>
              <div className='flex flex-col items-center'>
                <img className='pt-8' src={minifig?.set_img_url} width='50%' />
                <p className='pt-8'>{minifig?.name}</p>
              </div>
              <p className='pt-8'>
                There are {minifig?.num_parts || 0} parts in this minifig:
              </p>
              <ul className='pt-8'>
                {isFetchingParts
                  ? Array.from(Array(minifig?.num_parts || 0), (_, i) => (
                      <li
                        key={i}
                        className='flex pb-4 w-full justify-start animate-pulse'
                      >
                        <div className='min-w-[50px] w-[50px] h-[50px] bg-slate-200' />

                        <div className='text-start pl-4 w-full flex flex-col gap-1'>
                          <p className='m-0 bg-slate-200 h-[50%]' />
                          <p className='m-0 bg-slate-200 h-[50%]' />
                        </div>
                      </li>
                    ))
                  : parts?.map((part) => (
                      <li key={part.id} className='flex pb-4'>
                        <img
                          className='w-[50px] h-[50px]'
                          src={part.part.part_img_url}
                        />

                        <div className='text-start pl-4'>
                          <p className='m-0 line-clamp-1'>{part.part.name}</p>
                          <p className='m-0 text-yellow-400'>
                            {part.part.part_num}
                          </p>
                        </div>
                      </li>
                    ))}
              </ul>
            </div>
            <div className='flex justify-center'>
              <Button
                className='text-white'
                disabled={hasErrors || isLoading}
                type='submit'
              >
                Submit
              </Button>
            </div>
          </div>
        </Container>
      </form>
    </FormProvider>
  );
};
