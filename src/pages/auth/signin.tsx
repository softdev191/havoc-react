import { Box, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/layout';
import { Container } from 'components/Container';
import Loader from 'components/Loader';
import { ProviderCard } from 'components/ProviderCard';
import { useUserSession } from 'lib/Session';
import { useRouter } from 'next/dist/client/router';
import { getProviders } from 'next-auth/client';
import { AppProvider, DefaultProviders } from 'next-auth/providers';
import { useEffect } from 'react';

const SignIn = ({
    providers
}: {
    providers: Record<keyof DefaultProviders | string, AppProvider>;
}) => {
    const router = useRouter();
    const session = useUserSession();
    const { signedIn, loading } = session;

    useEffect(() => {
        signedIn && router.push('/dashboard');
    }, [router, signedIn]);

    if (loading) {
        return <Loader />;
    }

    return (
        <Grid w="100%" h="100%" templateColumns="repeat(5, 1fr)">
            <GridItem
                colSpan={{ xs: 5, sm: 5, md: 2, lg: 2, xl: 2 }}
                bg="darkBlue">
                <Box height="100%">
                    <Container height="100%">
                        <Flex
                            direction="column"
                            height="100%"
                            align="center"
                            justify="center">
                            <Heading
                                as="h3"
                                size="lg"
                                color="white"
                                textAlign="center">
                                Join the seller
                                <br /> community
                            </Heading>
                            <Text color="white" textAlign="center" mt={4}>
                                Download paid and free products for
                                <br /> IOS devices
                            </Text>
                        </Flex>
                    </Container>
                </Box>
            </GridItem>
            <GridItem
                colSpan={{ xs: 5, sm: 5, md: 3, lg: 3, xl: 3 }}
                bg="white.100">
                <Box height="100%">
                    <Container height="100%">
                        <Flex
                            direction="column"
                            height="100%"
                            width="100%"
                            align="center"
                            justify="center"
                            p="4">
                            <Heading
                                as="h3"
                                size="lg"
                                color="darkBlue"
                                textAlign="center"
                                marginBottom="30px">
                                Sign in with
                            </Heading>
                            <Flex
                                direction="column"
                                align="center"
                                width="100%">
                                {Object.values(providers).map((provider) => (
                                    <ProviderCard
                                        key={provider.name}
                                        provider={provider}
                                    />
                                ))}
                            </Flex>
                        </Flex>
                    </Container>
                </Box>
            </GridItem>
        </Grid>
    );
};

// This is the recommended way for Next.js 9.3 or newer
export const getServerSideProps = async () => {
    const providers = await getProviders();
    return {
        props: { providers }
    };
};

export default SignIn;
