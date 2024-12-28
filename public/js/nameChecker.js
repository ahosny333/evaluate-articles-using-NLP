function checkForName(str) {
    try {
      // Create a new URL object from the input string
      new URL(str);
      return true;  // If no error occurs, the string is a valid URL
    } catch (e) {
      return false;  // If an error occurs, the string is not a valid URL
    }
  }

export { checkForName };
