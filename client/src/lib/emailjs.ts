import emailjs from '@emailjs/browser';

interface EmailData extends Record<string, unknown> {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}

export const sendContactEmail = async (data: EmailData): Promise<void> => {
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_b4scoan';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_gmo4whk';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'GvVYlMnmCcP-ipG_n';

    await emailjs.send(serviceId, templateId, data, publicKey);
  } catch (error) {
    console.error('EmailJS error:', error);
    throw new Error('Failed to send email');
  }
};

// Initialize EmailJS
emailjs.init({
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'GvVYlMnmCcP-ipG_n',
});
