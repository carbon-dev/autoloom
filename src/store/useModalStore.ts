import { create } from 'zustand';

interface ModalState {
  isLoginOpen: boolean;
  isSignupOpen: boolean;
  openLogin: () => void;
  openSignup: () => void;
  closeLogin: () => void;
  closeSignup: () => void;
  switchToLogin: () => void;
  switchToSignup: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isLoginOpen: false,
  isSignupOpen: false,
  openLogin: () => set({ isLoginOpen: true, isSignupOpen: false }),
  openSignup: () => set({ isSignupOpen: true, isLoginOpen: false }),
  closeLogin: () => set({ isLoginOpen: false }),
  closeSignup: () => set({ isSignupOpen: false }),
  switchToLogin: () => {
    // Single atomic update to switch modals
    set({
      isSignupOpen: false,
      isLoginOpen: true
    });
  },
  switchToSignup: () => {
    // Single atomic update to switch modals
    set({
      isLoginOpen: false,
      isSignupOpen: true
    });
  }
})); 