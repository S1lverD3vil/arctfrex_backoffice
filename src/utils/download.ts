export const downloadFile = async (url: string, filename: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch file");

    const blob = await response.blob();

    // Extract extension from URL
    const urlParts = url.split("?");
    const pathname = urlParts[0];
    const extension = pathname.substring(pathname.lastIndexOf("."));

    // Ensure filename includes the extension
    const finalFilename = filename.endsWith(extension)
      ? filename
      : `${filename}${extension}`;

    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = finalFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Download failed:", error);
  }
};
