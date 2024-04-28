import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Births from "./pages/Births";
import Cows from "./pages/Cows";
import MilkProductions from "./pages/MilkProductions";
import MedicalExam from "./pages/MedicalExam";
import NavBar from './components/NavBar';
import { Box, Flex } from "@chakra-ui/react";

function App() {
  return (
    <Box
      bg="#CBD5E0"
    >
      <NavBar />
      <Routes>
        <Route path="/" element={<Cows />} />
        <Route path="/tests" element={<MedicalExam />} />
        <Route path="/births" element={<Births />} />
        <Route path="/productions" element={<MilkProductions />} />
      </Routes>
    </Box>
  );
}

export default App;
