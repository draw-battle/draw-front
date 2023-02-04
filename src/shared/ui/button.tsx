import classNames from "classnames";
import { ButtonHTMLAttributes, FC, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "link" | "default";
};

export const Button: FC<ButtonProps> = ({
  children,
  variant = "default",
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={classNames("inline-block text-primary duration-100", {
        "border hover:bg-primary hover:text-body px-3 py-2 text-xs font-medium leading-tight":
          variant === "default",
        "hover:underline": variant === "link",
      })}
    >
      {children}
    </button>
  );
};
