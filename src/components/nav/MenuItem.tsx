import { Link, Text } from '@chakra-ui/layout';

interface MenuItemProps {
    children: React.ReactElement | string;
    isLast?: boolean;
    to: string;
}

const MenuItem = (props: MenuItemProps) => {
    const { children, isLast, to = '/', ...rest } = props;
    return (
        <Text
            mb={{ base: 6, sm: 0 }}
            mr={{ base: 0, sm: isLast ? 0 : 8 }}
            display="block"
            fontSize="md"
            {...rest}>
            <Link to={to} color="white">
                {children}
            </Link>
        </Text>
    );
};

export default MenuItem;
