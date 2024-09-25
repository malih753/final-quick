export const tryParseImages = (images) => {
  try {
    // Check if the string starts and ends with square brackets, indicating it's a stringified array
    if (
      typeof images === "string" &&
      images.startsWith("[") &&
      images.endsWith("]")
    ) {
      // console.log(JSON.parse(images));
      return JSON.parse(images)[0]; // Parse the string as JSON
    } else {
      console.log();
      return JSON.parse(JSON.parse(images))[0] // Return an empty array if it's not a valid stringified array
    }
  } catch (error) {
    console.error("Failed to parse images:", error);
    return []; // Return an empty array if parsing fails
  }
};
