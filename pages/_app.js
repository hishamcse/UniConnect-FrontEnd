import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css'
import AuthContextProvider from "../store/AuthContextProvider";

function MyApp({Component, pageProps}) {
    return (
        <AuthContextProvider>
            <Component {...pageProps} />
        </AuthContextProvider>
    )
}

export default MyApp
