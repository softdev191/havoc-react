import { useToast } from '@chakra-ui/react';
import React from 'react';

const ShowError = (props: { err: Error }) => {
    const msg = props.err.message || 'An unknown error occured';
    const toast = useToast();

    if (toast.isActive(msg)) {
        return <></>;
    }

    console.error(props.err);
    toast({
        id: msg,
        title: msg,
        status: 'error',
        duration: 9001
    });

    return <></>;
};

export default ShowError;
