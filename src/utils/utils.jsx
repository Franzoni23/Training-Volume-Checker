export const formatRest = (value) => {
    if (value > 120) return '> 2 minutes';
    const minutes = Math.floor(value / 60);
    const seconds = value % 60;
    return minutes ? `${minutes} min ${seconds ? `and ${seconds} sec` : ''}` : `${seconds} sec`;
};

export const analysisColors = {
    low: '#f44336', // Red
    ideal_high: '#4caf50', // Green
    high_eat: '#ffeb3b', // Yellow
    high: '#f44336', // Red
    ideal: '#4caf50', // Green
    eat: '#ffeb3b', // Yellow
    rest: '#ffeb3b', // Yellow
    increase: '#f44336', // Red
    split: '#ffeb3b', // Yellow
    default: '#9e9e9e', // Gray
};

export const generalRecommendations = [
    'Do between 5 and 10 sets per muscle group per session.',
    'Rest between 2 to 5 minutes between sets.',
    'Aim to progressively increase the load over time.',
    'Wait 12 to 16 weeks to evaluate results.',
    'It is recommended to hire a physical education and nutrition professional.'
];

export const checkVolume = (sets, loadProgress, weightIncreasing, rest) => {
    let volumeType = '';
    let volumeAnalysis = '';
    let recommendations = [];
    
    if (sets < 5) {
        volumeType = 'low';
        volumeAnalysis = 'The training volume is very low, consider increasing the number of sets.';
        recommendations.push('Do between 5 and 10 sets per session per muscle group.');
        if (!loadProgress) recommendations.push('Check for load progression.');
        if (rest < 120) recommendations.push('Rest between 2 and 5 minutes between sets.');
    }
    
    if (sets >= 5 && sets < 10) {
      if (rest < 120) recommendations.push('Rest between 2 and 5 minutes between sets.');
      
      if (loadProgress) {
          volumeType = weightIncreasing ? 'ideal' : 'eat';
          volumeAnalysis = weightIncreasing 
              ? 'Your training volume is adequate.' 
              : 'Your training volume is adequate, but consider reviewing your diet.';
  
          if (!weightIncreasing) {
              recommendations.push('Between 1.6 and 2g of protein per kg of body weight per day.', 'Add 500 extra calories to what you burn.');
          }
      } else {
          volumeType = rest < 120 ? 'rest' : 'increase';
          volumeAnalysis = rest < 120 
              ? 'Your training volume may be adequate, but if the load is not progressing, review your rest.' 
              : 'Your training volume is likely low.';
  
          recommendations.push(
              rest < 120 ? 'Check for load progression.' : 'Increase sets by 20%.',
              'Wait 12 to 16 weeks.',
              'Check for load progression.'
          );
      }
  }

    if (sets >= 10 && sets <= 20) {
      if (loadProgress) {
          volumeType = weightIncreasing ? 'ideal' : 'eat';
          volumeAnalysis = weightIncreasing 
              ? 'Your training volume is adequate.' 
              : 'Your training volume is adequate, but consider reviewing your diet.';
          
          if (!weightIncreasing) {
              recommendations.push('Between 1.6 and 2g of protein per kg of body weight per day.', 'Add 500 extra calories to what you burn.');
          }
      } else {
          volumeType = rest < 120 ? 'rest' : 'split';
          volumeAnalysis = rest < 120
              ? 'Your training volume may be adequate, but if the load is not progressing, review your rest.'
              : 'Your training volume is high.';
          
          recommendations.push(
              rest < 120 ? 'Check for load progression.' : 'Split the sets into two workouts.',
              'Wait 12 to 16 weeks.',
              'Check for load progression.'
          );
      }
  }
    
  if (sets > 20) {
    if (loadProgress) {
        volumeType = weightIncreasing ? 'ideal_high' : 'high_eat';
        volumeAnalysis = weightIncreasing 
            ? 'Your training volume may be adequate for you, but be aware it is considered high.' 
            : 'Your training volume is adequate, but it is a high volume and you should review your diet.';

        if (!weightIncreasing) {
            recommendations.push('Between 1.6 and 2g of protein per kg of body weight per day.', 'Add 500 extra calories to what you burn.');
        } else {
            recommendations.push('Consider reducing volume once you hit a plateau.');
        }
    } else {
        volumeType = 'high';
        volumeAnalysis = 'Your training volume is very high, this is likely hindering your progress.';
        recommendations.push(
            'Do between 5 and 10 sets per session per muscle group.',
            'Split the sets in half.',
            'Split into two workouts.',
            'Wait 12 to 16 weeks.',
            'Check for load progression.'
        );
    }
  }
     return { volumeType, volumeAnalysis, recommendations };
};
