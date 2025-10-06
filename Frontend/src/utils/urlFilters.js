// // src/utils/urlFilters.js
// import { useSearchParams } from "react-router-dom";

// /* returns a function (key,value) ⇒ pushes it into ?query=string */
// export function useFilterWriter() {
//   const [sp, setSp] = useSearchParams();

//   return (key, value) => {
//     setSp(prev => {
//       const next = new URLSearchParams(prev);
//       value ? next.set(key, value) : next.delete(key);
//       /* example: next.delete("page")   // reset pagination if you have one */
//       return next;
//     });
//   };
// }
