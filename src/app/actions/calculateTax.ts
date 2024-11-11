'use server'

import { z } from 'zod'

const TaxFormSchema = z.object({
  filingStatus: z.enum(['single', 'married_joint', 'married_separate', 'head_of_household']),
  income: z.string().transform(Number),
  age: z.string().transform(Number),
  dependents: z.string().transform(Number),
  retirementContributions: z.string().transform(Number),
  hsaContributions: z.string().transform(Number),
  studentLoanInterest: z.string().transform(Number),
  deductionType: z.enum(['standard', 'itemized']),
  itemizedDeductions: z.string().transform(Number).optional(),
  earnedIncomeCredit: z.string().transform(Number),
  childTaxCredit: z.string().transform(Number),
  educationCredits: z.string().transform(Number),
  selfEmploymentTax: z.string().transform(Number),
})

export async function calculateTax(formData: z.infer<typeof TaxFormSchema>) {
  try {
    const validatedData = TaxFormSchema.parse(formData)

    const grossIncome = validatedData.income
    const standardDeduction = getStandardDeduction(validatedData.filingStatus)
    const itemizedDeductions = validatedData.itemizedDeductions || 0
    const totalDeductions = validatedData.deductionType === 'standard' ? standardDeduction : itemizedDeductions

    const agi = grossIncome - validatedData.retirementContributions - validatedData.hsaContributions - validatedData.studentLoanInterest
    const taxableIncome = Math.max(0, agi - totalDeductions)

    const taxBasedOnBrackets = calculateTaxBasedOnBrackets(taxableIncome, validatedData.filingStatus)
    const totalTaxCredits = validatedData.earnedIncomeCredit + validatedData.childTaxCredit + validatedData.educationCredits
    const additionalTaxes = validatedData.selfEmploymentTax

    const finalTaxOrRefund = taxBasedOnBrackets - totalTaxCredits + additionalTaxes

    return {
      grossIncome,
      totalDeductions,
      agi,
      taxableIncome,
      taxBasedOnBrackets,
      totalTaxCredits,
      additionalTaxes,
      finalTaxOrRefund,
    }
  } catch (error) {
    console.error('Error in calculateTax:', error)
    if (error instanceof z.ZodError) {
      throw new Error(`Validation error: ${error.errors.map(e => e.message).join(', ')}`)
    }
    throw new Error('Failed to calculate tax. Please check your inputs and try again.')
  }
}

function getStandardDeduction(filingStatus: string): number {
  const deductions = {
    single: 13850,
    married_joint: 27700,
    married_separate: 13850,
    head_of_household: 20800,
  }
  return deductions[filingStatus as keyof typeof deductions]
}

function calculateTaxBasedOnBrackets(taxableIncome: number, filingStatus: string): number {
  const brackets = {
    single: [
      { min: 0, max: 11000, rate: 0.10 },
      { min: 11001, max: 44725, rate: 0.12 },
      { min: 44726, max: 95375, rate: 0.22 },
      { min: 95376, max: 182100, rate: 0.24 },
      { min: 182101, max: 231250, rate: 0.32 },
      { min: 231251, max: 578125, rate: 0.35 },
      { min: 578126, max: Infinity, rate: 0.37 },
    ],
    married_joint: [
      { min: 0, max: 22000, rate: 0.10 },
      { min: 22001, max: 89450, rate: 0.12 },
      { min: 89451, max: 190750, rate: 0.22 },
      { min: 190751, max: 364200, rate: 0.24 },
      { min: 364201, max: 462500, rate: 0.32 },
      { min: 462501, max: 693750, rate: 0.35 },
      { min: 693751, max: Infinity, rate: 0.37 },
    ],
    married_separate: [
      { min: 0, max: 11000, rate: 0.10 },
      { min: 11001, max: 44725, rate: 0.12 },
      { min: 44726, max: 95375, rate: 0.22 },
      { min: 95376, max: 182100, rate: 0.24 },
      { min: 182101, max: 231250, rate: 0.32 },
      { min: 231251, max: 346875, rate: 0.35 },
      { min: 346876, max: Infinity, rate: 0.37 },
    ],
    head_of_household: [
      { min: 0, max: 15700, rate: 0.10 },
      { min: 15701, max: 59850, rate: 0.12 },
      { min: 59851, max: 95350, rate: 0.22 },
      { min: 95351, max: 182100, rate: 0.24 },
      { min: 182101, max: 231250, rate: 0.32 },
      { min: 231251, max: 578100, rate: 0.35 },
      { min: 578101, max: Infinity, rate: 0.37 },
    ],
  }

  const applicableBrackets = brackets[filingStatus as keyof typeof brackets]
  let tax = 0
  let remainingIncome = taxableIncome

  for (const bracket of applicableBrackets) {
    if (remainingIncome > 0) {
      const taxableAmountInBracket = Math.min(remainingIncome, bracket.max - bracket.min)
      tax += taxableAmountInBracket * bracket.rate
      remainingIncome -= taxableAmountInBracket
    } else {
      break
    }
  }

  return tax
}