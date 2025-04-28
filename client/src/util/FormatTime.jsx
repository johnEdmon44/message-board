function FormatTime({ date }) {
  const parsedDate = new Date(date);
  const now = new Date();
  
  if (isNaN(parsedDate.getTime())) {
    return <small>Just now</small>; // fallback
  }
  
  const diffInMs = now - parsedDate;
  const diffInMinutes = diffInMs / (1000 * 60);
  const diffInHours = diffInMs / (1000 * 60 * 60);
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  let formatted = "";
  
  // Calculate date 7 days ago
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);
  
  if (diffInMinutes < 1) {
    formatted = "Just now";
  } else if (diffInMinutes < 60) {
    const mins = Math.floor(diffInMinutes);
    formatted = `${mins} min${mins !== 1 ? "s" : ""} ago`;
  } else if (diffInHours < 24) {
    const hrs = Math.floor(diffInHours);
    formatted = `${hrs} hr${hrs !== 1 ? "s" : ""} ago`;
  } else if (diffInDays < 1) {
    formatted = `Today at ${parsedDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`;
  } else if (diffInDays < 2) {
    formatted = `Yesterday at ${parsedDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`;
  } else if (parsedDate >= sevenDaysAgo) {
    // If message is from last 7 days, show the weekday name
    formatted = parsedDate.toLocaleString("en-US", {
      weekday: "long", // This will display Monday, Tuesday, etc.
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } else {
    // For older messages, show the full date
    formatted = parsedDate.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
  
  return <small>{formatted}</small>;
}

export default FormatTime;