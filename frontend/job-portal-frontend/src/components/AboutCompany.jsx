
import { useSelector } from 'react-redux'
function AboutCompany() {
    const { selectedJob, loading:jobLoading, error:jobError } = useSelector(
    (state) => state.job)
  return (
    <div>
       <h1 className='font-bold opacity-90 ' >About Company</h1>
         <p className='text-sm '>{selectedJob.company.description}</p>
    </div>
  )
}

export default AboutCompany
