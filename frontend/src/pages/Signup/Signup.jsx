/**
 * ============================================================================
 * File        : Signup.jsx
 * Project     : UrjaSathi
 *
 * Description:
 * Premium public account registration page for UrjaSathi.
 *
 * Responsibilities:
 * - Collect new user information
 * - Validate registration fields
 * - Validate password confirmation
 * - Display password strength
 * - Register users through AuthContext
 * - Display registration errors
 * - Provide password visibility toggles
 * - Maintain UrjaSathi visual design system
 * ============================================================================
 */

import { useMemo, useState } from "react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import {
    MdAlternateEmail,
    MdPhone,
} from "react-icons/md";

import {
    LuAtSign,
    LuBuilding,
    LuChartNoAxesCombined,
    LuCheck,
    LuEye,
    LuEyeOff,
    LuLockKeyhole,
    LuMapPin,
    LuShieldCheck,
    LuSparkles,
    LuUserRound,
    LuZap,
} from "react-icons/lu";

import {
    ArrowRight,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";


/**
 * ============================================================================
 * FLOATING FIELD
 * ============================================================================
 */

function FloatingField({
    label,
    value,
    onChange,
    type = "text",
    autoComplete,
    icon,
    required = true,
    maxLength,
}) {

    return (

        <div className="relative">

            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder=" "
                required={required}
                autoComplete={autoComplete}
                maxLength={maxLength}
                className="
                    peer
                    h-[54px]
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
                    top-[15px]
                    z-10
                    bg-secondary/2
                    px-1
                    text-sm
                    text-text-secondary
                    transition-all
                    duration-300
                    peer-placeholder-shown:top-[15px]
                    peer-placeholder-shown:text-sm
                    peer-focus:-top-2
                    peer-focus:text-xs
                    peer-focus:text-primary
                    peer-[&:not(:placeholder-shown)]:-top-2
                    peer-[&:not(:placeholder-shown)]:text-xs
                "
            >
                {label}
            </label>

            <div
                className="
                    pointer-events-none
                    absolute
                    right-4
                    top-1/2
                    flex
                    -translate-y-1/2
                    items-center
                    justify-center
                    text-lg
                    text-text-secondary
                    transition-colors
                    duration-300
                    peer-focus:text-primary
                "
            >
                {icon}
            </div>

        </div>

    );
}


/**
 * ============================================================================
 * FLOATING SELECT FIELD
 * ============================================================================
 */

function FloatingSelect({
    label,
    value,
    onChange,
    options = [],
    icon,
}) {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={onChange}
                className="
                    peer
                    h-[54px]
                    w-full
                    appearance-none
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
            >
                {options.map((opt) => (
                    <option key={opt} value={opt} className="bg-app-bg text-text">
                        {opt}
                    </option>
                ))}
            </select>

            <label
                className="
                    pointer-events-none
                    absolute
                    left-4
                    -top-2
                    z-10
                    bg-secondary/2
                    px-1
                    text-xs
                    text-primary
                "
            >
                {label}
            </label>

            <div
                className="
                    pointer-events-none
                    absolute
                    right-4
                    top-1/2
                    flex
                    -translate-y-1/2
                    items-center
                    justify-center
                    text-lg
                    text-text-secondary
                "
            >
                {icon}
            </div>
        </div>
    );
}


/**
 * ============================================================================
 * PASSWORD FIELD
 * ============================================================================
 */

function PasswordField({
    label,
    value,
    onChange,
    showPassword,
    setShowPassword,
    autoComplete,
}) {

    return (

        <div className="relative">

            <input
                type={
                    showPassword
                        ? "text"
                        : "password"
                }
                value={value}
                onChange={onChange}
                placeholder=" "
                required
                autoComplete={autoComplete}
                className="
                    peer
                    h-[54px]
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
                    top-[15px]
                    z-10
                    bg-secondary/2
                    px-1
                    text-sm
                    text-text-secondary
                    transition-all
                    duration-300
                    peer-placeholder-shown:top-[15px]
                    peer-placeholder-shown:text-sm
                    peer-focus:-top-2
                    peer-focus:text-xs
                    peer-focus:text-primary
                    peer-[&:not(:placeholder-shown)]:-top-2
                    peer-[&:not(:placeholder-shown)]:text-xs
                "
            >
                {label}
            </label>

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
                    transition-colors
                    duration-300
                    peer-focus:text-primary
                "
            />

            <button
                type="button"
                onClick={() =>
                    setShowPassword(
                        (previous) => !previous
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
                    <LuEyeOff className="h-5 w-5" />
                ) : (
                    <LuEye className="h-5 w-5" />
                )}

            </button>

        </div>

    );
}


/**
 * ============================================================================
 * PASSWORD STRENGTH
 * ============================================================================
 */

function getPasswordStrength(password) {

    if (!password) {

        return {
            score: 0,
            label: "Create a password",
        };

    }

    let score = 0;

    if (password.length >= 8) {
        score++;
    }

    if (/[A-Z]/.test(password)) {
        score++;
    }

    if (/[0-9]/.test(password)) {
        score++;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        score++;
    }

    if (score <= 1) {

        return {
            score,
            label: "Weak password",
        };

    }

    if (score === 2) {

        return {
            score,
            label: "Fair password",
        };

    }

    if (score === 3) {

        return {
            score,
            label: "Good password",
        };

    }

    return {
        score,
        label: "Strong password",
    };

}


/**
 * ============================================================================
 * SIGNUP PAGE
 * ============================================================================
 */

export default function Signup() {

    /* ------------------------------------------------------------------------
       Authentication
       ------------------------------------------------------------------------ */

    const {
        signup,
    } = useAuth();

    const toast = useToast();


    /* ------------------------------------------------------------------------
       Router
       ------------------------------------------------------------------------ */

    const navigate = useNavigate();


    /* ------------------------------------------------------------------------
       Form state
       ------------------------------------------------------------------------ */

    const [name, setName] =
        useState("");

    const [username, setUsername] =
        useState("");

    const [mobile, setMobile] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [location, setLocation] =
        useState("Delhi");

    const [address, setAddress] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");


    /* ------------------------------------------------------------------------
       UI state
       ------------------------------------------------------------------------ */

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [acceptTerms, setAcceptTerms] =
        useState(false);

    const [submitting, setSubmitting] =
        useState(false);

    const [error, setError] =
        useState("");


    /* ------------------------------------------------------------------------
       Password strength
       ------------------------------------------------------------------------ */

    const passwordStrength =
        useMemo(
            () => getPasswordStrength(password),
            [password]
        );


    /* ------------------------------------------------------------------------
       Password match
       ------------------------------------------------------------------------ */

    const passwordMatches =
        confirmPassword.length > 0 &&
        password === confirmPassword;


    /* ------------------------------------------------------------------------
       Signup submission
       ------------------------------------------------------------------------ */

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        /* Password validation */
        if (password.length < 8) {
            const message = "Password must be at least 8 characters.";
            setError(message);
            toast.error(message);
            return;
        }

        /* Password confirmation */
        if (password !== confirmPassword) {
            const message = "Passwords do not match.";
            setError(message);
            toast.error(message);
            return;
        }

        /* Terms */
        if (!acceptTerms) {
            const message = "Please accept the Terms and Privacy Policy.";
            setError(message);
            toast.error(message);
            return;
        }

        /* Address validation */
        if (!address.trim()) {
            const message = "Please enter your address.";
            setError(message);
            toast.error(message);
            return;
        }

        setSubmitting(true);

        try {
            await signup({
                full_name: name.trim(),
                email: email.trim(),
                password,
                location,
                address: address.trim(),
                mobile: mobile.replace(/\D/g, ""),
                username: username.trim(),
            });

            toast.success(
                "Account created successfully! Please sign in."
            );

            navigate("/login", { replace: true });

        } catch (err) {
            const status = err?.status || err?.response?.status;
            let message = "Unable to create your account.";

            if (status === 400 || status === 409) {
                const detail = err?.response?.data?.detail || err?.payload?.detail;
                if (typeof detail === "string" && /already\s*(registered|exists)/i.test(detail)) {
                    message = "An account with this email already exists.";
                } else if (typeof detail === "string") {
                    message = detail;
                } else {
                    message = "An account with this email already exists.";
                }
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

                {/* Purple glow */}

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


                {/* Teal glow */}

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


                {/* Central soft glow */}

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


                {/* Grid */}

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


                        {/* Eyebrow */}

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


                        {/* Heading */}

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

                            Make every
                            <br />

                            <span className="text-primary">
                                unit count.
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
                            Build a smarter relationship with your
                            energy. Track consumption, understand
                            generation, and turn energy data into
                            meaningful decisions.
                        </p>


                        {/* =====================================================
                            ENERGY VISUAL
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


                            {/* Orbit */}

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


                            {/* Center */}

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

                                <LuZap className="h-6 w-6" />

                            </div>


                            {/* Floating metric — left */}

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
                                            className="h-3.5 w-3.5"
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
                                            Monitor
                                        </p>

                                        <p
                                            className="
                                                text-xs
                                                font-semibold
                                                text-text
                                            "
                                        >
                                            Energy flow
                                        </p>

                                    </div>

                                </div>

                            </div>


                            {/* Floating metric — right */}

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
                                            h-2
                                            w-2
                                            rounded-full
                                            bg-secondary
                                            shadow-[0_0_10px_rgba(1,172,159,0.5)]
                                        "
                                    />

                                    <div>

                                        <p
                                            className="
                                                text-[9px]
                                                uppercase
                                                tracking-wider
                                                text-text-muted
                                            "
                                        >
                                            Status
                                        </p>

                                        <p
                                            className="
                                                text-xs
                                                font-semibold
                                                text-text
                                            "
                                        >
                                            All systems ready
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

                                <LuShieldCheck
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
                                    Secure by design
                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        leading-5
                                        text-text-secondary
                                    "
                                >
                                    Your energy data stays protected.
                                </p>

                            </div>


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
                                    Smarter insights
                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        leading-5
                                        text-text-secondary
                                    "
                                >
                                    Turn consumption into clarity.
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* =========================================================
                        RIGHT — SIGNUP CARD
                       ========================================================= */}

                    <div
                        className="
                            w-full
                            max-w-2xl
                            justify-self-center
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
                                sm:p-8
                                lg:p-9
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

                            <div className="relative">

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
                                        CREATE ACCOUNT
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

                                        Free to join

                                    </div>

                                </div>


                                <h2
                                    className="
                                        mt-3
                                        text-[2.25rem]
                                        font-semibold
                                        leading-tight
                                        tracking-[-0.05em]
                                        text-text
                                        sm:text-[2.65rem]
                                    "
                                >
                                    Start your
                                    <span className="text-primary">
                                        {" "}energy journey.
                                    </span>
                                </h2>


                                <p
                                    className="
                                        mt-2.5
                                        max-w-xl
                                        text-sm
                                        leading-6
                                        text-text-secondary
                                    "
                                >
                                    Create your account and get a
                                    clearer view of how your energy
                                    is being used.
                                </p>

                            </div>


                            {/* -------------------------------------------------
                                Error
                               ------------------------------------------------- */}

                            {error && (
                                <div
                                    role="alert"
                                    className="
                                        relative
                                        mt-5
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
                                Form
                               ------------------------------------------------- */}

                            <form
                                onSubmit={handleSubmit}
                                className="
                                    relative
                                    mt-7
                                    space-y-4
                                "
                            >

                                {/* =================================================
                                    NAME + USERNAME
                                   ================================================= */}

                                <div
                                    className="
                                        grid
                                        grid-cols-1
                                        gap-4
                                        sm:grid-cols-2
                                    "
                                >

                                    <FloatingField
                                        label="Full Name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(
                                                e.target.value
                                            )
                                        }
                                        autoComplete="name"
                                        icon={
                                            <LuUserRound
                                                className="h-5 w-5"
                                            />
                                        }
                                    />


                                    <FloatingField
                                        label="Username"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(
                                                e.target.value
                                            )
                                        }
                                        autoComplete="username"
                                        icon={
                                            <LuAtSign
                                                className="h-5 w-5"
                                            />
                                        }
                                    />

                                </div>


                                {/* =================================================
                                    MOBILE + EMAIL
                                   ================================================= */}

                                <div
                                    className="
                                        grid
                                        grid-cols-1
                                        gap-4
                                        sm:grid-cols-2
                                    "
                                >

                                    <FloatingField
                                        label="Mobile Number"
                                        value={mobile}
                                        onChange={(e) =>
                                            setMobile(
                                                e.target.value
                                            )
                                        }
                                        type="tel"
                                        autoComplete="tel"
                                        maxLength={15}
                                        icon={
                                            <MdPhone />
                                        }
                                    />


                                    <FloatingField
                                        label="Email Address"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(
                                                e.target.value
                                            )
                                        }
                                        type="email"
                                        autoComplete="email"
                                        icon={
                                            <MdAlternateEmail />
                                        }
                                    />

                                </div>


                                {/* =================================================
                                    LOCATION + ADDRESS
                                   ================================================= */}

                                <div
                                    className="
                                        grid
                                        grid-cols-1
                                        gap-4
                                        sm:grid-cols-2
                                    "
                                >

                                    <FloatingSelect
                                        label="City / Location"
                                        value={location}
                                        onChange={(e) =>
                                            setLocation(e.target.value)
                                        }
                                        options={[
                                            "Greater Noida",
                                            "Delhi",
                                            "Mumbai",
                                            "Bangalore",
                                            "Pune",
                                        ]}
                                        icon={
                                            <LuMapPin className="h-5 w-5" />
                                        }
                                    />

                                    <FloatingField
                                        label="Address / Area"
                                        value={address}
                                        onChange={(e) =>
                                            setAddress(e.target.value)
                                        }
                                        autoComplete="street-address"
                                        icon={
                                            <LuBuilding className="h-5 w-5" />
                                        }
                                    />

                                </div>


                                {/* =================================================
                                    PASSWORD + CONFIRM
                                   ================================================= */}

                                <div
                                    className="
                                        grid
                                        grid-cols-1
                                        gap-4
                                        sm:grid-cols-2
                                    "
                                >

                                    <PasswordField
                                        label="Password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(
                                                e.target.value
                                            )
                                        }
                                        showPassword={
                                            showPassword
                                        }
                                        setShowPassword={
                                            setShowPassword
                                        }
                                        autoComplete="new-password"
                                    />


                                    <PasswordField
                                        label="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(
                                                e.target.value
                                            )
                                        }
                                        showPassword={
                                            showConfirmPassword
                                        }
                                        setShowPassword={
                                            setShowConfirmPassword
                                        }
                                        autoComplete="new-password"
                                    />

                                </div>


                                {/* =================================================
                                    PASSWORD STRENGTH
                                   ================================================= */}

                                <div
                                    className="
                                        rounded-xl
                                        border
                                        border-border
                                        bg-secondary/5
                                        px-3.5
                                        py-3
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
                                                font-medium
                                                text-text-secondary
                                            "
                                        >
                                            Password strength
                                        </p>

                                        <p
                                            className="
                                                text-[11px]
                                                font-semibold
                                                text-text
                                            "
                                        >
                                            {passwordStrength.label}
                                        </p>

                                    </div>


                                    <div
                                        className="
                                            mt-2
                                            grid
                                            grid-cols-4
                                            gap-1.5
                                        "
                                    >

                                        {[1, 2, 3, 4].map(
                                            (item) => (

                                                <div
                                                    key={item}
                                                    className={`
                                                        h-1
                                                        rounded-full
                                                        transition-all
                                                        duration-500
                                                        ${
                                                            passwordStrength.score >= item
                                                                ? "bg-primary"
                                                                : "bg-border"
                                                        }
                                                    `}
                                                />

                                            )
                                        )}

                                    </div>


                                    <div
                                        className="
                                            mt-2
                                            flex
                                            items-center
                                            gap-1.5
                                        "
                                    >

                                        {password.length >= 8 ? (

                                            <LuCheck
                                                className="
                                                    h-3.5
                                                    w-3.5
                                                    text-secondary
                                                "
                                            />

                                        ) : null}

                                        <p
                                            className="
                                                text-[11px]
                                                text-text-muted
                                            "
                                        >
                                            Use 8+ characters with
                                            uppercase letters,
                                            numbers, or symbols.
                                        </p>

                                    </div>

                                </div>


                                {/* =================================================
                                    PASSWORD MATCH
                                   ================================================= */}

                                {confirmPassword && (

                                    <div
                                        className={`
                                            flex
                                            items-center
                                            gap-2
                                            text-xs
                                            font-medium
                                            ${
                                                passwordMatches
                                                    ? "text-secondary"
                                                    : "text-danger"
                                            }
                                        `}
                                    >

                                        {passwordMatches ? (
                                            <LuCheck className="h-4 w-4" />
                                        ) : (
                                            <span
                                                className="
                                                    flex
                                                    h-4
                                                    w-4
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    border
                                                    border-current
                                                    text-[9px]
                                                "
                                            >
                                                !
                                            </span>
                                        )}

                                        {passwordMatches
                                            ? "Passwords match."
                                            : "Passwords do not match."
                                        }

                                    </div>

                                )}


                                {/* =================================================
                                    TERMS
                                   ================================================= */}

                                <label
                                    className="
                                        flex
                                        cursor-pointer
                                        items-start
                                        gap-3
                                        rounded-xl
                                        border
                                        border-transparent
                                        p-1
                                        transition-colors
                                        duration-300
                                        hover:border-border
                                    "
                                >

                                    <input
                                        type="checkbox"
                                        checked={acceptTerms}
                                        onChange={() =>
                                            setAcceptTerms(
                                                (previous) =>
                                                    !previous
                                            )
                                        }
                                        className="
                                            mt-0.5
                                            h-4
                                            w-4
                                            shrink-0
                                            cursor-pointer
                                            rounded
                                            border-border
                                            accent-primary
                                        "
                                    />

                                    <span
                                        className="
                                            text-[12px]
                                            leading-5
                                            text-text-secondary
                                        "
                                    >
                                        I agree to the{" "}

                                        <span
                                            className="
                                                font-semibold
                                                text-primary
                                            "
                                        >
                                            Terms of Service
                                        </span>

                                        {" "}and{" "}

                                        <span
                                            className="
                                                font-semibold
                                                text-primary
                                            "
                                        >
                                            Privacy Policy
                                        </span>
                                        .
                                    </span>

                                </label>


                                {/* =================================================
                                    SUBMIT
                                   ================================================= */}

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="
                                        group
                                        relative
                                        mt-1
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
                                            ? "Creating Account..."
                                            : "Create Account"
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
                                    LOGIN
                                   ================================================= */}

                                <p
                                    className="
                                        pt-1
                                        text-center
                                        text-sm
                                        text-text-secondary
                                    "
                                >

                                    Already have an account?{" "}

                                    <Link
                                        to="/login"
                                        className="
                                            font-semibold
                                            text-primary
                                            transition-colors
                                            duration-300
                                            hover:text-primary-dark
                                        "
                                    >
                                        Sign In
                                    </Link>

                                </p>

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
                                Smarter energy.
                                {" "}

                                <span className="text-primary">
                                    Better decisions.
                                </span>
                            </p>

                        </div>

                    </div>

                </div>

            </section>

        </main>

    );

}