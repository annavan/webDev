import React from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';
import { getPosts } from '../../Services/Posts.jsx';

const AuthorFilter = ({ onFilterChange }) => {
  const [authors, setAuthors] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const posts = await getPosts();
        // Extract unique authors from posts
        const uniqueAuthors = [...new Set(posts.map(post => post.author?.username || 'Anonymous'))];
        setAuthors(uniqueAuthors.map(author => ({ label: author })));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching authors:', error);
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <Autocomplete
        options={authors}
        loading={loading}
        onChange={(event, newValue) => {
          onFilterChange(newValue?.label || '');
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Filter by author"
            variant="outlined"
            fullWidth
          />
        )}
      />
    </Box>
  );
};

export default AuthorFilter; 