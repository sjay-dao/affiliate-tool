import type { MetaFunction } from "@remix-run/node";
import IncomeProjectionChart from '../components/IncomeProjectionChart'; // Adjust the path if needed

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div>
      <IncomeProjectionChart /> 
    </div>
  );
}
