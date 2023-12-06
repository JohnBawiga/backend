import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { ScrollView } from 'react-native-web';

const ProgressReport = ({ userid }) => {
  const [journals, setJournals] = useState([]);
  const [monthlyCounts, setMonthlyCounts] = useState({});
  const goal = 100;
  const barChartRef = useRef(null);
  const doughnutChartRef = useRef(null);
  const secondBarChartRef = useRef(null);

  useEffect(() => {
    axios.get(`https://wanted-sweater-production.up.railway.app/journal/${userid}`)
      .then((response) => {
        setJournals(response.data);
      })
      .catch((error) => {
        console.error('Error fetching journal data:', error);
      });
  }, [userid]);

  const extractMonthNameFromDate = (dateString) => {
    const dateParts = dateString.split('-');
    const month = dateParts[1];
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[parseInt(month, 10) - 1];
  };

  useEffect(() => {
    const counts = {};

    journals.forEach((journal) => {
      const month = extractMonthNameFromDate(journal.date);

      if (counts[month]) {
        counts[month] += 1;
      } else {
        counts[month] = 1;
      }
    });

    setMonthlyCounts(counts);
  }, [journals]);

  const extractMoodData = () => {
    const moodCounts = {};

    journals.forEach((journal) => {
      const mood = journal.mood;

      if (moodCounts[mood]) {
        moodCounts[mood] += 1;
      } else {
        moodCounts[mood] = 1;
      }
    });

    return moodCounts;
  };

  useEffect(() => {
    if (barChartRef.current) {
      barChartRef.current.destroy();
    }

    const ctx = document.getElementById('myChart')?.getContext('2d');
    const months = Object.keys(monthlyCounts);
    const counts = months.map((month) => monthlyCounts[month]);

    try {
      if (ctx) {
        barChartRef.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: months,
            datasets: [
              {
                label: 'No. of Journals',
                data: counts,
                backgroundColor: ['#FF8080', '#FFCF96', '#F6FDC3', '#CDFAD5', '#A6CF98'],
              },
            ],
          },
          options: {
            indexAxis: 'y',
            scales: {
              x: {
                beginAtZero: true,
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
            layout: {
              padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
              },
            },
          },
        });
      }
    } catch (error) {
      console.error('Error creating bar chart:', error);
    }
  }, [monthlyCounts]);

  useEffect(() => {
    if (doughnutChartRef.current) {
      doughnutChartRef.current.destroy();
    }

    const moodData = extractMoodData();
    const moodLabels = Object.keys(moodData);
    const moodCount = Object.values(moodData);
    const doughnutChartCanvas = document.getElementById('moodChart');

    if (doughnutChartCanvas) {
      const ctx = doughnutChartCanvas.getContext('2d');

      try {
        doughnutChartRef.current = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: moodLabels,
            datasets: [
              {
                data: moodCount,
                backgroundColor: ['#FF8080', '#FFCF96', '#F6FDC3', '#CDFAD5', '#A6CF98'],
              },
            ],
          },
        });
      } catch (error) {
        console.error('Error creating doughnut chart:', error);
      }
    } else {
      console.error('Canvas for moodChart not found.');
    }
  }, [journals]);

  useEffect(() => {
    if (secondBarChartRef.current) {
      secondBarChartRef.current.destroy();
    }

    const typeCounts = {};

    journals.forEach((journal) => {
      const type = journal.type;

      if (typeCounts[type]) {
        typeCounts[type] += 1;
      } else {
        typeCounts[type] = 1;
      }
    });

    const typeLabels = Object.keys(typeCounts);
    const typeData = Object.values(typeCounts);

    const typeChartCanvas = document.getElementById('secondBarChart');

    if (typeChartCanvas) {
      const ctx = typeChartCanvas.getContext('2d');

      try {
        secondBarChartRef.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: typeLabels,
            datasets: [
              {
                label: 'No. of Journals by Type',
                data: typeData,
                backgroundColor: ['#FF8080', '#FFCF96', '#F6FDC3', '#CDFAD5', '#A6CF98'],
              },
            ],
          },
          options: {
            indexAxis: 'x',
            scales: {
              x: {
                beginAtZero: true,
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
            layout: {
              padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
              },
            },
          },
        });
      } catch (error) {
        console.error('Error creating the second bar chart:', error);
      }
    } else {
      console.error('Canvas for the second bar chart not found.');
    }
  }, [journals]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.chartTitle}>Monthly Journal Counts</Text>
      <View>
        <canvas id="myChart" width="400" height="200"></canvas>
      </View>
      <Text style={styles.chartTitle}>Mood Distribution</Text>
      <View>
        <canvas id="moodChart" width="300" height="100"></canvas>
      </View>
      <Text style={styles.chartTitle}>Journal by Type</Text>
      <View>
        <canvas id="secondBarChart" width="400" height="200"></canvas>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#30d5c8',
  },
});

export default ProgressReport;
