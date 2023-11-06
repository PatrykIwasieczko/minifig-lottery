import { ComponentProps } from 'react';

export const Button = ({
  children,
  onClick,
  ...props
}: ComponentProps<'button'>) => {
  return (
    <button
      {...props}
      className={`rounded-3xl py-2 px-12 bg-[#318DEB] disabled:bg-slate-400 disabled:text-slate-100 disabled:cursor-not-allowed ${props.className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
