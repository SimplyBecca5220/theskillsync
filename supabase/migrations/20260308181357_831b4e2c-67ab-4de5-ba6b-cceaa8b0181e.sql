
-- Create help_requests table
CREATE TABLE public.help_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  topic TEXT NOT NULL,
  description TEXT NOT NULL,
  urgency TEXT NOT NULL CHECK (urgency IN ('low', 'medium', 'high')),
  learner_name TEXT NOT NULL,
  claimed_by TEXT,
  resolved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.help_requests ENABLE ROW LEVEL SECURITY;

-- Public read access (this is a public mentorship board)
CREATE POLICY "Anyone can view requests" ON public.help_requests FOR SELECT USING (true);

-- Anyone can create requests (no auth required for this demo)
CREATE POLICY "Anyone can create requests" ON public.help_requests FOR INSERT WITH CHECK (true);

-- Anyone can update requests (claim/resolve)
CREATE POLICY "Anyone can update requests" ON public.help_requests FOR UPDATE USING (true);

-- Seed some initial data
INSERT INTO public.help_requests (topic, description, urgency, learner_name) VALUES
  ('React', 'Struggling with useEffect cleanup functions and memory leaks in my component.', 'high', 'Alex Chen'),
  ('Python', 'Need help understanding async/await patterns with aiohttp.', 'medium', 'Sarah Kim'),
  ('TypeScript', 'Can''t figure out generic constraints with conditional types.', 'low', 'Jordan Lee');
