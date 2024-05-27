import Head from 'next/head';
import '@/app/globals.css';

export default function Test() {
    return (
        <div className='text-center'>
        <Head>
          <script src="https://unpkg.com/htmx.org@1.6.1"></script>
        </Head>
        <main>
          <h1 className="text-center font-mono font-bold text-3xl">GitHub Followers Manager</h1>
          <form hx-post="/api/followers" hx-trigger="submit" hx-target="#results" className="mt-10">
            <input type="text" name="username" className="border-1 border-black bg-gray-300 rounded-lg p-2 font-mono" placeholder="Enter your username" />
            <button type="submit" className="bg-purple-200 text-black font-mono font-bold rounded-lg p-2 ml-1 hover:bg-blue-50">Submit</button>
          </form>
          <div id="results"></div>
        </main>
      </div>
    )
}