import React from 'react'

const TaxBlog = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-4">Understanding U.S. Income Tax</h2>
      <p className="text-lg mb-6">
        U.S. income tax is calculated based on several factors, including your filing status, income, deductions, and credits.
        Below is an explanation of the fields you’ll encounter while using the income tax calculator.
      </p>

      <div className="space-y-6">
        <div>
          <h3 className="text-2xl  mb-2 font-semibold">1. Filing Status</h3>
          <p className="text-lg">
            Your filing status determines the tax rates and standard deduction amounts that apply to you. The options are:
            <ul className="list-disc ml-6">
              <li><strong>Single:</strong> If you are not married or are divorced.</li>
              <li><strong>Married Filing Jointly:</strong> If you are married and file a joint tax return with your spouse.</li>
              <li><strong>Married Filing Separately:</strong> If you are married but choose to file separately.</li>
              <li><strong>Head of Household:</strong> If you are unmarried and support a dependent.</li>
            </ul>
          </p>
        </div>

        <div>
          <h3 className="text-2xl  mb-2 font-semibold">2. Annual Income</h3>
          <p className="text-lg">
            This is the total income you earn throughout the year, including wages, salaries, tips, and other taxable income.
          </p>
        </div>

        <div>
          <h3 className="text-2xl  mb-2 font-semibold">3. Age</h3>
          <p className="text-lg">
            Your age can affect certain tax benefits, such as eligibility for the senior citizen deduction or credits.
          </p>
        </div>

        <div>
          <h3 className="text-2xl  mb-2 font-semibold">4. Number of Dependents</h3>
          <p className="text-lg">
            Dependents are individuals you support financially, such as children or relatives. Having dependents may qualify you for
            tax credits such as the Child Tax Credit.
          </p>
        </div>

        <div>
          <h3 className="text-2xl  mb-2 font-semibold">5. Retirement Contributions</h3>
          <p className="text-lg">
            Contributions to retirement accounts like 401(k) or IRA may reduce your taxable income, lowering your overall tax liability.
          </p>
        </div>

        <div>
          <h3 className="text-2xl  mb-2 font-semibold">6. HSA Contributions</h3>
          <p className="text-lg">
            Contributions to a Health Savings Account (HSA) can reduce your taxable income and can be used for qualified medical expenses.
          </p>
        </div>

        <div>
          <h3 className="text-2xl  mb-2 font-semibold">7. Student Loan Interest</h3>
          <p className="text-lg">
            Interest paid on student loans may be deductible, reducing your taxable income. There are income limits on this deduction.
          </p>
        </div>

        <div>
          <h3 className="text-2xl  mb-2 font-semibold">8. Deduction Type</h3>
          <p className="text-lg">
            You can either take the standard deduction or itemize deductions. The standard deduction is a fixed amount, while
            itemized deductions include specific expenses like mortgage interest or medical costs.
          </p>
        </div>

        <div>
          <h3 className="text-2xl  mb-2 font-semibold">9. Itemized Deductions</h3>
          <p className="text-lg">
            These deductions allow you to deduct specific expenses such as mortgage interest, medical expenses, and charitable donations,
            instead of taking the standard deduction.
          </p>
        </div>

        <div>
          <h3 className="text-2xl  mb-2 font-semibold">10. Earned Income Credit</h3>
          <p className="text-lg">
            This credit is for low to moderate-income workers, which can reduce the amount of taxes owed and potentially increase your refund.
          </p>
        </div>

        <div>
          <h3 className="text-2xl  mb-2 font-semibold">11. Child Tax Credit</h3>
          <p className="text-lg">
            You may be eligible for a tax credit for each qualifying child under the age of 17, reducing your tax liability.
          </p>
        </div>

        <div>
          <h3 className="text-2xl  mb-2 font-semibold">12. Education Credits</h3>
          <p className="text-lg">
            These credits can help offset the costs of higher education, including the American Opportunity Credit and the Lifetime Learning Credit.
          </p>
        </div>

        <div>
          <h3 className="text-2xl  mb-2 font-semibold">13. Self-Employment Tax</h3>
          <p className="text-lg">
            If you&apos;re self-employed, you must pay both the employee and employer portions of Social Security and Medicare taxes.
          </p>
        </div>
      </div>
    </section>
  )
}

export default TaxBlog
