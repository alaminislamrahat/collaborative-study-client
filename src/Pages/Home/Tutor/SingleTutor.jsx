const SingleTutor = ({ item }) => {
    const { email, name, photo, role } = item;
  
    return (
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          className="w-full h-40 object-cover"
          src={photo}
          alt={name}
        />
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800 truncate">{name}</h2>
          <p className="text-sm text-gray-600 truncate">{email}</p>
          <div className="mt-2">
            <span className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded">
              {role}
            </span>
          </div>
        </div>
      </div>
    );
  };
  
  export default SingleTutor;
  