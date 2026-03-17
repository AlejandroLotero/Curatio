import acetaminofen from "@/assets/images/acetaminofen.png";
import bisbacter from "@/assets/images/bisbacter.png";
import hidrocortisona from "@/assets/images/hidrocortisona.png";
import amoxicilina from "@/assets/images/amoxicilina.png";
import ibuprofeno from "@/assets/images/ibuprofeno.png";
import jarabeAcetaminofen from "@/assets/images/jarabe-acetaminofem.png";

export const products = [
    {

        id: 1,
        title: "Acetaminofén 500 mg",
        price: 4500,
        description: "Analgesico y antipirético indicado para el alivio del dolor leve a moderado y la fiebre.",
        image: acetaminofen,
        category: "analgésicos"
    },
    {

        id: 2,
        title: "Bisbacter suspensión",
        price: 12500,
        description: "Suspensión oral para el tratamiento de molestias gastrointestinales leves.",
        image: bisbacter,
        category: "gastrointestinal"
    },
    {

        id: 3,
        title: "Hidrocortisona crema",
        price: 18900,
        description: "Crema tópica antiinflamatoria para afecciones leves de la piel.",
        image: hidrocortisona,
        category: "dermatológicos"
    },
    {
        id: 4,
        title: "Amoxicilina 500 mg",
        price: 23000,
        description: "Antibiótico de amplio espectro para el tratamiento de infecciones bacterianas.",
        image: amoxicilina,
        category: "antibióticos"
    },
    {
        id: 5,
        title: "Ibuprofeno 800 mg",
        price: 18000,
        description: "Antiinflamatorio no esteroideo (AINE) para dolor moderado e inflamación.",
        image: ibuprofeno,
        category: "analgésicos"
    },
    {
        id: 6,
        title: "Acetaminofén jarabe niños",
        price: 14500,
        description: "Jarabe pediátrico para el alivio de fiebre y dolor en niños.",
        image: jarabeAcetaminofen,
        category: "pediátricos"
    }
];