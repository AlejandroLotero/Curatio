/**useEffect
//Es un hook que permite ejecutar efectos secundarios en componente s funcionales
//Un efecto secundario es cualquier operación que:
1- Ocurre fuera del render
2- Interactua con el mundo exterior al componente
Ejmeplos:
- Llamadas a APIS
- Manipulacion del DOM
- Actualizar un titulo del navegador


<==========>Sintaxis<==========>
useEffect(() => {
    efecto                                  - Codigo que se ejecuta
    }),                                     - []; En los corchetes se coloca el arreglo de las dependencias
**/
/*
import { useEffect, useState } from "react";

//Efecto con array vacio SPA: Single page application
function DeleteUseEffect () {
    const [message, setMessage] = useState("Cargando")

    useEffect(() => {
        setTimeout(() => {
            setMessage("Componente montado")
        }, 3000);
    },[]);

    return (
        <h1>{message}</h1>
    )
}
export default DeleteUseEffect;*/

/**
 * Hook useEffect con una dependencia
 * 
 * Enender que useEffect se vuelve a ejecutar cuando cmbia una deoendencia
 * - useEffect puede ejecutarse una vez si algo cambia
 * - Ese algo se declara en el array de dependencias
 * 
 * * */

import { useEffect, useState } from "react";


function DeleteUseEffect(){
    const [count, setCount] =useState(0);
    const [message, setMessage] = useState("Contador igual");

    useEffect(() => {
        setMessage(`El contador cambió a ${count}`)   
    },[count]);

    return(
        <>
        <h2>{count}</h2>
        <p>{message}</p>
        <button className="border border-border p-4" onClick={() => setCount(count + 1)}>
            Incrementar
        </button>
        
        
        </>
    );
};

export default DeleteUseEffect;



/**
 * IMPORTANTE
 * - Si una dependencia cambia el efecto se ejecuta
 * - Si no cambia el efecto no se ejecuta
 * - 
 * 
 * 
 */
