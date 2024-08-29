import { json, ActionFunction } from '@remix-run/node'; 

interface RequestData {
  referredCustomers: number;
  newProjectsPerMonth: number;
  existingProjectsPerMonth: number;
}

const REFERRAL_PAYOUT_PERCENTAGE = 0.2; // 20%
const CHURN_RATE = 2; // 2%

const computeProjectAmount = (newProjectsPerMonth: number): number => {
  return newProjectsPerMonth * 95;
};

const computeExistingProjectAmount = (val: number): number => {
  return parseFloat((val * 0.25).toFixed(2));
};

const computePerCustomerReferred = (
  referredCustomers: number,
  newProjectsPerMonth: number,
  existingProjects: number
): number => {
  return parseFloat(
    (
      referredCustomers *
      (computeProjectAmount(newProjectsPerMonth) + computeExistingProjectAmount(existingProjects))
    ).toFixed(2)
  );
};

const calculateIncomePerMonth = (
  referredCustomers: number,
  newProjectsPerMonth: number,
  existingProjectsPerMonth: number
): number[] => {
  let incomePerMonth: number[] = [];
  let tempAvgExistingProjects = existingProjectsPerMonth;

  let tempIncomePerMonth =
    computePerCustomerReferred(
      referredCustomers,
      newProjectsPerMonth,
      tempAvgExistingProjects
    ) * REFERRAL_PAYOUT_PERCENTAGE;
  incomePerMonth.push(tempIncomePerMonth);

  for (let i = 1; i < 13; i++) {
    tempAvgExistingProjects += newProjectsPerMonth;

    
    //this computation is for churn rate
    if(100 == referredCustomers * i) //if number of customers reach 100 during a month, a churn rate will apply, thus reducing customer 2, means reducing existing projects to 20
      tempAvgExistingProjects =- newProjectsPerMonth*CHURN_RATE;

    tempIncomePerMonth =
      computePerCustomerReferred(
        referredCustomers,
        newProjectsPerMonth,
        tempAvgExistingProjects
      ) * REFERRAL_PAYOUT_PERCENTAGE;
    incomePerMonth.push(incomePerMonth[i - 1] + tempIncomePerMonth);
  }
  return incomePerMonth;
};


const computeIncome = (incomePerMonth: number[]): number => {
  // Check if incomePerMonth has at least 12 elements
  return incomePerMonth.length >= 12 ? incomePerMonth[12] : 0; 
  
};

export const action: ActionFunction = async ({ request }) => {
  const data: RequestData = await request.json(); // Parse JSON data

  try {
    const incomePerMonth = calculateIncomePerMonth(
      data.referredCustomers,
      data.newProjectsPerMonth,
      data.existingProjectsPerMonth
    );

    const annualIncome =   computeIncome(incomePerMonth);
    console.log(annualIncome + " - Annual Income");
    

    return json({
      'Sample' : 'SJAY',
      'incomeAfterOneYear' : annualIncome,
      'incomePerMonth' : incomePerMonth,
    });

  } catch (error) {
   
    throw error; 
  }
};