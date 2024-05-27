export default function Home() {
  return (
    <div className='text-center'>
        <h1 className="text-center font-mono font-bold text-3xl">GitHub Followers Manager</h1>
        <a href="https://github.com/Intina47" target="_blank" rel="noopener noreferrer">
            <svg className="mx-auto h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.09.682-.217.682-.482 0-.237-.009-.866-.014-1.7-2.782.6-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.46-1.11-1.46-.908-.62.069-.608.069-.608 1.003.07 1.532 1.03 1.532 1.03.891 1.529 2.341 1.088 2.91.833.091-.645.349-1.088.635-1.337-2.22-.25-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.251-.447-1.265.098-2.634 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 7.07c.85.004 1.705.115 2.5.337 1.909-1.296 2.747-1.026 2.747-1.026.547 1.37.203 2.383.1 2.634.64.698 1.026 1.59 1.026 2.682 0 3.841-2.337 4.687-4.565 4.934.359.31.678.919.678 1.852 0 1.335-.012 2.415-.012 2.741 0 .267.18.576.688.479C19.137 20.164 22 16.416 22 12c0-5.523-4.477-10-10-10z"></path>
            </svg>
          </a>
        <a href="https://github-followers-manager.vercel.app/analyze-followers" className="bg-blue-300 rounded-lg mt-5 m-5 p-2 inline-block">See who does not follow you back</a>
    </div>
  )
}