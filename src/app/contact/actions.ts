'use server';

import { createClient } from '@/lib/supabase/server';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContactForm(formData: FormData) {
  const rawName = formData.get('name');
  const rawEmail = formData.get('email');
  const rawMessage = formData.get('message');

  const name = typeof rawName === 'string' ? rawName.trim() : '';
  const email =
    typeof rawEmail === 'string' ? rawEmail.trim().toLowerCase() : '';
  const message = typeof rawMessage === 'string' ? rawMessage.trim() : '';

  if (!name || name.length < 2) {
    return;
  }

  if (!email || !emailPattern.test(email)) {
    return;
  }

  if (!message || message.length < 10) {
    return;
  }

  const supabase = await createClient();
  const tableName = 'contact_submissions';

  const { error } = await supabase.from(tableName).insert({
    name,
    email,
    message,
    source: 'contact-page',
  });

  if (error) {
    console.error('Failed to save contact form submission:', error.message);
  }
}
