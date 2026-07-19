import React, { useRef, useState } from 'react';

export interface FormField {
  key: string;
  label: string;
  type: string;
  defaultValue?: string;
}

interface DynamicFormProps {
  fields: FormField[];
  submitLabel?: string;
  onSubmit: (values: Record<string, string>) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  submitLabel = 'Send Details',
  onSubmit,
}) => {
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const refs = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({});

  const handleSubmit = () => {
    if (submitted) return;
    const vals: Record<string, string> = {};
    const errs: Record<string, boolean> = {};
    let ok = true;

    fields.forEach((f) => {
      const el = refs.current[f.key];
      const v = el?.value.trim() ?? '';
      if (!v) {
        errs[f.key] = true;
        ok = false;
      } else {
        vals[f.key] = v;
      }
    });

    setErrors(errs);
    if (ok) {
      setSubmitted(true);
      onSubmit(vals);
    }
  };

  return (
    <div className="lf">
      {fields.map((f) =>
        f.type === 'textarea' ? (
          <textarea
            key={f.key}
            className={`fi${errors[f.key] ? ' err' : ''}`}
            placeholder={f.label}
            rows={2}
            defaultValue={f.defaultValue ?? ''}
            disabled={submitted}
            ref={(el) => {
              refs.current[f.key] = el;
            }}
          />
        ) : (
          <input
            key={f.key}
            type={f.type || 'text'}
            className={`fi${errors[f.key] ? ' err' : ''}`}
            placeholder={f.label}
            defaultValue={f.defaultValue ?? ''}
            disabled={submitted}
            ref={(el) => {
              refs.current[f.key] = el;
            }}
          />
        )
      )}
      <button className="sb" onClick={handleSubmit} disabled={submitted}>
        {submitted ? 'Sent ✓' : submitLabel}
      </button>
    </div>
  );
};

export default DynamicForm;
