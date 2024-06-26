/* eslint-disable @next/next/no-sync-scripts */
import { Analytics } from "@vercel/analytics/react"
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import '@/app/globals.css';

export default function Test() {
  const [isToastShown, setIsToastShown] = useState(false);

  const handleloadingstate = () => {
    if (document.querySelector('input').value === '') {
      if (!isToastShown) {
      toast.error('Please enter a valid username');
      setIsToastShown(true);
      }
      return;
    }
    document.getElementById('loading').style.display = 'block';

    setTimeout(() => {
      document.getElementById('loading').style.display = 'none';
    }
    , 1000);
  }

    return (
      <>
        <div className='text-center'>
        <Head>
          <script src="https://unpkg.com/htmx.org@1.6.1"></script>
        </Head>
        <main>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          limit={1}
          pauseOnHover
          theme="dark"
          />
          <h1 className="text-center font-mono font-bold text-3xl">GitHub Followers Manager</h1>
          <a href="https://github.com/Intina47/manage_github_followers.git" target="_blank" rel="noopener noreferrer">
            <svg className="mx-auto h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.09.682-.217.682-.482 0-.237-.009-.866-.014-1.7-2.782.6-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.46-1.11-1.46-.908-.62.069-.608.069-.608 1.003.07 1.532 1.03 1.532 1.03.891 1.529 2.341 1.088 2.91.833.091-.645.349-1.088.635-1.337-2.22-.25-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.251-.447-1.265.098-2.634 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 7.07c.85.004 1.705.115 2.5.337 1.909-1.296 2.747-1.026 2.747-1.026.547 1.37.203 2.383.1 2.634.64.698 1.026 1.59 1.026 2.682 0 3.841-2.337 4.687-4.565 4.934.359.31.678.919.678 1.852 0 1.335-.012 2.415-.012 2.741 0 .267.18.576.688.479C19.137 20.164 22 16.416 22 12c0-5.523-4.477-10-10-10z"></path>
            </svg>
          </a>
          <form hx-post="/api/analyze" hx-trigger="submit" hx-indicator="#loading" hx-swap-oob="true" 
          hx-target="#results" hx-swap="innerHTML" className="mt-10">
            <input type="username" name="username" className="border-1 border-black 
            bg-gray-300 rounded-lg p-2 font-mono" placeholder="Enter your username" required />
            <button onClick={handleloadingstate} type="submit" className="bg-purple-200 text-black
             font-mono font-bold rounded-lg p-2 ml-1 hover:bg-blue-50">analyze</button>
          </form>
          <div id="loading" style={{display: 'none'}} className="mt-1"  role="status">
              <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin 
              dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" 
              xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 
                  78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 
                  22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 
                  91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 
                  72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" 
                  fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932
                   28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 
                   7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 
                   46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 
                   6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191
                   9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 
                   17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 
                   35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
          </div>
          <div id="results" className='mx-6 mt-2'></div>
        </main>
      </div>
      <Analytics />
    </>
    )
}
