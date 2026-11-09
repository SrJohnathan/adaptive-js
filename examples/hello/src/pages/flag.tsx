import { ClientComponet } from "../components/client";
import {HydrateComponet, HydrateComponetChildClient, HydrateComponetErrorDigito} from "../components/hydrate";

export default function FlagPage() {
  return (
    <div>
      <ClientComponet />
        <HydrateComponetChildClient />
      <HydrateComponet />
        <HydrateComponetErrorDigito/>

    </div>
  );
}
