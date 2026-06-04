import emailjs from '@emailjs/browser';

// EmailJS configuration - REPLACE WITH YOUR ACTUAL CREDENTIALS
const EMAILJS_PUBLIC_KEY = 'd18P5-J36Np9TbmVM';
const EMAILJS_SERVICE_ID = 'service_glgzmua';
const EMAILJS_TEMPLATE_ID = 'template_pfrkyqd';

// Initialize EmailJS only if public key is provided
if (EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'd18P5-J36Np9TbmVM') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

export const sendWelcomeEmail = async (userData) => {
  // Skip if EmailJS is not configured
  if (!EMAILJS_PUBLIC_KEY || EMAILJS_PUBLIC_KEY === 'd18P5-J36Np9TbmVM') {
    console.log('EmailJS not configured - skipping email');
    return { success: true, message: 'Email skipped (not configured)' };
  }

  try {
    const templateParams = {
      to_name: userData.name,
      to_email: userData.email,
      signup_date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      shop_link: 'http://localhost:5173/shop',
      login_link: 'http://localhost:5173/login',
      promo_code: 'WELCOME15'
    };

    console.log('Sending welcome email to:', userData.email);
    
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );
    
    console.log('Email sent successfully!', response);
    return { success: true, message: 'Welcome email sent' };
  } catch (error) {
    console.error('Email sending failed (non-critical):', error);
    // Don't throw error - email is optional
    return { success: false, message: 'Email failed but account created' };
  }
};