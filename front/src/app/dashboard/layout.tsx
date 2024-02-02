import DashboardMenu from "@/components/Header/DashboardMenu";
import AuthMiddleware from "@/middlewares/AuthMiddleware";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthMiddleware>
      <main>
        <DashboardMenu />
        {children}
      </main>
    </AuthMiddleware>
  );
}
