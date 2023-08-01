import { LoginStatus } from "@/context";
import { router, useSegments } from "expo-router";
import { useEffect } from "react";

export const useProtectedRoute = (status: LoginStatus)  =>{
    const segments = useSegments();
  
    useEffect(() => {
      const inAuthGroup = segments[0] === '(auth)';
  
      if (
        // If the user is not signed in and the initial segment is not anything in the auth group.
        status != "autenticado" &&
        !inAuthGroup
      ) {
        // Redirect to the sign-in page.
        router.replace('/auth/login');
      } else if (status === "autenticado" && inAuthGroup) {
        // Redirect away from the sign-in page.
       // router.replace('(tabs)');
      }
    }, [status, segments]);
  }
