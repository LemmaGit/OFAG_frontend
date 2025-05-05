import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  FiAlertTriangle,
  FiClock,
  FiDollarSign,
  FiSave,
  FiSettings,
} from "react-icons/fi";
import { LibrarySettingSchema } from "../../../schema/settings";
import useFetch from "../../../hooks/useFetch";
import { getSettings } from "../../../helpers/librarian";
import useMutator from "../../../hooks/useMutator";
import { editSettings } from "../../../helpers/manager";
import { toast } from "react-toastify";
function Settings() {
  const {
    register,
    handleSubmit,
    reset,

    formState: { isDirty, errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(LibrarySettingSchema),
    defaultValues: {},
  });

  const {
    isError: isErrorFetching,
    isLoading,
    data,
  } = useFetch("settings", getSettings);
  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [reset, data]);
  const {
    mutateAsync: updateSettings,
    isError: isErrorUpdating,
    isSuccess,
  } = useMutator(editSettings, "settings");
  const onSubmit = async (data) => {
    try {
      const res = await updateSettings(data);
      toast.success("Settings updated successfully!");
    } catch (_) {
      toast.error("Error updating settings. Try again later.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isErrorFetching) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-red-100 p-4 rounded-md shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-red-600 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v8m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-lg font-semibold text-red-600">
          Failed to fetch settings
        </p>
        <p className="text-gray-600 mb-4">
          Please try again later or contact support.
        </p>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition"
          onClick={() => window.location.reload()} // Example of retry action
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <FiSettings className="text-blue-600 text-2xl mr-3" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Library Configuration
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Loan Settings Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <FiClock className="text-blue-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-700">
                  Loan Period Settings
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Loan Period (days)
                  </label>
                  <input
                    type="number"
                    {...register("loanPeriodDays", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                  {errors.loanPeriodDays && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.loanPeriodDays.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Renewal Period (days)
                  </label>
                  <input
                    type="number"
                    {...register("renewalPeriodDays", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                  {errors.renewalPeriodDays && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.renewalPeriodDays.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Renewals Allowed
                  </label>
                  <input
                    type="number"
                    {...register("maxRenewals", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                  {errors.maxRenewals && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.maxRenewals.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Renewal Window (hours before due)
                  </label>
                  <input
                    type="number"
                    {...register("timeLeftOnDueDateForRenewal", {
                      required: "Required",
                      min: 1,
                    })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                  {errors.timeLeftOnDueDateForRenewal && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.timeLeftOnDueDateForRenewal.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Hold Settings Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <FiClock className="text-purple-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-700">
                  Hold Settings
                </h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hold Duration (days)
                </label>
                <input
                  type="number"
                  {...register("holdPeriodDays", {
                    valueAsNumber: true,
                  })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                />
                {errors.holdPeriodDays && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.holdPeriodDays.message}
                  </p>
                )}
              </div>
            </div>

            {/* Condition Fees Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <FiDollarSign className="text-green-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-700">
                  Condition Fees (birr)
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New → Fair Condition
                  </label>
                  <input
                    type="number"
                    {...register("feeNewToFair", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  />
                  {errors.feeNewToFair && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.feeNewToFair.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fair → Poor Condition
                  </label>
                  <input
                    type="number"
                    {...register("feeFairToPoor", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  />
                  {errors.feeFairToPoor && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.feeFairToPoor.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New → Poor Condition
                  </label>
                  <input
                    type="number"
                    {...register("feeNewToPoor", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  />
                  {errors.feeNewToPoor && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.feeNewToPoor.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Penalties Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <FiAlertTriangle className="text-red-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-700">
                  Penalties (birr)
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lost Book Fee
                  </label>
                  <input
                    type="number"
                    {...register("feeLostBook", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                  />
                  {errors.feeLostBook && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.feeLostBook.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Daily Overdue Fine
                  </label>
                  <input
                    type="number"
                    {...register("overdueFinePerDay", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                  />
                  {errors.overdueFinePerDay && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.overdueFinePerDay.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={!isDirty || isSubmitting}
              className={`flex items-center px-6 py-3 rounded-lg text-white font-medium transition ${
                isDirty
                  ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              } ${isSubmitting ? "opacity-80" : ""}`}
            >
              <FiSave className="mr-2" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;
