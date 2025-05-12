import './App.css'
import Sidebar from './components/Sidebar'
import MainContent from './components/Home'

function App() {
  
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <MainContent />
    </div>
  )
}

export default App
