import { default as NextLink, LinkProps as NextLinkProps } from "next/link";
import { FC, ReactElement, ReactNode } from "react";

type LinkProps = NextLinkProps & {
  children: ReactNode;
};

export const Link: FC<LinkProps> = (props) => {
  return (
    <NextLink {...props}>
      <p className="hover:underline">{props.children}</p>
    </NextLink>
  );
};
