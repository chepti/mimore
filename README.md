# מימור - פלטפורמה לשיתוף צירי זמן לימודיים

מימור היא פלטפורמה המאפשרת למורים לשתף ולנהל צירי זמן לימודיים. המערכת מאפשרת יצירת צירי זמן מותאמים אישית, שיתוף חומרי לימוד, ולמידה הדדית בין מורים.

## תכונות עיקריות

- יצירת צירי זמן לימודיים מותאמים אישית
- שיתוף חומרי לימוד עם מורים אחרים
- חיפוש וסינון צירי זמן לפי שכבת גיל ומקצוע
- ממשק משתמש נוח ואינטואיטיבי
- תמיכה מלאה בעברית ובכיוון RTL

## טכנולוגיות

- **Frontend**: React, TypeScript, Chakra UI
- **Backend**: Node.js, Express
- **Database**: PostgreSQL, Prisma
- **Authentication**: NextAuth.js, Google OAuth

## התקנה

1. התקן את התלויות:
```bash
npm install
```

2. הגדר את משתני הסביבה:
העתק את קובץ `.env.example` ל-`.env` והגדר את המשתנים הבאים:
```
DATABASE_URL=
PORT=3000
NEXTAUTH_URL=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

3. הפעל את הפרויקט:
```bash
# הפעלת השרת
npm run server

# הפעלת הקליינט בסביבת פיתוח
npm run dev
```

## תרומה

נשמח לקבל תרומות לפרויקט! אנא צרו fork לפרויקט, בצעו את השינויים שלכם, ושלחו pull request.

## רישיון

MIT License 