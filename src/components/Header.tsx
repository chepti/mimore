import {
  Box,
  Container,
  Flex,
  Link,
  useColorModeValue,
  useColorMode,
  IconButton,
  HStack,
  Text,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={10}
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      backdropFilter="blur(8px)"
    >
      <Container maxW="container.xl">
        <Flex py={4} justify="space-between" align="center">
          <HStack spacing={8}>
            <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
              <Text fontSize="xl" fontWeight="bold">
                מימור
              </Text>
            </Link>
            <HStack spacing={4}>
              <Link as={RouterLink} to="/explore">
                גלה צירי זמן
              </Link>
              <Link as={RouterLink} to="/create-timeline">
                צור ציר זמן
              </Link>
            </HStack>
          </HStack>

          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
          />
        </Flex>
      </Container>
    </Box>
  );
};

export default Header; 