import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
  LabelList,
} from "recharts";

import Label from "./Label";
import RangeInput from "./RangeInput";

//Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

// Define the shape of the chart data
interface ChartData {
  name: string;
  value: number;
}

const IncomeProjectionChart: React.FC = () => {
  const [referredCustomers, setReferredCustomers] = useState<number>(1);
  const [newProjectsPerMonth, setNewProjectsPerMonth] = useState<number>(5);
  const [existingProjectsPerMonth, setExistingProjectsPerMonth] =useState<number>(0);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [incomeAmount, setIncomeAmount] = useState<number>(0); // income after a year

    //for fontawesome
    const [isLoading, setIsLoading] = useState(false);

  // Get month list starting from the current month
const getMonthListFromCurrent = (): string[] => {
  const today = new Date();
  const currentMonth = today.getMonth();

      // Array of month names
      const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
      ];

      // Array to store the months starting from the current month
      const monthsFromCurrent: string[] = [];

      // Add months from the current month to the end of the year
      for (let i = currentMonth; i < 12; i++) {
          monthsFromCurrent.push(monthNames[i]);
      }

      // Add months from the beginning of the year up to (but not including) the current month
      for (let i = 0; i < currentMonth; i++) {
          monthsFromCurrent.push(monthNames[i]);
      }

      // Include the current month again at the end to complete the 12-month cycle
      monthsFromCurrent.push(monthNames[currentMonth]);

      return monthsFromCurrent;
};

  useEffect(() => {
    // Calculate income per month based on input values
    

    const fetchData = async () => {
        setIsLoading(true);
    
        try {
          const response = await fetch('/calculate-income', { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              referredCustomers,
              newProjectsPerMonth,
              existingProjectsPerMonth,
              incomeAmount
            }),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const data = await response.json();
          console.log(data);

          // Update chart data and income amount whenever dependencies change
        const updateChartData = () => {
            const incomePerMonth = data;
            const newData = getMonthListFromCurrent().map((month, index) => ({
              name: month.substring(0, 3),
              value: data.incomePerMonth[index],
            }));
  
        setChartData(newData);
        setIncomeAmount(data.incomeAfterOneYear); 
      };
  
      updateChartData();

        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false); 
        }
      };
    
      fetchData();

    
  }, [
    referredCustomers,
    newProjectsPerMonth,
    existingProjectsPerMonth,
  ]);

  return (
    <div className="container mx-auto p-4"> 
      <h1 className="text-3xl font-bold text-center mb-6">Calculate your Recurring Passive Income</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
        <div>
          <div className="bg-white p-4 rounded-lg shadow-md"> 
            <RangeInput
              label="Referred Customers per Month"
              min={1}
              max={5}
              value={referredCustomers}
              onChange={setReferredCustomers}
            />
            <RangeInput
              label="Average New Projects Per Month"
              min={5}
              max={50}
              value={newProjectsPerMonth}
              onChange={setNewProjectsPerMonth}
            />
            <RangeInput
              label="Avg Existing Projects Per Month"
              min={0}
              max={10000}
              value={existingProjectsPerMonth}
              onChange={setExistingProjectsPerMonth}
            />
          </div>

          <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
            <label className="text-gray-600 text-sm">Your Monthly income after 1 Year</label>
            <h3 id="incomeAmount" className="text-2xl font-semibold text-green-600">
              {isLoading || incomeAmount === undefined ? ( 
                <FontAwesomeIcon icon={faCircleNotch} spin />
              ) : (
                `$${incomeAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}`
              )}
            </h3>
          </div>
        </div>

        <div className="border rounded-lg shadow-md p-5"> 
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip/>
              <Legend />
              <Bar dataKey="value" fill="#8884d8">
              {/* Conditionally apply fill color based on index */}
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index === chartData.length - 1 ? '#afcc54' : '#cfd6df'} 
                />
              ))}
              <LabelList dataKey="value" position="top" formatter={(value: number) =>
                  `$${value.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}`
                } />
            </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default IncomeProjectionChart;