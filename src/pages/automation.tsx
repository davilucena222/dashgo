import { Flex, Text } from "@chakra-ui/react";
import { Sidebar } from "../components/Sidebar";
import { NavLink } from "../components/Sidebar/NavLink";

export default function Automation() {
  return(
    <Flex direction="column" align="center" my="250" gap="2">
      <Text>Desculpe, página em manutenção. Volte para a tela de dashboard!</Text>
      <NavLink href="/dashboard">
        <a>Tela de Dashboard</a>
      </NavLink>
    </Flex>
  );
}