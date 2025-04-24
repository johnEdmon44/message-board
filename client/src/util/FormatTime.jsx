function FormatTime({ date }) {
  const parsedDate = new Date(date);
  const now = new Date();

  if (isNaN(parsedDate.getTime())) {
    return <small>Just now</small>; // fallback
  }

  const diffInMs = now - parsedDate;
  const diffInMinutes = diffInMs / (1000 * 60);
  const diffInHours = diffInMs / (1000 * 60 * 60);

  let formatted = "";

  if (diffInMinutes < 1) {
    formatted = "Just now";
  } else if (diffInMinutes < 60) {
    const mins = Math.floor(diffInMinutes);
    formatted = `${mins} min${mins !== 1 ? "s" : ""} ago`;
  } else if (diffInHours < 24) {
    const hrs = Math.floor(diffInHours);
    formatted = `${hrs} hr${hrs !== 1 ? "s" : ""} ago`;
  } else if (diffInHours < 48) {
    formatted = `Yesterday at ${parsedDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`;
  } else {
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());

    if (parsedDate >= startOfWeek) {
      formatted = parsedDate.toLocaleString("en-US", {
        weekday: "long",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } else {
      formatted = parsedDate.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
  }

  return <small>{formatted}</small>;
}


export default FormatTime;
