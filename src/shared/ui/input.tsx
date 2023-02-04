import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: InputProps) => {
  return (
    <input
      {...props}
      className="
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-primary
        bg-body bg-clip-padding
        border border-solid border-primary
        transition
        ease-in-out
        m-0
     focus:outline-none focus:border-blue-300
  "
    />
  );
};
