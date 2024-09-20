import { useRouteError } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Icon,
  Container,
} from "@chakra-ui/react";
import { FaExclamationTriangle } from "react-icons/fa"; // Import an icon for a visual cue
import { Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Container h="100vh" display="flex" justifyContent="center" alignItems="center">
      <VStack spacing={6} textAlign="center">
        <Icon as={FaExclamationTriangle} w={16} h={16} color="red.500" />
        <Heading size="2xl">Oops!</Heading>
        <Text fontSize="lg">Sorry, an unexpected error has occurred.</Text>
        <Text fontSize="md" color="gray.500">
          <i>{error.statusText || error.message}</i>
        </Text>
        <Box>
          <Link to="/home">
            <Button colorScheme="blue" mt={4}>
              Go to Homepage
            </Button>
          </Link>
        </Box>
      </VStack>
    </Container>
  );
}
