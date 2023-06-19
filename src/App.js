import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WisataList from './components_admin/wisata/WisataList';
import AddWisata from './components_admin/wisata/AddWisata';
import EditWisata from './components_admin/wisata/EditWisata';
import KulinerList from './components_admin/kuliner/KulinerList';
import AddKuliner from './components_admin/kuliner/AddKuliner';
import EditKuliner from './components_admin/kuliner/EditKuliner';
import PenginapanList from './components_admin/penginapan/PenginapanList';
import EditPenginapan from './components_admin/penginapan/EditPenginapan';
import AddPenginapan from './components_admin/penginapan/AddPenginapan';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WisataList />} />
        <Route path="/admin" >
          <Route path="wisata"  >
            <Route index exact element={<WisataList />} />
            <Route path="add" element={<AddWisata />} />
            <Route path="edit/:id" element={<EditWisata />} />
          </Route>
          <Route path="penginapan"  >
            <Route index exact element={<PenginapanList />} />
            <Route path="add" element={<AddPenginapan />} />
            <Route path="edit/:id" element={<EditPenginapan />} />
          </Route>
          <Route path="kuliner"  >
            <Route index exact element={<KulinerList />} />
            <Route path="add" element={<AddKuliner />} />
            <Route path="edit/:id" element={<EditKuliner />} />
          </Route>
        </Route>
        {/* <Route path="/admin/wisata/add" element={<AddWisata />} />
        <Route path="/admin/wisata/edit/:id" element={<EditWisata />} />
        <Route path="/admin/kuliner" element={<KulinerList />} />
        <Route path="/admin/kuliner/add" element={<AddKuliner />} />
        <Route path="/admin/penginapan" element={<PenginapanList />} />
        <route path="/admin/penginapan/add" element={<AddPenginapan />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
