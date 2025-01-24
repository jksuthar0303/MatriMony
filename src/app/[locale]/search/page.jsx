
const SearchResults = () => {

  const profile = [
    { name: 'John', age: 28, gender: 'Male', caste: 'Suthar' },
    { name: 'Priya', age: 24, gender: 'Female', caste: 'Suthar' },
    { name: 'Rahul', age: 30, gender: 'Male', caste: 'Suthar' },
  ];


  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-700">Search Results</h1>
      <ul className="mt-6">
        
            <li  className="border p-4 rounded-lg mb-4">
              <p>Name: {profile.name}</p>
              <p>Age: {profile.age}</p>
              <p>Gender: {profile.gender}</p>
              <p>Caste: {profile.caste}</p>
            </li>
        
      </ul>
    </div>
  );
};

export default SearchResults;
