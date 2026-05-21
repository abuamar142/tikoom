-- Seed sample categories for testing
-- Note: To test RBAC, create users via Supabase Auth (Studio or frontend),
-- then manually assign roles in the user_roles table.

-- Insert sample categories (will only be visible to admin/super_admin)
INSERT INTO public.categories (name, description) VALUES
    ('Technology', 'Articles and resources about technology and software development.'),
    ('Business', 'Business insights, entrepreneurship, and market analysis.'),
    ('Design', 'UI/UX design, graphic design, and creative resources.')
ON CONFLICT DO NOTHING;
