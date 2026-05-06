import { useEffect, useState } from 'react'

function App() {
  const [jokes, setJokes] = useState([])
  const [status, setStatus] = useState("loading")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  async function jokeLoad(pageNum = 1) {
    try {
      setStatus("loading")
      const res = await fetch(
        `https://api.freeapi.app/api/v1/public/randomjokes?page=${pageNum}&limit=10`
      )
      const data = await res.json()
      setJokes(data.data.data)
      setTotalPages(data.data.totalPages)
      setStatus("success")
    } catch (error) {
      console.error(error)
      setStatus("error")
    }
  }

  useEffect(() => {
    jokeLoad(page)
  }, [page])


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Header */}
      <header className="pt-12 pb-8 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
          Joke Machine
        </h1>
        <p className="mt-3 text-lg text-gray-400 font-medium">
          Your daily dose of laughs ~powered by FreeAPI
        </p>
      </header>

      {/* Loading State */}
      {status === "loading" && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-14 h-14 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-purple-300 text-lg animate-pulse">Loading jokes...</p>
        </div>
      )}

      {/* Error State */}
      {status === "error" && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="text-6xl">😵</div>  
          <p className="text-red-400 text-xl font-semibold">Oops! Something went wrong</p>
          <button
            onClick={() => jokeLoad(page)}
            className="mt-2 px-6 py-2.5 bg-red-500/20 border border-red-500/50 text-red-300 rounded-full hover:bg-red-500/30 transition-all duration-300 cursor-pointer"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Jokes Grid */}
      {status === "success" && (
        <div className="max-w-6xl mx-auto px-6 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jokes.map((joke, index) => (
              <div
                key={joke.id}
                className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {/* Joke Number Badge */}
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-sm font-bold shadow-lg shadow-purple-500/30">
                  #{joke.id}
                </div>

                {/* Category Tags */}
                {joke.categories.length > 0 && (
                  <div className="flex gap-2 mb-3 justify-end">
                    {joke.categories.map((cat) => (
                      <span
                        key={cat}
                        className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-full"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                )}

                {/* Joke Content */}
                <p className="text-gray-200 text-base leading-relaxed mt-2 group-hover:text-white transition-colors duration-300">
                  {joke.content}
                </p>

                {/* Bottom Glow Line */}
                <div className="mt-5 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 rounded-full transition-all duration-700"></div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm font-semibold hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
            >
              ← Prev
            </button>

            <span className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-sm font-bold shadow-lg shadow-purple-500/25">
              Page {page} / {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm font-semibold hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
            >
              Next →
            </button>
          </div>

          {/* Shuffle Button */}
          <div className="text-center mt-6">
            <button
              onClick={() => jokeLoad(Math.floor(Math.random() * totalPages) + 1)}
              className="px-8 py-3 bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 rounded-full text-base font-bold shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
               Shuffle Jokes
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
