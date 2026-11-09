import { redirect, type PageContext } from "@adaptive-js/web";
import { auth } from "../auth.ts";
import { AuthScreen } from "../components/omni-hub/auth-screen";
import { ToastContainer } from "../components/omni-hub/toast-container";

export default async function LoginPage(context: PageContext) {
  // Se o usuário já tiver uma sessão ativa, redireciona diretamente para a home
  const { session } = await auth.readSession(context?.request ?? { headers: {} });
  if (session) {
    return redirect("/");
  }
  return (
    <>
      <AuthScreen />
      <ToastContainer />
    </>
  );
}