import { Icon, Link, Text, LinkProps as CharkaLinkProps } from "@chakra-ui/react";
import { ElementType, ReactNode } from "react";
import { RiDashboardLine } from "react-icons/ri";

interface NavLinkProps extends CharkaLinkProps {
  icon: ElementType;
  children: ReactNode;
}

export function NavLink({ icon, children, ...rest }: NavLinkProps) {
  return (
    <Link display="flex" alignItems="center" {...rest}>
      <Icon as={RiDashboardLine} fontSize="20" />
      <Text ml="4" fontWeight="medium">{children}</Text>
    </Link>
  );
}