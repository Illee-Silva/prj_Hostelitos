// services/authService.ts
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

export async function login(email: string, password: string) {
  const result = await signInWithEmailAndPassword(auth, email, password);
  localStorage.setItem("userEmail", email); // Salva email do usuário logado
  return result;
}

export async function register(email: string, password: string, name: string) {
  // Cria o usuário no Firebase
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  // Salva no MongoDB
  const apiUrl = import.meta.env.VITE_API_URL;
  await fetch(`${apiUrl}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email })
  });
  return userCredential;
}