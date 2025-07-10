import { cn } from "@/utils/cn";
import Sidebar from "@/components/organisms/Sidebar";

const Layout = ({ children, className }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <main className={cn("flex-1 lg:ml-0 min-h-screen", className)}>
          <div className="lg:ml-0 min-h-screen">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;