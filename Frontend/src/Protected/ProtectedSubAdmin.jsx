import { AuthProviderSubAdmin } from "../context/AuthContextSubAdmin";

export default function SubAdminLayout({ children }) {
  return (
    <AuthProviderSubAdmin>
      {children}
    </AuthProviderSubAdmin>
  );
}
