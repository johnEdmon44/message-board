function Error({ message }) {
  if (!message) return null;

  return (
    <div className="text-red-600 bg-red-100 border border-red-400 rounded px-4 py-2 mb-4">
      {message}
    </div>
  );
}

export default Error;