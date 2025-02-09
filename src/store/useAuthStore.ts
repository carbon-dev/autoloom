import { create } from 'zustand';
import { supabase, isMockMode } from '../lib/supabase';
import type { AuthStore, User } from '../types';

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email) => {
    try {
      if (isMockMode()) {
        const newUser: User = {
          id: Math.random().toString(36).substring(7),
          email,
          subscription: 'trial',
          processedImages: 0,
          trialImagesLeft: 5,
        };
        set({ user: newUser, isAuthenticated: true });
        return;
      }

      // Create or get customer record
      const { data: customer, error } = await supabase!
        .from('customers')
        .upsert(
          {
            email,
            subscription_tier: 'trial',
            trial_images_left: 5,
            processed_images: 0,
          },
          { onConflict: 'email' }
        )
        .select()
        .single();

      if (error) throw error;

      const newUser: User = {
        id: customer.id,
        email: customer.email,
        subscription: customer.subscription_tier,
        processedImages: customer.processed_images,
        trialImagesLeft: customer.trial_images_left,
      };

      set({ user: newUser, isAuthenticated: true });
    } catch (error) {
      console.error('Error logging in:', error);
      // Fall back to local storage for development
      const newUser: User = {
        id: Math.random().toString(36).substring(7),
        email,
        subscription: 'trial',
        processedImages: 0,
        trialImagesLeft: 5,
      };
      set({ user: newUser, isAuthenticated: true });
    }
  },
  logout: () => {
    // Clear all storage
    localStorage.clear();
    sessionStorage.clear();
    
    // Clear the store state
    set({ user: null, isAuthenticated: false });
  },
  clearAuth: () => {
    // Clear all storage
    localStorage.clear();
    sessionStorage.clear();
    
    // Reset store to initial state
    set({ user: null, isAuthenticated: false });
  },
  updateProcessedImages: async () => {
    set((state) => {
      if (!state.user) return state;

      const newTrialImagesLeft = Math.max(0, (state.user.trialImagesLeft || 0) - 1);
      const newProcessedImages = (state.user.processedImages || 0) + 1;

      if (!isMockMode()) {
        // Update Supabase in the background
        supabase!
          .from('customers')
          .update({
            trial_images_left: newTrialImagesLeft,
            processed_images: newProcessedImages,
          })
          .eq('id', state.user.id)
          .then(({ error }) => {
            if (error) console.error('Error updating processed images:', error);
          });
      }

      return {
        user: {
          ...state.user,
          processedImages: newProcessedImages,
          trialImagesLeft: newTrialImagesLeft,
        },
      };
    });
  },
  updateSubscription: async (subscription) => {
    set((state) => {
      if (!state.user) return state;

      if (!isMockMode()) {
        // Update Supabase in the background
        supabase!
          .from('customers')
          .update({
            subscription_tier: subscription,
            trial_images_left: subscription === 'trial' ? 5 : null,
          })
          .eq('id', state.user.id)
          .then(({ error }) => {
            if (error) console.error('Error updating subscription:', error);
          });
      }

      return {
        user: {
          ...state.user,
          subscription,
          trialImagesLeft: subscription === 'trial' ? 5 : undefined,
        },
      };
    });
  },
}));