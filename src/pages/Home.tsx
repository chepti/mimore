import { Box, Container, Heading, Text, Button, VStack, SimpleGrid } from '@chakra-ui/react'

function Home() {
  return (
    <Box minH="100vh" bg="gray.50">
      {/* Hero Section */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={8} textAlign="center">
          <Heading size="2xl">ברוכים הבאים למימור</Heading>
          <Text fontSize="xl" color="gray.600">
            הפלטפורמה לניהול וארגון חומרי הוראה על ציר זמן
          </Text>
          <Button size="lg" colorScheme="blue">
            התחל עכשיו
          </Button>
        </VStack>
      </Container>

      {/* Features Section */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={12}>
          <Heading size="xl" textAlign="center">למה מימור?</Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            <Box p={6} bg="white" borderRadius="lg" boxShadow="md">
              <Heading size="md" mb={4}>ארגון פשוט</Heading>
              <Text>ארגן את חומרי ההוראה שלך בצורה ויזואלית על ציר זמן</Text>
            </Box>
            <Box p={6} bg="white" borderRadius="lg" boxShadow="md">
              <Heading size="md" mb={4}>שיתוף קל</Heading>
              <Text>שתף את החומרים שלך עם מורים אחרים בקלות</Text>
            </Box>
            <Box p={6} bg="white" borderRadius="lg" boxShadow="md">
              <Heading size="md" mb={4}>גישה נוחה</Heading>
              <Text>גש לחומרים שלך מכל מקום, בכל זמן</Text>
            </Box>
          </SimpleGrid>
        </VStack>
      </Container>

      {/* How It Works Section */}
      <Box bg="white" py={16}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <Heading size="xl" textAlign="center">איך זה עובד?</Heading>
            <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
              <VStack>
                <Text fontSize="4xl">1️⃣</Text>
                <Heading size="md">הרשמה</Heading>
                <Text textAlign="center">הירשם למערכת עם חשבון Google או דוא"ל</Text>
              </VStack>
              <VStack>
                <Text fontSize="4xl">2️⃣</Text>
                <Heading size="md">יצירת ציר</Heading>
                <Text textAlign="center">צור ציר זמן חדש עבור כיתה או נושא</Text>
              </VStack>
              <VStack>
                <Text fontSize="4xl">3️⃣</Text>
                <Heading size="md">הוספת חומרים</Heading>
                <Text textAlign="center">הוסף חומרי הוראה לציר הזמן</Text>
              </VStack>
              <VStack>
                <Text fontSize="4xl">4️⃣</Text>
                <Heading size="md">שיתוף</Heading>
                <Text textAlign="center">שתף את הציר עם מורים אחרים</Text>
              </VStack>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}

export default Home 