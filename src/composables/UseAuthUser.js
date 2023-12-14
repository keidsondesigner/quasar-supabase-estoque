import { ref } from 'vue';
import useSupabase from 'boot/supabase';
// user is set outside of the useAuthUser function
// so that it will act as global state and always refer to a single user

// o usuário é definido fora da função useAuthUser para que atue como um estado global
// e sempre se refira a um único usuário

const user = ref(null);

export default function useAuthUser() {
  const { supabase } = useSupabase();
  /**
   * Login with email and password
   */

  const loginUser = async ({ email, password }) => {
    const { user: authenticatedUser, error } = await supabase.auth.signIn({ email, password });
    if (error) throw error;
    return authenticatedUser;
  };

  /**
   * Login with google, github, etc
   */
  const loginWithSocialProvider = async (provider) => {
    const { user: authenticatedUser, error } = await supabase.auth.signIn({ provider });
    if (error) throw error;
    return authenticatedUser;
  };

  /**
   * Logout
   */
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  /**
   * Check if the user is logged in or not
   */
  const isLoggedIn = () => !!user.value;

  /**
   * Register
   */
  const register = async ({ email, password, ...meta }) => {
    const { user: registeredUser, error } = await supabase.auth.signUp(
      { email, password },
      {
        // arbitrary meta data is passed as the second argument under a data key
        // to the Supabase signUp method
        data: meta,
        // the to redirect to after the user confirms their email
        // window.location wouldn't be available if we were rendering server side
        // but since we're all on the client it will work fine
        redirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation"`,
      },
    );
    if (error) throw error;
    return registeredUser;
  };

  /**
   * Update user email, password, or meta data
   */
  const update = async (data) => {
    const { user: updatedUser, error } = await supabase.auth.update(data);
    if (error) throw error;
    return updatedUser;
  };

  /**
   * Send user an email to reset their password
   * (ie. support "Forgot Password?")
   */
  const sendPasswordResetEmail = async (email) => {
    const { user: userWithEmail, error } = await supabase.auth.api.resetPasswordForEmail(email);
    if (error) throw error;
    return userWithEmail;
  };

  const resetPassword = async (accessToken, newPassword) => {
    const { user: userAfterReset, error } = await supabase.auth.api.updateUser(
      accessToken,
      { password: newPassword },
    );
    if (error) throw error;
    return userAfterReset;
  };

  return {
    user,
    login: loginUser,
    loginWithSocialProvider,
    isLoggedIn,
    logout,
    register,
    update,
    sendPasswordResetEmail,
    resetPassword,
  };
}
