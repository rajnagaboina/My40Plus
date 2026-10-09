# My40+ Azure PWA - Complete Product Requirements Document

# My40+ - Complete Progressive Web App (PWA) Product Requirements Document

## App Name
My40+

## Mission

Create a premium Progressive Web App (PWA) for a 40th birthday celebration that combines a digital invitation, RSVP management, life-story timeline, AI-powered event assistant, guest engagement, and celebration memories.

The application should feel like a native mobile app while running directly from a web browser and supporting installation on iPhone, Android, iPad, and desktop devices.

---

# Project Documentation

This file is the product requirements document. For building and running the current
local implementation, see:

- [`TASKS.md`](./TASKS.md) — implementation task list and current phase status
- [`docs/SETUP.md`](./docs/SETUP.md) — local setup, commands, and configuration
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — architecture decisions and data contracts
- [`docs/OPERATIONS.md`](./docs/OPERATIONS.md) — privacy/security posture and operating procedures

---

# Why PWA

My40+ is designed as a Progressive Web App instead of a native iPhone application.

Benefits:

- No App Store approval required
- No Mac or Xcode required
- Works on iPhone, Android, iPad, and Desktop
- Installable from browser
- Shareable via URL
- Faster updates
- Lower development cost
- Easier guest access

---

# Core Experience

Guests can:

- View invitation
- RSVP
- Explore life journey timeline
- View event calendar
- Chat with AI assistant
- Leave birthday wishes
- Upload celebration photos
- Upload celebration videos
- Check in with QR code
- Follow live event schedule
- Access family tree
- Share memories

---

# Feature 1: Invitation Home Screen

## Components

- Full-screen invitation poster
- Purple luxury theme
- Smooth animations
- Event countdown
- Event details summary
- Background music toggle
- Confetti effect
- Birthday welcome animation

## Quick Actions

- RSVP Now
- Life Journey
- Event Calendar
- Ask Assistant
- Birthday Wishes

---

# Feature 2: RSVP Management

## Guest Information

- Full Name
- Email
- Phone Number
- Number of Guests
- Dietary Preferences
- Special Message
- Attendance Status

### Attendance Options

- Attending
- Maybe
- Not Attending

## Admin Features

- RSVP Dashboard
- Attendance Summary
- Export CSV
- Guest Search
- RSVP Analytics

---

# Feature 3: Life Journey Timeline

## Interactive Timeline

Year-by-Year experience showing:

- Photos
- Videos
- Descriptions
- Stories
- Milestones

## Timeline Examples

1986 - Birth

1995 - School Life

2004 - Graduation

2015 - Marriage

2026 - My40+ Celebration

## Features

- Memory Cards
- Photo Collages
- Video Playback
- Full Screen Gallery
- Slideshow Mode
- Timeline Navigation
- Animated Transitions

---

# Feature 4: AI Event Assistant

## Purpose

Answer guest questions using supplied event information only.

## Knowledge Sources

- Event Details
- Venue Information
- FAQs
- Timeline Stories
- Uploaded Documents
- Guest Instructions

## Example Questions

- What time does the event start?
- Where should I park?
- What is the dress code?
- How can I RSVP?
- What activities are planned?

## AI Architecture

### RAG System

- Claude API
- Azure OpenAI (optional)
- Pinecone or Azure AI Search
- Vector Database
- Conversation History

## Fallback Response

"I could not find that information in the event details."

---

# Feature 5: Smart Event Calendar

## Organizer Features

- Create Events
- Manage Activities
- Configure Schedule
- Set RSVP Deadlines
- Create Reminders

## Guest Features

- View Schedule
- Add To Calendar
- Download ICS File
- Receive Event Reminders
- Venue Directions

## Calendar Views

- Month
- Week
- Day
- Agenda

---

# Feature 6: Personalized Invitations

Each guest receives:

- Unique Invitation Link
- Personalized Welcome Message
- RSVP Tracking Link

Sharing Methods:

- SMS
- WhatsApp
- Email
- QR Code Link

---

# Feature 7: QR Code Event Check-In

## Features

- Unique QR Code Per Guest
- Mobile Check-In
- Live Attendance Tracking
- Check-In Dashboard
- Arrival Time Analytics

---

# Feature 8: Birthday Wishes Wall

Guests can:

- Leave Messages
- Post Photos
- Upload Videos
- React To Wishes

Display:

- Purple Luxury Wall Design
- Real-Time Updates

---

# Feature 9: Guest Photo & Video Uploads

## Upload Support

Photos

- JPG
- PNG
- HEIC

Videos

- MP4
- MOV

## Features

- Shared Gallery
- Album Creation
- Moderation Workflow
- Download Memories

---

# Feature 10: Push Notifications

## Reminder Types

- RSVP Reminder
- Event Reminder
- Schedule Change
- Check-In Reminder
- Thank You Message

## PWA Push Support

- Browser Push Notifications
- Mobile Push Notifications

---

# Feature 11: Live Event Mode

During Celebration:

- Live Agenda
- Current Activity
- Event Updates
- Host Messages
- Real-Time Announcements

---

# Feature 12: Family Tree & Relationship Timeline

## Display

- Parents
- Siblings
- Spouse
- Children
- Key Life Relationships

## Features

- Interactive Tree
- Family Connections
- Memory Links

---

# Feature 13: AI Memory Highlights Video

Generate tribute videos using:

- Timeline Photos
- Videos
- Stories
- Music

Output Formats

- MP4
- Shareable Link

---

# Feature 14: Shareable Digital Invitation Card

## Versions

- Mobile Card
- Social Media Card
- Printable Card

## Sharing Platforms

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

# PWA Installation

## iPhone

1. Open website in Safari
2. Tap Share
3. Tap Add to Home Screen
4. Launch like an app

## Android

1. Open website
2. Tap Install App
3. Launch from home screen

---

# Design System

## Theme

Luxury Purple Elegance

## Colors

Royal Purple #6A0DAD

Deep Purple #4B0082

Lavender #C8A2C8

Soft Lilac #E6D7FF

White #FFFFFF

Gold Accent #D4AF37

## Typography

Headings

- Playfair Display

Body

- Inter
- Poppins

## UI Style

- Premium
- Modern
- Elegant
- Glassmorphism
- Responsive Design

---

# Navigation

## Main Navigation

- Home
- RSVP
- Timeline
- Calendar
- AI Assistant

## Secondary Navigation

- Wishes
- Gallery
- Family Tree
- Event Details

---



---

# Admin Portal

## Content Management

- Upload Invitation Poster
- Upload Photos
- Upload Videos
- Manage Timeline
- Manage Calendar
- Manage Family Tree
- Manage AI Knowledge Base

## Analytics

- Invitation Views
- RSVP Count
- Calendar Adds
- AI Usage
- Media Uploads
- Guest Activity

---

# Security

- Google Authentication
- Email Authentication
- Encrypted Storage
- Secure Media Access
- Admin Role Controls

---

# Success Criteria

- Guests RSVP in under one minute
- Timeline is visually engaging
- AI answers event questions accurately
- Calendar integration works seamlessly
- Guests install the PWA easily
- High guest engagement
- Excellent mobile experience
- Easy event management for organizer

# Azure Cloud Architecture

## Frontend

Azure Static Web Apps

Technology:
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion

Capabilities:
- Global CDN
- SSL
- Custom Domain
- Automatic Deployments

---

## Backend

Azure Functions

Services:
- RSVP APIs
- Calendar APIs
- QR Generation
- Notification Services
- Guest Management
- Media Processing

---

## Database

Azure Cosmos DB

Collections:
- Guests
- RSVPs
- Events
- Timeline
- Wishes
- Family Tree
- Chat History

---

## Media Storage

Azure Blob Storage

Containers:
- Posters
- Photos
- Videos
- TimelineAssets
- GuestUploads
- GeneratedVideos

---

## AI Platform

Azure OpenAI

Models:
- Chat Model for Event Assistant
- Content Generation
- Timeline Summaries

---

## RAG Knowledge System

Azure AI Search

Indexed Content:
- Event Information
- FAQs
- Venue Details
- Timeline Content
- Celebration Details

Capabilities:
- Semantic Search
- Context-Aware Answers

---

## Notifications

Azure Communication Services

Channels:
- Email
- SMS

Scenarios:
- Invitations
- RSVP Confirmation
- Reminder Messages

---

## Authentication

Microsoft Entra External ID

Options:
- Email Login
- Google Login
- Admin Access Control

---

# PWA Features

- Install To Home Screen
- Offline Support
- Service Worker
- Push Notifications
- Mobile Friendly
- Responsive Design

---

# Admin Portal

Capabilities:
- Upload Invitation Posters
- Upload Photos
- Upload Videos
- Manage Timeline
- Manage Event Calendar
- Manage Family Tree
- Configure AI Knowledge Base
- Manage RSVPs
- Export Reports
- View Analytics

---

# Analytics Dashboard

Track:
- Invitation Views
- RSVP Submissions
- Calendar Adds
- AI Assistant Usage
- Media Uploads
- Wish Wall Activity
- Guest Engagement

---

# Design System

Theme:
Luxury Purple Elegance

Colors:
- Royal Purple #6A0DAD
- Deep Purple #4B0082
- Lavender #C8A2C8
- Soft Lilac #E6D7FF
- White #FFFFFF
- Gold Accent #D4AF37

Typography:
- Playfair Display
- Inter

UI Style:
- Premium
- Modern
- Glassmorphism
- Elegant Animations

---

# Deployment

URL Example:

https://my40plus.com

Hosted On:
- Azure Static Web Apps

CI/CD:
- GitHub Actions
- Azure Deployment Pipelines

---

# Success Criteria

- Guests RSVP in under 1 minute
- Timeline experience is engaging
- AI assistant answers accurately
- Guests can install app easily
- Event engagement remains high
- Organizer can manage everything from Azure portal
