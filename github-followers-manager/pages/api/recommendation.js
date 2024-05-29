const axios = require('axios');

const getFollowers = async (username, page = 1) => {
  const response = await axios.get(`https://api.github.com/users/${username}/followers?page=${page}&per_page=100`, {
    headers: {
      'Authorization': `token ${process.env.GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  });
  return response.data.map(user => user.login);
};

const getFollowing = async (username, page = 1) => {
  const response = await axios.get(`https://api.github.com/users/${username}/following?page=${page}&per_page=100`, {
    headers: {
      'Authorization': `token ${process.env.GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  });
  return response.data.map(user => user.login);
};

const getMutualFollowers = async (username, following) => {
  const mutualFollowers = new Set();

  for (const user of following) {
    const followers = await getFollowers(user);
    followers.forEach(follower => {
      if (following.includes(follower)) {
        mutualFollowers.add(follower);
        console.log("Mutual follower:", follower);
      }
    });
  }

  return [...mutualFollowers].filter(user => user !== username);
};

export default async (req, res) => {
  if (req.method === 'POST') {
    const { username } = req.body;
    console.log("Received username:", username);

    try {
      const following = await getFollowing(username);
      const mutualFollowers = await getMutualFollowers(username, following);

      // Filter out users already followed by the user
      const notFollowing = mutualFollowers.filter(user => !following.includes(user));
      console.log("Not following:", notFollowing); // Add this log

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
          <script>
            async function followUser(user) {
              const response = await fetch('/api/follow', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user })
              });

              const result = await response.json();
              if (result.success) {
                alert(\`Successfully followed \${user}\`);
              } else {
                alert(\`Failed to follow \${user}\`);
              }
            }
          </script>
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
