// // const Card = ({product}) => {

// //     const {title, image, price, description } = product;
// // /* Jhonier
// // Cambio de color de la card a blanco con transparencia y blur, ademas de agregarle sombra y bordes redondeados ya que el diseño que traia no se veia bien.
// // */
// //     return (
// //         <div className="
// //             w-80
// //             text-text-inverse
// //             bg-white/70 
// //             backdrop-blur-[2px]        
// //             shadow-lg
// //             rounded-2xl
// //             overflow-hidden
// //             hover:shadow-black
// //             transition-shadow
// //             duration-700      
        
// //         ">

// //             <img
// //             src= {image}
// //             image= {title}
// //             className="w-full h-48 object-contain" 
// //             />

// //             <div className="p-5 space-y-3">

// //                 <h2 className="text-xl font-semibold">
// //                     {title}
// //                 </h2>

// //                 <p className="text-sm">
// //                     {description}
// //                 </p>

// //                 <p className="text-2xl font-bold text-label">

// //                     {/* Esto agrega separadores de miles, lo que mejora la lectura.
// //                     toLocaleString() */}
// //                     ${price.toLocaleString()}
// //                 </p>

// //             </div>
// //         </div>
// //     );
// // }

// // export default Card;

// const Card = ({product, onClick}) => {

//     const {title, image, price, description } = product;
// /* Jhonier
// Cambio de color de la card a blanco con transparencia y blur, ademas de agregarle sombra y bordes redondeados ya que el diseño que traia no se veia bien.
// */
//     return (
//         <div 
//             onClick={onClick}
//             className="
//             w-80
//             h-96
//             text-text-inverse
//             bg-white/70 
//             backdrop-blur-[2px]        
//             shadow-lg
//             rounded-2xl
//             overflow-hidden
//             hover:shadow-black
//             transition-shadow
//             duration-700
//             cursor-pointer
//             flex
//             flex-col
        
//         ">

//             <img
//             src= {image}
//             image= {title}
//             className="w-full h-48 object-contain flex-shrink-0" 
//             />

//             <div className="p-5 space-y-3 flex-1 flex flex-col">

//                 <h2 className="text-xl font-semibold">
//                     {title}
//                 </h2>

//                 <p className="text-sm flex-1 line-clamp-2">
//                     {description}
//                 </p>

//                 <p className="text-2xl font-bold text-label mt-auto">

//                     {/* Esto agrega separadores de miles, lo que mejora la lectura.
//                     toLocaleString() */}
//                     ${price.toLocaleString()}
//                 </p>

//             </div>
//         </div>
//     );
// }

// export default Card;

/**
 * Card
 * ----
 * Card visual reutilizable de producto.
 *
 * Ajuste:
 * - Ahora soporta onClick opcional
 * - Se mantiene el estilo visual ya aprobado
 */
const Card = ({ product, onClick }) => {
  const { title, image, price, description } = product;

  return (
    <div
      onClick={onClick}
      className="
        w-80
        h-96
        text-text-inverse
        bg-white/70
        backdrop-blur-[2px]
        shadow-lg
        rounded-2xl
        overflow-hidden
        hover:shadow-black
        transition-shadow
        duration-700
        cursor-pointer
        flex
        flex-col
      "
    >
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-contain flex-shrink-0"
      />

      <div className="p-5 space-y-3 flex-1 flex flex-col">
        <h2 className="text-xl font-semibold">
          {title}
        </h2>

        <p className="text-sm flex-1 line-clamp-2">
          {description}
        </p>

        <p className="text-2xl font-bold text-label mt-auto">
          ${price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Card;