import GitHubService from '../../lib/github';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { username } = req.body;
    console.log("Received username:", username);

    try {
      const gitHubService = new GitHubService(process.env.GITHUB_TOKEN);

      const following = await gitHubService.getFollowing(username);
      const mutualFollowers = await gitHubService.getMutualFollowers(username, following);

      // Filter out users already followed by the user
      const notFollowing = mutualFollowers.filter(user => !following.includes(user));
      console.log("Not following:", notFollowing);

      // Generate HTML for each recommended user
      const userHtml = notFollowing.map(user => `
          <div class="my-2 p-2 bg-green-100 rounded-lg flex justify-between items-center">
              <p class="text-green-700">${user}</p>
              <a href="https://github.com/${user}" target="_blank" class="text-green-500 hover:text-green-800">View Profile</a>
              <button onclick="followUser('${user}')" class="ml-2 p-2 bg-green-500 text-white rounded-lg">Follow</button>
          </div>
      `).join('');

      const html = `
          <div class="text-center">
          <h2 class="text-orange-400 font-mono">Recommended Users to Follow</h2>
          <hr class="bg-black" />
          ${userHtml}
          </div>
      `;

      res.status(200).send(html);
    } catch (error) {
      console.log(error);
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
};
