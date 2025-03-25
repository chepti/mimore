import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  useToast,
  useColorModeValue
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const CreateTimeline = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  const [formData, setFormData] = useState({
    title: '',
    gradeLevel: '',
    subject: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/timelines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('שגיאה ביצירת ציר הזמן');
      }

      const data = await response.json();
      
      toast({
        title: 'ציר הזמן נוצר בהצלחה',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate(`/timeline/${data.id}`);
    } catch (error) {
      toast({
        title: 'שגיאה',
        description: error instanceof Error ? error.message : 'שגיאה לא ידועה',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Box bg={bgColor} minH="100vh" py={20}>
      <Container maxW="container.md">
        <VStack
          as="form"
          onSubmit={handleSubmit}
          spacing={8}
          bg={cardBg}
          p={8}
          borderRadius="lg"
          boxShadow="md"
        >
          <Heading>יצירת ציר זמן חדש</Heading>

          <FormControl isRequired>
            <FormLabel>כותרת</FormLabel>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="הזן כותרת לציר הזמן"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>שכבת גיל</FormLabel>
            <Select
              name="gradeLevel"
              value={formData.gradeLevel}
              onChange={handleChange}
              placeholder="בחר שכבת גיל"
            >
              <option value="elementary">יסודי</option>
              <option value="middle">חטיבת ביניים</option>
              <option value="high">תיכון</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>מקצוע</FormLabel>
            <Select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="בחר מקצוע"
            >
              <option value="math">מתמטיקה</option>
              <option value="science">מדעים</option>
              <option value="english">אנגלית</option>
              <option value="hebrew">עברית</option>
              <option value="history">היסטוריה</option>
              <option value="geography">גאוגרפיה</option>
            </Select>
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            width="full"
          >
            צור ציר זמן
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default CreateTimeline; 