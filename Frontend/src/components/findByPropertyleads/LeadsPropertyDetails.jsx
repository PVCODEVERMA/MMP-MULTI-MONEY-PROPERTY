
// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import {
//   IoLocationSharp,
//   IoBed,
//   IoWater,
//   IoCarSport,
//   IoPricetag
// } from "react-icons/io5";
// import Lightbox from "yet-another-react-lightbox";
// import "yet-another-react-lightbox/styles.css";

// import dummyProperties from "../../components/findByPropertyleads/dummyProperties";

// /* pick property by :id param or default to first */
// function useProperty() {
//   const { propertyId } = useParams();
//   return (
//     dummyProperties.find(p => p.id === Number(propertyId)) ||
//     dummyProperties[0]
//   );
// }

// export default function LeadsPropertyDetails() {
//   const p = useProperty();
//   const [open, setOpen] = useState(false);
//   const [index, setIndex] = useState(0);

//   /* map intent → badge colour */
//   const badge =
//     {
//       high: "bg-red-100 text-red-600",
//       medium: "bg-yellow-100 text-yellow-600",
//       low: "bg-green-100 text-green-600"
//     }[p.intent] || "bg-gray-100 text-gray-600";

//   /* lightbox slides */
//   const slides =
//     p.images?.map(src => ({ src })) || [];

//   return (
//     <section className="p-6 space-y-8 max-w-5xl mx-auto">
//       {/* title row */}
//       <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
//         <h1 className="text-xl font-semibold text-[#154056]">
//           {p.title}
//         </h1>
//         <span className={`px-3 py-1 text-xs rounded-full uppercase ${badge}`}>
//           {p.intent} intent
//         </span>
//       </div>

//       {/* image grid */}
//       {p.images?.length > 0 && (
//         <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
//           {p.images.slice(0,4).map((src, i) => (
//             <img
//               key={i}
//               src={src}
//               alt={p.title}
//               className="h-40 w-full object-cover rounded-lg cursor-pointer"
//               onClick={() => { setIndex(i); setOpen(true); }}
//             />
//           ))}
//         </div>
//       )}

//       {/* quick facts */}
//       <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 text-sm text-gray-700">
//         <Fact icon={<IoPricetag />} label={p.price} />
//         <Fact icon={<IoLocationSharp />} label={`${p.location.city}, ${p.location.locality}`} />
//         <Fact icon={<IoBed />} label={`${p.bhk} • ${p.area.builtUp}`} />
//         <Fact icon={<IoWater />} label={`${p.bathrooms||"-"} Bath • ${p.furnishing}`} />
//         <Fact icon={<IoCarSport />} label={`${p.carParking||"-"} Parking`} />
//       </div>

//       {/* extra meta */}
//       <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 text-sm">
//         <Meta label="Status" value={p.status} />
//         <Meta label="Transaction" value={p.transaction} />
//         <Meta label="Price/ft²" value={p.pricePerSqft} />
//         <Meta label="Maintenance" value={p.maintenance} />
//         <Meta label="Society" value={p.society} />
//         <Meta label="Highlights" value={p.highlights?.join(" • ")} />
//         <Meta label="Legal" value={p.legalClearance?.join(" • ")} />
//         <Meta label="Amenities" value={p.amenities?.join(", ")} />
//       </div>

//       {/* description */}
//       {p.description && (
//         <p className="text-gray-800 leading-relaxed">{p.description}</p>
//       )}

//       {/* contact card */}
//       <div className="bg-[#f9fafb] border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//         <div>
//           <p className="font-medium text-gray-900">{p.contact.name}</p>
//           <p className="text-sm text-gray-600">{p.contact.phone}</p>
//           <p className="text-sm text-gray-600">{p.contact.email}</p>
//         </div>
//         <div className="flex gap-2">
//           <a href={`tel:${p.contact.phone.replace(/\s+/g,"")}`}
//              className="px-4 py-2 bg-[#154056] text-white rounded hover:bg-green-600">
//             Call
//           </a>
//           {p.contact.whatsapp && (
//             <a href={p.contact.whatsapp} target="_blank"
//                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
//               WhatsApp
//             </a>
//           )}
//           {p.contact.scheduleVisitLink && (
//             <a href={p.contact.scheduleVisitLink} target="_blank"
//                className="px-4 py-2 bg-[#f99c00] text-white rounded hover:bg-[#154056]">
//               Schedule Visit
//             </a>
//           )}
//         </div>
//       </div>

//       {/* post meta */}
//       <p className="text-xs text-gray-400">
//         Posted {p.postedOn} • {new Date(p.postedAt).toLocaleString()}
//       </p>

//       {/* lightbox gallery */}
//       {slides.length > 0 && (
//         <Lightbox
//           open={open}
//           close={() => setOpen(false)}
//           slides={slides}
//           index={index}
//           on={{
//             view: ({ index: i }) => setIndex(i)
//           }}
//         />
//       )}
//     </section>
//   );
// }

// /* helpers */
// function Fact({ icon, label }) {
//   return (
//     <div className="flex items-center gap-2">
//       <span className="text-[#ff9c00]">{icon}</span>
//       <span>{label}</span>
//     </div>
//   );
// }
// function Meta({ label, value }) {
//   return (
//     <p>
//       <span className="font-medium">{label}: </span>
//       {value || "-"}
//     </p>
//   );
// }
