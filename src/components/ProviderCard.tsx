import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { signIn } from 'lib/Session';
import { AppProvider } from 'next-auth/providers';
import { AiFillApple, AiOutlineGoogle } from 'react-icons/ai';
import { RiDiscordFill, RiFacebookFill } from 'react-icons/ri';

interface ColorsData {
    light: string;
    dark: string;
}

interface ProvidersData {
    apple: ColorsData;
    google: ColorsData;
    facebook: ColorsData;
    discord: ColorsData;
}

const COLORS: ProvidersData = {
    apple: {
        light: '#000000',
        dark: '#000000'
    },
    google: {
        light: '#CD523A',
        dark: '#AE4731'
    },
    facebook: {
        light: '#425893',
        dark: '#384B7D'
    },
    discord: {
        light: '#7788D4',
        dark: '#6574B4'
    }
};

export const ProviderCard = (props: { provider: AppProvider }) => {
    const key = `${props.provider.id}`;
    const bgColor = COLORS[key as keyof ProvidersData];

    const ProviderIcon = () => {
        const providerId = props.provider.id;

        switch ((providerId as unknown) as string) {
            case 'apple':
                return <AiFillApple />;
            case 'google':
                return <AiOutlineGoogle />;
            case 'facebook':
                return <RiFacebookFill />;
            case 'discord':
                return <RiDiscordFill />;
            default:
                return <RiDiscordFill />;
        }
    };

    const btnStyles = {
        cursor: 'pointer',
        borderRadius: '4px'
    };

    const onSignInHandler = async (providerId: string | undefined) => {
        await signIn(providerId, {
            callbackUrl: '/',
            redirect: true
        });
    };

    return (
        <Box
            width="100%"
            maxW="500px"
            height="65px"
            bgColor={bgColor.light}
            _hover={{ boxShadow: '2xl' }}
            {...btnStyles}
            onClick={() => {
                onSignInHandler(props.provider.id);
            }}>
            <Flex height="100%">
                <Box bgColor={bgColor.dark} width="70px">
                    <IconButton
                        width="100%"
                        height="100%"
                        borderRadius="0"
                        bgColor={bgColor.dark}
                        _hover={{ boxShadow: 'none' }}
                        color="white"
                        fontSize="28px"
                        variant="solid"
                        aria-label="Provider Icon"
                        icon={<ProviderIcon />}
                    />
                </Box>
                <Box flex="1">
                    <Flex align="center" justify="left" height="100%" px="4">
                        <Text color="white" fontWeight="500">
                            {props.provider.name}
                        </Text>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
};
