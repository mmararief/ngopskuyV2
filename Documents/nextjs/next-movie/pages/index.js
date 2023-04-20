import React from 'react';
import Link from 'next/link'

export async function getServerSideProps() {
  // Fetch movies data from the API
  const page = 1
  const response = await fetch(`https://openmovie.herokuapp.com/recent-release/movies?page=${page}`);
  const data = await response.json();

  return {
    props: {
      movies: data // Pass movies data as props
    }
    
  };
}

const Home = ({ movies }) => {
  // Render movies data to the UI
  console.log('[HomePage] render:', movies);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie._id} className="border border-white rounded-md p-4 shadow hover:shadow-xl">
            <Link href={`/movies/${movie._id}`}>
            <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
            <img src={movie.posterImg} alt={movie.title} className="w-full h-48 object-cover mb-2" />
            <p className="text-gray-600">Rating: {movie.rating}</p>
            <p className="text-gray-600">Genres: {movie.genres.join(', ')}</p>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded"
        ><Link href='/page/2'>
          Next</Link>
        </button>
      </div>
      </div>
  );
};

export default Home;
