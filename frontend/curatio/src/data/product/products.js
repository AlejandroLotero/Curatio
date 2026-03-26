import acetaminofen from "@/assets/images/acetaminofen.png";
import bisbacter from "@/assets/images/bisbacter.png";
import hidrocortisona from "@/assets/images/hidrocortisona.png";
import amoxicilina from "@/assets/images/amoxicilina.png";
import ibuprofeno from "@/assets/images/ibuprofeno.png";
import jarabeAcetaminofen from "@/assets/images/jarabe-acetaminofem.png";

export const products = [
    {
        id: 1,
        title: "Paracetamol 500 mg",
        price: 35000,
        description: "Analgésico y antipirético utilizado para el alivio del dolor leve a moderado",
        image: acetaminofen,
        category: "analgésicos"
    },
    {
        id: 2,
        title: "Ibuprofeno 400 mg",
        price: 12000,
        description: "Antiinflamatorio no esteroideo para dolor y fiebre",
        image: ibuprofeno,
        category: "antiinflamatorios"
    },
    {
        id: 3,
        title: "Amoxicilina 500 mg",
        price: 14000,
        description: "Antibiótico de amplio espectro",
        image: amoxicilina,
        category: "antibióticos"
    },
    {
        id: 4,
        title: "Loratadina 10 mg",
        price: 14500,
        description: "Antihistamínico para alergias",
        image: hidrocortisona,
        category: "alergias"
    },
    {
        id: 5,
        title: "Omeprazol 20 mg",
        price: 10300,
        description: "Inhibidor de la bomba de protones para acidez",
        image: bisbacter,
        category: "gastrointestinal"
    },
    {
        id: 6,
        title: "Salbutamol inhalador",
        price: 18000,
        description: "Broncodilatador para el tratamiento del asma",
        image: jarabeAcetaminofen,
        category: "respiratorio"
    }
];