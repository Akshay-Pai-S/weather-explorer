type InputFieldProps = {
  id: string;
  label: string;
  type: "number" | "date";
  value: string;
  onChange: (value: string) => void;
};

export default function InputField({
  id,
  label,
  type,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
