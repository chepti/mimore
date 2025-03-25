import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  useToast,
  useColorModeValue,
  Tag,
  TagLabel,
  TagCloseButton,
  HStack,
} from '@chakra-ui/react';

const CreateTimelineItem = () => {
  const { timelineId } = useParams<{ timelineId: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fileUrl: '',
    tags: [] as string[],
  });

  const [newTag, setNewTag] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`/api/timelines/${timelineId}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('שגיאה ביצירת הפריט');
      }

      toast({
        title: 'הפריט נוצר בהצלחה',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate(`/timeline/${timelineId}`);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
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
          <Heading>הוספת פריט חדש</Heading>

          <FormControl isRequired>
            <FormLabel>כותרת</FormLabel>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="הזן כותרת לפריט"
            />
          </FormControl>

          <FormControl>
            <FormLabel>תיאור</FormLabel>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="הזן תיאור לפריט"
              rows={4}
            />
          </FormControl>

          <FormControl>
            <FormLabel>קישור לקובץ</FormLabel>
            <Input
              name="fileUrl"
              value={formData.fileUrl}
              onChange={handleChange}
              placeholder="הזן קישור לקובץ"
            />
          </FormControl>

          <FormControl>
            <FormLabel>תגיות</FormLabel>
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={handleAddTag}
              placeholder="הזן תגית ולחץ Enter"
            />
            <HStack spacing={2} mt={2} flexWrap="wrap">
              {formData.tags.map((tag) => (
                <Tag key={tag} size="md" borderRadius="full" variant="solid" colorScheme="blue">
                  <TagLabel>{tag}</TagLabel>
                  <TagCloseButton onClick={() => handleRemoveTag(tag)} />
                </Tag>
              ))}
            </HStack>
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            width="full"
          >
            צור פריט
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default CreateTimelineItem; 