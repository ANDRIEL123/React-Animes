import React from 'react'
import {
    Routes,
    Route,
    useNavigate
} from 'react-router-dom';

import RenderMidia from './components/main/renderVideos'
import Episodio from './components/main/episodio';
import Animes from './pages/animes'
import Contato from './pages/contato'
import Sobre from './pages/sobre'
import Staff from './pages/staff'
import Sugerir from './pages/sugerir'
import Anime from './pages/animePage/anime'

export default function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<RenderMidia />} />
            <Route path="episodio/:id_episodio" element={<Episodio />} />
            <Route path="anime/:id_anime" element={<Anime />} />
            <Route path="animes" element={<Animes />} />
            <Route path="contato" element={<Contato />} />
            <Route path="sobre" element={<Sobre />} />
            <Route path="staff" element={<Staff />} />
            <Route path="sugerir" element={<Sugerir />} />
            <Route path='*' element={<center><h1 style={{ color: "red" }}>Error 404 - Página não encontrada</h1></center>} />
        </Routes >


    )
}