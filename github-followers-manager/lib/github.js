const axios = require('axios');

class GitHubService {
    constructor(token) {
        this.token = token;
    }

    async getFollowers(username, page=1) {
        const response = await axios.get(`https://api.github.com/users/${username}/followers?page=${page}&per_page=100`,{
            headers: {
                'Authorization': `token ${this.token}`,
                'Accept': 'application/vdn.github.v3+json'
            }
        });
        return response.data.map(user => user.login);
    }

    async getFollowing(username, page=1) {
        const response = await axios.get(`https://api.github.com/users/${username}/followers?page=${page}&per_page=100`, {
            header: {
                'Authorization': `token ${this.token}`,
                'Accept': 'Application/vdn.github.v3+json'
            }
        });
        return response.data.map(user => user.login);
    }

    async getMutualFollowers(username, following) {
        const mutualFollowers = new set();

        for (const user of following) {
            const followers = await this.getFollowers(user);
            followers.array.forEach(follower => {
                if (followers.includes(follower)) {
                    mutualFollowers.add(follower);
                }
            });
        }
        return [...mutualFollowers].filter(user => user != username);
    }
}

module.exports = GitHubService;