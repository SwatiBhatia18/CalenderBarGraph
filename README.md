# Calendar Analytics Dashboard

A modern React application that integrates React Big Calendar with interactive bar graph analytics for comprehensive date-wise data visualization and analysis.

## 🚀 Features

- **Interactive Calendar**: Built with React Big Calendar for seamless navigation
- **Date-wise Data Display**: View data organized by date, week, or month
- **Visual Highlighting**: Dates with data are highlighted for easy identification
- **Bar Graph Analytics**: Click on any date to view detailed bar graph representation
- **Redux State Management**: Efficient state management using Redux Toolkit
- **Responsive Design**: Works smoothly across all devices and operating systems
- **Smart Notifications**: Alert messages for dates without data
- **Sample Data**: Pre-loaded with dummy JSON data for demonstration

## 🛠️ Technologies Used

- **React 18** - Frontend framework
- **Redux Toolkit** - State management
- **React Big Calendar** - Calendar component
- **Chart.js & React-ChartJS-2** - Bar graph visualization
- **Moment.js** - Date manipulation and formatting
- **CSS3** - Modern styling and animations

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd calendar-analytics-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The application should load automatically

## 🎯 Usage

### Calendar Navigation
- Use the calendar navigation buttons to switch between month, week, and day views
- Navigate between different months using the arrow buttons
- Click on any date to view detailed analytics

### Data Visualization
- **Highlighted Dates**: Dates with available data are visually highlighted
- **Selected Date**: The currently selected date is prominently highlighted
- **Bar Graph Popup**: Click on highlighted dates to view detailed bar graph analytics
- **No Data Alert**: Dates without data show an informative alert message

### Sample Data Format
The application uses the following data structure:
```json
{
  "01-11-2025": [
    {"user_1": 1},
    {"user_2": 2},
    {"user_3": 3},
    {"user_4": 4}
  ],
  "02-11-2025": [
    {"user_1": 5},
    {"user_2": 3},
    {"user_3": 7},
    {"user_4": 2}
  ]
}
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Calendar/
│   │   ├── CalendarComponent.js
│   │   └── CalendarComponent.css
│   ├── BarGraph/
│   │   ├── BarGraphModal.js
│   │   └── BarGraphModal.css
│   └── Layout/
│       └── Header.js
├── store/
│   ├── store.js
│   └── slices/
│       └── calendarSlice.js
├── data/
│   └── sampleData.js
├── utils/
│   └── dateUtils.js
├── App.js
├── App.css
└── index.js
```

## 📊 Data Analytics Features

- **User-wise Data**: View individual user contributions for each date
- **Comparative Analysis**: Bar graphs show relative performance across users
- **Date Range Analysis**: Navigate through different time periods
- **Interactive Charts**: Hover effects and detailed tooltips

## 👨‍💻 Developer

**Calendar Analytics Dashboard** - A comprehensive solution for date-wise data visualization and analytics.

---
