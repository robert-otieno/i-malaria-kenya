import malariaData from "../assets/structured_malaria_data.json";

const total_malaria_cases_per_year = () => {
  // Create a table to store the results
  const table = {};

  // Iterate over the data and calculate the total cases per county per year
  for (const county in malariaData) {
    table[county] = {};

    for (const year in malariaData[county]) {
      let totalCases = 0;

      for (const month in malariaData[county][year]) {
        totalCases += malariaData[county][year][month].confirmed_cases;
      }

      table[county][year] = totalCases;
    }
  }

  // Filter the last 5 years
  const currentYear = new Date().getFullYear();
  const lastFiveYears = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const filteredTable = {};

  for (const county in table) {
    filteredTable[county] = {};

    for (const year in table[county]) {
      if (lastFiveYears.includes(parseInt(year))) {
        filteredTable[county][year] = table[county][year];
      }
    }
  }

  // Print the table
  console.table(filteredTable);
};

export { total_malaria_cases_per_year };
