-- Drop the overly permissive payment insert policy
DROP POLICY "System can insert payments" ON public.payments;

-- Create a more secure policy - only authenticated users can insert payments for themselves
CREATE POLICY "Authenticated users can create payments" ON public.payments 
FOR INSERT WITH CHECK (auth.uid() = customer_id);