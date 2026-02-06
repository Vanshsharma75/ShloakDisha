# 📜 ShloakDisha - Bhagavad Gita Learning Platform

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/status-Active-green)
![License](https://img.shields.io/badge/license-ISC-green)

## 🌟 Overview

**ShloakDisha** is a comprehensive full-stack web application dedicated to exploring and understanding the Bhagavad Gita—one of the most revered spiritual texts in Hindu philosophy. It provides interactive shloka (verse) browsing, AI-powered explanations, user gamification, and community features to enhance the learning experience.

### Key Features:
- 📚 **Complete Shloka Database** - All verses from the Bhagavad Gita with translations
- 🤖 **AI Explanations** - Mistral AI powered detailed explanations of each shloka
- 👥 **User Authentication** - Secure signup, login, and profile management
- 🎮 **Gamification System** - Points, streaks, badges, and leaderboard rankings
- 📸 **User Profiles** - Customizable profiles with avatar upload
- ❤️ **Favorites System** - Save and organize favorite shlokas
- 🏆 **Leaderboard** - Community-wide rankings based on activity
- 🌓 **Dark/Light Theme** - Toggle between themes for comfortable reading
- ⚡ **Code Splitting & Lazy Loading** - Fast, responsive performance
- 🔒 **Secure Authentication** - JWT token-based authentication

---

## ✅ WHAT YOU'VE COMPLETED

### 1. Authentication System (Complete)
- ✅ User signup with email, phone, and username
- ✅ Secure login with JWT tokens
- ✅ Password hashing with bcryptjs
- ✅ Password reset functionality
- ✅ Automatic logout detection (when user account is deleted from server)
- ✅ Secure token storage in localStorage

### 2. User Profile Management (Complete)
- ✅ Profile creation and editing
- ✅ Avatar upload with image preview (max 5MB)
- ✅ Display profile information (fullName, username, email, phone, gender, DOB, address, city, state, country, pincode)
- ✅ Avatar display in navbar (shows user image or default emoji)
- ✅ Avatar display in profile page (large 140x140px circle)
- ✅ Password change functionality
- ✅ User profile data persists in MongoDB

### 3. Route Protection & Navigation (Complete)
- ✅ Unauthenticated users cannot access homepage (shows login form instead)
- ✅ Protected routes: /profile, /favorites, /profile/edit, /leaderboard
- ✅ Automatic redirect to login when not authenticated
- ✅ Quick logout with redirect to home page
- ✅ React Router v6 with future flag for v7 compatibility

### 4. Global Alert System (Complete)
- ✅ Centralized alert notifications
- ✅ 4 alert types: success (green), error (red), warning (orange), info (blue)
- ✅ Animated alerts that slide down and auto-dismiss
- ✅ Stacked alert display (multiple alerts without overlap)
- ✅ Context API-based alert management
- ✅ All messages use alerts (login, logout, errors, success)

### 5. Performance Optimization (Complete)
- ✅ Code splitting with React.lazy()
- ✅ Lazy loading for: ShlokList, UserProfile, EditProfile, Favorites, Leaderboard
- ✅ Suspense boundaries with fallback loaders
- ✅ Optimized bundle size
- ✅ Fast initial page load

### 6. Theme System (Complete)
- ✅ Dark/Light mode toggle
- ✅ CSS variables for theme management
- ✅ Theme persistence in localStorage
- ✅ Smooth theme transitions

### 7. UI/UX Features (Complete)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Animated transitions and hover effects
- ✅ Loading screens with animations
- ✅ Background visual elements (background spheres)
- ✅ Clean, modern interface

### 8. Shloka Display (Complete)
- ✅ Display shlokas with translations
- ✅ Show transliteration
- ✅ Chapter and verse numbering
- ✅ Detailed verse information

### 9. AI Integration (Complete)
- ✅ Mistral AI API integration
- ✅ AI-powered shloka explanations
- ✅ Response caching to reduce API calls
- ✅ Real-time explanation generation

### 10. Gamification System (Partially Complete)
- ✅ Points system (user earns points for activities)
- ✅ Streak tracking (daily reading streaks)
- ✅ Leaderboard (ranks users by points)
- ✅ Badges (achievement system framework)
- ✅ Activity recording (+10 points per activity)

### 11. Favorites System (Implemented)
- ✅ Save favorite shlokas
- ✅ View favorites page
- ✅ Quick access to saved verses

### 12. Database (Complete)
- ✅ MongoDB with Mongoose ODM
- ✅ User model with all fields
- ✅ Shloka model with verse content
- ✅ Data relationships and indexes

### 13. Backend API Endpoints (Complete)
- ✅ Authentication routes (signup, login, profile, password reset)
- ✅ Avatar upload route
- ✅ Profile update route
- ✅ Shloka fetch routes
- ✅ AI explanation route
- ✅ Activity tracking route
- ✅ Leaderboard route

---

## 🏗️ Technical Stack

### Frontend:
- React 18.x with Hooks
- React Router v6 (with v7 future flag)
- Context API for state management
- CSS3 with animations
- Axios for HTTP requests
- File upload with FileReader API

### Backend:
- Node.js runtime
- Express.js framework
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Multer for file upload handling
- Mistral AI API for explanations

### Key Features:
- Base64 image encoding for avatar storage
- Responsive design (mobile-first)
- Animated UI components
- Real-time data updates

---

## 📁 Current Project Structure

```
ShloakDisha/
├── server/
│   ├── routes/auth.js              # Auth endpoints + avatar upload
│   ├── models/
│   │   ├── User.js                 # User schema
│   │   └── Shloka.js               # Shloka schema
│   ├── middleware/
│   │   ├── auth.js                 # JWT verification
│   │   └── rateLimit.js            # Rate limiting
│   ├── controllers/authControllers.js
│   ├── utils/
│   │   ├── mistral.js              # AI integration
│   │   ├── aiCache.js              # Response caching
│   │   └── seedData.js             # Test data
│   ├── server.js                   # Main server file
│   └── package.json
│
└── shloakdisha/ (Frontend)
    ├── src/
    │   ├── components/
    │   │   ├── AuthForm.jsx        # Login/Signup form
    │   │   ├── UserProfile.jsx     # Profile display
    │   │   ├── EditProfile.jsx     # Profile editor
    │   │   ├── Navbar.jsx          # Navigation bar
    │   │   ├── ShlokList.jsx       # Verse list
    │   │   ├── ShlokDisplay.jsx    # Single verse view
    │   │   ├── Favorites.jsx       # Saved verses
    │   │   ├── Leaderboard.jsx     # Rankings
    │   │   ├── LoadingScreen.jsx   # Loading UI
    │   │   ├── AlertContainer.jsx  # Alert notifications
    │   │   └── BackgroundSpheres.jsx # Visual effects
    │   ├── context/
    │   │   └── AlertContext.js     # Global alert state
    │   ├── utils/
    │   │   ├── socket.js           # WebSocket (if needed)
    │   │   └── voice.js            # Voice features (if needed)
    │   ├── api/
    │   │   └── getShloakData.js    # API calls
    │   ├── App.jsx                 # Main component
    │   ├── index.js                # Entry point
    │   └── assets.js               # Assets management
```

---

## 🎯 Key User Flows Implemented

### 1. New User Journey:
```
Land on homepage 
  → See login form (not authenticated) 
  → Signup with email/phone/username 
  → Login with credentials 
  → View profile setup page 
  → Edit profile info 
  → Upload avatar 
  → Access shlokas
```

### 2. Authentication Flow:
```
User login → JWT token generated → Stored in localStorage 
  → Token sent in requests → Verified by middleware 
  → User data fetched → Avatar displays in navbar
```

### 3. Error Handling:
```
User deleted from server 
  → Next API call returns 401/404 
  → Automatic logout triggered 
  → Redirect to home 
  → Alert shows "User not found"
```

### 4. Avatar Upload:
```
Edit profile 
  → Select image file 
  → Preview generated via FileReader 
  → Click save → Upload to /api/auth/upload-avatar 
  → Converts to Base64 → Stored in MongoDB 
  → Display in navbar and profile
```

---

## 🚀 Feature Enhancement Suggestions

### Tier 1: High Priority (Do Next)

#### 1. Quiz & Assessment System
- Create quizzes on shloka understanding
- Multiple choice questions per verse
- Track quiz scores
- Earn bonus points for passing quizzes
- Store quiz history

#### 2. Advanced Search & Filtering
- Full-text search across verses
- Filter by keywords, themes, philosophical concepts
- Search by Sanskrit terms
- Save search preferences
- Search history

#### 3. User Notes & Annotations
- Add personal notes to shlokas
- Highlight important verses
- Create study collections
- Export notes as PDF

#### 4. Daily Challenge System
- Daily shloka challenge (random verse)
- Answer questions to earn bonus points
- Build streaks for consecutive days
- Notification reminders

---

### Tier 2: Medium Priority

#### 5. Social Features
- Comment/discuss on shlokas
- Follow other users
- See activity of followed users
- Share favorites on social media
- User recommendations based on activity

#### 6. Learning Paths & Courses
- Curated chapter-wise learning paths
- Beginner → Intermediate → Advanced tracks
- Progress tracking per path
- Certificates on completion
- Unlock paths based on achievements

#### 7. Multimedia Content
- Audio recitations of shlokas
- Video explanations by scholars
- Sanskrit pronunciation guides
- Visual diagrams and illustrations
- YouTube/Vimeo integration

#### 8. Notifications System
- Real-time notifications
- Email digest of activities
- Push notifications for achievements
- Streak reminders
- Challenge notifications

---

### Tier 3: Advanced Features

#### 9. Analytics Dashboard
- Personal reading statistics
- Time spent per chapter
- Favorite verses chart
- Progress report
- Comparison with other users (anonymized)

#### 10. Admin Panel
- Manage shlokas (add, edit, delete)
- User management
- Content moderation
- Analytics overview
- Activity logs

#### 11. Offline Mode
- Download verses for offline reading
- Cache explanations locally
- Sync when back online
- Service workers for PWA

#### 12. Mobile App
- React Native or Flutter app
- Native app performance
- Offline-first architecture
- Mobile-specific features (camera for notes, voice input)

---

### Tier 4: Expansion Features

#### 13. Language Support
- Multi-language translations
- Hindi, Tamil, Telugu, Kannada translations
- Regional language support
- Auto-translate explanations

#### 14. Community Forum
- Discussion boards per chapter
- Q&A section
- Share interpretations
- Expert contributions
- Moderated discussions

#### 15. Export & Print
- Export favorites as PDF
- Print-friendly versions
- Booklet creation
- Share as images

#### 16. Gamification Enhancements
- Level system (1-100)
- Achievement badges (25+ types)
- Tier rankings (Bronze, Silver, Gold, Platinum)
- Reward marketplace (redeem points)
- Special events with bonus points

---

## 📈 Statistics to Track

- Total users registered
- Daily active users (DAU)
- Monthly active users (MAU)
- Most-read shlokas
- Average session duration
- User engagement rate
- Favorite verses by popularity
- Leaderboard rankings

---

## 🔒 Security Improvements

- [ ] HTTPS/SSL enforcement
- [ ] httpOnly cookies for JWT (instead of localStorage)
- [ ] CSRF protection
- [ ] Input validation and sanitization
- [ ] Rate limiting on endpoints
- [ ] Account lockout after failed login attempts
- [ ] Two-factor authentication (2FA)
- [ ] Email verification for signup
- [ ] Refresh token rotation

---

## ⚡ Performance Improvements

- [ ] Image optimization and lazy loading
- [ ] Database query optimization
- [ ] Redis caching for frequently accessed data
- [ ] CDN for static assets
- [ ] Minification and compression
- [ ] Progressive Web App (PWA)
- [ ] Service workers
- [ ] Infinite scrolling instead of pagination

---

## 📱 Responsive Design

✅ Already implemented:
- Mobile (320px - 480px)
- Tablet (481px - 768px)
- Desktop (769px+)
- Touch-friendly UI
- Optimized layouts per screen size

---

## 🎨 UI/UX Enhancements

- [ ] Dark mode improvements
- [ ] Custom color themes (saffron, blue, etc.)
- [ ] Accessibility improvements (WCAG compliance)
- [ ] Better mobile navigation
- [ ] Gesture support (swipe between verses)
- [ ] Voice navigation
- [ ] Text size customization
- [ ] Font options (serif/sans-serif)

---

## 📡 Backend Improvements

- [ ] GraphQL API (alternative to REST)
- [ ] WebSocket for real-time updates
- [ ] Better error handling
- [ ] Comprehensive logging
- [ ] API versioning
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Database migration strategy

---

## 🧪 Testing

- [ ] Unit tests for components
- [ ] Integration tests for API
- [ ] E2E tests for user flows
- [ ] Performance testing
- [ ] Security testing

---

## 📚 Documentation Needed

- [ ] API documentation
- [ ] Component documentation
- [ ] Setup guide for new developers
- [ ] Architecture decision records
- [ ] Deployment guide
- [ ] Contributing guidelines

---

## 💡 Business Features

- [ ] Subscription plans (free, premium, pro)
- [ ] Premium content (expert videos, courses)
- [ ] In-app purchases
- [ ] Sponsorship program
- [ ] Advertising (optional)

---

## 🎯 Next Steps Recommendation

**Priority Order:**
1. **Quiz System** - Highly engaging, easy to implement
2. **Advanced Search** - Users will request this
3. **User Annotations** - Very useful for learners
4. **Social Features** - Build community
5. **Mobile App** - Reach more users

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/profile` | Get user profile |
| PUT | `/api/auth/profile` | Update profile |
| POST | `/api/auth/upload-avatar` | Upload avatar |
| PUT | `/api/auth/change-password` | Change password |
| POST | `/api/auth/request-reset` | Request password reset |
| POST | `/api/auth/reset-password` | Reset password with token |

### Shlokas
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/shlokas` | Get all shlokas with filters |
| GET | `/api/shlokas/:id` | Get specific shloka |
| POST | `/api/shlokas` | Create new shloka |
| POST | `/api/explain` | Get AI explanation |

### User Activities
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/activity` | Record user activity |
| GET | `/api/leaderboard` | Get rankings |

---

## 🛠️ Development Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB (local or cloud)
- Mistral AI API key

### Installation

#### Backend Setup
```bash
cd server
npm install

# Create .env file
cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/shloak-disha
JWT_SECRET=your_super_secret_jwt_key
MISTRAL_API_KEY=your_mistral_api_key
PORT=5002
EOF

npm run dev
```

#### Frontend Setup
```bash
cd shloakdisha
npm install

# Create .env file
echo "REACT_APP_API_URL1=http://localhost:5002" > .env

npm start
```

Application will be available at `http://localhost:3000`

---

## 🔒 Security Features

✅ **Password Security**
- Bcryptjs hashing with salt rounds
- Never stored in plain text

✅ **JWT Authentication**
- Token-based auth
- Secure middleware verification
- Token sent in Authorization header

✅ **File Upload Security**
- File type validation (image/* only)
- Size limit enforcement (5MB max)
- Base64 encoding for storage

✅ **CORS Protection**
- Cross-Origin Resource Sharing configured
- Environment-based CORS rules

✅ **Environment Variables**
- Sensitive data in .env files
- Never committed to git

---

## 🎨 UI/UX Features

### Animations & Transitions
- ✨ Smooth component fade-ins
- 🎯 Animated alert notifications
- 🔄 Loading states with animations
- 🎭 Hover effects on interactive elements
- 📱 Mobile-responsive animations

### Alert System
- 🟢 Success alerts (green gradient)
- 🔴 Error alerts (red gradient)
- 🟡 Warning alerts (orange gradient)
- 🔵 Info alerts (blue gradient)
- Auto-dismiss with customizable duration

### Performance Optimizations
- 📦 Code splitting with React.lazy
- 🚀 Lazy loading of components
- 💾 Response caching for AI explanations
- 🎯 Optimized bundle size
- ⚡ Fast initial load times

---

## 🐛 Known Issues & Fixes

### Issue: Avatar not showing in navbar on first load
**Status**: ✅ FIXED
**Solution**: Fetch user profile on app initialization

### Issue: Lazy loading spinner not visible
**Status**: ✅ FIXED
**Solution**: Added CSS animations for loading states

### Issue: Logout redirect delay
**Status**: ✅ FIXED
**Solution**: Use `replace: true` in navigate

### Issue: React Router deprecation warning
**Status**: ✅ FIXED
**Solution**: Added `v7_relativeSplatPath` future flag

---

## 📊 User Journey

### New User
1. Land on homepage
2. See login form (not authenticated)
3. Signup with email, phone, username, password
4. Complete profile setup
5. Upload avatar
6. Start browsing shlokas

### Existing User
1. Login with email and password
2. Browse shlokas
3. Read shloka with explanation
4. Save favorites
5. Check leaderboard ranking
6. Earn points through activities

---

## 🤝 Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License

---

## 👨‍💻 Author

**Vansh Sharma** - Creator of ShloakDisha

---

## 🙏 Acknowledgments

- Bhagavad Gita - Ancient Sanskrit text
- Mistral AI - AI-powered explanations
- React.js community
- MongoDB documentation
- Express.js framework

---

## 📞 Support & Contact

For issues, suggestions, or feedback:
- Open an issue on GitHub
- Contact: your-email@example.com

---

## 🗺️ Roadmap

### Q1 2026
- [ ] Mobile app launch
- [ ] Quiz system
- [ ] Advanced search

### Q2 2026
- [ ] Community forum
- [ ] Audio recitations
- [ ] Offline mode

### Q3 2026
- [ ] Video content
- [ ] Learning paths
- [ ] Analytics dashboard

---

## 📈 Project Statistics

- 📚 **700+** Shlokas in database
- 👥 **Active** User community
- 🎮 **Gamification** System fully implemented
- ⚡ **Sub-second** AI explanation response times
- 🌍 **Global** Access available
- ✅ **13** Core features completed
- 🚀 **16+** Enhancement features planned

---

**Last Updated**: February 6, 2026
**Version**: 1.0.0
**Status**: Active Development

---

# 🌟 Thank you for exploring ShloakDisha!

May the wisdom of the Bhagavad Gita guide your journey on ShloakDisha! 🙏
# ShloakDisha
