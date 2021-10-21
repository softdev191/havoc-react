import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';
import '../styles/styles.css';

import { ChakraProvider } from '@chakra-ui/react';
import AuthLayout from 'components/layouts/Auth';
import DashboardLayout from 'components/layouts/Dashboard';
import PageLayout from 'components/layouts/Page';
import { SessionProvider } from 'lib/Session';
import { AppProps } from 'next/app';
import { useRouter } from 'next/dist/client/router';
import { Provider } from 'next-auth/client';

import theme from '../theme';

function App({ Component, pageProps }: AppProps): JSX.Element {
    const router = useRouter();

    const renderLayout = () => {
        if (router.pathname.startsWith('/dashboard')) {
            return (
                <DashboardLayout>
                    <Component {...pageProps} />
                </DashboardLayout>
            );
        } else if (router.pathname.startsWith('/auth')) {
            return (
                <AuthLayout>
                    <Component {...pageProps} />
                </AuthLayout>
            );
        } else {
            return (
                <PageLayout>
                    <Component {...pageProps} />
                </PageLayout>
            );
        }
    };

    return (
        <Provider session={pageProps.session}>
            <SessionProvider>
                <ChakraProvider resetCSS theme={theme}>
                    {renderLayout()}
                </ChakraProvider>
            </SessionProvider>
        </Provider>
    );
}

export default App;
