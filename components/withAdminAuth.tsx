"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { decode } from "jsonwebtoken";

interface DecodedToken {
  role: string;
}

const withAdminAuth = (WrappedComponent: React.ComponentType) => {
  const AuthComponent = (props: any) => {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
        return;
      }
      try {
        const decodedToken = decode(token) as DecodedToken;
        if (decodedToken && decodedToken.role === "superadmin") {
          setIsAuthorized(true);
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Auth error:", error);
        router.push("/");
      }
    }, [router]);

    if (!isAuthorized) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p>Verificando autorización...</p>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
  return AuthComponent;
};

export default withAdminAuth;
