const axios = require('axios');

class GitHubService {
    constructor(token) {
        console.log("GitHubService token: ", token);
        this.token = token;
    }

    async getFollowers(username, page) {
        const response = await axios.get(`https://api.github.com/users/${username}/followers?page=${page}&per_page=100`,{
            headers: {
                'Authorization': `token ${this.token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        return response.data.map(user => user.login);
    }

    async getFollowing(username, page) {
        const response = await axios.get(`https://api.github.com/users/${username}/followers?page=${page}&per_page=100`, {
            header: {
                'Authorization': `token ${this.token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        return response.data.map(user => user.login);
    }

async getMutualFollowers(username, following) {
    const mutualFollowers = new Set();

    for (const user of following) {
        if (mutualFollowers.size >= 10) {
            break;
        }
        const followers = await this.getFollowers(user);
        followers.forEach(follower => {
            if (followers.includes(follower) && follower != username && mutualFollowers.size < 10) {
                mutualFollowers.add(follower);
            }
        });
    }
    console.log("Mutual followers:\n ", mutualFollowers);
    return [...mutualFollowers];
}
}

module.exports = GitHubService;