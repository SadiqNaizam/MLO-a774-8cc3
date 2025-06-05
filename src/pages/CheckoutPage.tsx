import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useForm } from '@/components/ui/form'; // Corrected import
import DeliveryAddressCard from '@/components/DeliveryAddressCard';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from "@/components/ui/use-toast";

const addressSchema = z.object({
  addressLine1: z.string().min(5, "Address line 1 is too short"),
  city: z.string().min(2, "City is too short"),
  postalCode: z.string().min(5, "Postal code is too short"),
  // Add more fields if needed for a new address form
});

const checkoutFormSchema = z.object({
  selectedAddressId: z.string().min(1, "Please select a delivery address."),
  paymentMethod: z.string().min(1, "Please select a payment method."),
  promoCode: z.string().optional(),
});

const placeholderAddresses = [
  { id: 'addr1', addressLine1: '123 Main St', city: 'Anytown', postalCode: '12345', isDefault: true },
  { id: 'addr2', addressLine1: '456 Oak Ave', addressLine2: 'Apt 2B', city: 'Somecity', postalCode: '67890' },
];

const paymentMethods = [
  { id: 'pm_card', name: 'Credit/Debit Card' },
  { id: 'pm_paypal', name: 'PayPal' },
  { id: 'pm_cod', name: 'Cash on Delivery' },
];

// Mock order total from cart
const mockOrderTotal = 29.87;

const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();
  const { toast } = useToast();
  const [addresses, setAddresses] = useState(placeholderAddresses); // In real app, fetch or manage via state/context
  const [selectedAddressId, setSelectedAddressId] = useState(placeholderAddresses.find(a => a.isDefault)?.id || placeholderAddresses[0]?.id || '');

  const form = useForm<z.infer<typeof checkoutFormSchema>>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      selectedAddressId: selectedAddressId,
      paymentMethod: '',
      promoCode: '',
    },
  });

  const onSubmit = (values: z.infer<typeof checkoutFormSchema>) => {
    console.log('Checkout form submitted:', values);
    toast({
      title: "Order Placed!",
      description: "Your order has been successfully placed. Redirecting to tracking...",
    });
    // Simulate API call & redirect
    setTimeout(() => {
      navigate(`/order/mock_order_123`); // Navigate to a mock order tracking page
    }, 2000);
  };
  
  React.useEffect(() => {
    form.setValue('selectedAddressId', selectedAddressId);
  }, [selectedAddressId, form]);


  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header title="Checkout" showBackButton={true} onBackClick={() => navigate(-1)} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              {/* Delivery Address Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup
                    value={selectedAddressId}
                    onValueChange={(value) => {
                        setSelectedAddressId(value);
                        form.setValue('selectedAddressId', value); // Ensure form value is updated
                    }}
                  >
                    {addresses.map(address => (
                      <DeliveryAddressCard
                        key={address.id}
                        {...address}
                        isSelected={selectedAddressId === address.id}
                        onSelect={() => {
                            setSelectedAddressId(address.id);
                            form.setValue('selectedAddressId', address.id); // Ensure form value is updated
                        }}
                        // onEdit={(id) => console.log("Edit address", id)}
                        // onDelete={(id) => console.log("Delete address", id)}
                      />
                    ))}
                  </RadioGroup>
                  <FormField
                    control={form.control}
                    name="selectedAddressId"
                    render={({ field }) => ( // This field is mainly for validation message display
                      <FormItem className="hidden">
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="button" variant="outline" className="w-full">Add New Address</Button>
                </CardContent>
              </Card>

              {/* Payment Method Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            {paymentMethods.map(method => (
                              <FormItem key={method.id} className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={method.id} />
                                </FormControl>
                                <FormLabel className="font-normal">{method.name}</FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Order Summary Section */}
            <div className="md:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex justify-between">
                        <Label className="text-muted-foreground">Subtotal</Label>
                        <Label>${(mockOrderTotal - 5.00 - (mockOrderTotal * 0.08 / 1.08)).toFixed(2)}</Label> 
                    </div>
                    <div className="flex justify-between">
                        <Label className="text-muted-foreground">Delivery Fee</Label>
                        <Label>$5.00</Label>
                    </div>
                    <div className="flex justify-between">
                        <Label className="text-muted-foreground">Taxes</Label>
                        <Label>${(mockOrderTotal * 0.08 / 1.08).toFixed(2)}</Label>
                    </div>
                    <hr/>
                    <div className="flex justify-between font-semibold text-lg">
                        <Label>Total</Label>
                        <Label>${mockOrderTotal.toFixed(2)}</Label>
                    </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                    <CardTitle className="text-base">Promo Code</CardTitle>
                </CardHeader>
                <CardContent className="flex space-x-2">
                    <FormField
                        control={form.control}
                        name="promoCode"
                        render={({ field }) => (
                        <FormItem className="flex-grow">
                            <FormControl>
                            <Input placeholder="Enter promo code" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button type="button" variant="secondary">Apply</Button>
                </CardContent>
              </Card>
              <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Placing Order..." : `Place Order - $${mockOrderTotal.toFixed(2)}`}
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
};

export default CheckoutPage;