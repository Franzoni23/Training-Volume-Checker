import React, { useState } from 'react';
import {Container, Box, Button, TextField, Checkbox, FormControlLabel, Typography,Slider,} from '@mui/material';
import { checkVolume, generalRecommendations, formatRest } from '../../../utils/utils';
import ErrorMessage from './ErrorMessage';
import AnalysisResult from './AnalysisResult';
import RecommendationsList from './RecommendationsList';

const Form = () => {
  const [state, setState] = useState({
    series: '',
    loadProgress: false,
    weightIncrease: false,
    rest: 0,
    seriesError: false,
    seriesErrorKey: 0,
    volumeType: '',
    volumeAnalysis: '',
    recommendations: [],
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? e.target.checked : value;

    setState((prev) => ({
      ...prev,
      [name]: name === 'series' ? Math.max('', Number(val)) : val,
    }));
  };

  const handleSlider = (_, val) => setState({ ...state, rest: val });

  const handleSubmit = () => {
    const numericSeries = Number(state.series);
    if (isNaN(numericSeries) || numericSeries < 1 || numericSeries > 30) {
      setState((prev) => ({
        ...prev,
        seriesError: true,
        seriesErrorKey: Date.now(),
        recommendations: [],
      }));
      return;
    }

    const { volumeType, volumeAnalysis, recommendations } = checkVolume(
      numericSeries,
      state.loadProgress,
      state.weightIncrease,
      state.rest
    );

    setState({
      ...state,
      seriesError: false,
      volumeType,
      volumeAnalysis,
      recommendations,
    });
  };

  const handleGeneralRecommendations = () =>
    setState({
      ...state,
      volumeAnalysis: '',
      recommendations: generalRecommendations,
      seriesError: false,
      series: ''
    });

  return (
    <Container maxWidth="sm" sx={{ pt: 5, pb: 5, justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: 3 }}>
        <Typography
          sx={{
            fontSize: { xs: '1.3rem', sm: '1.6rem', md: '1.6rem' },
            textAlign: 'center',
            pb: 4,
          }}
        >
          Check training volume for hypertrophy:
        </Typography>

        <Box>
          <TextField
            label="Series per muscular group per session"
            name="series"
            fullWidth
            value={state.series}
            onChange={(series) => {
              const value = series.target.value;
              if (value === '') {
                setState((prev) => ({ ...prev, series: '', seriesError: false }));
                return;
              }

              if (!/^\d+$/.test(value)) return;

              const numericValue = Number(value);
              if (numericValue < 1 || numericValue > 30) {
                setState((prev) => ({ ...prev, series: numericValue, seriesError: true }));
              } else {
                setState((prev) => ({ ...prev, series: numericValue, seriesError: false }));
              }
            }}
            onKeyDown={(e) => {
              const isZero = e.key === '0';
              const isEmpty = state.series === '' || state.series === 0;

              if (isZero && isEmpty) {
                e.preventDefault();
              }
            }}
            error={state.seriesError}
            helperText={state.seriesError ? 'Please enter a value between 1 and 30.' : ''}
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
              min: 1,
              max: 30,
            }}
          />
        </Box>

        {state.seriesError && (state.series != '') && ( 
          <Box sx={{ pt: 1 }}>
            <ErrorMessage key={state.seriesErrorKey} />
          </Box>
        )}

        <Box sx={{ pt: 1, display: 'flex', flexDirection: 'column' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.loadProgress}
                onChange={handleChange}
                name="loadProgress"
              />
            }
            label="Progressing load"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.weightIncrease}
                onChange={handleChange}
                name="weightIncrease"
              />
            }
            label="Increasing weight"
          />
        </Box>

        <Box sx={{ pt: 1 }}>
          <Typography>Rest:</Typography>
          <Slider value={state.rest} onChange={handleSlider} min={0} max={121} step={1} />
          <Typography sx={{ textAlign: 'center' }}>{formatRest(state.rest)}</Typography>
        </Box>

        <Button variant="contained" fullWidth onClick={handleSubmit} sx={{ mt: 2 }}>
          Check Volume
        </Button>

        <Button variant="outlined" fullWidth onClick={handleGeneralRecommendations} sx={{ mt: 1 }}>
          General Recommendations
        </Button>

        <AnalysisResult volumeType={state.volumeType} volumeAnalysis={state.volumeAnalysis} />
        <RecommendationsList recommendations={state.recommendations} />
      </Box>
    </Container>
  );
};

export default Form;
