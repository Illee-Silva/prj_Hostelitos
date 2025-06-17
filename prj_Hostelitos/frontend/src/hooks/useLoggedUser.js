import { useEffect, useState } from "react";

export function useLoggedUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    function updateUser() {
      const email = localStorage.getItem("userEmail");
      if (!email) {
        setUser(null);
        return;
      }
      const apiUrl = import.meta.env.VITE_API_URL;
      fetch(`${apiUrl}/api/users?email=${encodeURIComponent(email)}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.user) setUser(data.user);
          else setUser(null);
        });
    }
    updateUser();
    window.addEventListener("storage", updateUser);
    window.addEventListener("focus", updateUser);
    return () => {
      window.removeEventListener("storage", updateUser);
      window.removeEventListener("focus", updateUser);
    };
  }, []);

  return user;
}
