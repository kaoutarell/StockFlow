"use client"; // Ensure this is at the top

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Dashboard } from "@/components/Dashboard/Dashboard";
import { Sidebar } from "@/components/Sidebar/Sidebar";

export default function Home() {
  const [isClient, setIsClient] = useState(false); // Track if we're on the client
  const [user, setUser] = useState<any>(null); // Store user data from sessionStorage
  const [selectedRoute, setSelectedRoute] = useState("All products"); // Default to "All products" for employees
  const router = useRouter();

  // This useEffect runs when the component mounts
  useEffect(() => {
    setIsClient(true); // We are on the client now

    // Retrieve user info from sessionStorage
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser); // Parse user data if available
      setUser(userData); // Update state with user data

      // Set the default route based on user role
      if (userData?.role === "employee") {
        setSelectedRoute("All products"); // Default route for employee
      } else if (userData?.role === "manager") {
        setSelectedRoute("Inventory"); // Default route for manager
      }
    } else {
      setUser(null); // No user found in sessionStorage
    }
  }, []);

  // Check if user is logged in, and redirect if not
  useEffect(() => {
    if (isClient && !user) {
      router.push("/login"); // Redirect to login if no user is found
    }
  }, [isClient, user, router]);

  // Prevent rendering during SSR or before the component has mounted
  if (!isClient || user === null) {
    return null; // Prevent rendering during server-side rendering (SSR)
  }

  // Handle route change
  const handleRouteChange = (route: string) => {
    setSelectedRoute(route); // Update the selected route
  };

  return (
    <main className="grid gap-4 p-4 grid-cols-[220px,_1fr]">
      <Sidebar
        selectedRoute={selectedRoute}
        onRouteChange={handleRouteChange}
      />
      <Dashboard selectedRoute={selectedRoute} />
    </main>
  );
}
