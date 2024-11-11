export type TaxResult = {
    grossIncome: number;
    totalDeductions: number;
    agi: number;
    taxableIncome: number;
    taxBasedOnBrackets: number;
    totalTaxCredits: number;
    additionalTaxes: number;
    finalTaxOrRefund: number;
  }
  