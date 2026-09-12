/**
 * ============================================================================
 * File        : Login.jsx
 * Project     : UrjaSathi
 *
 * Description:
 * Premium public authentication page for UrjaSathi.
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
    LuChartNoAxesCombined,
    LuEye,
    LuEyeOff,
    LuLockKeyhole,
    LuShieldCheck,
    LuSparkles,
    LuZap,
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
                password,
                rememberMe
            );

            toast.success(
                "Welcome back!"
            );

            navigate(from, {
                replace: true,
            });
        } catch (err) {
            const status = err?.status || err?.response?.status;
            let message = "Unable to sign in.";

            if (status === 401) {
                message = "Invalid email or password.";
            } else if (err?.response?.data?.detail) {
                const detail = err.response.data.detail;
                message = typeof detail === "string" ? detail : (Array.isArray(detail) ? detail.map(d => d.msg).join(". ") : JSON.stringify(detail));
            } else if (err?.payload?.detail) {
                const detail = err.payload.detail;
                message = typeof detail === "string" ? detail : (Array.isArray(detail) ? detail.map(d => d.msg).join(". ") : JSON.stringify(detail));
            } else if (err?.message) {
                message = err.message;
            }

            setError(message);
            toast.error(message);
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

            {/* =================================================================
                BACKGROUND ATMOSPHERE
               ================================================================= */}

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
                        -left-64
                        -top-40
                        h-[600px]
                        w-[600px]
                        rounded-full
                        bg-primary/10
                        blur-[150px]
                    "
                />


                {/* Teal atmosphere */}

                <div
                    className="
                        absolute
                        -right-64
                        bottom-[-100px]
                        h-[650px]
                        w-[650px]
                        rounded-full
                        bg-secondary/10
                        blur-[160px]
                    "
                />


                {/* Central glow */}

                <div
                    className="
                        absolute
                        left-1/2
                        top-1/2
                        h-[450px]
                        w-[450px]
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-primary/5
                        blur-[130px]
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


            {/* =================================================================
                MAIN CONTENT
               ================================================================= */}

            <section
                className="
                    relative
                    z-10
                    flex
                    min-h-screen
                    items-center
                    justify-center
                    px-4
                    py-20
                    sm:px-6
                    lg:px-8
                    lg:py-24
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
                        gap-10
                        lg:grid-cols-[0.9fr_1.1fr]
                        lg:gap-16
                    "
                >

                    {/* =========================================================
                        LEFT — PRODUCT STORY
                       ========================================================= */}

                    <div
                        className="
                            hidden
                            lg:block
                        "
                    >

                        {/* Brand icon */}

                        <div
                            className="
                                relative
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

                            <LuZap
                                className="
                                    h-6
                                    w-6
                                "
                            />


                            {/* Animated ring */}

                            <span
                                className="
                                    absolute
                                    inset-0
                                    rounded-2xl
                                    border
                                    border-primary/20
                                    animate-ping
                                "
                            />

                        </div>


                        {/* Brand label */}

                        <p
                            className="
                                mt-6
                                text-[11px]
                                font-semibold
                                uppercase
                                tracking-[0.22em]
                                text-primary
                            "
                        >
                            URJASATHI
                        </p>


                        {/* Main heading */}

                        <h1
                            className="
                                mt-3
                                max-w-xl
                                text-[3.5rem]
                                font-semibold
                                leading-[0.95]
                                tracking-[-0.06em]
                                text-text
                                xl:text-[4.25rem]
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
                                mt-6
                                max-w-[500px]
                                text-base
                                font-medium
                                leading-7
                                text-text-secondary
                            "
                        >
                            Sign in to your UrjaSathi account and
                            keep track of your energy consumption,
                            generation, and renewable energy insights.
                        </p>


                        {/* =====================================================
                            ENERGY VISUALIZATION
                           ===================================================== */}

                        <div
                            className="
                                relative
                                mt-10
                                h-[205px]
                                w-full
                                max-w-[500px]
                                overflow-hidden
                                rounded-3xl
                                border
                                border-border
                                bg-surface/70
                                shadow-[0_20px_60px_rgba(108,29,95,0.08)]
                                backdrop-blur-sm
                            "
                        >

                            {/* Decorative grid */}

                            <div
                                className="
                                    absolute
                                    inset-0
                                    opacity-[0.035]
                                    [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]
                                    [background-size:36px_36px]
                                "
                            />


                            {/* Outer orbit */}

                            <div
                                className="
                                    absolute
                                    left-1/2
                                    top-1/2
                                    h-36
                                    w-36
                                    -translate-x-1/2
                                    -translate-y-1/2
                                    rounded-full
                                    border
                                    border-primary/10
                                    animate-[spin_18s_linear_infinite]
                                "
                            >

                                <div
                                    className="
                                        absolute
                                        -right-1
                                        top-1/2
                                        h-2.5
                                        w-2.5
                                        -translate-y-1/2
                                        rounded-full
                                        bg-primary
                                        shadow-lg
                                        shadow-primary/30
                                    "
                                />

                            </div>


                            {/* Inner orbit */}

                            <div
                                className="
                                    absolute
                                    left-1/2
                                    top-1/2
                                    h-24
                                    w-24
                                    -translate-x-1/2
                                    -translate-y-1/2
                                    rounded-full
                                    border
                                    border-secondary/20
                                    animate-[spin_12s_linear_infinite_reverse]
                                "
                            >

                                <div
                                    className="
                                        absolute
                                        -left-1
                                        top-1/2
                                        h-2
                                        w-2
                                        -translate-y-1/2
                                        rounded-full
                                        bg-secondary
                                    "
                                />

                            </div>


                            {/* Energy center */}

                            <div
                                className="
                                    absolute
                                    left-1/2
                                    top-1/2
                                    flex
                                    h-14
                                    w-14
                                    -translate-x-1/2
                                    -translate-y-1/2
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-primary
                                    text-white
                                    shadow-xl
                                    shadow-primary/20
                                "
                            >

                                <LuZap
                                    className="
                                        h-6
                                        w-6
                                    "
                                />

                            </div>


                            {/* =================================================
                                Floating card — Energy
                               ================================================= */}

                            <div
                                className="
                                    absolute
                                    left-5
                                    top-5
                                    rounded-2xl
                                    border
                                    border-border
                                    bg-surface/90
                                    px-3.5
                                    py-2.5
                                    shadow-lg
                                    backdrop-blur-sm
                                    animate-bounce
                                    [animation-duration:4s]
                                "
                            >

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            h-7
                                            w-7
                                            items-center
                                            justify-center
                                            rounded-lg
                                            bg-secondary/10
                                            text-secondary
                                        "
                                    >

                                        <LuChartNoAxesCombined
                                            className="
                                                h-3.5
                                                w-3.5
                                            "
                                        />

                                    </div>


                                    <div>

                                        <p
                                            className="
                                                text-[9px]
                                                uppercase
                                                tracking-wider
                                                text-text-muted
                                            "
                                        >
                                            Dashboard
                                        </p>

                                        <p
                                            className="
                                                text-xs
                                                font-semibold
                                                text-text
                                            "
                                        >
                                            Energy insights
                                        </p>

                                    </div>

                                </div>

                            </div>


                            {/* =================================================
                                Floating card — Security
                               ================================================= */}

                            <div
                                className="
                                    absolute
                                    bottom-5
                                    right-5
                                    rounded-2xl
                                    border
                                    border-border
                                    bg-surface/90
                                    px-3.5
                                    py-2.5
                                    shadow-lg
                                    backdrop-blur-sm
                                    animate-bounce
                                    [animation-duration:5s]
                                    [animation-delay:1s]
                                "
                            >

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            h-7
                                            w-7
                                            items-center
                                            justify-center
                                            rounded-lg
                                            bg-primary/10
                                            text-primary
                                        "
                                    >

                                        <LuShieldCheck
                                            className="
                                                h-3.5
                                                w-3.5
                                            "
                                        />

                                    </div>


                                    <div>

                                        <p
                                            className="
                                                text-[9px]
                                                uppercase
                                                tracking-wider
                                                text-text-muted
                                            "
                                        >
                                            Security
                                        </p>

                                        <p
                                            className="
                                                text-xs
                                                font-semibold
                                                text-text
                                            "
                                        >
                                            Protected access
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* =====================================================
                            BENEFITS
                           ===================================================== */}

                        <div
                            className="
                                mt-8
                                grid
                                grid-cols-2
                                gap-3
                            "
                        >

                            {/* Monitor */}

                            <div
                                className="
                                    rounded-2xl
                                    border
                                    border-border
                                    bg-surface/60
                                    p-4
                                    backdrop-blur-sm
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:shadow-lg
                                "
                            >

                                <LuChartNoAxesCombined
                                    className="
                                        h-5
                                        w-5
                                        text-primary
                                    "
                                />


                                <p
                                    className="
                                        mt-3
                                        text-sm
                                        font-semibold
                                        text-text
                                    "
                                >
                                    Monitor smarter
                                </p>


                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        leading-5
                                        text-text-secondary
                                    "
                                >
                                    Understand where your energy
                                    is being used.
                                </p>

                            </div>


                            {/* Insights */}

                            <div
                                className="
                                    rounded-2xl
                                    border
                                    border-border
                                    bg-surface/60
                                    p-4
                                    backdrop-blur-sm
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:shadow-lg
                                "
                            >

                                <LuSparkles
                                    className="
                                        h-5
                                        w-5
                                        text-secondary
                                    "
                                />


                                <p
                                    className="
                                        mt-3
                                        text-sm
                                        font-semibold
                                        text-text
                                    "
                                >
                                    Better decisions
                                </p>


                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        leading-5
                                        text-text-secondary
                                    "
                                >
                                    Turn energy data into
                                    useful insights.
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* =========================================================
                        RIGHT — LOGIN CARD
                       ========================================================= */}

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
                                relative
                                overflow-hidden
                                rounded-[28px]
                                border
                                border-border
                                bg-surface
                                p-6
                                shadow-[0_25px_80px_rgba(0,0,0,0.08)]
                                transition-shadow
                                duration-500
                                hover:shadow-[0_30px_90px_rgba(108,29,95,0.12)]
                                sm:p-9
                                lg:p-10
                            "
                        >

                            {/* -------------------------------------------------
                                Card decorative glow
                               ------------------------------------------------- */}

                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    -right-20
                                    -top-20
                                    h-48
                                    w-48
                                    rounded-full
                                    bg-secondary/10
                                    blur-3xl
                                "
                            />


                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    -bottom-24
                                    -left-20
                                    h-48
                                    w-48
                                    rounded-full
                                    bg-primary/10
                                    blur-3xl
                                "
                            />


                            {/* -------------------------------------------------
                                Header
                               ------------------------------------------------- */}

                            <div
                                className="
                                    relative
                                "
                            >

                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        gap-4
                                    "
                                >

                                    <p
                                        className="
                                            text-[11px]
                                            font-semibold
                                            uppercase
                                            tracking-[0.22em]
                                            text-primary
                                        "
                                    >
                                        WELCOME BACK
                                    </p>


                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-1.5
                                            rounded-full
                                            border
                                            border-secondary/20
                                            bg-secondary/5
                                            px-2.5
                                            py-1.5
                                            text-[10px]
                                            font-semibold
                                            text-secondary
                                        "
                                    >

                                        <span
                                            className="
                                                h-1.5
                                                w-1.5
                                                rounded-full
                                                bg-secondary
                                                animate-pulse
                                            "
                                        />

                                        Secure login

                                    </div>

                                </div>


                                <h2
                                    className="
                                        mt-3
                                        text-[2.3rem]
                                        font-semibold
                                        leading-tight
                                        tracking-[-0.05em]
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
                                        max-w-lg
                                        text-sm
                                        leading-6
                                        text-text-secondary
                                    "
                                >
                                    Access your energy dashboard
                                    and continue monitoring your
                                    consumption.
                                </p>

                            </div>


                            {/* -------------------------------------------------
                                Error message
                               ------------------------------------------------- */}

                            {error && (
                                <div
                                    role="alert"
                                    className="
                                        relative
                                        mt-6
                                        flex
                                        items-center
                                        gap-3
                                        rounded-xl
                                        border
                                        border-red-500/30
                                        bg-red-500/10
                                        px-4
                                        py-3
                                        text-sm
                                        font-medium
                                        text-red-500
                                        backdrop-blur-sm
                                    "
                                >
                                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-xs font-bold text-red-500">!</span>
                                    <span>{error}</span>
                                </div>
                            )}


                            {/* -------------------------------------------------
                                Login form
                               ------------------------------------------------- */}

                            <form
                                onSubmit={handleSubmit}
                                className="
                                    relative
                                    mt-8
                                    space-y-5
                                "
                            >

                                {/* =================================================
                                    EMAIL
                                   ================================================= */}

                                <div
                                    className="
                                        relative
                                    "
                                >

                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(
                                                e.target.value
                                            )
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
                                            bg-secondary/5
                                            px-4
                                            pr-12
                                            text-sm
                                            text-text
                                            outline-none
                                            transition-all
                                            duration-300
                                            hover:border-border-strong
                                            focus:border-primary
                                            focus:bg-secondary/10
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
                                            z-10
                                            bg-secondary/2
                                            px-1
                                            text-sm
                                            text-text-secondary
                                            transition-all
                                            duration-300
                                            peer-placeholder-shown:top-4
                                            peer-placeholder-shown:text-sm
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
                                            top-1/2
                                            -translate-y-1/2
                                            text-xl
                                            text-text-secondary
                                            transition-colors
                                            duration-300
                                        "
                                    />

                                </div>


                                {/* =================================================
                                    PASSWORD
                                   ================================================= */}

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
                                            setPassword(
                                                e.target.value
                                            )
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
                                            bg-secondary/5
                                            px-4
                                            pr-24
                                            text-sm
                                            text-text
                                            outline-none
                                            transition-all
                                            duration-300
                                            hover:border-border-strong
                                            focus:border-primary
                                            focus:bg-secondary/10
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
                                            z-10
                                            bg-secondary/2
                                            px-1
                                            text-sm
                                            text-text-secondary
                                            transition-all
                                            duration-300
                                            peer-placeholder-shown:top-4
                                            peer-placeholder-shown:text-sm
                                            peer-focus:-top-2
                                            peer-focus:text-xs
                                            peer-focus:text-primary
                                            peer-[&:not(:placeholder-shown)]:-top-2
                                            peer-[&:not(:placeholder-shown)]:text-xs
                                        "
                                    >
                                        Password
                                    </label>


                                    {/* Lock icon */}

                                    <LuLockKeyhole
                                        className="
                                            pointer-events-none
                                            absolute
                                            right-[52px]
                                            top-1/2
                                            h-[18px]
                                            w-[18px]
                                            -translate-y-1/2
                                            text-text-secondary
                                        "
                                    />


                                    {/* Show / hide */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                (previous) =>
                                                    !previous
                                            )
                                        }
                                        className="
                                            absolute
                                            right-2
                                            top-1/2
                                            flex
                                            h-10
                                            w-10
                                            -translate-y-1/2
                                            items-center
                                            justify-center
                                            rounded-full
                                            text-text-secondary
                                            transition-all
                                            duration-300
                                            hover:bg-primary/10
                                            hover:text-primary
                                        "
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >

                                        {showPassword ? (

                                            <LuEyeOff
                                                className="
                                                    h-5
                                                    w-5
                                                "
                                            />

                                        ) : (

                                            <LuEye
                                                className="
                                                    h-5
                                                    w-5
                                                "
                                            />

                                        )}

                                    </button>

                                </div>


                                {/* =================================================
                                    REMEMBER / FORGOT
                                   ================================================= */}

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
                                                    (previous) =>
                                                        !previous
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


                                {/* =================================================
                                    SUBMIT BUTTON
                                   ================================================= */}

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="
                                        group
                                        relative
                                        mt-2
                                        flex
                                        w-full
                                        items-center
                                        justify-center
                                        gap-2.5
                                        overflow-hidden
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

                                    {/* Button shine */}

                                    <span
                                        className="
                                            pointer-events-none
                                            absolute
                                            inset-y-0
                                            -left-10
                                            w-8
                                            rotate-12
                                            bg-white/20
                                            blur-md
                                            transition-all
                                            duration-700
                                            group-hover:left-[110%]
                                        "
                                    />


                                    <span
                                        className="
                                            relative
                                            !text-white
                                        "
                                    >
                                        {submitting
                                            ? "Signing In..."
                                            : "Sign In"
                                        }
                                    </span>


                                    {!submitting && (

                                        <ArrowRight
                                            className="
                                                relative
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


                                {/* =================================================
                                    SIGNUP
                                   ================================================= */}

                                <p
                                    className="
                                        pt-2
                                        text-center
                                        text-sm
                                        text-text-secondary
                                    "
                                >
                                    Don't have an account?{" "}

                                    <Link
                                        to="/signup"
                                        className="
                                            font-semibold
                                            text-primary
                                            transition-colors
                                            duration-300
                                            hover:text-primary-dark
                                        "
                                    >
                                        Sign Up
                                    </Link>

                                </p>


                                {/* =================================================
                                    SUPPORT
                                   ================================================= */}

                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-center
                                        gap-1.5
                                        pt-1
                                        text-xs
                                        text-text-muted
                                    "
                                >

                                    <LuShieldCheck
                                        className="
                                            h-3.5
                                            w-3.5
                                        "
                                    />

                                    Your account and energy data
                                    are protected.

                                </div>

                            </form>

                        </div>


                        {/* --------------------------------------------------------
                            Mobile footer
                           -------------------------------------------------------- */}

                        <div
                            className="
                                mt-6
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