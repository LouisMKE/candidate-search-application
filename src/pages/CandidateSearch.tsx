import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>(''); // For capturing user search input
  const [candidates, setCandidates] = useState<any[]>([]); // For search results
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null); // For selected user details
  const [loading, setLoading] = useState<boolean>(false); // To show loading state
  const [error, setError] = useState<string | null>(null); // To display error messages

  // Function to fetch candidate list based on the search term
  const fetchCandidates = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const results = await searchGithub(searchTerm);
      setCandidates(results);
    } catch (err) {
      setError('Error fetching candidates. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch details for a specific candidate
  const fetchCandidateDetails = async (username: string) => {
    setLoading(true);
    setError(null);

    try {
      const userDetails = await searchGithubUser(username);
      setSelectedCandidate(userDetails);
    } catch (err) {
      setError('Error fetching candidate details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Fetch candidates when the search term changes (with debounce)
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchTerm) {
        fetchCandidates();
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  return (
    <div>
      <h1>Candidate Search</h1>
      <input
        type="text"
        placeholder="Search GitHub users..."
        value={searchTerm}
        onChange={handleInputChange}
        style={{ padding: '10px', width: '100%', marginBottom: '20px' }}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {candidates.map((candidate: any) => (
          <li key={candidate.login}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                fetchCandidateDetails(candidate.login);
              }}
            >
              {candidate.login}
            </a>
          </li>
        ))}
      </ul>

      {selectedCandidate && (
        <div style={{ marginTop: '20px' }}>
          <h2>Candidate Details</h2>
          <p><strong>Username:</strong> {selectedCandidate.login}</p>
          <p><strong>Profile URL:</strong> <a href={selectedCandidate.html_url} target="_blank" rel="noopener noreferrer">{selectedCandidate.html_url}</a></p>
          <p><strong>Followers:</strong> {selectedCandidate.followers}</p>
          <p><strong>Following:</strong> {selectedCandidate.following}</p>
          <p><strong>Repositories:</strong> {selectedCandidate.public_repos}</p>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;
