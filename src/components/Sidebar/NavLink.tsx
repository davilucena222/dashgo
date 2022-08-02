import { Icon, Link as ChakraLink, Text, LinkProps as CharkaLinkProps } from "@chakra-ui/react";
import { ElementType, ReactNode } from "react";
import { RiDashboardLine } from "react-icons/ri";
import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends CharkaLinkProps {
  icon: ElementType;
  children: ReactNode;
  href: string;
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" alignItems="center" {...rest}>
        <Icon as={RiDashboardLine} fontSize="20" />
        <Text ml="4" fontWeight="medium">{children}</Text>
      </ChakraLink>
    </ActiveLink>
  );
}