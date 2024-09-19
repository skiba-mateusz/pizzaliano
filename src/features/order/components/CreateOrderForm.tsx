import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CreateOrderFormValues,
  createOrderFormSchema,
} from "../api/createOrder";

interface CreateOrderFormProps {
  onSubmit: (data: CreateOrderFormValues) => Promise<void>;
  defaultValues: CreateOrderFormValues;
  isLoading: boolean;
}

export const CreateOrderForm: React.FC<CreateOrderFormProps> = ({
  onSubmit,
  defaultValues,
  isLoading,
}) => {
  const methods = useForm<CreateOrderFormValues>({
    resolver: yupResolver(createOrderFormSchema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form
        className="grid gap-6"
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
      >
        <Input label="Full Name" name="fullName" />
        <div className="grid grid-flow-row gap-6 sm:grid-flow-col">
          <Input label="Email Address" name="emailAddress" type="email" />
          <Input label="Phone Number" name="phoneNumber" mask="999-999-999" />
        </div>
        <div className="grid grid-flow-row gap-4 sm:grid-flow-col md:gap-6">
          <Input label="Street address" name="streetAddress" />
          <Input label="City" name="city" />
          <Input label="Postal Code" name="postalCode" mask="99-999" />
        </div>
        <Button disabled={isLoading}>Place Order</Button>
      </form>
    </FormProvider>
  );
};
