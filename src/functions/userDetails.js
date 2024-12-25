function getUserDetails() {
  if (typeof window !== 'undefined') {
    // Check if the window object is available (for SSR safety)
    const userDetails = localStorage.getItem('userDetailsData');
    return userDetails ? JSON.parse(userDetails) : null; // Return parsed data or null if not found
  }
  return null; // In case of SSR (Server-Side Rendering), return null
}

// Call the function and save the result in a variable
const userDetailsData = getUserDetails();

// Log the user details for debugging (optional)
console.log('user details from localStorage are:', userDetailsData);

// Export the variable holding the user details
export default userDetailsData;
