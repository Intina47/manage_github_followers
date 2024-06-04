const axios = require('axios');

/**
 * Represents a service for interacting with the GitHub API.
 */
class GitHubService {
    constructor(token) {
        this.axiosInstance = axios.create({
            baseURL: 'https://api.github.com',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
    }

    async getFollowers(username, page) {
        const response = await this.axiosInstance.get(`/users/${username}/followers?page=${page}&per_page=100`);
        return response.data.map(user => user.login);
    }

    async getFollowing(username, page) {
        const response = await this.axiosInstance.get(`/users/${username}/following?page=${page}&per_page=100`);
        return response.data.map(user => user.login);
    }

    async getMutualFollowers(username, following) {
        const mutualFollowers = new Set();
        let i = 0;

        while (mutualFollowers.size < 10 && i < following.length) {
            const followers = new Set(await this.getFollowers(following[i]));
            followers.forEach(follower => {
                if (following.includes(follower) && follower != username && mutualFollowers.size < 10) {
                    mutualFollowers.add(follower);
                }
            });
            i++;
        }
        
        return [...mutualFollowers]
    }
}

module.exports = GitHubService;