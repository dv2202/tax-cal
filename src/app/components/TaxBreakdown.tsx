import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TaxResult } from '../types/taxResult'

type TaxBreakdownProps = {
  result: TaxResult;
};

export default function TaxBreakdown({result}:TaxBreakdownProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Item</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Gross Income</TableCell>
          <TableCell>${result.grossIncome.toFixed(2)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Total Deductions</TableCell>
          <TableCell>${result.totalDeductions.toFixed(2)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Adjusted Gross Income (AGI)</TableCell>
          <TableCell>${result.agi.toFixed(2)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Taxable Income</TableCell>
          <TableCell>${result.taxableIncome.toFixed(2)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Tax Based on Brackets</TableCell>
          <TableCell>${result.taxBasedOnBrackets.toFixed(2)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Total Tax Credits</TableCell>
          <TableCell>${result.totalTaxCredits.toFixed(2)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Additional Taxes</TableCell>
          <TableCell>${result.additionalTaxes.toFixed(2)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-bold">Final Tax Owed or Refund</TableCell>
          <TableCell className="font-bold">${result.finalTaxOrRefund.toFixed(2)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}