import './App.css'
import EpisodeTable from "./components/EpisodeTable";
import { BrowserRouter } from "react-router-dom";

function App() {

  return (
    <div style={{ padding: "2rem" }}>
      <BrowserRouter>
        <EpisodeTable />
      </BrowserRouter>
    </div>
  )
}

export default App
