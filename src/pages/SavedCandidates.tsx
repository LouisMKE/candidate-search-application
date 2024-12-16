import { useState, useEffect } from 'react';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<any[]>([]); // State for saved candidates
  const [loading, setLoading] = useState<boolean>(true); // State for loading indicator
  const [error, setError] = useState<string | null>(null); // State for error handling

  // Function to fetch saved candidates from local storage or API
  const fetchSavedCandidates = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulating data fetching
      const candidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      setSavedCandidates(candidates); // Update saved candidates state
    } catch (err) {
      setError('Error fetching saved candidates.');
    } finally {
      setLoading(false);
    }
  };

  // UseEffect to fetch saved candidates on component mount
  useEffect(() => {
    fetchSavedCandidates();
  }, []);

  return (
    <div>
      <h1>Potential Candidates</h1>
      {loading && <p>Loading saved candidates...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {savedCandidates.length === 0 && !loading && <p>No saved candidates found.</p>}
      <ul>
        {savedCandidates.map((candidate: any, index: number) => (
          <li key={index}>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
              {candidate.login}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedCandidates;
