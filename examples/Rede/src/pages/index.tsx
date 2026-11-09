import { AppShell } from "../components/omni-hub/app-shell";
import { ChatScreen } from "../components/omni-hub/chat-screen";
import {ContextSocket} from "../features/chat/ContextSocket";

// `auth.protectPage` desativado por enquanto: o hydration do RecyclerView
// precisa ser inspecionado sem passar pela sessão.
export default async function IndexPage() {
  return (
    <AppShell active="chat-omnichannel">

        <ContextSocket>
            <ChatScreen />
        </ContextSocket>

        
    </AppShell>
  );
}
