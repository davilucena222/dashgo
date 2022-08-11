import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement; //só pode receber componentes/elementos react
  shouldMatchExactHref?: boolean; //não é obrigado o link ser igual ao href que está no endereço, apenas começar com o endereço do href
}

export function ActiveLink({
  children,
  shouldMatchExactHref = false,
   ...rest }: ActiveLinkProps) {

  let isActive = false;

  const { asPath } = useRouter();

  //se for preciso manter o link ativo ao entrar em páginas internas referente à rota atual
  if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)){
    isActive = true;
  }

  //se não for preciso manter o link ativo ao entrar em páginas internas referente à rota atual
  if (!shouldMatchExactHref && (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))){
    isActive = true;
  }

  return(
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? "pink.400" : "gray.50"
      })}
    </Link>
  );
}
