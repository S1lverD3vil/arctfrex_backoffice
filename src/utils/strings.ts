export const convertKeyToSpaceSeparated = (key: string): string => {
  // Convert snake_case to spaces and then camelCase to spaces
  return key
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Insert space between camelCase words
    .toLowerCase(); // Convert the entire string to lowercase
};

export const ensureHttps = (url: string): string => {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `https://${url}`;
  }
  return url;
};

export const renderCell = (value: any) => {
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (typeof value === "string") {
    return String(value);
  }

  if (typeof value === "function") {
    return value();
  }

  if (typeof value === "object") {
    return value?.value || "";
  }

  return value;
};
