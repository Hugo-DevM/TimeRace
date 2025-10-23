import { useState } from "react";

const selectStyle = {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
    color: "#333",
    backgroundColor: "#fff",
    width: "250px",
    display: "block",
};

export default function Select({ data = [], onChange, title }) {
    const [d] = useState(data);

    return (
        <select
            name="customSelect"
            defaultValue=""
            onChange={(e) => {
                let val = e.target.value;
                if (val === "true") val = true;
                else if (val === "false") val = false;
                onChange?.(val);
            }}
            style={selectStyle}
        >
            <option value="" disabled hidden>
                {title}
            </option>
            {d.map((item, index) => {
                if (typeof item === "string") {
                    return (
                        <option key={index} value={index + 1}>
                            {item}
                        </option>
                    );
                }
                return (
                    <option key={index} value={item.value}>
                        {item.label}
                    </option>
                );
            })}
        </select>
    );
}
