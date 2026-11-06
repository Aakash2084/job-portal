import React from 'react'
import { useSelector } from 'react-redux'
function Requirements() {

      const { selectedJob, loading:jobLoading, error:jobError } = useSelector(
      (state) => state.job)

  return (
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
  )
}

export default Requirements
