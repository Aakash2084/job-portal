
import {  useSelector } from "react-redux";



function JobDescription() {

      const { selectedJob, loading:jobLoading, error:jobError } = useSelector(
    (state) => state.job
  );


  return (
    <div className='flex flex-col gap-5' >

      <div>
          <h1 className='font-bold opacity-90 ' >Job Description</h1>

        <p className='text-sm  ' >{selectedJob.description}</p>
      </div>

<div>
    <h3 className='font-bold opacity-90'>Requirements</h3>

<ul className='list-disc pl-5 space-y-1'>
  {selectedJob.requirements?.map((skill, index) => (
    <li
      className='text-sm '
      key={index}
    >
      {skill}
    </li>
  ))}
</ul>
</div>

<div>
     <h1 className='font-bold opacity-90 ' >About Company</h1>
         <p className='text-sm '>{selectedJob.company.description}</p>
</div>

    </div>
  )
}

export default JobDescription
