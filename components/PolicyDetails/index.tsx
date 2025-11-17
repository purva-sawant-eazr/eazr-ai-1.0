// "use client";
// import React, { useState } from "react";

// type ActionButton = {
//   title: string;
//   action: string;
//   policy_id?: string;
// };

// type PolicyDetailsProps = {
//   title: string;
//   productName: string;
//   category: string;
//   eligibility?: string[];
//   coverage_details?: string[];
//   features?: string[];
//   next_action?: ActionButton | null;
//   back_action?: ActionButton | null;
//   onActionClick?: (action: string, policyId?: string, title?: string) => void;
// };

// const PolicyDetails = ({
//   title,
//   productName,
//   category,
//   eligibility = [],
//   coverage_details = [],
//   features = [],
//   next_action = null,
//   back_action = null,
//   onActionClick,
// }: PolicyDetailsProps) => {
//   const [activeTab, setActiveTab] = useState<"eligibility" | "coverage" | "features">("coverage");

//   return (
//     <div className="mt-4 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-6 text-white">
//         <div className="flex items-start justify-between mb-2">
//           <div>
//             <h2 className="text-2xl font-bold mb-1">{title}</h2>
//             <p className="text-white/90 text-sm">{productName}</p>
//           </div>
//           <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm">
//             {category}
//           </span>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex border-b border-gray-200 bg-white px-6">
//         <button
//           onClick={() => setActiveTab("coverage")}
//           className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
//             activeTab === "coverage"
//               ? "border-brand-primary text-brand-primary"
//               : "border-transparent text-gray-500 hover:text-gray-700"
//           }`}
//         >
//           Coverage Details
//         </button>
//         <button
//           onClick={() => setActiveTab("features")}
//           className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
//             activeTab === "features"
//               ? "border-brand-primary text-brand-primary"
//               : "border-transparent text-gray-500 hover:text-gray-700"
//           }`}
//         >
//           Features
//         </button>
//         <button
//           onClick={() => setActiveTab("eligibility")}
//           className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
//             activeTab === "eligibility"
//               ? "border-brand-primary text-brand-primary"
//               : "border-transparent text-gray-500 hover:text-gray-700"
//           }`}
//         >
//           Eligibility
//         </button>
//       </div>

//       {/* Tab Content */}
//       <div className="p-6">
//         {activeTab === "coverage" && coverage_details.length > 0 && (
//           <div className="space-y-3">
//             {coverage_details.map((detail, idx) => (
//               <div key={idx} className="flex items-start bg-white p-4 rounded-lg border border-gray-100 hover:border-brand-primary/30 transition-colors">
//                 <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center mr-3 mt-0.5">
//                   <svg className="w-3.5 h-3.5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
//                     <path
//                       fillRule="evenodd"
//                       d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </div>
//                 <span className="text-sm text-gray-700 leading-relaxed">{detail}</span>
//               </div>
//             ))}
//           </div>
//         )}

//         {activeTab === "features" && features.length > 0 && (
//           <div className="space-y-3">
//             {features.map((feature, idx) => (
//               <div key={idx} className="flex items-start bg-white p-4 rounded-lg border border-gray-100 hover:border-brand-primary/30 transition-colors">
//                 <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center mr-3 mt-0.5">
//                   <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                 </div>
//                 <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
//               </div>
//             ))}
//           </div>
//         )}

//         {activeTab === "eligibility" && eligibility.length > 0 && (
//           <div className="space-y-3">
//             {eligibility.map((criteria, idx) => (
//               <div key={idx} className="flex items-start bg-white p-4 rounded-lg border border-gray-100 hover:border-brand-primary/30 transition-colors">
//                 <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
//                   <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                     />
//                   </svg>
//                 </div>
//                 <span className="text-sm text-gray-700 leading-relaxed">{criteria}</span>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Empty State */}
//         {((activeTab === "coverage" && coverage_details.length === 0) ||
//           (activeTab === "features" && features.length === 0) ||
//           (activeTab === "eligibility" && eligibility.length === 0)) && (
//           <div className="text-center py-8 text-gray-400">
//             <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={1.5}
//                 d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//               />
//             </svg>
//             <p className="text-sm">No information available</p>
//           </div>
//         )}
//       </div>

//       {/* Footer Actions */}
//       <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
//         <div className="flex items-center justify-between gap-3">
//           {/* Back Button */}
//           {back_action && (
//             <button
//               onClick={() =>
//                 onActionClick?.(
//                   back_action.action,
//                   back_action.policy_id,
//                   back_action.title
//                 )
//               }
//               className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center gap-2"
//             >
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M15 19l-7-7 7-7"
//                 />
//               </svg>
//               {back_action.title}
//             </button>
//           )}

//           {/* Spacer */}
//           {!back_action && <div />}

//           {/* Next/Apply Button */}
//           {next_action && (
//             <button
//               onClick={() =>
//                 onActionClick?.(
//                   next_action.action,
//                   next_action.policy_id,
//                   next_action.title
//                 )
//               }
//               className="px-6 py-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-200 flex items-center gap-2"
//             >
//               {next_action.title}
//               <svg
//                 className="w-4 h-4"
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
//           )}
//         </div>

//         {/* Help Text */}
//         {!next_action && !back_action && (
//           <div className="text-sm text-gray-600 text-center">
//             Need help? Contact our support team
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PolicyDetails;
// Updated PolicyDetails component with mobile responsiveness improvements
"use client";
import React, { useState } from "react";

type ActionButton = {
  title: string;
  action: string;
  policy_id?: string;
};

type PolicyDetailsProps = {
  title: string;
  productName: string;
  category: string;
  eligibility?: string[];
  coverage_details?: string[];
  features?: string[];
  next_action?: ActionButton | null;
  back_action?: ActionButton | null;
  onActionClick?: (action: string, policyId?: string, title?: string) => void;
};

const PolicyDetails = ({
  title,
  productName,
  category,
  eligibility = [],
  coverage_details = [],
  features = [],
  next_action = null,
  back_action = null,
  onActionClick,
}: PolicyDetailsProps) => {
  const [activeTab, setActiveTab] = useState<"eligibility" | "coverage" | "features">("coverage");

  return (
    <div className="mt-4 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl shadow-lg overflow-hidden w-full max-w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-4 sm:p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-1 break-words">{title}</h2>
            <p className="text-white/90 text-sm break-words">{productName}</p>
          </div>
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm w-fit self-start sm:self-auto">
            {category}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white px-3 sm:px-6 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab("coverage")}
          className={`px-3 sm:px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
            activeTab === "coverage"
              ? "border-brand-primary text-brand-primary"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Coverage Details
        </button>
        <button
          onClick={() => setActiveTab("features")}
          className={`px-3 sm:px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
            activeTab === "features"
              ? "border-brand-primary text-brand-primary"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Features
        </button>
        <button
          onClick={() => setActiveTab("eligibility")}
          className={`px-3 sm:px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
            activeTab === "eligibility"
              ? "border-brand-primary text-brand-primary"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Eligibility
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-4 sm:p-6">
        {activeTab === "coverage" && coverage_details.length > 0 && (
          <div className="space-y-3">
            {coverage_details.map((detail, idx) => (
              <div key={idx} className="flex items-start bg-white p-4 rounded-lg border border-gray-100 hover:border-brand-primary/30 transition-colors">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center mr-3 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm text-gray-700 leading-relaxed break-words">{detail}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "features" && features.length > 0 && (
          <div className="space-y-3">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start bg-white p-4 rounded-lg border border-gray-100 hover:border-brand-primary/30 transition-colors">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center mr-3 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700 leading-relaxed break-words">{feature}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "eligibility" && eligibility.length > 0 && (
          <div className="space-y-3">
            {eligibility.map((criteria, idx) => (
              <div key={idx} className="flex items-start bg-white p-4 rounded-lg border border-gray-100 hover:border-brand-primary/30 transition-colors">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <span className="text-sm text-gray-700 leading-relaxed break-words">{criteria}</span>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {((activeTab === "coverage" && coverage_details.length === 0) ||
          (activeTab === "features" && features.length === 0) ||
          (activeTab === "eligibility" && eligibility.length === 0)) && (
          <div className="text-center py-8 text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-sm">No information available</p>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="bg-gray-50 px-4 sm:px-6 py-4 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Back Button */}
          {back_action && (
            <button
              onClick={() =>
                onActionClick?.(
                  back_action.action,
                  back_action.policy_id,
                  back_action.title
                )
              }
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center gap-2 w-full sm:w-auto"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {back_action.title}
            </button>
          )}

          {/* Spacer */}
          {!back_action && <div />}

          {/* Next/Apply Button */}
          {next_action && (
            <button
              onClick={() =>
                onActionClick?.(
                  next_action.action,
                  next_action.policy_id,
                  next_action.title
                )
              }
              className="px-6 py-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-200 flex items-center gap-2 w-full sm:w-auto"
            >
              {next_action.title}
              <svg
                className="w-4 h-4"
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
          )}
        </div>

        {/* Help Text */}
        {!next_action && !back_action && (
          <div className="text-sm text-gray-600 text-center mt-2">
            Need help? Contact our support team
          </div>
        )}
      </div>
    </div>
  );
};

export default PolicyDetails;
