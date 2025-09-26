// import React, {useState, useMemo} from "react";
// import {useSearchParams} from "react-router-dom";
// import SplitPane from "react-split-pane";
// import LeftPane  from "../../../components/findByPropertyleads/leadsExplorer/LeftPane.jsx";
// import RightPane from "../../../components/findByPropertyleads/leadsExplorer/RightPane.jsx";
// import dummyProperties from "../../../components/findByPropertyleads/dummyProperties.js";

// export default function LeadsExplorer() {
//   /* ---------- read query-params once ---------- */
//   const [searchParams] = useSearchParams();
//   const initialFilters = {
//     location : searchParams.get("location") || "",
//     intent   : searchParams.get("intent")   || "all",
//     type     : "all",
//     sort     : "Newest First",
//     page     : 1
//   };

//   /* ---------- state ---------- */
//   const [filters,  setFilters]  = useState(initialFilters);
//   const [selected, setSelected] = useState(null);

//   /* ---------- derived list ---------- */
//   const results = useMemo(() => {
//     let data = [...dummyProperties];

//     if (filters.location)
//       data = data.filter(p =>
//         `${p.location.city}, ${p.location.locality}`
//           .toLowerCase()
//           .includes(filters.location.toLowerCase())
//       );

//     if (filters.intent !== "all") data = data.filter(p => p.intent === filters.intent);
//     if (filters.type   !== "all") data = data.filter(p => p.propertyType === filters.type);

//     if (filters.sort === "Price: Low to High")
//       data.sort((a,b)=>+a.price.replace(/\D/g,"") - +b.price.replace(/\D/g,""));
//     else if (filters.sort === "Price: High to Low")
//       data.sort((a,b)=>+b.price.replace(/\D/g,"") - +a.price.replace(/\D/g,""));
//     else
//       data.sort((a,b)=> new Date(b.postedAt) - new Date(a.postedAt));

//     return data;
//   }, [filters]);

//   return (
//     <SplitPane split="vertical" defaultSize="38%" minSize={300}>
     
//       <LeftPane
//         filters={filters}
//         setFilters={setFilters}
//         list={results}
//         onSelect={setSelected}
//         selectedId={selected?.id}
//       />
//       <RightPane
//         property={selected}
//         clearSelection={()=>setSelected(null)}
//       />
//     </SplitPane>
//   );
// }
