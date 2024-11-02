import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomeScreen } from './components/screens/HomeScreen';
import { EditorScreen } from './components/screens/EditorScreen';
import { PerformanceScreen } from './components/screens/PerformanceScreen';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/editor/:songId" element={<EditorScreen />} />
          <Route path="/performance/:songId" element={<PerformanceScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;