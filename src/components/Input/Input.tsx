"use client";
import {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  useEffect,
  useMemo,
  useRef,
} from "react";
import cn from "classnames";
import styles from "./Input.module.scss";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  value: string;
  width?: number;
  type?: string;
};

export const Input: FC<InputProps> = ({
  className,
  width,
  type = "text",
  ...rest
}) => {
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (width) {
      input.current?.style.setProperty("--input-control-width", width + "px");
    }
  }, [width]);

  return (
    <input
      {...rest}
      ref={input}
      type={type}
      className={cn(styles.input, className)}
    />
  );
};
