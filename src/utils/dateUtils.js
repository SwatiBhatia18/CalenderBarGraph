// Memoize date formatting for performance
const dateKeyCache = new Map();

export const formatDateToKey = (date) => {
  const timestamp = date.getTime();
  if (dateKeyCache.has(timestamp)) {
    return dateKeyCache.get(timestamp);
  }
  
  const result = date.toLocaleDateString('en-GB').replace(/\//g, '-');
  dateKeyCache.set(timestamp, result);
  return result;
};

export const formatDateDisplay = (date) => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const hasDataForDate = (date, calendarData) => {
  const dateKey = formatDateToKey(date);
  return calendarData.hasOwnProperty(dateKey);
};

export const getDataForDate = (date, calendarData) => {
  const dateKey = formatDateToKey(date);
  return calendarData[dateKey] || null;
};

// Pre-define color arrays for better performance
const CHART_COLORS = {
  background: [
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 99, 132, 0.6)',
    'rgba(255, 205, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)'
  ],
  border: [
    'rgba(54, 162, 235, 1)',
    'rgba(255, 99, 132, 1)',
    'rgba(255, 205, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
  ]
};

export const transformDataForChart = (dataArray) => {
  if (!dataArray || !Array.isArray(dataArray) || dataArray.length === 0) {
    return { labels: [], datasets: [] };
  }

  const labels = [];
  const values = [];

  // More efficient processing
  dataArray.forEach((item) => {
    const [key, value] = Object.entries(item)[0];
    labels.push(key.replace('_', ' ').toUpperCase());
    values.push(value);
  });

  return {
    labels,
    datasets: [
      {
        label: 'User Data',
        data: values,
        backgroundColor: CHART_COLORS.background.slice(0, values.length),
        borderColor: CHART_COLORS.border.slice(0, values.length),
        borderWidth: 2,
        borderRadius: 4,
        borderSkipped: false,
      }
    ]
  };
};
