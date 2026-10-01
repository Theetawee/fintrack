import { Link } from "react-router";
import Card from "../../components/auth/Card";
import { PasswordField } from "../../components/auth/PasswordField";
import TextInput from "../../components/auth/TextInput";
import Button from "../../components/common/Button";
import { getPath } from "../../routing/urls";
import useSignup from "../../hooks/auth/useSignup";
import Turnstile from "../../components/auth/Turnstile";
import { site_key } from "../../constants";
import IdentifierInput from "../../components/auth/IdentifierInput";

const SignupPage = () => {
    const {
        identifier,
        setIdentifier,
        password,
        setPassword,
        name,
        setName,
        password2,
        setPassword2,
        isPhoneValid,
        setIsPhoneValid,
        setTurnstileToken,
        isLoading,
        error,
        method,
        setMethod,
        handleSignup,
    } = useSignup();

    return (
        <div>
            <Card>
                <div>
                    <div className="grid grid-cols-1 gap-4">
                        <TextInput
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            name="name"
                            autoComplete="name"
                            placeholder="Your Name"
                            type="text"
                        />

                        <div>
                            <IdentifierInput
                                method={method}
                                identifier={identifier}
                                setIdentifier={setIdentifier}
                                setIsPhoneValid={setIsPhoneValid}
                                setMethod={setMethod}
                            />
                        </div>

                        <div>
                            <PasswordField
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                autoComplete="current-password"
                                placeholder="Enter your password"
                            />
                        </div>
                        <div>
                            <PasswordField
                                label="Confirm password"
                                name="password2"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                autoComplete="current-password"
                                placeholder="Confirm your password"
                            />
                        </div>
                        <div>
                            <Turnstile siteKey={site_key} onToken={(e) => setTurnstileToken(e)} />
                        </div>
                        {error && (
                            <div className="text-red-500 text-sm bg-rose-50 rounded px-2 py-4">
                                <ul>
                                    <li key={error} className="list-disc list-inside">
                                        {error}
                                    </li>
                                </ul>
                            </div>
                        )}

                        <div className="pt-4">
                            <Button
                                onClick={handleSignup}
                                isLoading={isLoading}
                                disabled={
                                    (method === "phone" && !isPhoneValid) ||
                                    !password ||
                                    !password2 ||
                                    !name ||
                                    !identifier
                                }>
                                Log in
                            </Button>
                        </div>
                    </div>

                    <div className="text-center pt-8">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Already have an account?{" "}
                            <Link
                                className="text-primary-500 hover:underline"
                                to={getPath("Login")}>
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default SignupPage;
