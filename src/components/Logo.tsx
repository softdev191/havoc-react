import { forwardRef, Img } from '@chakra-ui/react';

interface LogoProps {
    color?: string;
}

export const Logo = forwardRef<LogoProps, 'div'>((props, ref) => {
    const { ...rest } = props;

    return (
        <Img height="60px" ref={ref} {...rest} src="../../../../img/logo.png" />
    );
});
