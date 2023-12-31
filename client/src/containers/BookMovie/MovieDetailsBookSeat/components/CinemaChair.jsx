import React from 'react';
import PropTypes from 'prop-types';

const CinemaChair = ({ color, rowLabel, chairNumber }) => {
  return (
    <>
      <svg width={24} height={24} fill="none">
        <path
          d="M7 11V13H17V11C17 9.14 18.28 7.59 20 7.14V6C20 4.35 18.65 3 17 3H7C5.35 3 4 4.35 4 6V7.14C5.72 7.59 7 9.14 7 11Z"
          fill={color}
        />
        <path
          d="M21 9C19.9 9 19 9.9 19 11V15H5V11C5 9.9 4.1 9 3 9C1.9 9 1 9.9 1 11V16C1 17.65 2.35 19 4 19V20C4 20.55 4.45 21 5 21C5.55 21 6 20.55 6 20V19H18V20C18 20.55 18.45 21 19 21C19.55 21 20 20.55 20 20V19C21.65 19 23 17.65 23 16V11C23 9.9 22.1 9 21 9Z"
          fill={color}
        />
      </svg>
    </>
  );
};

CinemaChair.propTypes = {
  color: PropTypes.oneOf(['red', 'green']).isRequired,
  rowLabel: PropTypes.string.isRequired,
  chairNumber: PropTypes.number.isRequired,
};

export default CinemaChair;
