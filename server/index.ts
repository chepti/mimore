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
  console.log('GET /api/timelines');
  try {
    const timelines = await prisma.timeline.findMany({
      include: {
        items: true,
        followers: true
      }
    });
    res.json(timelines);
  } catch (error) {
    console.error('Error fetching timelines:', error);
    res.status(500).json({ error: 'שגיאה בטעינת צירי הזמן' });
  }
});

app.post('/api/timelines', async (req, res) => {
  console.log('POST /api/timelines', req.body);
  try {
    const { title, gradeLevel, subject, structure } = req.body;
    
    const timeline = await prisma.timeline.create({
      data: {
        title,
        gradeLevel,
        subject,
        structure,
        userId: 'temp-user-id' // מזהה זמני
      }
    });
    
    console.log('Timeline created:', timeline);
    res.json(timeline);
  } catch (error) {
    console.error('Timeline creation error:', error);
    res.status(500).json({ error: 'שגיאה ביצירת ציר זמן' });
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
}); 