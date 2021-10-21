import {
    Alert,
    AlertDescription,
    AlertTitle,
    CircularProgress
} from '@chakra-ui/react';

const PendingPackageCell = (props: { pendingCount: number }) => {
    return (
        <Alert status="info">
            <CircularProgress
                isIndeterminate
                color="green.400"
                size="1.4em"
                pr=".5em"
            />
            <AlertTitle mr={2}>Processing Packages:</AlertTitle>
            <AlertDescription>{props.pendingCount}</AlertDescription>
        </Alert>
    );
};

export default PendingPackageCell;
