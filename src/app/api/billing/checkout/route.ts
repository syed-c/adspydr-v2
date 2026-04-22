import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

async function getStripe() {
  const Stripe = (await import('stripe')).default;
  return new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_dummy', {
    apiVersion: '2024-12-18.acacia' as any,
  });
}

export async function POST(req: NextRequest) {
  try {
    const stripe = await getStripe();
    
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { plan } = await req.json();
    
    const priceIds: Record<string, string> = {
      pro: process.env.STRIPE_PRO_PRICE_ID || '',
      agency: process.env.STRIPE_AGENCY_PRICE_ID || '',
    };

    const priceId = priceIds[plan];
    if (!priceId) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/account/billing?upgraded=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/account/billing`,
      customer_email: session.user.email || undefined,
      metadata: {
        userId: (session.user as any).id,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout' }, { status: 500 });
  }
}
