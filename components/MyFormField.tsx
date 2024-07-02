import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";

const formSchema = authFormSchema("sign-up");

interface MyFormFieldProp {
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  type?: string;
  placeholder: string;
  formControl: Control<z.infer<typeof formSchema>>;
}

import { Input } from "@/components/ui/input";
import { Control, FieldPath } from "react-hook-form";
import { authFormSchema } from "@/lib/utils";
const MyFormField = ({
  formControl,
  name,
  label,
  type = "text",
  placeholder,
}: MyFormFieldProp) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                className="input-class"
                type={type}
                {...field}
              />
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
};
export default MyFormField;
