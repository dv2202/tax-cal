import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TaxResult } from '../types/taxResult';

type TaxBreakdownProps = {
  result: TaxResult;
  showTaxBreakdown: boolean;
  onClose: () => void;
};

export default function TaxBreakdown({ result, showTaxBreakdown, onClose }: TaxBreakdownProps) {
  if (!showTaxBreakdown) return null;
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg text-center">
      <Table className='w-full table-auto'>
        <TableHeader>
          <TableRow className='text-center'>
            <TableHead className="w-[200px] text-sm font-semibold text-gray-600 text-center">Item</TableHead>
            <TableHead className="text-sm font-semibold text-gray-600 text-center">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="border-b">
            <TableCell className="py-3 px-4 text-gray-700">Gross Income</TableCell>
            <TableCell className="py-3 px-4 text-gray-700">${result.grossIncome.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow className="border-b">
            <TableCell className="py-3 px-4 text-gray-700">Total Deductions</TableCell>
            <TableCell className="py-3 px-4 text-gray-700">${result.totalDeductions.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow className="border-b">
            <TableCell className="py-3 px-4 text-gray-700">Adjusted Gross Income (AGI)</TableCell>
            <TableCell className="py-3 px-4 text-gray-700">${result.agi.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow className="border-b">
            <TableCell className="py-3 px-4 text-gray-700">Taxable Income</TableCell>
            <TableCell className="py-3 px-4 text-gray-700">${result.taxableIncome.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow className="border-b">
            <TableCell className="py-3 px-4 text-gray-700">Tax Based on Brackets</TableCell>
            <TableCell className="py-3 px-4 text-gray-700">${result.taxBasedOnBrackets.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow className="border-b">
            <TableCell className="py-3 px-4 text-gray-700">Total Tax Credits</TableCell>
            <TableCell className="py-3 px-4 text-gray-700">${result.totalTaxCredits.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow className="border-b">
            <TableCell className="py-3 px-4 text-gray-700">Additional Taxes</TableCell>
            <TableCell className="py-3 px-4 text-gray-700">${result.additionalTaxes.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow className="border-b">
            <TableCell className="py-3 px-4 text-gray-700 font-semibold">Final Tax Owed or Refund</TableCell>
            <TableCell className="py-3 px-4 text-gray-700 font-semibold">${result.finalTaxOrRefund.toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="w-full flex justify-center mt-6">
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}
