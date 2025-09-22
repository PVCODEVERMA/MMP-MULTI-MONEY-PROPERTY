import { useLocation } from "react-router-dom";
import AllProperties from "../../components/advancedSearch/Allproperties.jsx";

export default function AdvancedSearch() {
  const { state } = useLocation();         
  return (
    <AllProperties
      initialFilters={state?.filters ?? {}}
      initialQuery={state?.searchQuery ?? ""}
      searchType={state?.searchType ?? "buy"}
      fromSearch={state?.fromSearch ?? false}
    />
  );
}
