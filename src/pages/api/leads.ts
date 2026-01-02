import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import axios from 'axios';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

interface LeadData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

export const POST: APIRoute = async ({ request }) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const data: LeadData = await request.json();

    // Validación básica
    if (!data.name || !data.email || !data.phone) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Guardar en Directus
    if (import.meta.env.DIRECTUS_URL && import.meta.env.DIRECTUS_TOKEN) {
      try {
        await axios.post(
          `${import.meta.env.DIRECTUS_URL}/items/leads`,
          {
            name: data.name,
            email: data.email,
            phone: data.phone,
            company: data.company || '',
            message: data.message || '',
            created_at: new Date().toISOString(),
          },
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.DIRECTUS_TOKEN}`,
              'Content-Type': 'application/json',
            },
          }
        );
      } catch (directusError) {
        console.error('Error saving to Directus:', directusError);
      }
    }

    // Enviar email de confirmación con Resend
    try {
      await resend.emails.send({
        from: 'noreply@ecommerce.cat',
        to: data.email,
        subject: 'Hem rebut la teva sol·licitud - eCommerce.cat',
        html: `
          <h1>Gràcies per contactar-nos!</h1>
          <p>Hola ${data.name},</p>
          <p>Hem rebut la teva sol·licitud i ens posarem en contacte amb tu aviat.</p>
          <p>Dades de contacte:</p>
          <ul>
            <li>Nom: ${data.name}</li>
            <li>Email: ${data.email}</li>
            <li>Telèfon: ${data.phone}</li>
            <li>Empresa: ${data.company || 'No especificada'}</li>
          </ul>
          <p>Salutacions,<br>L'equip d'eCommerce.cat</p>
        `,
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
    }

    // Enviar email de notificació a l'admin
    try {
      await resend.emails.send({
        from: 'noreply@ecommerce.cat',
        to: import.meta.env.ADMIN_EMAIL || 'info@ecommerce.cat',
        subject: `Nou lead: ${data.name}`,
        html: `
          <h1>Nou lead rebut</h1>
          <p><strong>Nom:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Telèfon:</strong> ${data.phone}</p>
          <p><strong>Empresa:</strong> ${data.company || 'No especificada'}</p>
          <p><strong>Missatge:</strong></p>
          <p>${data.message || 'No especificat'}</p>
        `,
      });
    } catch (adminEmailError) {
      console.error('Error sending admin email:', adminEmailError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Lead saved successfully',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error processing lead:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
