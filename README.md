# My40+ - Complete Claude Code Product Requirements Document

## App Name
My40+

## Mission
Create a premium iPhone application for a 40th birthday celebration that combines a digital invitation, RSVP management, life-story timeline, event management, AI assistant, guest engagement, and celebration memories.

---

# Core Experience

My40+ is a luxury purple-themed birthday app where guests can:
- View the invitation
- RSVP
- Explore the life journey of the birthday celebrant
- View event schedule and calendar
- Chat with an AI assistant
- Leave birthday wishes
- Upload event photos
- Check in via QR code
- Follow live event updates

---

# Feature 1: Invitation Home Screen

- Full-screen birthday invitation poster
- Elegant animations
- Event countdown timer
- Event details summary
- Quick action buttons
- Background music toggle
- Confetti animation

Quick Actions:
- RSVP Now
- View Timeline
- Event Calendar
- Ask AI Assistant
- Birthday Wishes

---

# Feature 2: RSVP Management

Fields:
- Name
- Email
- Phone Number
- Number of Guests
- Dietary Preferences
- Special Message
- Attendance Status

Admin Features:
- RSVP Dashboard
- Export CSV
- Attendance Analytics
- Guest Lookup

---

# Feature 3: Life Journey Timeline

Interactive year-by-year timeline.

Each Year Contains:
- Photos
- Videos
- Descriptions
- Milestones

Examples:
- Childhood
- School Years
- College
- Career
- Marriage
- Family Memories
- 40th Birthday Celebration

Features:
- Timeline Navigation
- Collage Layouts
- Full Screen Gallery
- Slideshow Mode
- Animated Transitions

---

# Feature 4: AI Event Assistant

Purpose:
Answer guest questions about the celebration.

Knowledge Sources:
- Event Details
- Venue Information
- FAQs
- Timeline Content
- Uploaded Documents

Capabilities:
- Event Questions
- Venue Questions
- Parking Information
- Schedule Information
- RSVP Help
- Multi-language Support

Rule:
Only answer using supplied event information.

Fallback:
'I could not find that information in the event details.'

Architecture:
- Claude API or Azure OpenAI
- RAG Pipeline
- Vector Database
- Conversation History

---

# Feature 5: Smart Event Calendar

Organizer Functions:
- Create Events
- Edit Schedule
- Configure Activities
- RSVP Deadlines
- Reminder Scheduling

Calendar Views:
- Month
- Week
- Day
- Agenda

Guest Functions:
- View Schedule
- Add to Apple Calendar
- Download ICS Invite
- Receive Reminders

Integrations:
- EventKit
- Apple Calendar
- Apple Maps

Notifications:
- 30 Days Before
- 7 Days Before
- 1 Day Before
- Event Day

---

# Feature 6: Personalized Invitations

Each Guest Receives:
- Unique Invitation Link
- Personalized Welcome Message
- RSVP Tracking

Options:
- SMS Sharing
- WhatsApp Sharing
- Email Sharing

---

# Feature 7: QR Code Event Check-In

Capabilities:
- Unique QR Code Per Guest
- Venue Check-In
- Guest Attendance Tracking
- Live Attendance Count

Admin View:
- Checked In Guests
- Pending Guests
- Arrival Time Analytics

---

# Feature 8: Birthday Wishes Wall

Guests Can:
- Leave Messages
- Upload Photos
- Record Video Wishes
- React To Messages

Display:
- Beautiful Purple Wall Layout
- Live Updates

---

# Feature 9: Guest Photo Booth Uploads

Guest Uploads:
- Photos
- Videos
- Group Pictures

Features:
- Live Shared Gallery
- Moderation Controls
- Automatic Albums

---

# Feature 10: Push Notifications

Types:
- RSVP Reminder
- Event Reminder
- Schedule Updates
- Check-In Reminder
- Thank You Message

---

# Feature 11: Live Event Mode

During Event:
- Live Agenda
- Current Activity
- Event Highlights
- Messages From Host
- Real-Time Updates

---

# Feature 12: Family Tree & Relationship Timeline

Interactive Family View:
- Parents
- Siblings
- Spouse
- Children
- Major Life Relationships

Features:
- Visual Family Tree
- Memory Connections

---

# Feature 13: AI Memory Highlights Video

Generate:
- Birthday Tribute Video
- Timeline-Based Story
- Auto Music Selection
- Highlight Moments

Export:
- MP4 Video
- Shareable Link

---

# Feature 14: Shareable Digital Invitation Card

Formats:
- Mobile Card
- Social Sharing Card
- Printable Version

Supported Platforms:
- WhatsApp
- Instagram
- Facebook
- Email

---

# Feature 15: Multi-Language Support

Languages:
- English
- Telugu

Future:
- Hindi
- Spanish

---

# Design System

Theme: Luxury Purple Elegance

Colors:
- Royal Purple #6A0DAD
- Deep Purple #4B0082
- Lavender #C8A2C8
- Soft Lilac #E6D7FF
- White #FFFFFF
- Gold Accent #D4AF37

Typography:
- Playfair Display
- SF Pro

UI Style:
- Modern
- Premium
- Glassmorphism
- Elegant Animations

---

# Navigation

Tabs:
1. Home
2. RSVP
3. Life Journey
4. Calendar
5. AI Assistant

Additional Menus:
- Birthday Wishes
- Gallery
- Family Tree
- Event Details

---

# Technical Stack

Frontend:
- SwiftUI
- iOS 18+
- MVVM

Backend:
- Firebase Authentication
- Firestore
- Storage
- Cloud Functions
- Analytics

AI:
- Claude API
- Azure OpenAI
- Pinecone / Azure AI Search

Media:
- Firebase Storage

Notifications:
- Firebase Cloud Messaging

---

# Admin Portal

Capabilities:
- Upload Invitation Poster
- Upload Photos
- Upload Videos
- Manage Timeline
- Manage Calendar
- Manage AI Knowledge Base
- QR Check-In Dashboard
- Manage Guest Wishes
- Export Reports

---

# Success Criteria

1. Guests RSVP within one minute.
2. Beautiful life story presentation.
3. Accurate AI assistant responses.
4. Seamless calendar experience.
5. Memorable premium birthday experience.
6. High guest engagement.
7. Easy content management for organizer.
