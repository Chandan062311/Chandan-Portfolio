import type { PropsWithChildren } from "react";

type ContainerProps = PropsWithChildren<{
  className?: string;
}>;

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-5 md:px-10 ${className ?? ""}`.trim()}>
      {children}
    </div>
  );
}
