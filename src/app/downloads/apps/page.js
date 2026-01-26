export const metadata = {
  title: "Apps - Learning Souls",
  description: "Download our mobile and desktop applications",
};

export default function Apps() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-purple-900 mb-4">Apps</h1>
          <p className="text-xl text-pink-600 font-medium">
            Download our mobile and desktop applications.
          </p>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="prose max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Explore our suite of applications designed to enhance your
              learning experience.
            </p>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-purple-900 mb-4">
                Available Applications
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-pink-600 pl-4 py-3">
                  <h3 className="font-semibold text-gray-800">
                    Mobile App - iOS
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Download our iOS application from the App Store.
                  </p>
                  <button className="mt-2 text-pink-600 hover:underline font-medium">
                    Download →
                  </button>
                </div>
                <div className="border-l-4 border-pink-600 pl-4 py-3">
                  <h3 className="font-semibold text-gray-800">
                    Mobile App - Android
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Download our Android application from Google Play.
                  </p>
                  <button className="mt-2 text-pink-600 hover:underline font-medium">
                    Download →
                  </button>
                </div>
                <div className="border-l-4 border-pink-600 pl-4 py-3">
                  <h3 className="font-semibold text-gray-800">
                    Desktop Application
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Desktop version for Windows, Mac, and Linux.
                  </p>
                  <button className="mt-2 text-pink-600 hover:underline font-medium">
                    Download →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl text-pink-600 mb-3">📱</div>
            <h3 className="text-lg font-semibold text-purple-900 mb-2">
              Cross-Platform
            </h3>
            <p className="text-gray-600 text-sm">
              Available on iOS, Android, and Desktop platforms.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl text-pink-600 mb-3">🔄</div>
            <h3 className="text-lg font-semibold text-purple-900 mb-2">
              Regular Updates
            </h3>
            <p className="text-gray-600 text-sm">
              Frequent updates with new features and improvements.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl text-pink-600 mb-3">💡</div>
            <h3 className="text-lg font-semibold text-purple-900 mb-2">
              User Friendly
            </h3>
            <p className="text-gray-600 text-sm">
              Intuitive design for seamless user experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
