-- Create providers table
CREATE TABLE public.providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  business_name TEXT,
  description TEXT,
  location TEXT,
  category TEXT,
  cover_image TEXT,
  gallery TEXT[],
  availability JSONB,
  response_time TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create services table  
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES public.providers(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  duration_minutes INT,
  category TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
  provider_id UUID REFERENCES public.providers(id) ON DELETE SET NULL,
  customer_id UUID NOT NULL,
  scheduled_date DATE,
  scheduled_time TIME,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  provider_id UUID REFERENCES public.providers(id) ON DELETE SET NULL,
  customer_id UUID NOT NULL,
  amount NUMERIC NOT NULL,
  provider_cut NUMERIC,
  tx_ref TEXT,
  status TEXT DEFAULT 'pending',
  payment_method TEXT,
  raw JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Providers policies
CREATE POLICY "Anyone can view providers" ON public.providers FOR SELECT USING (true);
CREATE POLICY "Users can create their own provider profile" ON public.providers FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Providers can update their own profile" ON public.providers FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Providers can delete their own profile" ON public.providers FOR DELETE USING (auth.uid() = user_id);

-- Services policies
CREATE POLICY "Anyone can view services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Providers can create services" ON public.services FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.providers WHERE id = provider_id AND user_id = auth.uid())
);
CREATE POLICY "Providers can update their services" ON public.services FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.providers WHERE id = provider_id AND user_id = auth.uid())
);
CREATE POLICY "Providers can delete their services" ON public.services FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.providers WHERE id = provider_id AND user_id = auth.uid())
);

-- Bookings policies
CREATE POLICY "Customers can view their bookings" ON public.bookings FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Providers can view bookings for their services" ON public.bookings FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.providers WHERE id = provider_id AND user_id = auth.uid())
);
CREATE POLICY "Customers can create bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "Customers can update their bookings" ON public.bookings FOR UPDATE USING (auth.uid() = customer_id);
CREATE POLICY "Providers can update booking status" ON public.bookings FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.providers WHERE id = provider_id AND user_id = auth.uid())
);

-- Payments policies
CREATE POLICY "Customers can view their payments" ON public.payments FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Providers can view their payments" ON public.payments FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.providers WHERE id = provider_id AND user_id = auth.uid())
);
CREATE POLICY "System can insert payments" ON public.payments FOR INSERT WITH CHECK (true);

-- Add triggers for updated_at
CREATE TRIGGER update_providers_updated_at BEFORE UPDATE ON public.providers
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();