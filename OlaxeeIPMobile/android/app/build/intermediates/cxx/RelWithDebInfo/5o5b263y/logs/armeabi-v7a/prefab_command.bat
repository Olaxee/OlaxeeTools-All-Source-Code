@echo off
"C:\\Program Files\\Eclipse Adoptium\\jdk-17.0.16.8-hotspot\\bin\\java" ^
  --class-path ^
  "C:\\Users\\Admin\\.gradle\\caches\\modules-2\\files-2.1\\com.google.prefab\\cli\\2.1.0\\aa32fec809c44fa531f01dcfb739b5b3304d3050\\cli-2.1.0-all.jar" ^
  com.google.prefab.cli.AppKt ^
  --build-system ^
  cmake ^
  --platform ^
  android ^
  --abi ^
  armeabi-v7a ^
  --os-version ^
  24 ^
  --stl ^
  c++_shared ^
  --ndk-version ^
  26 ^
  --output ^
  "C:\\Users\\Admin\\AppData\\Local\\Temp\\agp-prefab-staging11684577910124180982\\staged-cli-output" ^
  "C:\\Users\\Admin\\.gradle\\caches\\8.14.1\\transforms\\3cec8c5b1a3c8047758b5cc888b1af12\\transformed\\react-android-0.80.2-release\\prefab" ^
  "C:\\Users\\Admin\\.gradle\\caches\\8.14.1\\transforms\\d95bb36c035f37b88112d330ac41ce68\\transformed\\hermes-android-0.80.2-release\\prefab" ^
  "C:\\Users\\Admin\\.gradle\\caches\\8.14.1\\transforms\\51dbd9ae21c085b2cb843db84b5d6696\\transformed\\fbjni-0.7.0\\prefab"
