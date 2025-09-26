export default function PropertyCard({ data, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`m-2 cursor-pointer rounded-lg border
                 ${active ? "border-orange-500 shadow-md" : "border-gray-200"}
                 hover:shadow transition`}
    >
      <img
        src={data.images[0]}
        alt={data.title}
        className="h-28 w-full object-cover rounded-t-lg"
      />
      <div className="p-2 text-sm">
        <h4 className="font-semibold text-[#154056] line-clamp-2">
          {data.title}
        </h4>
        <p className="font-bold text-orange-600">{data.price}</p>
      </div>
    </div>
  );
}
