import { Input } from "./Input";
import { Label } from "./Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Select";

export function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  options = [],
  ...props
}) {
  const fieldId = name ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-2">
      <Label htmlFor={fieldId}>{label}</Label>

      {type === "select" ? (
        <Select value={value} onValueChange={(nextValue) => onChange({ target: { value: nextValue } })}>
          <SelectTrigger id={fieldId} className="h-12 rounded-2xl border-slate-200 bg-white">
            <SelectValue placeholder={placeholder ?? label} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          id={fieldId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="h-12 rounded-2xl border-slate-200 bg-white"
          {...props}
        />
      )}
    </div>
  );
}
