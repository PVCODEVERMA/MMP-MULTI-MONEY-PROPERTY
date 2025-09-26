import { Outlet } from "react-router-dom";
import LeftPane from "../../components/findByPropertyleads/leadsExplorer/LeftPane.jsx";
import FilterHeader from "../../components/Shared/FilterHeader.jsx";
import LeadsAds from "../../components/ctaSection/LeadsAds.jsx";
import { LeadsFilterProvider } from "../../components/findByPropertyleads/LeadsFilterContext.jsx";

export default function LeadsLayout() {
  return (
    <>
      <LeadsFilterProvider>
      <FilterHeader />

      <div className="pt-20 flex gap-4 max-w-7xl mx-auto px-4">
        
        <LeftPane />
        <div className="flex-1">
          <Outlet />           
        </div>
      </div>
    </LeadsFilterProvider>
      {/* Bottom Ads */}{" "}
      <div className="mt-4 sticky bottom-0 ml-2 hidden sm:block">
        {" "}
        <LeadsAds />{" "}
      </div>
    </>
  );
}
