import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { closeModal } from '../../store/slices/calendarSlice';
import { formatDateDisplay, transformDataForChart } from '../../utils/dateUtils';
import './BarGraphModal.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarGraphModal = () => {
  const dispatch = useDispatch();
  const { showModal, selectedDate, selectedDateData } = useSelector((state) => state.calendar);

  const handleClose = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }, [handleClose]);

  const chartData = useMemo(() => 
    transformDataForChart(selectedDateData), 
    [selectedDateData]
  );

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold'
          },
          color: '#333'
        }
      },
      title: {
        display: true,
        text: selectedDateData 
          ? `User Data Analytics for ${formatDateDisplay(selectedDate)}`
          : `No Data Available for ${formatDateDisplay(selectedDate)}`,
        font: {
          size: 16,
          weight: 'bold'
        },
        color: '#333'
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y} units`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 12
          },
          color: '#666'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        ticks: {
          font: {
            size: 12
          },
          color: '#666'
        },
        grid: {
          display: false
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart'
    }
  }), [selectedDate, selectedDateData]);

  if (!showModal) return null;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">
            {selectedDateData ? '📊 Data Analytics' : '⚠️ No Data Found'}
          </h2>
          <button className="close-button" onClick={handleClose}>
            ×
          </button>
        </div>
        
        <div className="modal-body">
          <div className="date-info">
            <strong>Selected Date:</strong> {formatDateDisplay(selectedDate)}
          </div>
          
          {selectedDateData ? (
            <div className="chart-container">
              <Bar data={chartData} options={chartOptions} />
              <div className="data-summary">
                <h4>Data Summary:</h4>
                <div className="summary-grid">
                  {selectedDateData.map((item, index) => {
                    const key = Object.keys(item)[0];
                    const value = Object.values(item)[0];
                    return (
                      <div key={index} className="summary-item">
                        <span className="user-name">
                          {key.replace('_', ' ').toUpperCase()}
                        </span>
                        <span className="user-value">{value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="no-data-message">
              <div className="no-data-icon-container">
                <div className="no-data-icon">📅</div>
                <div className="warning-pulse"></div>
              </div>
              <h3>No data found for the selected date</h3>
              <p>There is no data available for <strong>{formatDateDisplay(selectedDate)}</strong>.</p>
              <p>Please select a highlighted date to view analytics.</p>
              <div className="suggestion-box">
                <span className="suggestion-icon">💡</span>
                <span>Tip: Look for dates with yellow background - they contain data!</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="modal-footer">
          <button className="action-button" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(BarGraphModal);
