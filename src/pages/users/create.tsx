import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, Stack, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";

const createUserFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória").min(6, "No mínimo 6 caracteres"),
  password_confirmation: yup.string().oneOf([
    null,
    yup.ref("password"),
  ], "As senhas precisam ser iguais")
});

export default function CreateUser() {
  const router = useRouter();

  const createUser = useMutation(async (user: FieldValues) => {
    const response = await api.post("users", {
      user: {
        ...user,
        created_at: new Date(),
      }
    })

    return response.data.user;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    }
  });
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const handleCreateUser: SubmitHandler<FieldValues> = async (values) => {
    await createUser.mutateAsync(values);

    router.push("/users");
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">Criar usuário</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Flex direction="column">
                <Stack spacing="5">
                  <Input
                    label="Nome completo"
                    {...register("name")}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="name"
                    render={({ message }) => <p>{message}</p>}
                  />
                </Stack>
              </Flex>

              <Flex direction="column">
                <Stack spacing="5">
                  <Input
                    type="email"
                    label="E-mail"
                    {...register("email")}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ message }) => <p>{message}</p>}
                  />
                </Stack>
              </Flex>

            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Flex direction="column">
                <Stack spacing="5">
                  <Input
                    type="password"
                    label="Senha"
                    {...register("password")}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ message }) => <p>{message}</p>}
                  />
                </Stack>
              </Flex>

              <Flex direction="column">
                <Stack spacing="5">
                  <Input
                    type="password"
                    label="Confirmação de senha"
                    {...register("password_confirmation")}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="password_confirmation"
                    render={({ message }) => <p>{message}</p>}
                  />
                </Stack>
              </Flex>

            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="8">
              <Link href="/users" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button
                colorScheme="pink"
                type="submit"
                isLoading={isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}