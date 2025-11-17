"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  getUserProfile,
  updateUserProfile,
  updateUserProfileWithPicture,
  resetUpdateSuccess,
} from "@/actions/userActions";
import Icon from "@/components/Icon";
import Image from "@/components/Image";

const ProfilePage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    profile,
    profileLoading,
    profileError,
    updateLoading,
    updateError,
    updateSuccess,
  } = useAppSelector((state) => state.user);

  const [sessionData, setSessionData] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    full_name: "",
    phone: "",
    gender: "",
    dob: "",
    age: null as number | null,
    interests: [] as string[],
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const updateSuccessHandled = useRef(false);

  // Reset update success state on mount and unmount
  useEffect(() => {
    dispatch(resetUpdateSuccess());
    updateSuccessHandled.current = false;

    // Cleanup: Reset updateSuccess when component unmounts
    return () => {
      dispatch(resetUpdateSuccess());
    };
  }, [dispatch]);

  useEffect(() => {
    // Get session data from localStorage
    const stored = localStorage.getItem("session_data");
    if (!stored) {
      alert("Please log in to view your profile.");
      router.push("/");
      return;
    }

    try {
      const session = JSON.parse(stored);
      setSessionData(session);

      // Fetch user profile from API
      if (session.session_id && session.access_token) {
        dispatch(getUserProfile(session.session_id, session.access_token));
      }
    } catch (error) {
      console.error("Error parsing session data:", error);
      alert("Invalid session data. Please log in again.");
      router.push("/");
    }
  }, [dispatch, router]);

  // Update form data when profile loads
  useEffect(() => {
    if (profile?.profile) {
      const p = profile.profile;
      setFormData({
        user_name: p.user_name || "",
        full_name: p.full_name || "",
        phone: p.phone || "",
        gender: p.gender || "",
        dob: p.dob ? p.dob.split("T")[0] : "",
        age: p.age || null,
        interests: Array.isArray(p.interests) ? p.interests : [],
      });
      // Set preview URL if profile pic exists
      if (p.profile_pic) {
        setPreviewUrl(p.profile_pic);
      }
    }
  }, [profile]);

  // Handle update success
  useEffect(() => {
    if (updateSuccess && !updateSuccessHandled.current) {
      updateSuccessHandled.current = true;
      setIsEditMode(false);
      alert("Profile updated successfully!");

      // Get the latest chat session for redirect
      const stored = localStorage.getItem("session_data");
      if (stored) {
        try {
          const session = JSON.parse(stored);
          const chatSessionId = session.chat_session_id || session.session_id;

          // Redirect to write-copy page
          setTimeout(() => {
            router.push(`/write-copy/${encodeURIComponent(chatSessionId)}`);
          }, 500);
        } catch (error) {
          console.error("Error parsing session data:", error);
          router.push("/");
        }
      }
    }
  }, [updateSuccess, router]);

  const handleBack = () => {
    router.back();
  };

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? (value ? parseInt(value) : null) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      alert("Please select a valid image file (JPEG, PNG, or WebP)");
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert("File size must be less than 5MB");
      return;
    }

    setSelectedFile(file);

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(profile?.profile?.profile_pic || null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddInterest = (interest: string) => {
    const trimmed = interest.trim();
    if (trimmed && !formData.interests.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        interests: [...prev.interests, trimmed],
      }));
    }
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interestToRemove),
    }));
  };

  const handleSubmit = async () => {
    if (
      !sessionData?.session_id ||
      !sessionData?.access_token ||
      !sessionData?.user_id
    ) {
      alert("Session expired. Please log in again.");
      return;
    }

    // Reset the success handler flag before making the request
    updateSuccessHandled.current = false;

    let result: any;

    // If file is selected, use POST endpoint with FormData
    if (selectedFile) {
      const formDataToSend = new FormData();

      // Add all form fields to FormData
      if (formData.full_name)
        formDataToSend.append("full_name", formData.full_name);
      if (formData.gender) formDataToSend.append("gender", formData.gender);
      if (formData.dob) formDataToSend.append("dob", formData.dob);

      // Add interests as comma-separated string
      if (formData.interests.length > 0) {
        formDataToSend.append("interests", formData.interests.join(","));
      }

      // Add the profile picture file
      formDataToSend.append("profile_pic", selectedFile);

      result = await dispatch(
        updateUserProfileWithPicture(
          sessionData.session_id,
          sessionData.user_id,
          sessionData.access_token,
          formDataToSend
        )
      );
    } else {
      // Use PATCH endpoint for regular updates (no file)
      const updateData: any = {};
      Object.keys(formData).forEach((key) => {
        const value = formData[key as keyof typeof formData];
        if (
          value !== null &&
          value !== "" &&
          !(Array.isArray(value) && value.length === 0)
        ) {
          updateData[key] = value;
        }
      });

      result = await dispatch(
        updateUserProfile(
          sessionData.session_id,
          sessionData.access_token,
          updateData
        )
      );
    }

    if (!result.success) {
      alert(`Failed to update profile: ${result.error}`);
    }
  };

  const handleCancel = () => {
    // Reset form to original profile data
    if (profile?.profile) {
      const p = profile.profile;
      setFormData({
        user_name: p.user_name || "",
        full_name: p.full_name || "",
        phone: p.phone || "",
        gender: p.gender || "",
        dob: p.dob ? p.dob.split("T")[0] : "",
        age: p.age || null,
        interests: Array.isArray(p.interests) ? p.interests : [],
      });
    }
    // Reset file selection
    setSelectedFile(null);
    setPreviewUrl(profile?.profile?.profile_pic || null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setIsEditMode(false);
  };

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-secondary mx-auto mb-4"></div>
          <p className="text-sub-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md p-6">
          <Icon className="fill-red-500 mx-auto mb-4" name="close" />
          <p className="text-red-500 mb-4">
            Error loading profile: {profileError}
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-brand-secondary text-white rounded-lg hover:bg-brand-primary"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const displayProfile = profile?.profile || {};
  const eazrProfile = profile?.eazr_profile || {};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Icon className="fill-gray-600 rotate-90" name="chevron" />
              </button>
              <h1 className="text-2xl font-semibold text-strong-950 mr-1">
                Profile
              </h1>
            </div>

            {/* Edit/Save Buttons */}
            {!isEditMode ? (
              <button
                onClick={handleEditToggle}
                className="flex items-center gap-1 px-3 py-1.5 text-sm 
               bg-brand-secondary text-white rounded-md 
               hover:bg-brand-primary transition-colors"
              >
                <Icon className="fill-white w-4 h-4" name="edit" />
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  disabled={updateLoading}
                  className="px-3 py-1.5 text-sm bg-gray-300 text-gray-700 rounded-md 
                 hover:bg-gray-400 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={updateLoading}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm 
                 bg-brand-secondary text-white rounded-md 
                 hover:bg-brand-primary transition-colors disabled:opacity-50"
                >
                  {updateLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Icon className="fill-white w-4 h-4" name="check" />
                      Save
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Error/Success Messages */}
      {updateError && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            Error: {updateError}
          </div>
        </div>
      )}

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image
                className="size-20 rounded-full opacity-100"
                src={
                  previewUrl ||
                  displayProfile.profile_pic ||
                  "/images/avatar-1.png"
                }
                width={80}
                height={80}
                alt="User"
              />
              {isEditMode && (
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {/* <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 rounded-full p-2 transition-colors shadow-lg"
                    title="Change profile picture"
                  >
                    <Icon className="fill-white w-3 h-3" name="camera" />
                  </button> */}
                  {/* Camera Icon — Always visible */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-1 right-0 bg-black/70 p-1 flex rounded-full
             shadow-md hover:bg-black/80 transition-all duration-200"
                    title="Change profile picture"
                  >
                    <Icon className="fill-white w-6 h-6" name="camera" />
                  </button>
                </>
              )}
              {!isEditMode && eazrProfile.kycVerified === 1 && (
                <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1">
                  <Icon className="fill-white w-3 h-3" name="check" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-strong-950">
                {displayProfile.full_name || sessionData?.user_name || "User"}
              </h2>
              <p className="text-sub-600">
                {displayProfile.phone || sessionData?.user_phone}
              </p>
              {displayProfile.user_id && (
                <p className="text-xs text-sub-400 mt-1">
                  User ID: {displayProfile.user_id}
                </p>
              )}
              {isEditMode && selectedFile && (
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-xs text-green-600">New image selected</p>
                  <button
                    onClick={handleRemoveImage}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Personal Information - Editable */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-strong-950 mb-4 flex items-center gap-2">
            <Icon className="fill-brand-secondary" name="user" />
            Personal Information
          </h3>

          {isEditMode ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EditField
                label="User Name"
                name="user_name"
                value={formData.user_name}
                onChange={handleInputChange}
              />
              <EditField
                label="Full Name"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
              />
              <EditField
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <SelectField
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                options={[
                  { value: "", label: "Select Gender" },
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                  { value: "Other", label: "Other" },
                ]}
              />
              <EditField
                label="Date of Birth"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleInputChange}
              />
              <EditField
                label="Age"
                name="age"
                type="number"
                value={formData.age || ""}
                onChange={handleInputChange}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem label="Full Name" value={displayProfile.full_name} />
              <InfoItem label="User Name" value={displayProfile.user_name} />
              <InfoItem label="Phone" value={displayProfile.phone} />
              <InfoItem label="Gender" value={displayProfile.gender} />
              <InfoItem
                label="Date of Birth"
                value={
                  displayProfile.dob
                    ? new Date(displayProfile.dob).toLocaleDateString()
                    : "Not provided"
                }
              />
              <InfoItem label="Age" value={displayProfile.age} />
            </div>
          )}
        </div>

        {/* Credit Information - Read Only (if available) */}
        {eazrProfile.isCreditActivated && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-strong-950 mb-4 flex items-center gap-2">
              <Icon className="fill-brand-secondary" name="card" />
              Credit Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem
                label="Credit Limit"
                value={`₹${eazrProfile.creditLimit || 0}`}
              />
              <InfoItem
                label="Available Credit"
                value={`₹${eazrProfile.availableCreditLimit || 0}`}
              />
              <InfoItem
                label="Outstanding Amount"
                value={`₹${eazrProfile.totalOutstandingAmount || 0}`}
              />
              <InfoItem
                label="Due Amount"
                value={`₹${eazrProfile.dueAmount || 0}`}
              />
              <InfoItem
                label="Credit Score"
                value={eazrProfile.creditScore || "N/A"}
              />
              <InfoItem
                label="Due Date"
                value={
                  eazrProfile.dueDate
                    ? new Date(eazrProfile.dueDate).toLocaleDateString()
                    : "N/A"
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper component for displaying info items
const InfoItem = ({ label, value }: { label: string; value: any }) => (
  <div className="border-b border-stroke-soft-200 pb-3">
    <p className="text-xs text-sub-400 mb-1">{label}</p>
    <p className="text-sm text-strong-950">
      {value !== null && value !== undefined && value !== ""
        ? value
        : "Not provided"}
    </p>
  </div>
);

// Helper component for editable fields
const EditField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div>
    <label className="block text-xs text-sub-400 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A896] text-sm"
    />
  </div>
);

// Helper component for select fields
const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}) => (
  <div>
    <label className="block text-xs text-sub-400 mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A896] text-sm"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

// Helper component for displaying status items
const StatusItem = ({ label, value }: { label: string; value: boolean }) => (
  <div className="border-b border-stroke-soft-200 pb-3">
    <p className="text-xs text-sub-400 mb-1">{label}</p>
    <div className="flex items-center gap-2">
      {value ? (
        <>
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <p className="text-sm text-green-600">Yes</p>
        </>
      ) : (
        <>
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          <p className="text-sm text-gray-600">No</p>
        </>
      )}
    </div>
  </div>
);

export default ProfilePage;
