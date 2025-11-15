export const formatDateToKey = (date) => {
  return date.toLocaleDateString('en-GB').replace(/\//g, '-');
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

export const transformDataForChart = (dataArray) => {
  if (!dataArray || !Array.isArray(dataArray)) {
    return { labels: [], datasets: [] };
  }

  const labels = [];
  const values = [];
  const backgroundColors = [
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 99, 132, 0.6)',
    'rgba(255, 205, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)'
  ];
  
  const borderColors = [
    'rgba(54, 162, 235, 1)',
    'rgba(255, 99, 132, 1)',
    'rgba(255, 205, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
  ];

  dataArray.forEach((item, index) => {
    const key = Object.keys(item)[0];
    const value = Object.values(item)[0];
    labels.push(key.replace('_', ' ').toUpperCase());
    values.push(value);
  });

  return {
    labels,
    datasets: [
      {
        label: 'User Data',
        data: values,
        backgroundColor: backgroundColors.slice(0, values.length),
        borderColor: borderColors.slice(0, values.length),
        borderWidth: 2,
        borderRadius: 4,
        borderSkipped: false,
      }
    ]
  };
};
