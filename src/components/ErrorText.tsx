import { ComponentProps, PropsWithChildren } from 'react';

export const ErrorText = ({
  children,
  className,
}: PropsWithChildren & ComponentProps<'p'>) => {
  return <p className={`m-0 text-red-400 ${className || ''}`}>{children}</p>;
};
