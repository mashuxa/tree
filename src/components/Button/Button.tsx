import { ButtonHTMLAttributes, FC } from "react";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => (
  <button
    {...props}
    type="submit"
    className={`${className} py-2 px-4 text-white rounded`}
  >
    {children}
  </button>
);

export default Button;
