import Stripe from "stripe";
import { NextResponse, NextRequest } from "node_modules/next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export default function POST(req: NextRequest, res: NextResponse) 
{



}