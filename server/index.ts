import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/api/timelines', async (req, res) => {
  console.log('GET /api/timelines - Request received');
  try {
    const timelines = await prisma.timeline.findMany({
      include: {
        items: true,
        followers: true
      }
    });
    console.log('GET /api/timelines - Success:', timelines.length, 'timelines found');
    res.json(timelines);
  } catch (error) {
    console.error('Error fetching timelines:', error);
    res.status(500).json({ error: 'שגיאה בטעינת צירי הזמן' });
  }
});

app.post('/api/timelines', async (req, res) => {
  console.log('POST /api/timelines - Request received:', req.body);
  
  // בדיקת תקינות הנתונים
  const { title, gradeLevel, subject } = req.body;
  if (!title || !gradeLevel || !subject) {
    console.log('POST /api/timelines - Validation failed:', { title, gradeLevel, subject });
    return res.status(400).json({ 
      error: 'חסרים פרטים נדרשים',
      details: {
        title: !title ? 'כותרת חסרה' : null,
        gradeLevel: !gradeLevel ? 'שכבת גיל חסרה' : null,
        subject: !subject ? 'מקצוע חסר' : null
      }
    });
  }

  try {
    const timeline = await prisma.timeline.create({
      data: {
        title,
        gradeLevel,
        subject,
        structure: { nodes: [] },
        userId: 'temp-user-id' // מזהה זמני
      }
    });
    
    console.log('POST /api/timelines - Success:', timeline);
    res.json(timeline);
  } catch (error) {
    console.error('Timeline creation error:', error);
    res.status(500).json({ 
      error: 'שגיאה ביצירת ציר זמן',
      details: error instanceof Error ? error.message : 'שגיאה לא ידועה'
    });
  }
});

app.get('/api/timelines/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const timeline = await prisma.timeline.findUnique({
      where: { id },
      include: {
        items: true,
        followers: true
      }
    });
    
    if (!timeline) {
      return res.status(404).json({ error: 'ציר הזמן לא נמצא' });
    }
    
    res.json(timeline);
  } catch (error) {
    console.error('Timeline fetch error:', error);
    res.status(500).json({ error: 'שגיאה בטעינת ציר הזמן' });
  }
});

app.post('/api/timelines/:timelineId/items', async (req, res) => {
  try {
    const { timelineId } = req.params;
    const { title, description, fileUrl, tags } = req.body;
    
    const item = await prisma.teachingItem.create({
      data: {
        title,
        description,
        fileUrl,
        tags,
        timelineId,
        status: 'published'
      }
    });
    
    res.json(item);
  } catch (error) {
    console.error('Item creation error:', error);
    res.status(500).json({ error: 'שגיאה ביצירת פריט' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`API available at http://localhost:${port}/api`);
  console.log('Waiting for requests...');
}); 