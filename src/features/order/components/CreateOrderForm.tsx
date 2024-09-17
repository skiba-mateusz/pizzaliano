import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CreaterOrderInputValues,
  createOrderInputSchema,
} from "../api/createOrder";

interface CreateOrderFormProps {
  onSubmit: (data: CreaterOrderInputValues) => Promise<void>;
  defaultValues: CreaterOrderInputValues;
  isLoading: boolean;
}

export const CreateOrderForm: React.FC<CreateOrderFormProps> = ({
  onSubmit,
  defaultValues,
  isLoading,
}) => {
  const methods = useForm<CreaterOrderInputValues>({
    resolver: yupResolver(createOrderInputSchema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form
        className="grid gap-4 md:gap-6"
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
      >
        <Input label="Full Name" name="full_name" />
        <div className="grid grid-flow-row gap-4 sm:grid-flow-col md:gap-6">
          <Input label="Email Address" name="email_address" type="email" />
          <Input label="Phone Number" name="phone_number" mask="999-999-999" />
        </div>
        <div className="grid grid-flow-row gap-4 sm:grid-flow-col md:gap-6">
          <Input label="Street address" name="street_address" />
          <Input label="City" name="city" />
          <Input label="Postal Code" name="postal_code" mask="99-999" />
        </div>
        <Button disabled={isLoading}>Place Order</Button>
      </form>
    </FormProvider>
  );
};
