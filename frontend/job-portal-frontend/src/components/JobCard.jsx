
import { useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  CalendarDays,
  Eye,
  MapPin,
  
} from "lucide-react";
import {getTimeAgo} from '../components/Timer'

function JobCard({ job }) {
  const navigate = useNavigate();

  

  return (
    <div
      className="  p-2 border border-gray-200  flex justify-between items-center rounded-xl "
      key={job._id}
    >
      <div className="flex gap-4">
        <div className="border-2 border-gray-100 h-12 w-12 rounded-lg flex justify-center items-center ">
          <img className=" h-10 object-fill" src={job.company.logo} alt="" />
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-sm">{job.title}</h2>
          <div className="flex items-center gap-1">
            <BriefcaseBusiness
              size={10}
              className=" font-bold text-gray-400 "
            />
            <p className="text-xs text-gray-400 font-semibold">
              {job.company?.name}
            </p>

            <MapPin size={10} className="text-gray-400" />
            <p className="text-xs font-semibold text-gray-400">
              {job.location}
            </p>
          </div>
          <div className="flex gap-2">
            <p className="bg-blue-100 px-2 py-1 rounded-lg text-xs font-semibold text-blue-600">
              {job.jobType}
            </p>
            <p className="bg-green-100 py-1 px-2 rounded-lg text-xs font-semibold text-green-600">
              {job.workmode}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2"></div>
        <div className="flex gap-2">
          <CalendarDays size={20} className="text-indigo-500" />
          <p className="text-xs font-semibold text-gray-400">
            Posted {getTimeAgo(job.createdAt)}
          </p>
        </div>
        <div className="flex gap-2 items-center" >
<Eye
size={20} className="text-indigo-500" 
/>
 <button
          className=" cursor-pointer text-xs font-semibold py-2 px-2 rounded-lg
  bg-gradient-to-r from-indigo-400 to-violet-500
  text-white border border-indigo-300
  transition-all duration-300
  hover:bg-none hover:bg-white
  hover:text-black "

  onClick={()=>navigate(`/jobs/${job._id}`)}

        >
          View details
        </button>
        </div>
       
      </div>
    </div>
  );
}

export default JobCard;
