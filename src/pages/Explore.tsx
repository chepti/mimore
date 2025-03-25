import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Input,
  Select,
  VStack,
  HStack,
  Text,
  Badge,
  Button,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react';

interface Timeline {
  id: string;
  title: string;
  gradeLevel: string;
  subject: string;
  followers: { id: string }[];
}

const Explore = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  const [timelines, setTimelines] = useState<Timeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    gradeLevel: '',
    subject: '',
  });

  useEffect(() => {
    const fetchTimelines = async () => {
      try {
        const response = await fetch('/api/timelines');
        if (!response.ok) {
          throw new Error('שגיאה בטעינת צירי הזמן');
        }
        const data = await response.json();
        setTimelines(data);
      } catch (error) {
        console.error('Error fetching timelines:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimelines();
  }, []);

  const filteredTimelines = timelines.filter((timeline) => {
    const matchesSearch = timeline.title
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    const matchesGrade =
      !filters.gradeLevel || timeline.gradeLevel === filters.gradeLevel;
    const matchesSubject =
      !filters.subject || timeline.subject === filters.subject;
    return matchesSearch && matchesGrade && matchesSubject;
  });

  if (loading) {
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box bg={bgColor} minH="100vh" py={10}>
      <Container maxW="container.xl">
        <VStack spacing={8}>
          <Heading>גלה צירי זמן</Heading>

          <HStack spacing={4} width="full">
            <Input
              placeholder="חפש לפי כותרת..."
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
            />
            <Select
              placeholder="שכבת גיל"
              value={filters.gradeLevel}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, gradeLevel: e.target.value }))
              }
            >
              <option value="elementary">יסודי</option>
              <option value="middle">חטיבת ביניים</option>
              <option value="high">תיכון</option>
            </Select>
            <Select
              placeholder="מקצוע"
              value={filters.subject}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, subject: e.target.value }))
              }
            >
              <option value="math">מתמטיקה</option>
              <option value="science">מדעים</option>
              <option value="english">אנגלית</option>
              <option value="hebrew">עברית</option>
              <option value="history">היסטוריה</option>
              <option value="geography">גאוגרפיה</option>
            </Select>
          </HStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} width="full">
            {filteredTimelines.map((timeline) => (
              <Box
                key={timeline.id}
                bg={cardBg}
                p={6}
                borderRadius="lg"
                boxShadow="md"
                cursor="pointer"
                onClick={() => navigate(`/timeline/${timeline.id}`)}
                _hover={{ transform: 'translateY(-2px)', transition: '0.2s' }}
              >
                <VStack align="start" spacing={4}>
                  <Heading size="md">{timeline.title}</Heading>
                  <HStack spacing={2}>
                    <Badge colorScheme="blue">{timeline.gradeLevel}</Badge>
                    <Badge colorScheme="green">{timeline.subject}</Badge>
                  </HStack>
                  <Text>
                    {timeline.followers.length} עוקבים
                  </Text>
                  <Button
                    colorScheme="blue"
                    variant="outline"
                    size="sm"
                    width="full"
                  >
                    צפה בציר הזמן
                  </Button>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>

          {filteredTimelines.length === 0 && (
            <Text>לא נמצאו צירי זמן התואמים את החיפוש</Text>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default Explore; 