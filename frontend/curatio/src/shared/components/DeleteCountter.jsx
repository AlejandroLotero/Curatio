//Hook useState
/*
import {useState} from "react"

export default function DeleteCounter (){
    //state es el valor actual del estado
    //setState es la funcion para actualizar
    //useStata() es el valor incial
    const [count, setCount] = useState(0)

    return(
        <>
        <p>Counter</p>
        <button onClick={() => setCount(count+1)}>Incrementar</button>:
        </>
    )
}
*/

export default function DeleteCountter () {
    let count = 0;

    const incrementar = () => {
        count += + 1;
        console.log("El nuevo valor es: ", this.count);
    }
    return(
        <>
            {""}
            <p>Contador: {count}</p>
            <button className="border border-border p-2" onClick={incrementar}>Incrementar</button>
        </>  
    );
}

// 1- React solo actualiza la interfaz cuando cambia el estado useState
// 2- Lu UI en este ultimo ejemplo deja de actualizarsepor que no estamos llamando a setCount, que es un mecanismoque le indica a reactque debe
//renderizarse
//3-Cada vez que llamamos a serCount, le estamos diciendo a react que el estado debe actualizarse y el componente debe volver a renderizarse
