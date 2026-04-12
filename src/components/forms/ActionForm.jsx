import { useState } from "react";
import { Button } from "../ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/Card";
import { Field } from "../ui/Field";

function initialValues(fields) {
  return fields.reduce((accumulator, field) => {
    accumulator[field.name] = field.type === "select" ? field.options[0] : "";
    return accumulator;
  }, {});
}

export function ActionForm({
  title,
  description,
  fields,
  submitLabel,
  loading,
  onSubmit,
  className = "",
}) {
  const [values, setValues] = useState(() => initialValues(fields));

  const handleFieldChange = (name, nextValue) => {
    setValues((current) => ({ ...current, [name]: nextValue }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit(values);
    setValues(initialValues(fields));
  };

  return (
    <Card className={`glass-panel ${className}`}>
      <CardHeader className="pb-5">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <Field
              key={field.name}
              name={field.name}
              label={field.label}
              type={field.type}
              value={values[field.name]}
              placeholder={field.placeholder}
              options={field.options}
              onChange={(event) => handleFieldChange(field.name, event.target.value)}
            />
          ))}

          <Button type="submit" className="w-full" loading={loading}>
            {loading ? "Processing" : submitLabel}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
