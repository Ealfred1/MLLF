"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface TransitionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function TransitionLink({
  href,
  children,
  className,
  ...rest
}: TransitionLinkProps) {
  const router = useRouter();

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={onClick} className={className} {...rest}>
      {children}
    </a>
  );
}
