import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={`block w-full rounded-xl border border-sky-300 bg-transparent px-4 py-3 text-sm text-slate-900 placeholder:text-slate-300 focus:border-cyan-400 focus:bg-white focus:ring-cyan-400 ${
                props.disabled ? "bg-slate-400 text-gray-500  cursor-not-allowed" : ""
            } ${className}`}
            ref={localRef}
            disabled={props.disabled}
        />
    );
});
