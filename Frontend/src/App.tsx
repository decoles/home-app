import './App.css'
import React, { useState } from 'react';
import Header from './components/Header'
import Footer from './components/Footer';
import Financial from './components/Financial'

const App: React.FC = () => {
  const [page, setPage] = useState('financial');

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <Header username="Genna" />

      <main className="flex-1 overflow-auto">
        <Financial />
      </main>

      <Footer onNavigate={setPage} />
    </div>
  );
};

export default App;