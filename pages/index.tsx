import styles from '../styles/Home.module.scss'
import StartNavigation from "../components/layout/StartNavigation";
import React, {useContext, useState} from "react";
import StartPage from "../components/contents/startpage/StartPage";
import StartBackground from "../components/backgrounds/StartBackground";
import LoginForm from "../components/login/LoginForm";
import LayoutWrapper from "../components/ui/LayoutWrapper";
import SignUpForm from "../components/signup/SignUpForm";
import {useRouter} from "next/router";
import AuthContext from "../store/auth-context";

const Home = () => {

    const [showSignUp, setShowSignUp] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const authCtx = useContext(AuthContext);

    const router = useRouter();

    const showLoginHandler = () => {
        setShowLogin(true);
        setShowSignUp(false);
    }

    const showSignUpHandler = async (e: React.MouseEvent) => {
        e.preventDefault();

        await router.push('/signup');
    }

    return (
        <LayoutWrapper>
            <main className={styles.main}>
                <StartNavigation onSignUpClick={showSignUpHandler} onLoginClick={showLoginHandler}/>

                <StartBackground/>

                {showSignUp &&
                    <div className='d-flex'>
                        <div className='col-7'>
                            <StartPage/>
                        </div>
                        <div className='col-2'>

                        </div>
                        <div className='col-7'>
                            <SignUpForm/>
                        </div>
                    </div>
                }

                {showLogin &&
                    <div className='d-flex'>
                        <div className='col-7'>
                            <StartPage/>
                        </div>
                        <div className='col-2'>

                        </div>
                        <div className='col-7'>
                            <LoginForm/>
                        </div>
                    </div>
                }

                {!showSignUp && !showLogin && <StartPage/>}
            </main>

        </LayoutWrapper>
    )
}

export default Home;