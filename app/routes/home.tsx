import type { Route } from "./+types/home";
import SpeechAnalysisApp, {  } from "../welcome/SpeechAnalysisApp";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sema" },
    { name: "description", content: "Mutuku's Problem" },
  ];
}

export default function Home() {
  return <SpeechAnalysisApp/>;
}
