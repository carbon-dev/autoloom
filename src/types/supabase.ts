export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string
          email: string
          subscription_tier: 'trial' | 'pro' | 'enterprise'
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          trial_images_left: number
          processed_images: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          subscription_tier?: 'trial' | 'pro' | 'enterprise'
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_images_left?: number
          processed_images?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          subscription_tier?: 'trial' | 'pro' | 'enterprise'
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_images_left?: number
          processed_images?: number
          created_at?: string
          updated_at?: string
        }
      }
      processed_images: {
        Row: {
          id: string
          customer_id: string
          original_url: string
          processed_url: string
          created_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          original_url: string
          processed_url: string
          created_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          original_url?: string
          processed_url?: string
          created_at?: string
        }
      }
    }
  }
}