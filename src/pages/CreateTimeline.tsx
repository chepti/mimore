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
  useColorModeValue,
  Wrap,
  WrapItem,
  Tag,
  TagLabel,
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

  const grades = [
    { value: '1', label: 'כיתה א׳' },
    { value: '2', label: 'כיתה ב׳' },
    { value: '3', label: 'כיתה ג׳' },
    { value: '4', label: 'כיתה ד׳' },
    { value: '5', label: 'כיתה ה׳' },
    { value: '6', label: 'כיתה ו׳' },
    { value: '7', label: 'כיתה ז׳' },
    { value: '8', label: 'כיתה ח׳' },
    { value: '9', label: 'כיתה ט׳' },
    { value: '10', label: 'כיתה י׳' },
    { value: '11', label: 'כיתה י״א' },
    { value: '12', label: 'כיתה י״ב' },
  ];

  const subjects = [
    { value: 'math', label: 'מתמטיקה' },
    { value: 'science', label: 'מדעים' },
    { value: 'english', label: 'אנגלית' },
    { value: 'hebrew', label: 'עברית' },
    { value: 'history', label: 'היסטוריה' },
    { value: 'geography', label: 'גאוגרפיה' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      console.log('Sending request to create timeline:', formData);
      const response = await fetch('/api/timelines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          structure: { nodes: [] },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'שגיאה ביצירת ציר הזמן');
      }

      const data = await response.json();
      console.log('Timeline created successfully:', data);
      
      toast({
        title: 'ציר הזמן נוצר בהצלחה',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate(`/timeline/${data.id}`);
    } catch (error) {
      console.error('Error creating timeline:', error);
      toast({
        title: 'שגיאה',
        description: error instanceof Error ? error.message : 'שגיאה לא ידועה',
        status: 'error',
        duration: 5000,
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

  const handleGradeSelect = (grade: string) => {
    setFormData(prev => ({
      ...prev,
      gradeLevel: grade === prev.gradeLevel ? '' : grade
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
            <Wrap spacing={2}>
              {grades.map((grade) => (
                <WrapItem key={grade.value}>
                  <Tag
                    size="lg"
                    borderRadius="full"
                    variant={formData.gradeLevel === grade.value ? 'solid' : 'outline'}
                    colorScheme={formData.gradeLevel === grade.value ? 'blue' : 'gray'}
                    cursor="pointer"
                    onClick={() => handleGradeSelect(grade.value)}
                  >
                    <TagLabel>{grade.label}</TagLabel>
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>מקצוע</FormLabel>
            <Select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="בחר מקצוע"
            >
              {subjects.map((subject) => (
                <option key={subject.value} value={subject.value}>
                  {subject.label}
                </option>
              ))}
            </Select>
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            width="full"
            isDisabled={!formData.title || !formData.gradeLevel || !formData.subject}
          >
            צור ציר זמן
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default CreateTimeline; 