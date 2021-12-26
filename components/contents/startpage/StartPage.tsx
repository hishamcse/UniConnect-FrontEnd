import styles from './StartPage.module.scss';
import {Container} from "react-bootstrap";
import Image from "next/image";

const StartPage = () => {
    return (
        <div className={styles.content}>
            <Container className={`${styles.logo} mb-5`}>
                <Image src="/logo.png" alt="UniConnect" width='200' height='200'/>
            </Container>

            <Container className={`${styles.title} ${styles.summary}`}>
                <h3 className={`${styles.header} text-light text-lg-center`}>
                    An intra-university social network
                </h3>
                <p className={`${styles.subHeader} lead text-light text-lg-center`}>
                    Connect university students and teachers in an organized way
                </p>
            </Container>
        </div>
    );
}

export default StartPage;