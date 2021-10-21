import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import PackageBox from 'components/dashboard/components/submission/PackageBox';

const SubmissionsPage = () => {
    const packages1 = [
        {
            imageUrl: '../../img/1.png',
            title: 'Fluid Widget (Smoke Widget',
            name: 'Ginsu',
            version: 'v.2.06',
            status: 0,
            date: '03/19/2021',
            category: 'Themes',
            price: '$9.99',
            shortDescription: 'Neumorphism/Glyphs IconPack for IOS',
            dependencies: 'None',
            iosVersion: '7 - 14.5',
            changes: 'V1.5 adds 28 more icons. Some icons got redesigned',
            description:
                'Welcome to CarBridge Give your car superpowers with CarBridge! Open any app from your phone and use it on your CarPlay enabled car! Features include:',
            gallery: [
                {
                    image: 'https://via.placeholder.com/150x100'
                },
                {
                    image: 'https://via.placeholder.com/150x100'
                },
                {
                    image: 'https://via.placeholder.com/150x100'
                },
                {
                    image: 'https://via.placeholder.com/150x100'
                },
                {
                    image: 'https://via.placeholder.com/150x100'
                }
            ]
        },
        {
            imageUrl: '../../img/2.png',
            title: 'SmokeBoard Pro',
            name: 'Ginsu',
            version: 'v.1',
            status: 0
        },
        {
            imageUrl: '../../img/3.png',
            title: 'LittleXS',
            name: 'Ryan Nair',
            version: 'v.1.5',
            status: 0
        }
    ];

    const packages2 = [
        {
            imageUrl: '../../img/4.png',
            title: 'CarBirdge',
            name: 'leftyfl1p',
            version: 'v.6.09',
            status: 1
        },
        {
            imageUrl: '../../img/5.png',
            title: 'PowerModule',
            name: 'Muirey03',
            version: 'v.1.02',
            status: 2
        },
        {
            imageUrl: '../../img/6.png',
            title: 'BackupAZ 4 (iOS 13-14)',
            name: 'SynnyG_R',
            version: 'v.1.00',
            status: 1
        },
        {
            imageUrl: '../../img/7.png',
            title: 'Cask 2',
            name: 'Ryan Nair',
            version: 'v.8.05',
            status: 1
        },
        {
            imageUrl: '../../img/8.png',
            title: 'BigSurBar',
            name: 'leftyfl1p',
            version: 'v.9.0',
            status: 1
        },
        {
            imageUrl: '../../img/9.png',
            title: 'Prysm',
            name: 'Alpha_Stream',
            version: 'v.8.0',
            status: 1
        }
    ];

    return (
        <Box width="100%">
            <Text fontSize="4xl">Product update review list</Text>
            <br />
            <Heading as="h4" size="md" mb="3">
                New Updates
            </Heading>
            <SimpleGrid minChildWidth="250px" spacing="40px">
                {packages1.map((pack, index) => (
                    <PackageBox key={index} {...pack} />
                ))}
                {packages1.length == 3 && <Box></Box>}
            </SimpleGrid>
            <Heading as="h4" size="md" mt="10" mb="3">
                Verified Updates
            </Heading>
            <SimpleGrid minChildWidth="250px" spacing="40px">
                {packages2.map((pack, index) => (
                    <PackageBox key={index} {...pack} />
                ))}
                {packages2.length == 3 && <Box></Box>}
            </SimpleGrid>
        </Box>
    );
};

export default SubmissionsPage;
