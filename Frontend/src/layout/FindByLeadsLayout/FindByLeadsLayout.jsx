import React from "react";
import FindByLeadsHeader from "../../components/Shared/FindByLeadsHeader";
import FindByLeadsFooter from "../../components/Shared/FindByLeadsFooter";


const FindByLeadsLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7f7f7]">
      <FindByLeadsHeader />
      <main className="flex-1  mt-3">{children}</main>
      <FindByLeadsFooter />
    </div>
  );
};

export default FindByLeadsLayout;
