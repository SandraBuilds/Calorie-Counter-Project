
# 🌸 CalorieCare - Beautiful Calorie Tracking App

A modern, elegant calorie tracking application built with React, TypeScript, and Tailwind CSS. CalorieCare helps you monitor your daily nutrition, track your steps, and stay motivated with your health goals through a beautiful pastel-themed interface.

## ✨ Features

### 🔐 User Authentication
- **Sign Up**: Create an account with email and password
- **Login**: Secure login with form validation
- **BMI Calculator**: Complete health profile setup during registration
- **User Profile**: Personalized dashboard experience

### 📊 Calorie Tracking
- **Daily Goal Setting**: Customize your daily calorie targets
- **Meal Logging**: Add meals with names and calorie counts
- **Real-time Progress**: View consumed calories and remaining goals
- **Motivational Quotes**: Get inspired with cute quotes when adding meals
- **Meal Management**: Delete meals with confirmation toasts

### 🚶 Step Tracking
- **Daily Step Goals**: Set and track your step targets
- **Manual Entry**: Log your daily steps
- **Progress Visualization**: Beautiful progress bars and statistics

### 📈 Health Metrics
- **BMI Calculation**: Automatic BMI calculation based on height/weight
- **Activity Level Tracking**: Monitor your fitness activity level
- **Goal Management**: Adjust calorie and step goals anytime

### 📱 User Experience
- **Responsive Design**: Works perfectly on desktop and mobile
- **Beautiful UI**: Pastel pink and green color scheme with smooth animations
- **Tabbed Interface**: Organized sections for Today, History, Steps, and Goals
- **Toast Notifications**: Friendly feedback for all user actions

## 🎨 Design System

### Color Palette
- **Primary Pink**: `#f9c5d1` - Soft, calming pastel pink
- **Accent Green**: `#c5f9d5` - Fresh, energizing light green
- **Background**: Gradient from pink-light to green-light
- **Text**: Carefully chosen contrast ratios for accessibility

### Typography
- **Font**: Poppins from Google Fonts
- **Weights**: 300, 400, 500, 600, 700
- **Responsive sizing**: Scales beautifully across devices

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Hover effects and smooth transitions
- **Forms**: Clean inputs with proper validation states
- **Progress bars**: Animated and color-coded

## 🛠️ Tech Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Full type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Lucide React**: Beautiful, consistent icons
- **Sonner**: Elegant toast notifications

### UI Components
- **Radix UI**: Accessible, unstyled UI primitives
- **shadcn/ui**: Beautiful, customizable component library
- **Custom Components**: Purpose-built components for specific features

### Development Tools
- **Vite**: Lightning-fast build tool and dev server
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing and optimization

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd caloriecare
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to see the application

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── AuthForm.tsx    # Login/signup forms
│   ├── BMIForm.tsx     # BMI calculation form
│   ├── CalorieTracker.tsx  # Main dashboard component
│   ├── DashboardStats.tsx  # Statistics cards
│   ├── GoalSettings.tsx    # Goal management
│   ├── Header.tsx      # App header with navigation
│   ├── MealForm.tsx    # Add meal form
│   ├── MealList.tsx    # Display today's meals
│   ├── PreviousMeals.tsx   # Meal history
│   └── StepTracker.tsx # Step counting interface
├── pages/              # Page components
│   ├── Index.tsx       # Main app page
│   └── NotFound.tsx    # 404 page
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles and design system
```

## 🎯 Key Components

### CalorieTracker
The main dashboard component that orchestrates all functionality:
- Manages meal state and calculations
- Handles step tracking
- Provides tabbed interface for different features

### AuthForm
Handles user authentication:
- Login and signup modes
- Form validation
- BMI calculation integration

### DashboardStats
Beautiful statistics display:
- Daily calorie goals and progress
- Step tracking visualization
- Color-coded progress indicators

### MealForm & MealList
Meal management system:
- Add meals with validation
- Display meals with timestamps
- Delete functionality with confirmations
- Motivational quote generation

## 💡 Usage Tips

### Setting Up Your Profile
1. **Sign Up**: Create an account with your email
2. **Complete BMI Form**: Enter your height, weight, age, and activity level
3. **Set Goals**: Customize your daily calorie and step targets
4. **Start Tracking**: Begin logging your meals and steps

### Daily Workflow
1. **Check Dashboard**: Review your daily goals and progress
2. **Log Meals**: Add meals throughout the day
3. **Track Steps**: Update your step count
4. **Monitor Progress**: Watch your progress bars fill up
5. **Review History**: Check previous days' meals in the History tab

### Customization
- **Adjust Goals**: Use the Goals tab to modify calorie and step targets
- **Activity Level**: Update your activity level to recalculate recommendations
- **BMI Tracking**: Monitor your BMI changes over time

## 🔮 Future Enhancements

### Planned Features
- **Backend Integration**: Connect to a real database for data persistence
- **User Accounts**: Multi-user support with individual profiles
- **Nutrition Database**: Food database integration for easier meal logging
- **Charts & Analytics**: Detailed progress charts and trend analysis
- **Social Features**: Share progress with friends and family
- **Mobile App**: Native mobile application development

### Technical Improvements
- **Offline Support**: PWA capabilities for offline usage
- **Data Export**: Export data to CSV or PDF formats
- **Third-party Integrations**: Connect with fitness trackers and apps
- **Advanced Analytics**: Machine learning for personalized recommendations

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style and patterns
- Add TypeScript types for new features
- Test your changes thoroughly
- Update documentation as needed
- Keep components small and focused

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern health and wellness apps
- **Color Palette**: Carefully chosen for calming, motivational experience
- **Component Library**: Built on top of Radix UI and shadcn/ui
- **Icons**: Lucide React for consistent, beautiful iconography

## 📞 Support

If you encounter any issues or have questions:
1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Join our community discussions

---

**Made with 💖 for a healthier lifestyle**

*CalorieCare - Track your calories with care and style* 🌸
