import GitHubService from '../../lib/github';

/**
 * Analyzes the GitHub followers and following of a user and generates HTML
 * to display users who do not follow back and recommended users to follow.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the analysis is complete.
 */
export default async (req, res) => {
  if (req.method === 'POST') {
    const { username } = req.body;
    console.log("Received username:", username);

    try {
      const gitHubService = new GitHubService(process.env.GITHUB_TOKEN);

      // Fetch followers and following
      const followersRes = await gitHubService.getFollowers(username, 1);
      const followingRes = await gitHubService.getFollowing(username, 1);

      // Identify users not following back
      const notFollowingBack = followingRes.filter(user => !followersRes.includes(user));

      // Get mutual followers to recommend users
      const mutualFollowers = await gitHubService.getMutualFollowers(username, followingRes);
      const notFollowing = mutualFollowers.filter(user => !followingRes.includes(user));

      // Generate HTML for users not following back
      const notFollowingBackHtml = notFollowingBack.map(user => `
        <div class="my-2 p-2 bg-blue-100 rounded-lg flex justify-between items-center">
          <p class="text-blue-700">${user}</p>
          <a href="https://github.com/${user}" target="_blank" class="text-blue-500 hover:text-blue-800">View Profile</a>
        </div>
      `).join('');

      // Generate HTML for recommended users to follow
      const recommendedHtml = notFollowing.map(user => `
        <div class="my-2 p-2 bg-green-100 rounded-lg flex justify-between items-center">
          <p class="text-green-700">${user}</p>
          <a href="https://github.com/${user}" target="_blank" class="text-green-500 hover:text-green-800">Follow</a>
        </div>
      `).join('');

      // Combine both sections
      const html = `
        <div class="text-center">
          <h2 class="text-black font-mono font-bold text-lg">People who do not follow you back</h2>
          <hr class="bg-black" />
          ${notFollowingBackHtml}
          <h2 class="text-orange-400 font-mono">Recommended Users to Follow</h2>
          <hr class="bg-black" />
          ${recommendedHtml}
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
