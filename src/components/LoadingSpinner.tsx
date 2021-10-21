import { Spinner, SpinnerProps } from '@chakra-ui/react';
import React from 'react';

export const LoadingSpinner = (props: SpinnerProps) => {
    return <Spinner {...props} />;
};

LoadingSpinner.defaultProps = {
    speed: '0.66s',
    emptyColor: 'darkGray',
    color: 'darkBlue',
    size: 'xl',
    thickness: '4px'
};

export default LoadingSpinner;
