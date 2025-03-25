import { Box, Container, Heading, Text, Button, VStack, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')

  return (
    <Box bg={bgColor} minH="100vh" py={20}>
      <Container maxW="container.xl">
        <VStack spacing={8} textAlign="center" mb={16}>
          <Heading as="h1" size="2xl">
            ברוכים הבאים למימורה
          </Heading>
          <Text fontSize="xl" maxW="2xl">
            פלטפורמה חדשנית לשיתוף ציר זמן לימודי בין מורים. צרו, שתפו ולמדו מניסיונם של אחרים.
          </Text>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={() => navigate('/create-timeline')}
          >
            צור ציר זמן חדש
          </Button>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {/* Feature Cards */}
          <Box bg={cardBg} p={8} borderRadius="lg" boxShadow="md">
            <Heading as="h3" size="md" mb={4}>
              שיתוף ידע
            </Heading>
            <Text>
              שתפו את הניסיון שלכם עם קהילת המורים ותרמו להעשרת עולם החינוך
            </Text>
          </Box>

          <Box bg={cardBg} p={8} borderRadius="lg" boxShadow="md">
            <Heading as="h3" size="md" mb={4}>
              למידה הדדית
            </Heading>
            <Text>
              גלו רעיונות חדשים ושיטות הוראה מוצלחות מעמיתים למקצוע
            </Text>
          </Box>

          <Box bg={cardBg} p={8} borderRadius="lg" boxShadow="md">
            <Heading as="h3" size="md" mb={4}>
              התאמה אישית
            </Heading>
            <Text>
              התאימו את צירי הזמן לצרכים הספציפיים של הכיתה שלכם
            </Text>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default Home 