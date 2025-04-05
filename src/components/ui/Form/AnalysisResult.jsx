import { Box, Typography } from '@mui/material';
import { analysisColors } from '../../../utils/utils';

const AnalysisResult = ({ volumeType, volumeAnalysis }) => {
  if (!volumeAnalysis) return null;
  
  return (
    <Box sx={{ mt: 2, p: 2, bgcolor: analysisColors[volumeType] || analysisColors.default, borderRadius: 1 }}>
      <Typography align="center" color='black'>{volumeAnalysis}</Typography>
    </Box>
  );
};

export default AnalysisResult;