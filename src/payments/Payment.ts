import Stripe from 'stripe';
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe (process.env.STRIPE_SK as string,{
    apiVersion: '2022-11-15',
  });

