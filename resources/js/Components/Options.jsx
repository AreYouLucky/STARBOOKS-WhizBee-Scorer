const Options = ({
    id,
    items,
    itemValue,
    itemName,
    name,
    value,
    className = '',
    isFocused,
    onChange,
    defaultValue = "",
}) => {
    return (
        <div className={`relative ${className}`}>
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full min-w-36 appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-9 text-sm font-bold text-slate-700 shadow-sm transition hover:border-cyan-300 focus:border-cyan-400 focus:ring-cyan-400"
                autoFocus={isFocused}
            >
                <option className="text-gray-400" value="">
                    {defaultValue === "" ? "Choose" : defaultValue}
                </option>
                {items.map((item) => (
                    <option key={item[itemValue]} value={item[itemValue]}>
                        {item[itemName]}
                    </option>
                ))}
            </select>

        </div>
    );
};

export default Options;
