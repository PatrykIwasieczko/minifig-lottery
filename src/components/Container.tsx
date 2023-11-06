import { ComponentProps, PropsWithChildren } from 'react';

export const Container = ({
  children,
  className,
}: PropsWithChildren & ComponentProps<'div'>) => {
  return (
    <div className={`p-[5%] lg:px-[10%] ${className || ''}`}>{children}</div>
  );
};
