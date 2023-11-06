import { ComponentProps } from 'react';
import { GlobalError, get, useFormContext } from 'react-hook-form';
import { ErrorText } from './ErrorText';

type InputFieldProps = ComponentProps<'input'> & {
  label?: string;
  name: string;
};

export const InputField = ({
  className,
  label,
  name,
  type = 'text',
}: InputFieldProps) => {
  const { formState, register } = useFormContext();

  const error = get(formState.errors, name) as GlobalError;

  return (
    <div className={className || ''}>
      {label && (
        <label className='text-start mb-1' htmlFor={name}>
          {label}
        </label>
      )}
      <input
        {...register(name)}
        aria-label={name}
        className='p-2 rounded w-full bg-white text-black'
        name={name}
        type={type}
      />
      {error && <ErrorText className='mt-1 text-xs'>{error.message}</ErrorText>}
    </div>
  );
};
