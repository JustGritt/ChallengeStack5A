import DashboardMenu from "@/components/Header/DashboardMenu"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main>
            <DashboardMenu />
            {children}
        </main>
    )
}