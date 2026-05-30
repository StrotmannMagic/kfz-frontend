import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import FormApp from './FormApp';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/de" replace />} />
        <Route path="/de" element={<FormApp lang="de" />} />
        <Route path="/en" element={<FormApp lang="en" />} />
      </Routes>
    </BrowserRouter>
  );
}
