 export const getTimeAgo = (createdAt) => {
  const postedDate = new Date(createdAt);
  const now = new Date();

  const diffInSeconds = Math.floor(
    (now - postedDate) / 1000
  );

  if (diffInSeconds < 60) {
    return "Just now";
  }

  const minutes = Math.floor(diffInSeconds / 60);

  if (minutes < 60) {
    return `${minutes} min ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hours ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 30) {
    return `${days} days ago`;
  }

  const months = Math.floor(days / 30);

  if (months < 12) {
    return `${months} months ago`;
  }

  const years = Math.floor(months / 12);

  return `${years} years ago`;
};

