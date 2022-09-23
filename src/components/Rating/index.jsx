import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function BasicRating(props) {
  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">Avaliações da Internet</Typography>
      <Rating name="half-rating-read" max={10} defaultValue={props.value} precision={0.5} readOnly />

    </Box>
  );
}
