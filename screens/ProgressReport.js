import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, useWindowDimensions } from 'react-native';
import axios from 'axios';
import { PieChart } from 'react-native-svg-charts';
import { BarChart } from 'react-native-chart-kit';

const Legend = ({ data, colorPalette }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
      {data.map((item, index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
          <View style={{ width: 10, height: 10, backgroundColor: colorPalette[index % colorPalette.length], marginRight: 5 }} />
          <Text>{`${item.key} (${item.value})`}</Text>
        </View>
      ))}
    </View>
  );
};

const ProgressReport = ({ userid }) => {
  const [journals, setJournals] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const windowDimensions = useWindowDimensions();

  useEffect(() => {
    axios
      .get(`https://welltalk-mobile-production.up.railway.app/journal/${userid}`)
      .then((response) => {
        setJournals(response.data);
      })
      .catch((error) => {
        console.error('Error fetching journal data:', error);
      });
  }, [userid]);

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

  const colorPalette = ['#ECF4D6', '#9AD0C2', '#2D9596', '#265073', '#092635'];

  const moodData = Object.entries(extractMoodData()).map(([label, count], index) => ({
    key: label,
    value: count,
    svg: { fill: colorPalette[index % colorPalette.length] },
    arc: { outerRadius: '100%', padAngle: 0.1 },
  }));

  const dailyJournalCounts = journals.reduce((acc, journal) => {
    const date = journal.date;
    acc[date] = acc[date] ? acc[date] + 1 : 1;
    return acc;
  }, {});

  const journalCountData = Object.entries(dailyJournalCounts).map(([date, count]) => {
    const formattedDate = new Date(date).toLocaleString('default', { month: 'short', day: 'numeric' });
    return {
      date: formattedDate,
      count,
    };
  });

  const filteredJournalCountData = selectedMonth
    ? journalCountData.filter((data) => new Date(data.date).getMonth() === selectedMonth)
    : journalCountData;

  const barChartConfig = {
    backgroundGradientFrom: '#30d5c8',
    backgroundGradientTo: '#30d5c8',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForLabels: {
      fontSize: 12,
    },
    barPercentage: 1.5,
    barRadius: 0,
  };
  const extractJournalTypeData = () => {
    const journalTypeCounts = {
      Public: 0,
      Private: 0,
    };

    journals.forEach((journal) => {
      const journalType = journal.type;

      if (journalTypeCounts[journalType]) {
        journalTypeCounts[journalType] += 1;
      } else {
        // If the type is not found, assume it's Private
        journalTypeCounts[journalType] = 1;
      }
    });

    return journalTypeCounts;
  };
  const journalTypeData = Object.entries(extractJournalTypeData()).map(([type, count], index) => ({
    key: type,
    value: count,
    svg: { fill: colorPalette[index % colorPalette.length] },
  }));
  const horizontalBarChartConfigTypes = {
    backgroundGradientFrom: '#30d5c8',
    backgroundGradientTo: '#30d5c8',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForLabels: {
      fontSize: 12,
    },
  };

  return (
    <ScrollView>
     
      <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginVertical: 10, color: '#30d5c8' }}>
        Mood Distribution
      </Text>
      <PieChart style={{ height: 200 }} data={moodData} contentInset={{ top: 10, bottom: 10 }} />
      <Legend data={moodData} colorPalette={colorPalette} />

      <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginVertical: 10, color: '#30d5c8' }}>
        Journal Count
      </Text>

     

      <View style={{ alignItems: 'center', borderRadius: 30, overflow: 'hidden' }}>
        <View style={{ backgroundColor: '#30d5c8', borderRadius: 30, overflow: 'hidden' }}>
          <BarChart
            data={{
              labels: filteredJournalCountData.map((data) => data.date),
              datasets: [{ data: filteredJournalCountData.map((data) => data.count) }],
            }}
            width={windowDimensions.width - 20}
            height={220}
            chartConfig={barChartConfig}
          />
        </View>
      </View>
      <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginVertical: 10, color: '#30d5c8' }}>
        Journal Types
      </Text>
      <View style={{ alignItems: 'center', borderRadius: 30, overflow: 'hidden' }}>
        <View style={{ backgroundColor: '#30d5c8', borderRadius: 30, overflow: 'hidden' }}>
          <BarChart
            data={{
              labels: Object.keys(extractJournalTypeData()),
              datasets: [{ data: Object.values(extractJournalTypeData()) }],
            }}
            width={windowDimensions.width - 20}
            height={220}
            chartConfig={horizontalBarChartConfigTypes}
            horizontal
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ProgressReport;
