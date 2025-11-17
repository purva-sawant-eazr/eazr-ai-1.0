// "use client";
// import React from "react";

// type PolicyOption = {
//   title: string;
//   category: string;
//   product_name: string;
//   action: string;
//   policy_id: string;
//   insurance_type: string;
//   full_policy_data: {
//     id: number;
//     title: string;
//     productName: string;
//     category: string;
//     eligibility: string[];
//     coverage_details: string[];
//     features: string[];
//   };
// };

// type Props = {
//   options: Record<string, PolicyOption>;
//   onSelectPolicy: (policyId: string, policyData: PolicyOption) => void;
// };

// const PolicyOptions = ({ options, onSelectPolicy }: Props) => {
//   const optionsArray = Object.entries(options);

//   if (optionsArray.length === 0) {
//     return null;
//   }

//   return (
//     <div className="mt-4 space-y-3">
//       <div className="text-sm font-medium text-gray-700 mb-3">
//         Available Insurance Policies:
//       </div>

//       {optionsArray.map(([policyId, policy]) => (
//         <div
//           key={policyId}
//           className="group border border-gray-200 rounded-xl p-4 hover:border-[#028678] hover:shadow-md transition-all duration-200 cursor-pointer bg-white"
//           onClick={() => onSelectPolicy(policyId, policy)}
//         >
//           {/* Policy Header */}
//           <div className="flex items-start justify-between mb-3">
//             <div className="flex-1">
//               <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#028678] transition-colors">
//                 {policy.title}
//               </h3>
//               <p className="text-sm text-gray-600 mt-1">{policy.product_name}</p>
//             </div>
//             <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#028678]/10 text-[#028678]">
//               {policy.category}
//             </span>
//           </div>

//           {/* Policy Quick Info */}
//           <div className="space-y-2 mb-3">
//             {policy.full_policy_data?.coverage_details?.slice(0, 2).map((detail, idx) => (
//               <div key={idx} className="flex items-start text-sm text-gray-600">
//                 <svg
//                   className="w-4 h-4 text-[#028678] mr-2 flex-shrink-0 mt-0.5"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//                 <span>{detail}</span>
//               </div>
//             )) || (
//               <div className="text-sm text-gray-500 italic">
//                 Coverage details available on view
//               </div>
//             )}
//           </div>

//           {/* View Details Button */}
//           <div className="flex items-center justify-between pt-3 border-t border-gray-100">
//             <span className="text-sm text-gray-500">
//               {policy.full_policy_data?.features?.length || 0} features available
//             </span>
//             <button className="inline-flex items-center text-sm font-medium text-[#028678] group-hover:underline">
//               View Details
//               <svg
//                 className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 5l7 7-7 7"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PolicyOptions;
"use client";
import React from "react";

type PolicyOption = {
  title: string;
  category: string;
  product_name: string;
  action: string;
  policy_id: string;
  insurance_type: string;
  full_policy_data: {
    id: number;
    title: string;
    productName: string;
    category: string;
    eligibility: string[];
    coverage_details: string[];
    features: string[];
  };
};

type Props = {
  options: Record<string, PolicyOption>;
  onSelectPolicy: (policyId: string, policyData: PolicyOption) => void;
};

const PolicyOptions = ({ options, onSelectPolicy }: Props) => {
  const optionsArray = Object.entries(options);

  if (optionsArray.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 space-y-3 px-2 sm:px-0">
      <div className="text-sm font-medium text-gray-700 mb-3 sm:text-base">
        Available Insurance Policies:
      </div>

      {optionsArray.map(([policyId, policy]) => (
        <div
          key={policyId}
          className="group border border-gray-200 rounded-xl p-4 hover:border-[#028678] hover:shadow-md transition-all duration-200 cursor-pointer bg-white w-full sm:w-auto"
          onClick={() => onSelectPolicy(policyId, policy)}
        >
          {/* Policy Header */}
          <div className="flex items-start justify-between mb-3 gap-2 flex-wrap">
            <div className="flex-1 min-w-[60%]">
              <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#028678] transition-colors text-sm sm:text-base">
                {policy.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                {policy.product_name}
              </p>
            </div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium bg-[#028678]/10 text-[#028678] whitespace-nowrap">
              {policy.category}
            </span>
          </div>

          {/* Policy Quick Info */}
          <div className="space-y-2 mb-3">
            {policy.full_policy_data?.coverage_details?.slice(0, 2).map((detail, idx) => (
              <div key={idx} className="flex items-start text-xs sm:text-sm text-gray-600">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 text-[#028678] mr-2 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{detail}</span>
              </div>
            )) || (
              <div className="text-sm text-gray-500 italic">
                Coverage details available on view
              </div>
            )}
          </div>

          {/* View Details Button */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="text-xs sm:text-sm text-gray-500">
              {policy.full_policy_data?.features?.length || 0} features available
            </span>
            <button className="inline-flex items-center text-xs sm:text-sm font-medium text-[#028678] group-hover:underline">
              View Details
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PolicyOptions;