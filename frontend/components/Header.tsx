"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User, CheckSquare, Settings } from "lucide-react";
import ProfileModal from "./ProfileModal";

export default function Header() {
  const { user, logout, setUser } = useAuth();
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleProfileUpdated = (updatedUser: any) => {
    setUser(updatedUser);
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <CheckSquare className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">TODO App</h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setShowProfileModal(true)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Edit Profile"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">{user?.username}</span>
                <Settings className="w-3 h-3 text-gray-400" />
              </button>

              <button
                onClick={logout}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Modal */}
      {user && (
        <ProfileModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          currentUser={user}
          onProfileUpdated={handleProfileUpdated}
        />
      )}
    </>
  );
}

