import React from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';
import { getAllUsers } from '../../Services/Users';

const AuthorFilter = ({ onFilterChange }) => {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('=== AuthorFilter Debug ===');
        console.log('Fetching users from database...');
        const allUsers = await getAllUsers();
        console.log('Received users from getAllUsers:', allUsers);
        
        // Add Anonymous option
        const options = [
          { label: 'Anonymous', id: 'anonymous', username: 'anonymous' },
          ...allUsers.map(user => ({
            label: `${user.firstName} ${user.lastName} (${user.username})`,
            id: user.id,
            username: user.username
          }))
        ];
        
        console.log('=== Generated Options for Autocomplete ===');
        console.table(options);
        console.log('=== End of Options List ===');
        
        setUsers(options);
        setLoading(false);
      } catch (error) {
        console.error('Error in AuthorFilter:', error);
        console.error('Error details:', {
          message: error.message,
          stack: error.stack
        });
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <Autocomplete
        options={users}
        loading={loading}
        onChange={(event, newValue) => {
          console.log('Selected user:', newValue);
          onFilterChange(newValue?.username || '');
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Filter by user"
            variant="outlined"
            fullWidth
          />
        )}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.id === value.id}
      />
    </Box>
  );
};

export default AuthorFilter; 