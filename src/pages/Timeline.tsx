import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
  useToast,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react';

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  fileUrl?: string;
  tags: string[];
}

interface Timeline {
  id: string;
  title: string;
  gradeLevel: string;
  subject: string;
  items: TimelineItem[];
  followers: { id: string }[];
}

const Timeline = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  const [timeline, setTimeline] = useState<Timeline | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const response = await fetch(`/api/timelines/${id}`);
        if (!response.ok) {
          throw new Error('שגיאה בטעינת ציר הזמן');
        }
        const data = await response.json();
        setTimeline(data);
      } catch (error) {
        toast({
          title: 'שגיאה',
          description: error instanceof Error ? error.message : 'שגיאה לא ידועה',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, [id, toast]);

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

  if (!timeline) {
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text>ציר הזמן לא נמצא</Text>
      </Box>
    );
  }

  return (
    <Box bg={bgColor} minH="100vh" py={10}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Box bg={cardBg} p={8} borderRadius="lg" boxShadow="md">
            <VStack align="start" spacing={4}>
              <Heading size="xl">{timeline.title}</Heading>
              <HStack spacing={4}>
                <Badge colorScheme="blue">{timeline.gradeLevel}</Badge>
                <Badge colorScheme="green">{timeline.subject}</Badge>
                <Badge colorScheme="purple">
                  {timeline.followers.length} עוקבים
                </Badge>
              </HStack>
              <HStack spacing={4}>
                <Button colorScheme="blue">עקוב אחרי ציר הזמן</Button>
                <Button
                  colorScheme="green"
                  onClick={() => navigate(`/timeline/${id}/add-item`)}
                >
                  הוסף פריט חדש
                </Button>
              </HStack>
            </VStack>
          </Box>

          <VStack spacing={6} align="stretch">
            {timeline.items.map((item) => (
              <Box
                key={item.id}
                bg={cardBg}
                p={6}
                borderRadius="lg"
                boxShadow="md"
              >
                <VStack align="start" spacing={4}>
                  <Heading size="md">{item.title}</Heading>
                  <Text>{item.description}</Text>
                  {item.fileUrl && (
                    <Button
                      as="a"
                      href={item.fileUrl}
                      target="_blank"
                      colorScheme="blue"
                      variant="outline"
                    >
                      צפה בקובץ
                    </Button>
                  )}
                  <HStack spacing={2}>
                    {item.tags.map((tag) => (
                      <Badge key={tag} colorScheme="gray">
                        {tag}
                      </Badge>
                    ))}
                  </HStack>
                </VStack>
              </Box>
            ))}
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default Timeline; 