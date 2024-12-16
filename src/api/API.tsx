const searchGithub = async (searchTerm: string) => {
  try {
    const response = await fetch(
      `https://api.github.com/search/users?q=${searchTerm}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error('Invalid API response, check the network tab');
    }
    return data.items; // `search/users` API returns results in `items`
  } catch (err) {
    console.error('Error fetching GitHub users:', err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('Invalid API response, check the network tab');
    }
    return data;
  } catch (err) {
    console.error('Error fetching GitHub user details:', err);
    return {};
  }
};

export { searchGithub, searchGithubUser };
