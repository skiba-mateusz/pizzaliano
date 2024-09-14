import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OrderFormSchema } from "../validation/orderValidationSchema";
import { OrderFormValues } from "../types";

interface CreateOrderFormProps {
  onSubmit: (data: OrderFormValues) => void;
}

export const CreateOrderForm: React.FC<CreateOrderFormProps> = ({
  onSubmit,
}) => {
  const methods = useForm<OrderFormValues>({
    resolver: yupResolver(OrderFormSchema),
    defaultValues: {
      fullName: "",
      emailAddress: "",
      phoneNumber: "",
      streetAddress: "",
      city: "",
      postalCode: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <form
        className="grid gap-4 md:gap-6"
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
      >
        <Input label="Full Name" name="fullName" />
        <div className="grid grid-flow-row gap-4 sm:grid-flow-col md:gap-6">
          <Input label="Email Address" name="emailAddress" type="email" />
          <Input label="Phone Number" name="phoneNumber" mask="999-999-999" />
        </div>
        <div className="grid grid-flow-row gap-4 sm:grid-flow-col md:gap-6">
          <Input label="Street address" name="streetAddress" />
          <Input label="City" name="city" />
          <Input label="Postal Code" name="postalCode" mask="99-999" />
        </div>
        <Button>Place Order</Button>
      </form>
    </FormProvider>
  );
};
