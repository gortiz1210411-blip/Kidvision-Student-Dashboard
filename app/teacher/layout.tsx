import Sidebar from "@/app/components/Sidebar";

export const metadata = {
  title: "Teacher Dashboard | KidVision",
  description: "Manage student assessments and data",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main
        style={{
          marginLeft: "250px",
          flex: 1,
          padding: "20px",
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        {children}
      </main>
    </div>
  );
}
