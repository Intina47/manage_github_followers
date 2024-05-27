const axios = require('axios');

export default async (req, res) => {
  if (req.method === 'POST') {
    const { username } = req.body;
    console.log("Received username: ", username);

    try {
      const followersRes = await axios.get(`https://api.github.com/users/${username}/followers`);
      const followingRes = await axios.get(`https://api.github.com/users/${username}/following`);

      const followers = followersRes.data.map(user => user.login);
      const following = followingRes.data.map(user => user.login);

      const notFollowingBack = following.filter(user => !followers.includes(user));
      const notFollowedBack = followers.filter(user => !following.includes(user));

      // Generate stats
      const stats = `
      <div class="mt-2 flex flex-col text-sm font-thin  md:flex-row justify-between items-cente p-4 rounded-lg">
        <div class="my-2 md:my-0 md:mx-2 p-2 bg-blue-200 text-blue-700 rounded-lg">
          <p>Followers: ${followers.length}</p>
        </div>
        <div class="my-2 md:my-0 md:mx-2 p-2 bg-blue-200 text-blue-700 rounded-lg">
          <p>Following: ${following.length}</p>
        </div>
        <div class="my-2 md:my-0 md:mx-2 p-2 bg-blue-200 text-blue-700 rounded-lg">
          <p>Not Following Back: ${notFollowingBack.length}</p>
        </div>
        <div class="my-2 md:my-0 md:mx-2 p-2 bg-blue-200 text-blue-700 rounded-lg">
          <p>Not Followed Back: ${notFollowedBack.length}</p>
        </div>
      </div>
    `;
    

      // Generate HTML for each user not following back
      const html = notFollowingBack.map(user => `
        <div class="my-2 p-2 bg-blue-100 rounded-lg">
          <p class="text-blue-700">${user}</p>
        </div>
      `).join('');

      res.status(200).send(stats + html);
    } catch (error) {
      console.log("An error occurred:", error);
      res.status(500).json({ error: 'Failed to fetch followers' });
    }
  } else {
    console.log("Method not allowed");
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}