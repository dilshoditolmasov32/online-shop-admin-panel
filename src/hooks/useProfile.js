import { useCallback, useEffect, useState } from "react";
import * as profileService from "../services/profile.service";
import { toast } from "react-toastify";

export const useProfile = (autoLoad = true) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  // Load current user profile
  const loadProfile = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await profileService.getCurrentProfile();
      setProfile(data);
      return data;
    } catch (err) {
      setError(err);
      console.error("Error loading profile:", err);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, []);

  // Update profile
  const handleUpdateProfile = useCallback(async (profileData) => {
    setIsUpdating(true);
    setError(null);

    try {
      const updated = await profileService.updateProfile(profileData);
      setProfile(updated);
      toast.success("Profile updated successfully");
      return updated;
    } catch (err) {
      setError(err);
      console.error("Error updating profile:", err);
      toast.error(err?.response?.data?.message || "Failed to update profile");
      throw err;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  // Upload avatar
  const handleUploadAvatar = useCallback(async (file) => {
    setIsUpdating(true);
    setError(null);

    try {
      const updated = await profileService.uploadAvatar(file);
      setProfile(updated);
      toast.success("Avatar uploaded successfully");
      return updated;
    } catch (err) {
      setError(err);
      console.error("Error uploading avatar:", err);
      toast.error("Failed to upload avatar");
      throw err;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  // Change password
  const handleChangePassword = useCallback(async (passwordData) => {
    setIsUpdating(true);
    setError(null);

    try {
      const result = await profileService.changePassword(passwordData);
      toast.success("Password changed successfully");
      return result;
    } catch (err) {
      setError(err);
      console.error("Error changing password:", err);
      toast.error(err?.response?.data?.message || "Failed to change password");
      throw err;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  useEffect(() => {
    if (autoLoad) {
      loadProfile().catch((err) => {
        console.error("Profile auto-load failed:", err.message);
      });
    }
  }, [autoLoad, loadProfile]);

  return {
    profile,
    loading,
    isUpdating,
    error,
    loadProfile,
    updateProfile: handleUpdateProfile,
    uploadAvatar: handleUploadAvatar,
    changePassword: handleChangePassword,
  };
};
