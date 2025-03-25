Project Requirements Document (PRD)
Overview
This document outlines the requirements for a system that allows teachers to upload, organize, and share teaching materials on a yearly timeline. The system will be accessible only to teachers and will provide visual timeline management with different zoom levels for organizing content effectively.
Core Features
1. User Authentication and Management
OAuth-based login with Google (future integration with the Ministry of Education system)


User roles: Teacher (initially only teachers have access)


Profile fields: Name, Email, Sector, Grade Levels, Subjects, Custom Tags


2. Timeline Management
Each teacher has multiple timelines, one per learning group


Timelines are structured by grade level and subject


Teachers can edit the timeline (extend, shorten, reorder topics)


3. Teaching Materials
Each teaching item is linked to a topic and date within the timeline


Teaching item properties: Title, Description, File/Link, Tags, Usage Explanation


Items can be in Draft or Published state


Items can receive Comments, Ratings, Views, and be reused by other teachers


Teachers can attach multiple resources to a single lesson


4. Collaboration and Sharing
Teachers can follow another teacher's timeline and receive suggested items


Teachers can copy, modify, and improve existing items while retaining credit to the original author


Items can be attached to the timeline as drafts for future use


5. Storage and Hosting
Files will be stored in the teacher's Google Drive when possible


PostgreSQL database hosted on Neon for structured data


Application hosting on Vercel


Option to use Hostinger for additional hosting needs


6. User Interaction
Visual representation of timelines with zoom levels:


General view → All topics across the year


Topic view → Focused on a single subject area


Unit view → A breakdown of related lessons


Lesson view → Individual lesson with multiple resources


Drag-and-drop interface for organizing materials


Teachers can comment and rate resources


Private messaging between teachers (low priority)


Technical Stack
Backend: Node.js + Express.js


Database: PostgreSQL (Neon)


Frontend: React.js


Authentication: OAuth (Google Login)


Storage: Google Drive API (for files), Vercel (for hosting)



Next Steps
Define Page Layouts and Structures


Document Application Flow


Specify App Functionalities in Detail 