Pod::Spec.new do |s|
  s.name           = 'AthleteOcr'
  s.version        = '1.0.0'
  s.summary        = 'On-device OCR for fitness body composition reports.'
  s.description    = 'Local PDFKit and Vision OCR Expo module for ATHLETE OS. No network requests.'
  s.license        = { :type => 'MIT' }
  s.author         = { 'ATHLETE OS' => 'local@invalid.example' }
  s.homepage       = 'https://docs.expo.dev/modules/overview/'
  s.platforms      = { :ios => '16.4' }
  s.source         = { :git => 'https://github.com/expo/expo.git' }
  s.static_framework = true
  s.dependency 'ExpoModulesCore'
  s.source_files   = '**/*.{h,m,mm,swift}'
  s.swift_version  = '5.9'
  s.pod_target_xcconfig = { 'DEFINES_MODULE' => 'YES' }
end
