import { render } from "solid-js/web";
import "@fontsource-variable/outfit";
import "@fontsource/newsreader/300.css";
import "@fontsource/newsreader/400.css";
import "./index.css";
import { initializeTheme } from "@/stores/ui";
import About from "./pages/About";

initializeTheme();

render(() => <About />, document.getElementById("root") as HTMLElement);
