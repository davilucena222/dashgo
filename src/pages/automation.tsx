import { Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Automation() {
  return(
    <Flex>
      <Text>Desculpe, página em manutenção. Volte para a tela de dashboard!</Text>
      <Link to="/dashboard">
        <Button>Tela de Dashboard</Button>
      </Link>
    </Flex>
  );
}