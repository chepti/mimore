# מבנה הפרויקט

```
mimore/
├── prisma/
│   └── schema.prisma
├── server/
│   └── index.ts
├── src/
│   ├── components/
│   │   └── Header.tsx
│   ├── pages/
│   │   ├── CreateTimeline.tsx
│   │   ├── CreateTimelineItem.tsx
│   │   ├── Explore.tsx
│   │   ├── Home.tsx
│   │   └── Timeline.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── theme.ts
├── .env
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tsconfig.json
└── vite.config.ts
```

## תיאור הקבצים

### קבצי הגדרות
- `.env` - משתני סביבה (לא נשמר ב-Git)
- `.env.example` - תבנית למשתני סביבה
- `.gitignore` - הגדרות קבצים להתעלם מ-Git
- `package.json` - הגדרות הפרויקט ותלויות
- `tsconfig.json` - הגדרות TypeScript
- `vite.config.ts` - הגדרות Vite

### קבצי שרת
- `prisma/schema.prisma` - סכמת בסיס הנתונים
- `server/index.ts` - שרת Express

### קבצי לקוח
- `src/components/` - רכיבים משותפים
- `src/pages/` - דפי האפליקציה
- `src/App.tsx` - רכיב האפליקציה הראשי
- `src/main.tsx` - נקודת הכניסה לאפליקציה
- `src/theme.ts` - הגדרות ערכת הנושא 