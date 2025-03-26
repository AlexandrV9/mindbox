import { TodoContainer } from "../components";

import "normalize.css";
import "./styles/index.css";

export function App() {
  return (
    <div className="app">
      <main className="main">
        <TodoContainer />
      </main>
    </div>
  );
}
