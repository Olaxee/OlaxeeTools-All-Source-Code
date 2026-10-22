@echo off
"C:\\Users\\Admin\\AppData\\Local\\Android\\Sdk\\cmake\\3.22.1\\bin\\cmake.exe" ^
  "-HC:\\Users\\Admin\\Documents\\Owen\\Code\\AFFICHER iP\\OlaxeeIPMobile\\node_modules\\react-native\\ReactAndroid\\cmake-utils\\default-app-setup" ^
  "-DCMAKE_SYSTEM_NAME=Android" ^
  "-DCMAKE_EXPORT_COMPILE_COMMANDS=ON" ^
  "-DCMAKE_SYSTEM_VERSION=24" ^
  "-DANDROID_PLATFORM=android-24" ^
  "-DANDROID_ABI=armeabi-v7a" ^
  "-DCMAKE_ANDROID_ARCH_ABI=armeabi-v7a" ^
  "-DANDROID_NDK=C:\\Users\\Admin\\AppData\\Local\\Android\\Sdk\\ndk\\26.1.10909125" ^
  "-DCMAKE_ANDROID_NDK=C:\\Users\\Admin\\AppData\\Local\\Android\\Sdk\\ndk\\26.1.10909125" ^
  "-DCMAKE_TOOLCHAIN_FILE=C:\\Users\\Admin\\AppData\\Local\\Android\\Sdk\\ndk\\26.1.10909125\\build\\cmake\\android.toolchain.cmake" ^
  "-DCMAKE_MAKE_PROGRAM=C:\\Users\\Admin\\AppData\\Local\\Android\\Sdk\\cmake\\3.22.1\\bin\\ninja.exe" ^
  "-DCMAKE_LIBRARY_OUTPUT_DIRECTORY=C:\\Users\\Admin\\Documents\\Owen\\Code\\AFFICHER iP\\OlaxeeIPMobile\\android\\app\\build\\intermediates\\cxx\\RelWithDebInfo\\5o5b263y\\obj\\armeabi-v7a" ^
  "-DCMAKE_RUNTIME_OUTPUT_DIRECTORY=C:\\Users\\Admin\\Documents\\Owen\\Code\\AFFICHER iP\\OlaxeeIPMobile\\android\\app\\build\\intermediates\\cxx\\RelWithDebInfo\\5o5b263y\\obj\\armeabi-v7a" ^
  "-DCMAKE_BUILD_TYPE=RelWithDebInfo" ^
  "-DCMAKE_FIND_ROOT_PATH=C:\\Users\\Admin\\Documents\\Owen\\Code\\AFFICHER iP\\OlaxeeIPMobile\\android\\app\\.cxx\\RelWithDebInfo\\5o5b263y\\prefab\\armeabi-v7a\\prefab" ^
  "-BC:\\Users\\Admin\\Documents\\Owen\\Code\\AFFICHER iP\\OlaxeeIPMobile\\android\\app\\.cxx\\RelWithDebInfo\\5o5b263y\\armeabi-v7a" ^
  -GNinja ^
  "-DPROJECT_BUILD_DIR=C:\\Users\\Admin\\Documents\\Owen\\Code\\AFFICHER iP\\OlaxeeIPMobile\\android\\app\\build" ^
  "-DPROJECT_ROOT_DIR=C:\\Users\\Admin\\Documents\\Owen\\Code\\AFFICHER iP\\OlaxeeIPMobile\\android" ^
  "-DREACT_ANDROID_DIR=C:\\Users\\Admin\\Documents\\Owen\\Code\\AFFICHER iP\\OlaxeeIPMobile\\node_modules\\react-native\\ReactAndroid" ^
  "-DANDROID_STL=c++_shared" ^
  "-DANDROID_SUPPORT_FLEXIBLE_PAGE_SIZES=ON"
