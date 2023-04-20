import React from 'react'

export async function getServerSideProps({ params : {id} }) {
    const res = await fetch(`https://openmovie.herokuapp.com/movies/${id}`)
    const response = await fetch(`https://openmovie.herokuapp.com/movies/${id}/streams`)
    const data = await res.json();
    const stream = await response.json();

  return {
    props: {
      movies: data,
      streams: stream // Pass movies data as props
    },
  };
}


const MovieList = ({ movies, streams }) => {
    console.log('render:',movies)
    console.log('streams:', streams)

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img className="w-full h-64 object-cover" src={movies.posterImg} alt={movies.title} />
                    <div className="p-4">
                        <h2 className="text-lg font-semibold mb-2">{movies.title}</h2>
                        <p className="text-gray-600 mb-2">Genres : {movies.genres}</p>
                        <p className="text-gray-600 mb-2">Quality : {movies.quality}</p>
                        <p className="text-gray-600 mb-2">Rating : {movies.rating}</p>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-4">
                        <h2 className="text-lg font-semibold mb-2">Sinopsis</h2>
                        <p className="text-gray-600 mb-2">{movies.synopsis}</p>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Video Streaming</h2>
                <div className="flex flex-wrap gap-4">
                    {streams.map((stream) => (
                        <div key={stream._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div class="mt-4 text-center">
                                <div class="iframe-container">
                                    <iframe id="video-frame" src={stream.url} frameborder="0" allowfullscreen></iframe>
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600 mb-2">Resolution : {stream.resolutions}</p>
                                <p className="text-gray-600 mb-2">Provider : {stream.provider}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default function getMovies({ movies , streams}) {
    console.log('[getMovies] render:', movies);
    console.log('[getMovies] render:', streams);
    return (
        // Render MovieList component with movies and streams props
        <MovieList movies={movies} streams={streams} />
    )
}