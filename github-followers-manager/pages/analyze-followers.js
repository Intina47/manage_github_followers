/* eslint-disable @next/next/no-sync-scripts */
import { Analytics } from "@vercel/analytics/react"
import Head from 'next/head';
import '@/app/globals.css';

export default function Test() {
    return (
      <>
        <div className='text-center'>
        <Head>
          <script src="https://unpkg.com/htmx.org@1.6.1"></script>
        </Head>
        <main>
          <h1 className="text-center font-mono font-bold text-3xl">GitHub Followers Manager</h1>
          <a href="https://github.com/Intina47" target="_blank" rel="noopener noreferrer">
            <svg className="mx-auto h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.09.682-.217.682-.482 0-.237-.009-.866-.014-1.7-2.782.6-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.46-1.11-1.46-.908-.62.069-.608.069-.608 1.003.07 1.532 1.03 1.532 1.03.891 1.529 2.341 1.088 2.91.833.091-.645.349-1.088.635-1.337-2.22-.25-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.251-.447-1.265.098-2.634 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 7.07c.85.004 1.705.115 2.5.337 1.909-1.296 2.747-1.026 2.747-1.026.547 1.37.203 2.383.1 2.634.64.698 1.026 1.59 1.026 2.682 0 3.841-2.337 4.687-4.565 4.934.359.31.678.919.678 1.852 0 1.335-.012 2.415-.012 2.741 0 .267.18.576.688.479C19.137 20.164 22 16.416 22 12c0-5.523-4.477-10-10-10z"></path>
            </svg>
          </a>
          <form hx-post="/api/recommendation" hx-trigger="submit" hx-target="#results" hx-swap="innerHTML" className="mt-10">
            <input type="text" name="username" className="border-1 border-black bg-gray-300 rounded-lg p-2 font-mono" placeholder="Enter your username" />
            <button type="submit" className="bg-purple-200 text-black font-mono font-bold rounded-lg p-2 ml-1 hover:bg-blue-50">analyze</button>
          </form>
          <div id="results" className='mx-6'>
          </div>
        </main>
      </div>
      <Analytics />
    </>
    )
}