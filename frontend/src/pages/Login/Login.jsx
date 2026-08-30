/**
 * ============================================================================
 * File        : Login.jsx
 * Project     : UrjaSathi
 *
 * Description:
 * Public authentication page for UrjaSathi.
 *
 * Responsibilities:
 * - Collect user credentials
 * - Authenticate users through AuthContext
 * - Redirect authenticated users
 * - Display authentication errors
 * - Provide password visibility toggle
 * - Support Remember Me functionality
 * - Maintain UrjaSathi visual design system
 * ============================================================================
 */

import { useEffect, useState } from "react";
import {
    Link,
    useLocation,
    useNavigate,
} from "react-router-dom";

import {
    MdAlternateEmail,
} from "react-icons/md";

import {
    LuEye,
    LuEyeOff,
    LuZap,
    LuShieldCheck,
    LuChartNoAxesCombined,
} from "react-icons/lu";

import {
    ArrowRight,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";


/**
 * ============================================================================
 * LOGIN PAGE
 * ============================================================================
 */

export default function Login() {

    /* ------------------------------------------------------------------------
       Authentication
       ------------------------------------------------------------------------ */

    const {
        login,
        status,
    } = useAuth();

    const toast = useToast();


    /* ------------------------------------------------------------------------
       Router
       ------------------------------------------------------------------------ */

    const navigate = useNavigate();
    const location = useLocation();


    /* ------------------------------------------------------------------------
       Form state
       ------------------------------------------------------------------------ */

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [rememberMe, setRememberMe] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [submitting, setSubmitting] = useState(false);

    const [error, setError] = useState("");


    /* ------------------------------------------------------------------------
       Redirect destination
       ------------------------------------------------------------------------ */

    const rawFrom =
        location.state?.from?.pathname;

    const from =
        !rawFrom || rawFrom === "/"
            ? "/dashboard"
            : rawFrom;


    /* ------------------------------------------------------------------------
       Redirect already authenticated users
       ------------------------------------------------------------------------ */

    useEffect(() => {

        if (status === "authenticated") {

            navigate(from, {
                replace: true,
            });

        }

    }, [
        status,
        from,
        navigate,
    ]);


    /* ------------------------------------------------------------------------
       Login submission
       ------------------------------------------------------------------------ */

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSubmitting(true);
        setError("");

        try {

            await login(
                email.trim(),
                password
            );

            toast.success(
                "Welcome back!"
            );

            navigate(from, {
                replace: true,
            });

        } catch (err) {

            const message =
                err?.message ||
                "Unable to sign in.";

            setError(message);

            toast.error(
                message
            );

        } finally {

            setSubmitting(false);

        }

    };


    /* ------------------------------------------------------------------------
       Render
       ------------------------------------------------------------------------ */

    return (

        <main
            className="
                relative
                min-h-screen
                overflow-hidden
                bg-app-bg
                text-text
            "
        >

            {/* ================================================================
                BACKGROUND ATMOSPHERE
               ================================================================ */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    overflow-hidden
                "
            >

                {/* Purple atmosphere */}

                <div
                    className="
                        absolute
                        -left-56
                        top-20
                        h-[520px]
                        w-[520px]
                        rounded-full
                        bg-primary/10
                        blur-[150px]
                    "
                />

                {/* Teal atmosphere */}

                <div
                    className="
                        absolute
                        -right-56
                        bottom-0
                        h-[520px]
                        w-[520px]
                        rounded-full
                        bg-secondary/10
                        blur-[150px]
                    "
                />

                {/* Subtle grid */}

                <div
                    className="
                        absolute
                        inset-0
                        opacity-[0.035]
                        [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]
                        [background-size:72px_72px]
                    "
                />

            </div>


            {/* ================================================================
                MAIN CONTENT
               ================================================================ */}

            <section
                className="
                    relative
                    z-10
                    flex
                    min-h-screen
                    items-center
                    justify-center
                    px-5
                    py-28
                    sm:px-8
                    lg:px-10
                "
            >

                <div
                    className="
                        mx-auto
                        grid
                        w-full
                        max-w-6xl
                        grid-cols-1
                        items-center
                        gap-12
                        lg:grid-cols-[0.9fr_1.1fr]
                        lg:gap-20
                    "
                >

                    {/* ========================================================
                        LEFT CONTENT
                       ======================================================== */}

                    <div
                        className="
                            hidden
                            lg:block
                        "
                    >

                        {/* Icon */}

                        <div
                            className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-2xl
                                bg-primary/10
                                text-primary
                            "
                        >
                            <LuZap className="h-6 w-6" />
                        </div>


                        {/* Label */}

                        <p
                            className="
                                mt-7
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.2em]
                                text-primary
                            "
                        >
                            URJASATHI
                        </p>


                        {/* Heading */}

                        <h1
                            className="
                                mt-4
                                max-w-lg
                                text-5xl
                                font-semibold
                                leading-[0.98]
                                tracking-[-0.055em]
                                text-text
                                xl:text-[4.5rem]
                            "
                        >
                            Power your
                            <br />

                            <span className="text-primary">
                                energy.
                            </span>

                        </h1>


                        {/* Description */}

                        <p
                            className="
                                mt-7
                                max-w-lg
                                text-lg
                                font-medium
                                leading-8
                                text-text-secondary
                            "
                        >
                            Sign in to your UrjaSathi account and
                            keep track of your energy consumption,
                            generation, and renewable energy insights.
                        </p>


                        {/* Feature list */}

                        <div
                            className="
                                mt-10
                                space-y-5
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-4
                                "
                            >

                                <div
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-primary/10
                                        text-primary
                                    "
                                >
                                    <LuChartNoAxesCombined className="h-5 w-5" />
                                </div>

                                <div>

                                    <p
                                        className="
                                            font-semibold
                                            text-text
                                        "
                                    >
                                        Monitor your energy
                                    </p>

                                    <p
                                        className="
                                            mt-0.5
                                            text-sm
                                            text-text-secondary
                                        "
                                    >
                                        Understand where your energy
                                        is being used.
                                    </p>

                                </div>

                            </div>


                            <div
                                className="
                                    flex
                                    items-center
                                    gap-4
                                "
                            >

                                <div
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-primary/10
                                        text-primary
                                    "
                                >
                                    <LuShieldCheck className="h-5 w-5" />
                                </div>

                                <div>

                                    <p
                                        className="
                                            font-semibold
                                            text-text
                                        "
                                    >
                                        Secure access
                                    </p>

                                    <p
                                        className="
                                            mt-0.5
                                            text-sm
                                            text-text-secondary
                                        "
                                    >
                                        Your energy data stays protected.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ========================================================
                        LOGIN CARD
                       ======================================================== */}

                    <div
                        className="
                            w-full
                            max-w-xl
                            justify-self-center
                            lg:max-w-[540px]
                            lg:justify-self-end
                        "
                    >

                        <div
                            className="
                                rounded-3xl
                                border
                                border-border
                                bg-surface
                                p-7
                                shadow-[0_25px_80px_rgba(0,0,0,0.08)]
                                sm:p-10
                                lg:p-11
                            "
                        >

                            {/* ------------------------------------------------
                                Card heading
                               ------------------------------------------------ */}

                            <div>

                                <p
                                    className="
                                        text-xs
                                        font-semibold
                                        uppercase
                                        tracking-[0.2em]
                                        text-primary
                                    "
                                >
                                    WELCOME BACK
                                </p>


                                <h2
                                    className="
                                        mt-3
                                        text-4xl
                                        font-semibold
                                        tracking-[-0.045em]
                                        text-text
                                        sm:text-[2.7rem]
                                    "
                                >
                                    Sign in to
                                    <span className="text-primary">
                                        {" "}UrjaSathi.
                                    </span>
                                </h2>


                                <p
                                    className="
                                        mt-3
                                        text-base
                                        leading-7
                                        text-text-secondary
                                    "
                                >
                                    Access your energy dashboard
                                    and continue monitoring your
                                    consumption.
                                </p>

                            </div>


                            {/* ------------------------------------------------
                                Error message
                               ------------------------------------------------ */}

                            {error && (

                                <div
                                    className="
                                        mt-6
                                        rounded-xl
                                        border
                                        border-red-200
                                        bg-red-50
                                        px-4
                                        py-3
                                        text-sm
                                        font-medium
                                        text-red-600
                                    "
                                >
                                    {error}
                                </div>

                            )}


                            {/* ------------------------------------------------
                                Login form
                               ------------------------------------------------ */}

                            <form
                                onSubmit={handleSubmit}
                                className="
                                    mt-8
                                    space-y-5
                                "
                            >

                                {/* Email */}

                                <div
                                    className="
                                        relative
                                    "
                                >

                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder=" "
                                        required
                                        autoComplete="email"
                                        className="
                                            peer
                                            h-14
                                            w-full
                                            rounded-xl
                                            border
                                            border-border
                                            bg-app-bg
                                            px-4
                                            pr-12
                                            text-text
                                            outline-none
                                            transition-all
                                            duration-300
                                            focus:border-primary
                                            focus:ring-4
                                            focus:ring-primary/10
                                        "
                                    />

                                    <label
                                        className="
                                            pointer-events-none
                                            absolute
                                            left-4
                                            top-4
                                            bg-app-bg
                                            px-1
                                            text-sm
                                            text-text-secondary
                                            transition-all
                                            duration-300
                                            peer-placeholder-shown:top-4
                                            peer-placeholder-shown:text-base
                                            peer-focus:-top-2
                                            peer-focus:text-xs
                                            peer-focus:text-primary
                                            peer-[&:not(:placeholder-shown)]:-top-2
                                            peer-[&:not(:placeholder-shown)]:text-xs
                                        "
                                    >
                                        Email Address
                                    </label>

                                    <MdAlternateEmail
                                        className="
                                            pointer-events-none
                                            absolute
                                            right-4
                                            top-4
                                            text-xl
                                            text-text-secondary
                                        "
                                    />

                                </div>


                                {/* Password */}

                                <div
                                    className="
                                        relative
                                    "
                                >

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder=" "
                                        required
                                        autoComplete="current-password"
                                        className="
                                            peer
                                            h-14
                                            w-full
                                            rounded-xl
                                            border
                                            border-border
                                            bg-app-bg
                                            px-4
                                            pr-12
                                            text-text
                                            outline-none
                                            transition-all
                                            duration-300
                                            focus:border-primary
                                            focus:ring-4
                                            focus:ring-primary/10
                                        "
                                    />

                                    <label
                                        className="
                                            pointer-events-none
                                            absolute
                                            left-4
                                            top-4
                                            bg-app-bg
                                            px-1
                                            text-sm
                                            text-text-secondary
                                            transition-all
                                            duration-300
                                            peer-placeholder-shown:top-4
                                            peer-placeholder-shown:text-base
                                            peer-focus:-top-2
                                            peer-focus:text-xs
                                            peer-focus:text-primary
                                            peer-[&:not(:placeholder-shown)]:-top-2
                                            peer-[&:not(:placeholder-shown)]:text-xs
                                        "
                                    >
                                        Password
                                    </label>


                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                (prev) => !prev
                                            )
                                        }
                                        className="
                                            absolute
                                            right-3
                                            top-2
                                            flex
                                            h-10
                                            w-10
                                            items-center
                                            justify-center
                                            rounded-full
                                            text-text-secondary
                                            transition-colors
                                            hover:text-primary
                                        "
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >

                                        {showPassword ? (
                                            <LuEyeOff className="h-5 w-5" />
                                        ) : (
                                            <LuEye className="h-5 w-5" />
                                        )}

                                    </button>

                                </div>


                                {/* Remember / Forgot */}

                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        gap-4
                                        pt-1
                                        text-sm
                                    "
                                >

                                    <label
                                        className="
                                            flex
                                            cursor-pointer
                                            items-center
                                            gap-2.5
                                            text-text-secondary
                                        "
                                    >

                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={() =>
                                                setRememberMe(
                                                    (prev) => !prev
                                                )
                                            }
                                            className="
                                                h-4
                                                w-4
                                                cursor-pointer
                                                rounded
                                                border-border
                                                accent-primary
                                            "
                                        />

                                        Remember me

                                    </label>


                                    <Link
                                        to="/forgot-password"
                                        className="
                                            font-medium
                                            text-text-secondary
                                            transition-colors
                                            duration-300
                                            hover:text-primary
                                        "
                                    >
                                        Forgot Password?
                                    </Link>

                                </div>


                                {/* Submit */}

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="
                                        group
                                        mt-2
                                        flex
                                        w-full
                                        items-center
                                        justify-center
                                        gap-2.5
                                        rounded-full
                                        bg-primary
                                        px-7
                                        py-4
                                        text-sm
                                        font-semibold
                                        !text-white
                                        shadow-lg
                                        shadow-primary/20
                                        transition-all
                                        duration-300
                                        hover:-translate-y-0.5
                                        hover:bg-primary-dark
                                        hover:shadow-xl
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                    "
                                >

                                    <span className="!text-white">
                                        {submitting
                                            ? "Signing In..."
                                            : "Sign In"
                                        }
                                    </span>

                                    {!submitting && (
                                        <ArrowRight
                                            className="
                                                h-4
                                                w-4
                                                !text-white
                                                transition-transform
                                                duration-300
                                                group-hover:translate-x-1
                                            "
                                        />
                                    )}

                                </button>


                                {/* Administrator help */}

                                <p
                                    className="
                                        pt-2
                                        text-center
                                        text-sm
                                        text-text-secondary
                                    "
                                >
                                    Trouble signing in?{" "}

                                    <Link
                                        to="/contact"
                                        className="
                                            font-semibold
                                            text-primary
                                            transition-colors
                                            duration-300
                                            hover:text-primary-dark
                                        "
                                    >
                                        Contact Us
                                    </Link>

                                </p>

                            </form>

                        </div>


                        {/* ----------------------------------------------------
                            Mobile branding
                           ---------------------------------------------------- */}

                        <div
                            className="
                                mt-8
                                text-center
                                lg:hidden
                            "
                        >

                            <p
                                className="
                                    text-sm
                                    font-medium
                                    text-text-secondary
                                "
                            >
                                Monitor your energy.
                                {" "}
                                <span className="text-primary">
                                    Make every unit count.
                                </span>
                            </p>

                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
}