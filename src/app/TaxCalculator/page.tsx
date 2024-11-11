'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { calculateTax } from '../actions/calculateTax'
import TaxBreakdown from '../components/TaxBreakdown'
import { TaxResult } from '../types/taxResult'
import { DatePicker } from '../components/DatePicker'

type FormData = {
  filingStatus: 'single' | 'married_joint' | 'married_separate' | 'head_of_household'
  income: number | ''
  age: number | ''
  dependents: number | ''
  retirementContributions: number | ''
  hsaContributions: number | ''
  studentLoanInterest: number | ''
  deductionType: 'standard' | 'itemized'
  itemizedDeductions?: number | ''
  earnedIncomeCredit: number | ''
  childTaxCredit: number | ''
  educationCredits: number | ''
  selfEmploymentTax: number | ''
}

export default function TaxCalculator() {
  const [formData, setFormData] = useState<FormData>({
    filingStatus: 'single',
    income: '',
    age: '',
    dependents: '',
    retirementContributions: '',
    hsaContributions: '',
    studentLoanInterest: '',
    deductionType: 'standard',
    earnedIncomeCredit: '',
    childTaxCredit: '',
    educationCredits: '',
    selfEmploymentTax: '',
  })


  const [taxResult, setTaxResult] = useState<TaxResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === '' ? '' : Number(value)
    }));
  }


  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const result = await calculateTax(formData)
      setTaxResult(result)
    } catch (err) {
      console.error('Error calculating tax:', err)
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
      setTaxResult(null)
    }
  }

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle className='text-center'>Tax Information</CardTitle>
        <CardDescription className='text-center'>Enter your tax information to calculate your income tax.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-row gap-5">
            <div className='flex flex-col w-[50%] gap-3'>
              <Label htmlFor="filingStatus">Filing Status</Label>
              <Select name="filingStatus" value={formData.filingStatus} onValueChange={handleSelectChange('filingStatus')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select filing status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married_joint">Married Filing Jointly</SelectItem>
                  <SelectItem value="married_separate">Married Filing Separately</SelectItem>
                  <SelectItem value="head_of_household">Head of Household</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='flex flex-col w-[50%] gap-3 m-0'>
              <Label htmlFor="income">Annual Income</Label>
              <Input type="number" id="income" name="income" value={formData.income} onChange={handleInputChange} placeholder="Enter your annual income" />
            </div>
          </div>
          <div className="flex flex-row gap-5">
            <div className="flex flex-col gap-3 w-full">
              <Label htmlFor="age">Age</Label>
              <Input type="number" id="age" name="age" value={formData.age} onChange={handleInputChange} placeholder="Enter your age" />
              {/* <Label htmlFor="age">Date of Birth</Label>
            <DatePicker/> */}
            </div>
            <div className="flex flex-col gap-3 w-full">
              <Label htmlFor="dependents">Number of Dependents</Label>
              <Input type="number" id="dependents" name="dependents" value={formData.dependents} onChange={handleInputChange} placeholder="Enter number of dependents" />
            </div>
          </div>

          <div className="flex flex-row gap-5">
            <div className="flex flex-col gap-3 w-full">
              <Label htmlFor="retirementContributions">Retirement Contributions</Label>
              <Input type="number" id="retirementContributions" name="retirementContributions" value={formData.retirementContributions} onChange={handleInputChange} placeholder="Enter retirement contributions" />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <Label htmlFor="hsaContributions">HSA Contributions</Label>
              <Input type="number" id="hsaContributions" name="hsaContributions" value={formData.hsaContributions} onChange={handleInputChange} placeholder="Enter HSA contributions" />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <Label htmlFor="studentLoanInterest">Student Loan Interest Paid</Label>
              <Input type="number" id="studentLoanInterest" name="studentLoanInterest" value={formData.studentLoanInterest} onChange={handleInputChange} placeholder="Enter student loan interest paid" />
            </div>
          </div>

          <div className="flex flex-row w-full h-auto items-center  text-center gap-2">
            <Label>Deduction Type</Label>
            <RadioGroup name="deductionType" value={formData.deductionType} onValueChange={handleSelectChange('deductionType')} className='flex flex-row'>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard">Standard Deduction</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="itemized" id="itemized" />
                <Label htmlFor="itemized">Itemized Deduction</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.deductionType === 'itemized' && (
            <div className="flex flex-col gap-3 w-full">
              <Label htmlFor="itemizedDeductions">Itemized Deductions Total</Label>
              <Input type="number" id="itemizedDeductions" name="itemizedDeductions" value={formData.itemizedDeductions} onChange={handleInputChange} placeholder="Enter total itemized deductions" />
            </div>
          )}
          
          <div className='flex flex-row gap-5'>
            <div className="flex flex-col gap-3 w-full">
              <Label htmlFor="earnedIncomeCredit">Earned Income Credit</Label>
              <Input type="number" id="earnedIncomeCredit" name="earnedIncomeCredit" value={formData.earnedIncomeCredit} onChange={handleInputChange} placeholder="Enter earned income credit" />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <Label htmlFor="childTaxCredit">Child Tax Credit</Label>
              <Input type="number" id="childTaxCredit" name="childTaxCredit" value={formData.childTaxCredit} onChange={handleInputChange} placeholder="Enter child tax credit" />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <Label htmlFor="educationCredits">Education Credits</Label>
              <Input type="number" id="educationCredits" name="educationCredits" value={formData.educationCredits} onChange={handleInputChange} placeholder="Enter education credits" />
            </div>
          </div>


          <div className="space-y-2">
            <Label htmlFor="selfEmploymentTax">Self-Employment Tax</Label>
            <Input type="number" id="selfEmploymentTax" name="selfEmploymentTax" value={formData.selfEmploymentTax} onChange={handleInputChange} placeholder="Enter self-employment tax" />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full">Calculate Tax</Button>
      </CardFooter>
      {error && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
          <span className="font-medium">Error:</span> {error}
        </div>
      )}
      {taxResult && <TaxBreakdown result={taxResult} />}
    </Card>
  )
}