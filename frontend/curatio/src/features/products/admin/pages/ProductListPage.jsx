// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Plus, Search, Trash2, Edit2, Eye, Check, X } from "lucide-react";
// import Button from "@/shared/components/Button";
// import Modal from "@/shared/components/Modal";
// import bgAll from "@/assets/images/bgAll.jpg";
// import formasFarmaceuticas from "@/data/selects/formasFarmaceuticas.json";
// import laboratorios from "@/data/selects/laboratorios.json";
// import "../../../../styles/tokens.css";
// import "../../../../styles/semantic.css";

// export default function ProductListPage() {
//   const navigate = useNavigate();

//   // Mappers para convertir IDs a labels
//   const getFormaLabel = (id) => {
//     if (!id) return "-";
//     const forma = formasFarmaceuticas.find((f) => f.id === Number(id));
//     return forma ? forma.label : "-";
//   };

//   const getLaboratorioLabel = (id) => {
//     if (!id) return "-";
//     const lab = laboratorios.find((l) => l.id === Number(id));
//     return lab ? lab.label : "-";
//   };

//   const [medicamentos, setMedicamentos] = useState([]);
//   const [filteredMedicamentos, setFilteredMedicamentos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [focused, setFocused] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [medicamentoToDelete, setMedicamentoToDelete] = useState(null);

//   // Cargar medicamentos al montar
//   useEffect(() => {
//     cargarMedicamentos();
//   }, []);

//   const cargarMedicamentos = () => {
//     try {
//       const stored = localStorage.getItem("medicamentos");
//       if (stored) {
//         const meds = JSON.parse(stored);
//         setMedicamentos(meds);
//         setFilteredMedicamentos(meds);
//       } else {
//         setMedicamentos([]);
//         setFilteredMedicamentos([]);
//       }
