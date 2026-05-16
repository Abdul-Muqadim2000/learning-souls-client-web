import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";

export const metadata = {
  title: "Admin Dashboard - Learning Souls",
  description: "Admin panel for managing donations, users, and teams.",
};

export default function AdminLayout({ children }) {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}