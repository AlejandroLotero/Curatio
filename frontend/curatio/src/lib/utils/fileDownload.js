/**
 * Descarga un archivo binario recibido desde axios.
 */
export function triggerBrowserDownload(blobData, filename, mimeType = "application/octet-stream") {
  const blob = new Blob([blobData], { type: mimeType });
  const url = window.URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  window.URL.revokeObjectURL(url);
}