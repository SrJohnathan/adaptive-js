import { auth } from "../auth";
import { AppShell } from "../components/omni-hub/app-shell";
import { AccountScreen } from "../components/omni-hub/account-screen";

export default auth.protectPage(async () => {
  return (
    <AppShell active="configuracoes-conta">
      <AccountScreen />
    </AppShell>
  );
});