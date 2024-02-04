import {
  ButtonHTMLAttributes,
  PropsWithChildren,
  HTMLInputTypeAttribute,
  useEffect,
  ReactNode,
} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldErrors,
  FieldValues,
  UseFormReturn,
  useForm,
  Path,
  PathValue,
  FieldError,
} from "react-hook-form";
import { z } from "zod";
import {
  Input,
  Textarea,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Button,
  Checkbox,
  Switch,
  RadioGroup,
  RadioGroupItem,
  Label,
  DatePicker,
  InputProps,
  TextareaProps,
} from "@shadcn/ui";

import { CheckedState } from "@radix-ui/react-checkbox";
import { FileToBase64 } from "@src/utils";
import { cn } from "@cn/utils";
import { AlertCircleIcon } from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ButtonVariants } from "@shadcn/ui/button";

interface Options {
  shouldValidate: boolean;
  shouldDirty: boolean;
  shouldTouch: boolean;
}
const defaultOptions: Options = {
  shouldValidate: true,
  shouldDirty: true,
  shouldTouch: true,
};

interface Fields<T extends FieldValues> {
  form: UseFormReturn<T, any, undefined>;
  errors: FieldErrors<T>;
}

interface FormProps<T extends FieldValues> extends PropsWithChildren {
  validator: z.ZodType<T>;
  onValid: (data: T) => void;
  onInvalid?: (errorFields: FieldErrors<T>) => void;
  fields: ({}: Fields<T>) => React.ReactNode;
  className?: string;
}
type FormType = <T extends FieldValues>({}: FormProps<T>) => JSX.Element;
const Form: FormType & {
  Input: typeof FormInput;
  TextArea: typeof FormTextArea;
  Select: typeof FormSelect;
  SubmitButton: typeof FormSubmitButton;
  DatePicker: typeof FormDatePicker;
  Checkbox: typeof FormCheckbox;
  Switch: typeof FormSwitch;
  RadioGroup: typeof FormRadioGroup;
  Label: typeof FormLabel;
  Error: typeof FormError;
} = <T extends FieldValues>({
  children,
  validator,
  onValid,
  onInvalid,
  fields,
  className,
}: FormProps<T>) => {
  const form = useForm<T>({ resolver: zodResolver(validator) });
  const errors = form.formState.errors;
  const [parent] = useAutoAnimate();
  return (
    <form
      ref={parent}
      onSubmit={form.handleSubmit(onValid, onInvalid)}
      className={className}
    >
      {fields({ form, errors })}
      {children}
    </form>
  );
};

// *form input

interface FormInputProps<T extends FieldValues> extends InputProps {
  name: Path<T>;
  type: HTMLInputTypeAttribute;
  useForm: UseFormReturn<T, any, undefined>;
}

const FormInput = <T extends FieldValues>({
  type,
  name,
  useForm,
  value,
  onChange,
  defaultValue,
  className,
  ...props
}: FormInputProps<T>) => {
  const {
    formState: { errors },
    setValue,
  } = useForm;

  async function onValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(e);
    const options = errors[name]
      ? defaultOptions
      : { shouldDirty: true, shouldTouch: true };
    if (type === "number") {
      setValue(name, +e.target.value as PathValue<T, Path<T>>, options);
    } else if (type === "file") {
      const fileList = e.target.files;
      if (fileList) {
        const file = fileList.item(0);
        if (file) {
          const base64 = await FileToBase64(file);
          setValue(name, base64 as PathValue<T, Path<T>>, options);
        }
      }
    } else {
      setValue(name, e.target.value as PathValue<T, Path<T>>, options);
    }
  }

  useEffect(() => {
    if (value) {
      setValue(name, value as PathValue<T, Path<T>>, defaultOptions);
    }
    if (defaultValue) {
      setValue(name, defaultValue as PathValue<T, Path<T>>);
    }
  }, [value]);

  return (
    <Input
      type={type}
      value={value}
      {...props}
      onChange={onValueChange}
      defaultValue={type === "file" ? undefined : defaultValue}
      className={cn(
        className,
        errors[name] ? " border-red-500 focus-visible:ring-red-500" : ""
      )}
    />
  );
};

// *text area
interface FormTextAreaProps<T extends FieldValues> extends TextareaProps {
  name: Path<T>;
  useForm: UseFormReturn<T, any, undefined>;
}

const FormTextArea = <T extends FieldValues>({
  name,
  useForm,
  className,
  defaultValue,
  value,
  ...props
}: FormTextAreaProps<T>) => {
  const {
    setValue,
    formState: { errors },
  } = useForm;
  function handleChange(value: string) {
    const options = errors[name]
      ? defaultOptions
      : { shouldDirty: true, shouldTouch: true };
    return setNewValue(value, options);
  }
  function setNewValue(
    value: string | number | readonly string[],
    options?: Partial<Options>
  ) {
    setValue(name, value as PathValue<T, Path<T>>, options);
  }
  useEffect(() => {
    if (value) {
      setNewValue(value, defaultOptions);
    }
    if (defaultValue) {
      setNewValue(defaultValue);
    }
  }, [value]);

  return (
    <Textarea
      defaultValue={defaultValue}
      {...props}
      onChange={(e) => handleChange(e.target.value)}
      className={cn(
        className,
        errors[name] ? " border-red-500 focus-visible:ring-red-500" : ""
      )}
    />
  );
};

// *select
interface FormSelectProps<T extends FieldValues> {
  name: Path<T>;
  useForm: UseFormReturn<T, any, undefined>;
  items: ItemList[];
  className?: string;
  placeholder?: string;
  valueAsNumber?: boolean;
  defaultValue?: string | number;
}

export interface ItemList {
  value: string | "label-separator" | number;
  label: ReactNode;
}

const FormSelect = <T extends FieldValues>({
  name,
  useForm,
  className,
  placeholder,
  items,
  defaultValue,
  valueAsNumber = false,
}: FormSelectProps<T>) => {
  const {
    setValue,
    formState: { errors },
  } = useForm;

  function handleChange(value: string) {
    const options = errors[name]
      ? defaultOptions
      : { shouldDirty: true, shouldTouch: true };
    return setNewValue(value, options);
  }
  function setNewValue(value: string | number, options?: Partial<Options>) {
    setValue(
      name,
      valueAsNumber
        ? (+value as PathValue<T, Path<T>>)
        : (value as PathValue<T, Path<T>>),
      options
    );
  }
  useEffect(() => {
    if (defaultValue) {
      setNewValue(defaultValue);
    }
  }, []);
  return (
    <Select
      onValueChange={handleChange}
      defaultValue={defaultValue ? String(defaultValue) : undefined}
    >
      <SelectTrigger
        className={cn(
          className,
          errors[name] ? " border-red-500 focus:ring-red-500" : ""
        )}
      >
        <SelectValue
          placeholder={
            <span className=" text-muted-foreground">{placeholder}</span>
          }
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => {
            if (item.value === "label-separator") {
              return <SelectLabel key={item.value}>{item.label}</SelectLabel>;
            }
            return (
              <SelectItem key={item.value} value={String(item.value)}>
                {item.label}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

// *text area
interface FormDatePickerProps<T extends FieldValues> {
  name: Path<T>;
  useForm: UseFormReturn<T, any, undefined>;
  className?: string;
  defaultValue?: Date;
}

const FormDatePicker = <T extends FieldValues>({
  name,
  useForm,
  className,
  defaultValue,
}: FormDatePickerProps<T>) => {
  const {
    setValue,
    formState: { errors },
  } = useForm;
  function handleChange(value: Date) {
    const options = errors[name]
      ? defaultOptions
      : { shouldDirty: true, shouldTouch: true };
    return setNewValue(value, options);
  }
  function setNewValue(value: Date, options?: Partial<Options>) {
    setValue(name, value as PathValue<T, Path<T>>, options);
  }
  useEffect(() => {
    if (defaultValue) {
      setNewValue(defaultValue);
    }
  }, []);
  return (
    <DatePicker
      defaultValue={defaultValue}
      onSelect={handleChange}
      className={cn(
        className,
        errors[name] ? " border-red-500 focus-visible:ring-red-500" : ""
      )}
    />
  );
};

// *submit button

interface SubmitButtonProps<T extends FieldValues>
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  useForm: UseFormReturn<T, any, undefined>;
}
const FormSubmitButton = <T extends FieldValues>({
  useForm,
  children,
  ...btnProps
}: SubmitButtonProps<T>) => {
  return (
    <Button type="submit" disabled={!useForm.formState.isDirty} {...btnProps}>
      {children}
    </Button>
  );
};

// *checkbox
interface FormCheckboxProps<T extends FieldValues> {
  name: Path<T>;
  useForm: UseFormReturn<T, any, undefined>;
  className?: string;
  id?: string;
  label?: string;
  defaultValue?: boolean;
}
const FormCheckbox = <T extends FieldValues>({
  name,
  useForm,
  className,
  id,
  label,
  defaultValue,
}: FormCheckboxProps<T>) => {
  const {
    setValue,
    formState: { errors },
  } = useForm;
  function handleChange(value: CheckedState) {
    const options = errors[name]
      ? defaultOptions
      : { shouldDirty: true, shouldTouch: true };
    return setNewValue(value, options);
  }
  function setNewValue(value: CheckedState, options?: Partial<Options>) {
    setValue(name, value as PathValue<T, Path<T>>, options);
  }
  useEffect(() => {
    if (defaultValue) {
      setNewValue(defaultValue);
    }
  }, []);

  return (
    <div className="flex gap-2 items-center">
      <Checkbox
        defaultChecked={defaultValue}
        id={id}
        onCheckedChange={handleChange}
        className={className}
      />
      {label && <Label>{label}</Label>}
    </div>
  );
};

// *switch
interface FormSwitchProps<T extends FieldValues> {
  name: Path<T>;
  useForm: UseFormReturn<T, any, undefined>;
  className?: string;
  label?: string;
  defaultValue?: boolean;
}
const FormSwitch = <T extends FieldValues>({
  name,
  useForm,
  className,
  label,
  defaultValue,
}: FormSwitchProps<T>) => {
  const {
    setValue,
    formState: { errors },
  } = useForm;
  function handleChange(value: boolean) {
    const options = errors[name]
      ? defaultOptions
      : { shouldDirty: true, shouldTouch: true };
    return setNewValue(value, options);
  }
  function setNewValue(value: boolean, options?: Partial<Options>) {
    setValue(name, value as PathValue<T, Path<T>>, options);
  }
  useEffect(() => {
    if (defaultValue) {
      setNewValue(defaultValue);
    }
  }, []);

  return (
    <div className="flex gap-2 items-center">
      <Switch
        defaultChecked={defaultValue}
        onCheckedChange={handleChange}
        className={className}
      />
      {label && <Label>{label}</Label>}
    </div>
  );
};

// *radio group
interface FormRadioGroupProps<T extends FieldValues> {
  name: Path<T>;
  useForm: UseFormReturn<T, any, undefined>;
  className?: string;
  items: ItemList[];
  valueAsNumber?: boolean;
  defaultValue?: string;
}
const FormRadioGroup = <T extends FieldValues>({
  name,
  useForm,
  className,
  items,
  valueAsNumber = false,
  defaultValue,
}: FormRadioGroupProps<T>) => {
  const {
    setValue,
    formState: { errors },
  } = useForm;
  function handleChange(value: string) {
    const options = errors[name]
      ? defaultOptions
      : { shouldDirty: true, shouldTouch: true };
    return setNewValue(value, options);
  }
  function setNewValue(value: string | number, options?: Partial<Options>) {
    setValue(
      name,
      valueAsNumber
        ? (+value as PathValue<T, Path<T>>)
        : (value as PathValue<T, Path<T>>),
      options
    );
  }
  useEffect(() => {
    if (defaultValue) {
      setNewValue(defaultValue);
    }
  }, []);
  return (
    <RadioGroup
      className={className}
      onValueChange={handleChange}
      defaultValue={
        defaultValue
          ? defaultValue
          : items[0].value !== "label-separator"
          ? String(items[0].value)
          : String(items[1].value)
      }
    >
      {items.map(
        (item) =>
          item.value !== "label-separator" && (
            <div className="flex items-center space-x-2" key={item.value}>
              <RadioGroupItem value={String(item.value)} />
              <Label>{item.label}</Label>
            </div>
          )
      )}
    </RadioGroup>
  );
};

const FormLabel = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <Label className={className}>
      {children}
      <span className="text-red-500"> * </span>
    </Label>
  );
};
const FormError = ({
  field,
  className,
}: {
  field: FieldError | undefined;
  className?: string;
}) => {
  if (!field) {
    return;
  }
  return (
    <div className={cn("text-red-500 flex items-center ", className)}>
      <AlertCircleIcon className="w-4 h-4 mr-2"></AlertCircleIcon>
      <p className="text-sm text-end">{field.message}</p>
    </div>
  );
};

Form.Error = FormError;
Form.Label = FormLabel;
Form.RadioGroup = FormRadioGroup;
Form.Switch = FormSwitch;
Form.Checkbox = FormCheckbox;
Form.DatePicker = FormDatePicker;
Form.SubmitButton = FormSubmitButton;
Form.Select = FormSelect;
Form.Input = FormInput;
Form.TextArea = FormTextArea;
export default Form;
