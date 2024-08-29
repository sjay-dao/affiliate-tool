import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import { REFERRAL_PAYOUT_PERCENTAGE } from '../constants';
import Label from './Label';
import RangeInput from './RangeInput';

const IncomeProjectionChart: React.FC = () => {

      const [referredCustomers, setReferredCustomers] = useState(1);
      const [newProjectsPerMonth, setNewProjectsPerMonth] = useState(5);
      const [existingProjectsPerMonth, setExistingProjectsPerMonth] = useState(0);
      const [chartData, setChartData] = useState([]);
      const [incomeAmount, setIncomeAmount] = useState(0);
    

      // Get month list starting from the current month
      const getMonthListFromCurrent = () => {
        const today = new Date();
        const currentMonth = today.getMonth();
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
    
        const monthsFromCurrent = [];
        for (let i = currentMonth; i < 12; i++) {
          monthsFromCurrent.push(monthNames[i]);
        }
        for (let i = 0; i < currentMonth; i++) {
          monthsFromCurrent.push(monthNames[i]);
        }
        monthsFromCurrent.push(monthNames[currentMonth]);
        return monthsFromCurrent;
      }; // ... (getMonthListFromCurrent function)
               
        // Calculation functions
        const computeIncome = (incomePerMonth: number[]) => {
            const incomeAfterOneYear = incomePerMonth[11];
            setIncomeAmount(incomeAfterOneYear);
        };

        const computeProjectAmount = () => {
            return newProjectsPerMonth * 95;
        };

        const computeExistingProjectAmount = (val: number) => {
            return parseFloat((val * 0.25).toFixed(2));
        };

        const computePerCustomerReferred = (val: number) => {
            return parseFloat((referredCustomers * (computeProjectAmount() + computeExistingProjectAmount(val))).toFixed(2));
        };

      useEffect(() => {
        // Calculate income per month based on input values
        const calculateIncomePerMonth = () => {
          let incomePerMonth = [];
          let tempAvgExistingProjects = existingProjectsPerMonth;
          let tempIncomePerMonth = computePerCustomerReferred(tempAvgExistingProjects) * REFERRAL_PAYOUT_PERCENTAGE;
          incomePerMonth.push(tempIncomePerMonth);
    
          for (let i = 1; i < 13; i++) {
            tempAvgExistingProjects += newProjectsPerMonth;
            tempIncomePerMonth = computePerCustomerReferred(tempAvgExistingProjects) * REFERRAL_PAYOUT_PERCENTAGE;
            incomePerMonth.push(incomePerMonth[i - 1] + tempIncomePerMonth);
          }
          return incomePerMonth;
        };
    
        // Update chart data and income amount whenever dependencies change
        const updateChartData = () => {
          const incomePerMonth = calculateIncomePerMonth();
          const newData = getMonthListFromCurrent().map((month, index) => ({
            name: month,
            value: incomePerMonth[index],
          }));
    
          setChartData(newData);
          computeIncome(incomePerMonth); 
        };
    
        updateChartData();
      }, [referredCustomers, newProjectsPerMonth, existingProjectsPerMonth]);
    
      
  return (
    <div className="container">
      <div className="flex justify-center"> 
        <Label
          text="Income Projection"
          fontSize="text-4xl"
          className="text-center font-bold mb-4"
        />
      </div>

      <div className="row">
        <div className="col-4">
          {/* ... (Your RangeInput components) */}
          <RangeInput
            label="Referred Customers per Month"
            min={1}
            max={5}
            value={referredCustomers} // Pass the current value
            onChange={setReferredCustomers} // Directly update the state
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
          <div className="container">
            <label className="text-muted small">Your Monthly income after 1 Year</label>
            <h3 id="incomeAmount">${incomeAmount.toFixed(2)}</h3> {/* Display the calculated income */}
          </div>
        </div>

        <div className="col-6">
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8">
                <LabelList dataKey="value" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default IncomeProjectionChart;