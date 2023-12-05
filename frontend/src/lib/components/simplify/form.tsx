import {
  ButtonHTMLAttributes,
  PropsWithChildren,
  HTMLInputTypeAttribute,
  useEffect,
} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldErrors,
  FieldValues,
  UseFormReturn,
  useForm,
  Path,
  PathValue,
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
import { ImageToBase64 } from "../../../utils";
import { CheckedState } from "@radix-ui/react-checkbox";

const defaultOptions = {
  shouldValidate: true,
  shouldDirty: true,
  shouldTouch: true,
};

interface Fields<T extends FieldValues> {
  form: UseFormReturn<T, any, undefined>;
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
} = <T extends FieldValues>({
  children,
  validator,
  onValid,
  onInvalid,
  fields,
  className,
}: FormProps<T>) => {
  const form = useForm<T>({ resolver: zodResolver(validator) });
  return (
    <form
      onSubmit={form.handleSubmit(onValid, onInvalid)}
      className={className}
    >
      {fields({ form })}
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
  ...props
}: FormInputProps<T>) => {
  const {
    formState: { errors },
    setValue,
    register,
  } = useForm;

  async function onValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    const options = errors[name] ? defaultOptions : {};
    if (type === "number") {
      setValue(name, +e.target.value as PathValue<T, Path<T>>, options);
    } else if (type === "file") {
      const b64 = await ImageToBase64(e.target.files?.item(0) as File);
      setValue(name, b64 as PathValue<T, Path<T>>, options);
    } else {
      setValue(name, e.target.value as PathValue<T, Path<T>>, options);
    }
  }

  useEffect(() => {
    return () => {
      if (props.defaultValue) {
        setValue(name, props.defaultValue as PathValue<T, Path<T>>);
      }
    };
  }, []);

  useEffect(() => {
    if (value) {
      setValue(name, value as PathValue<T, Path<T>>);
    }
  }, [value]);

  return (
    <>
      <Input
        type={type}
        {...props}
        onChange={onValueChange}
        ref={register(name).ref}
      />
      {errors[name] && (
        <p className="text-sm text-red-500">{`${errors[name]?.message}`}</p>
      )}
    </>
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
  ...props
}: FormTextAreaProps<T>) => {
  const {
    setValue,
    formState: { errors },
  } = useForm;
  function setNewValue(value: string | number | readonly string[]) {
    const options = errors[name] ? defaultOptions : {};
    setValue(name, value as PathValue<T, Path<T>>, options);
  }
  useEffect(() => {
    return () => {
      if (props.defaultValue) {
        setNewValue(props.defaultValue);
      }
    };
  }, []);
  return (
    <>
      <Textarea
        {...props}
        onChange={(e) => setNewValue(e.target.value)}
        className={className}
      />
      {errors[name] && (
        <p className="text-sm text-red-500">{`${errors[name]?.message}`}</p>
      )}
    </>
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
  label: string;
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

  function setNewValue(value: string | number) {
    const options = errors[name] ? defaultOptions : {};
    setValue(
      name,
      valueAsNumber
        ? (+value as PathValue<T, Path<T>>)
        : (value as PathValue<T, Path<T>>),
      options
    );
  }
  useEffect(() => {
    return () => {
      if (defaultValue) {
        setNewValue(defaultValue);
      }
    };
  }, []);
  return (
    <>
      <Select
        onValueChange={setNewValue}
        defaultValue={defaultValue ? String(defaultValue) : undefined}
      >
        <SelectTrigger className={className}>
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
                return <SelectLabel key={item.label}>{item.label}</SelectLabel>;
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
      {errors[name] && (
        <p className="text-sm text-red-500">{`${errors[name]?.message}`}</p>
      )}
    </>
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
  function setNewValue(value: Date) {
    const options = errors[name] ? defaultOptions : {};
    setValue(name, value as PathValue<T, Path<T>>, options);
  }
  useEffect(() => {
    return () => {
      if (defaultValue) {
        setNewValue(defaultValue);
      }
    };
  }, []);
  return (
    <>
      <DatePicker
        defaultValue={defaultValue}
        onSelect={setNewValue}
        className={className}
      />
      {errors[name] && (
        <p className="text-sm text-red-500">{`${errors[name]?.message}`}</p>
      )}
    </>
  );
};

// *submit button

interface SubmitButtonProps<T extends FieldValues>
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {
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
  function setNewValue(value: CheckedState) {
    const options = errors[name] ? defaultOptions : {};
    setValue(name, value as PathValue<T, Path<T>>, options);
  }
  useEffect(() => {
    return () => {
      if (defaultValue) {
        setNewValue(defaultValue);
      }
    };
  }, []);
  return (
    <div className="flex flex-col grow">
      <div className="flex gap-2 items-center">
        <Checkbox
          defaultChecked={defaultValue}
          id={id}
          onCheckedChange={setNewValue}
          className={className}
        />
        {label && <Label>{label}</Label>}
      </div>

      {errors[name] && (
        <p className="text-sm text-red-500">{`${errors[name]?.message}`}</p>
      )}
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
  function setNewValue(value: boolean) {
    const options = errors[name] ? defaultOptions : {};
    setValue(name, value as PathValue<T, Path<T>>, options);
  }
  useEffect(() => {
    return () => {
      if (defaultValue) {
        setNewValue(defaultValue);
      }
    };
  }, []);

  return (
    <div className="flex flex-col grow">
      <div className="flex gap-2 items-center">
        <Switch
          defaultChecked={defaultValue}
          onCheckedChange={setNewValue}
          className={className}
        />
        {label && <Label>{label}</Label>}
      </div>
      {errors[name] && (
        <p className="text-sm text-red-500">{`${errors[name]?.message}`}</p>
      )}
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
  function setNewValue(value: string | number) {
    const options = errors[name] ? defaultOptions : {};
    setValue(
      name,
      valueAsNumber
        ? (+value as PathValue<T, Path<T>>)
        : (value as PathValue<T, Path<T>>),
      options
    );
  }
  useEffect(() => {
    return () => {
      if (defaultValue) {
        setNewValue(defaultValue);
      }
    };
  }, []);
  return (
    <div className="flex flex-col grow">
      <RadioGroup
        className={className}
        onValueChange={setNewValue}
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
      {errors[name] && (
        <p className="text-sm text-red-500">{`${errors[name]?.message}`}</p>
      )}
    </div>
  );
};

Form.RadioGroup = FormRadioGroup;
Form.Switch = FormSwitch;
Form.Checkbox = FormCheckbox;
Form.DatePicker = FormDatePicker;
Form.SubmitButton = FormSubmitButton;
Form.Select = FormSelect;
Form.Input = FormInput;
Form.TextArea = FormTextArea;
export default Form;
