const axios = require('axios');
  
export default async (req, res) => {
  if (req.method === 'POST') {
    const { username , page = 1} = req.body;
    console.log("Received username: ", username);

    try {
      const followersRes = await axios.get(`https://api.github.com/users/${username}/followers?page=${page}&per_page=100`);
      const followingRes = await axios.get(`https://api.github.com/users/${username}/following?page=${page}&per_page=100`);

      const followers = followersRes.data.map(user => user.login);
      const following = followingRes.data.map(user => user.login);

      const notFollowingBack = following.filter(user => !followers.includes(user));

      // Generate stats
      const stats = `
      <div class="mt-2 flex flex-col text-sm font-thin  md:flex-row justify-between items-cente p-4 rounded-lg">
        <div class="my-2 md:my-0 md:mx-2 p-2 bg-blue-200 text-blue-700 rounded-lg">
          <p>Followers analyzed: ${followers.length}</p>
        </div>
        <div class="my-2 md:my-0 md:mx-2 p-2 bg-blue-200 text-blue-700 rounded-lg">
          <p>Following analyzed: ${following.length}</p>
        </div>
        <div class="my-2 md:my-0 md:mx-2 p-2 bg-blue-200 text-blue-700 rounded-lg">
          <p>Users not following you back: ${notFollowingBack.length}</p>
        </div>
      </div>
    `;

      // Generate HTML for each user not following back
      const userHtml = notFollowingBack.map(user => `
          <div class="my-2 p-2 bg-blue-100 rounded-lg flex justify-between items-center">
              <p class="text-blue-700">${user}</p>
              <a href="https://github.com/${user}" target="_blank" class="text-blue-500 hover:text-blue-800">View Profile</a>
          </div>
      `).join('');

      const html = `
          <div class="text-center">
          <h2 class="text-orange-400 font-mono">People who do not follow you back</h2>
          <hr class="bg-black" />
          ${userHtml}
          </div>
      `;

      res.status(200).send(stats + html);
    } catch (error) {
        const errorMessage = `
          <div class="my-2 p-2 bg-red-100 rounded-lg">
            <h2 class="text-red-700 font-bold">An error occurred</h2>
            <p class="text-red-700">${error.message}</p>
          </div>
        `;
        res.status(200).send(errorMessage);
    }
  } else {
    console.log("Method not allowed");
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}