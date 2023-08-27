function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if single digit
    const monthIndex = date.getMonth();
    const year = date.getFullYear().toString().slice(0); // Get the last two digits of the year
    const formattedDate = `${year}-${String(monthIndex + 1).padStart(2,"0")}-${day}`; // Add leading zero if single digit
    return formattedDate;
  }
  
  module.exports = formatDate;