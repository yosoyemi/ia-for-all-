import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ircuqxqwsxiysyvikwzc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyY3VxeHF3c3hpeXN5dmlrd3pjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2MjE2MzAsImV4cCI6MjA0NTE5NzYzMH0.BLKeAO9SoxLNYrdwICeHf3VPPuZBwgDn6X54qCtvxzw'; // Inserta aquí la API Key que te proporcionó Supabase

export const supabase = createClient(supabaseUrl, supabaseKey);