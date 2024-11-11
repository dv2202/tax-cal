import TaxCalculator from './TaxCalculator/page'
import TaxBlog from './components/TaxBlog'

export default function Home() {
  return (
    <div className="pb-[20px] w-full pt-[40px] bg-[#F7F8FA] flex justify-center flex-col items-center"> 
      <div className='flex flex-col justify-center items-center w-[815px]'>
        <h1 className="text-xl font-semibold text-center mb-4 text-[#4765DB] ">Tax Calculator</h1>
        <h2 className="text-3xl font-semibold text-center mb-4">Income Tax Calculator</h2>
        <p className='text-sm text-[#6a6c6d] text-center'>Our US Income Tax Calculator helps you estimate your federal income tax liability quickly and accurately. Whether you&apos;re planning for the upcoming tax season or just want to understand your tax situation better, we&apos;ve got you covered.</p>
      </div>
      <div className=' w-full mt-8'> 
        <TaxBlog />
      </div>
      <div className=' w-full mt-8'> 
        <TaxCalculator />
      </div>
      
      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>&copy; 2024 Devansh Vishwakarma. All rights reserved.</p>
      </footer>
    </div>
  )
}