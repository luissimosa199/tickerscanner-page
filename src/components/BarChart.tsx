"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Statistic, StatisticId } from "@/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: Statistic;
}

interface MostFrequentlyBoughtItem {
  name: string;
  total_quantity: string;
  total_spent: string;
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  // Type guard to ensure data is of the correct type
  const isMostFrequentlyBoughtItemData = (
    data: any
  ): data is MostFrequentlyBoughtItem[] => {
    return (
      Array.isArray(data) &&
      data.every(
        (item) =>
          typeof item.name === "string" &&
          typeof item.total_quantity === "string" &&
          typeof item.total_spent === "string"
      )
    );
  };

  let purchasedItemsData: MostFrequentlyBoughtItem[] = [];

  if (data.id === StatisticId.MOST_FREQUENTLY_BOUGHT_ITEM) {
    if (isMostFrequentlyBoughtItemData(data.data)) {
      purchasedItemsData = data.data;
    } else {
      console.error("Invalid data format for most frequently bought items");
    }
  } else {
    console.error("Invalid statistic ID");
  }

  const labels = purchasedItemsData.map((item) => item.name);
  const dataSet = purchasedItemsData.map((item) =>
    parseFloat(item.total_quantity)
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Most Purchased Items",
      },
    },
  };

  const getBackgroundColor = (value: number, min: number, max: number) => {
    const range = max - min;
    const ratio = (value - min) / range;

    if (ratio < 0.33) {
      return "rgba(255, 99, 132, 0.2)"; // Light red
    } else if (ratio < 0.67) {
      return "rgba(255, 99, 132, 0.5)"; // Medium red
    } else {
      return "rgba(255, 99, 132, 0.8)"; // Dark red
    }
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Quantity",
        data: dataSet,
        backgroundColor: dataSet.map((value) => {
          const min = Math.min(...dataSet);
          const max = Math.max(...dataSet);
          return getBackgroundColor(value, min, max);
        }),
      },
    ],
  };

  return (
    <Bar
      options={options}
      data={chartData}
    />
  );
};

export default BarChart;
