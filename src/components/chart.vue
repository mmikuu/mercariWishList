<template>
  <v-container>
    <!-- Row to display image and wish list information side by side -->
    <v-row>
      <!-- Column for the image -->
      <v-col cols="12" md="6">
        <v-img
          src="https://kddi-h.assetsadobe3.com/is/image/content/dam/au-com/common/graph/app/iphone-14/iPhone_14_Blue_01.jpg?scl=1&qlt=90"
          alt="Chart Image"
          contain
          max-width="100%"
        ></v-img>
      </v-col>
      
      <!-- Column for wish list information -->
      <v-col cols="12" md="6" class="d-flex align-center">
        <div>
          <p>Matched Wishlist Count: {{ wishListCount }}</p>
          <p>Minimum Budget: {{ formatCurrency(minBudget) }}</p>
          <p>Maximum Budget: {{ formatCurrency(maxBudget) }}</p>
        </div>
      </v-col>
    </v-row>
    
    <!-- Chart component -->
    <div class="mt-4">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale } from 'chart.js';

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale
);

// Initial values
const wishListCount = ref(5); // Number of items in the wish list
const minBudget = ref("100"); // Minimum budget value
const maxBudget = ref("300"); // Maximum budget value

// Fetch data from API
const getData = async () => {
  const response = await fetch('http://localhost:8000/budget');
  return response.json();
};

// Update values after data is fetched
onMounted(async () => {
  const data = await getData();
  wishListCount.value = data["matched_wish_yours"]; // Number of items in the wish list
  minBudget.value = data["min"]; // Minimum budget value
  maxBudget.value = data["max"]; // Maximum budget value
});

// Function to format currency
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

// Define chart data and options
const chartData = {
  labels: ['202212', '202301', '202302', '202303', '202304', '202305', '202306', '202307', '202308', '202309', '202310', '202311', '202312', '202401', '202402', '202403', '202404', '202405', '202406', '202407', '202408'],
  datasets: [{
    label: 'iPhone 14 price',
    data: [1173.76, 1165.86, 1210.04, 1173.03, 1230.59, 1078.92, 1182.97, 1169.31, 1085.63, 990, 951.31, 898.17, 883.76, 898.51, 930.26, 873.51, 838.36, 801.09, 872.07, 808.78, 874.35],
    fill: true,
    borderColor: '#5356ee',
    tension: 0,
    pointHoverBackgroundColor: '#929cf6',
    pointHoverBorderColor: '#6b79f3',
    pointHoverBorderWidth: 1,
    pointHoverRadius: 4,
  }]
};

const chartOptions = {
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      displayColors: false
    }
  }
};
</script>

<style scoped>
/* Add any styles specific to the layout here */
canvas {
  width: 100% !important;
  height: auto !important;
}

.v-img {
  margin-bottom: 16px;
}

.mt-4 {
  margin-top: 16px;
}
</style>

