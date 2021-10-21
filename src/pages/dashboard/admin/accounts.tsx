import { Box, Heading } from '@chakra-ui/react';

import UserList from '../../../components/dashboard/userList/UserList';

const Users = [
    {
        id: '#23478866',
        name: 'LaughingQuoll',
        email: 'me@laughingquoll.net',
        creationDate: 'April 10, 2021',
        thumb: '../../img/user-1.jpg',
        active: true
    },
    {
        id: '#23478866',
        name: 'Schamberger',
        email: 'Schamberger41@gmail.com',
        creationDate: 'April 10, 2021'
    },
    {
        id: '#23478866',
        name: 'LaughingQuoll',
        email: 'me@laughingquoll.net',
        creationDate: 'April 10, 2021',
        thumb: '../../img/user-1.jpg',
        active: true
    },
    {
        id: '#23478866',
        name: 'Schamberger',
        email: 'Schamberger41@gmail.com',
        creationDate: 'April 10, 2021'
    },
    {
        id: '#23478866',
        name: 'LaughingQuoll',
        email: 'me@laughingquoll.net',
        creationDate: 'April 10, 2021',
        thumb: '../../img/user-1.jpg',
        active: true
    },
    {
        id: '#23478866',
        name: 'Schamberger',
        email: 'Schamberger41@gmail.com',
        creationDate: 'April 10, 2021'
    },
    {
        id: '#23478866',
        name: 'LaughingQuoll',
        email: 'me@laughingquoll.net',
        creationDate: 'April 10, 2021',
        thumb: '../../img/user-1.jpg',
        active: true
    },
    {
        id: '#23478866',
        name: 'LaughingQuoll',
        email: 'me@laughingquoll.net',
        creationDate: 'April 10, 2021',
        thumb: '../../img/user-1.jpg',
        active: true
    },
    {
        id: '#23478866',
        name: 'Schamberger',
        email: 'Schamberger41@gmail.com',
        creationDate: 'April 10, 2021'
    }
];

const AccountsPage = () => {
    return (
        <Box width="100%" pb="40px">
            <Heading as="h3" size="lg" mb="7" fontWeight="500">
                Accounts
            </Heading>

            <UserList list={Users} />
            <br />
        </Box>
    );
};

export default AccountsPage;
