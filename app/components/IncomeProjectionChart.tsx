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
    // ... (Your other state variables and logic)cls

    // Assuming your `income_per_month_data` looks like this (adjust as needed)
    const income_per_month_data = [
        { country: "January", value: 1000 },
        { country: "February", value: 1200 },
        // ... other months
    ];

    // Convert `income_per_month_data` to Recharts format
    const rechartsData = income_per_month_data.map(item => ({
        name: item.country, 
        value: item.value,
    }));

    return (
        
        <div className="container">
            <div className="flex justify-center"> {/* Center the label */}
                    <Label
                    text="Income Projection"
                    fontSize="text-4xl"
                    className="font-bold mb-4"
                    />
            </div>
        
            <div className="row">
                {/* <div className="col-4">
                <RangeInput
                    label="Referred Customers per Month"
                    min={1}
                    max={5}
                    defaultValue={referredCustomers}
                    onChange={handleReferredCustomersChange}
                />
                <RangeInput
                    label="Average New Projects Per Month"
                    min={5}
                    max={50}
                    defaultValue={newProjectsPerMonth}
                    onChange={handleNewProjectsChange}
                />
                <RangeInput
                    label="Avg Existing Projects Per Month"
                    min={0}
                    max={10000}
                    defaultValue={existingProjectsPerMonth}
                    onChange={handleExistingProjectsChange}
                />

                
                </div> */}

                <div className="col-8"> {/* Ensure the chart container has the correct class */}
                    <ResponsiveContainer width="100%" height={500}>
                    <BarChart data={rechartsData}>
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