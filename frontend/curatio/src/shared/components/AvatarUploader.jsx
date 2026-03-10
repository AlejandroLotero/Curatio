// Importa el componente reutilizable FileInput desde la capa de UI. 
// Este componente encapsula la lógica de selección y previsualización de archivos. 
import FileInput from "./FileInput"; 
 
/** 
 * AvatarUploader 
 * ---------------- 
 * Componente presentacional encargado de permitir la carga 
 * de la imagen de perfil del usuario (avatar). 
 * 
 * Responsabilidad: 
 * - Configurar el componente FileInput con las restricciones 
 *   necesarias para imágenes de perfil.
 *  * - Delegar la gestión del archivo seleccionado al componente padre 
 *   mediante la prop `onChange`. 
 * 
 * @param {Object} props 
 * @param {Function} props.onChange - Callback que se ejecuta cuando el 
usuario 
 * selecciona o carga una nueva imagen. 
 */ 
export default function AvatarUploader({ onChange }) { 
  return ( 
    <FileInput 
      // Etiqueta mostrada al usuario 
      label="Foto de perfil" 
      // Tipos de archivo permitidos (PNG y JPEG) 
      accept="image/png, image/jpeg" 
      // Callback que propaga el archivo seleccionado al componente padre 
      onUpload={onChange} 
    /> 
  ); 
} 