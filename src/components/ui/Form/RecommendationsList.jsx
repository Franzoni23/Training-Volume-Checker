import { Box, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

const RecommendationsList = ({ recommendations }) => {
  if (recommendations.length === 0) return null;
  
  return (
    <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
      <Typography sx={{ fontSize: 18,}} >Recommendations:</Typography>
      <List>
        {recommendations.map((rec, index) => (
          <ListItem key={index}>
            <Paper sx={{ p: 2, textAlign: 'center', width: '100%'  }}>
              <ListItemText sx={{ }} primary={rec}  />
            </Paper>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RecommendationsList;
