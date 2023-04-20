import Link from 'next/link'
import { useState } from 'react';
export async function getServerSideProps({ params : {page} }) {
    const res = await fetch(`https://openmovie.herokuapp.com/recent-release/movies?page=${page}`)
    const data = await res.json();

  return {
    props: {
      movies: data,
    }
  };
}

const Page = ({ movies }) => {
    const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
      };
    
      const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
      };
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
        <Link href={`/page/${currentPage - 1}`} onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded">

            Prev

        </Link>
        <Link href={`/page/${currentPage + 1}`} onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded">
          
            Next

        </Link>
      </div>
        </div>
    );
  };

  export default Page;