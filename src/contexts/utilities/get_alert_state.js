import malariaCases from "../../assets/structured_malaria_data.json";
import countiesData from "../../assets/counties.json";
// import malariaCasesPerYear from "../assets/total_malaria_cases_per_year_over_the_last_5_years.json";

// Step 1: Data Collection
// Step 2: Calculate the Moving average
//   Determine the desired length of the moving average window => 5 years
//   Calculate the moving average by taking the sum of malaria cases over the specified window and dividing it by the number of time periods in the window.

// const calculateSumOfConfirmedCases = (location) => {
//   const years = Object.keys(malariaCasesPerYear[location]);
//   let sum = 0;

//   // Loop through the years and add up the confirmed cases for the location @params
//   for (const year of years) {
//     sum += malariaCasesPerYear[location][year];
//   }

//   return sum;
// };

// const sumOfConfirmedCases = calculateSumOfConfirmedCases(location); // In the last 5 years

// const timePeriod = 5; // years
// const MEM = sumOfConfirmedCases / timePeriod;

// Step 3: Calculate threshold - 1.5 times the moving average
//   Threshold: a certain number of cases in a specific location within a certain timeframe must be surpassed.
//   The threshold for a malaria outbreak is 1.5 times the baseline over the previous three weeks.

//   The alert threshold is calculated by finding the third quartile of the number of cases per week over at least five years.

//   The action/epidemic threshold is calculated by finding the mean plus 1.5 standard deviations of the number of cases per week over at least five years.

// const actionThreshold = 1.5 * MEM;

const calculateAlertThreshold = (locationName) => {
  const locationData = malariaCases[locationName];

  //   console.log(locationData);
  const monthlyConfirmedCases = [];

  // Step 1: Extract the data for all years and calculate total confirmed cases for each month
  for (const year in locationData) {
    for (const month in locationData[year]) {
      const monthData = locationData[year][month];
      const confirmedCases = monthData.confirmed_cases;
      monthlyConfirmedCases.push(confirmedCases);
    }
  }

  // Step 2: Sort the monthly confirmed cases in ascending order
  monthlyConfirmedCases.sort((a, b) => a - b);

  // Step 3: Calculate the index of the third quartile (Q3)
  const n = monthlyConfirmedCases.length;

  const q3Index = Math.ceil((3 * n) / 4);

  // Step 4: Calculate the third quartile value
  const alertThreshold = monthlyConfirmedCases[q3Index - 1];

  return alertThreshold;
};

const calculateActionThreshold = (locationName) => {
  const locationData = malariaCases[locationName];
  const monthlyConfirmedCases = [];

  // Step 1: Extract the data for all years and calculate total confirmed cases for each month
  for (const year in locationData) {
    for (const month in locationData[year]) {
      const monthData = locationData[year][month];
      const confirmedCases = monthData.confirmed_cases;
      monthlyConfirmedCases.push(confirmedCases);
    }
  }

  // Step 2: Calculate the mean (average) of the monthly confirmed cases
  const sum = monthlyConfirmedCases.reduce((acc, val) => acc + val, 0);
  const mean = sum / monthlyConfirmedCases.length;

  // Step 3: Calculate the standard deviation of the monthly confirmed cases
  const squaredDifferences = monthlyConfirmedCases.map((val) => (val - mean) ** 2);
  const variance = squaredDifferences.reduce((acc, val) => acc + val, 0) / monthlyConfirmedCases.length;
  const standardDeviation = Math.sqrt(variance);

  // Step 4: Multiply the standard deviation by 1.5
  const actionThresholdDeviation = standardDeviation * 1.5;

  // Step 5: Add the result from step 4 to the mean to get the action threshold
  const actionThreshold = mean + actionThresholdDeviation;

  return actionThreshold;
};

// Step 4: Detect epidemic
//  Compare number of malaria cases with calculated threshold
//   Number of predicted malaria cases

const getTotalPopulation = (locationName) => {
  const location = countiesData.find((item) => item.name === locationName);
  if (location) {
    return location.population.total;
  } else {
    return null; // Location not found in the data array
  }
};

export const getAlertState = (malariaIncidence, location) => {
  const actionThreshold = calculateActionThreshold(location);
  const alertThreshold = calculateAlertThreshold(location);
  const populationAtRisk = getTotalPopulation(location);
  const numberOfPeopleAtRisk = (malariaIncidence * populationAtRisk) / 1000; // Malaria incidence rate per 1000

  let alertLevel = "safe";

  console.log(`People at risk: ${numberOfPeopleAtRisk}`);
  console.log(`Alert Threshold: ${alertThreshold}`);
  console.log(`Action Threshold: ${actionThreshold}`);

  if (numberOfPeopleAtRisk >= actionThreshold) {
    alertLevel = "endemic";
  } else if (numberOfPeopleAtRisk >= alertThreshold) {
    alertLevel = "alert";
  }

  switch (alertLevel) {
    case "safe":
      // Render notification for "safe" state
      return { msg: "No likelyhood of an outbreak", style: "alert-success" };

    case "alert":
      // Render notification for "alert" state
      return { msg: "Alert: Monitor the situation closely.", style: "alert-warning" };

    case "endemic":
      // Render notification for "endemic" state
      return { msg: "Endemic: Take necessary actions to control the outbreak.", style: "alert-error" };

    default:
      return null;
  }
};
