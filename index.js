const path = require('path')
const binary = require('@mapbox/node-pre-gyp')
const binding_path = binary.find(path.resolve(path.join(__dirname, './package.json')))
const permissions = require(binding_path)

function getAuthStatus(type) {
  const validTypes = [
    'accessibility',
    'apple-events',
    'bluetooth',
    'calendar',
    'camera',
    'contacts',
    'full-disk-access',
    'input-monitoring',
    'location',
    'microphone',
    'music-library',
    'notifications',
    'photos-add-only',
    'photos-read-write',
    'reminders',
    'speech-recognition',
    'screen',
  ]

  if (!validTypes.includes(type)) {
    throw new TypeError(`${type} is not a valid type`)
  }

  return permissions.getAuthStatus.call(this, type)
}

function askForFoldersAccess(folder) {
  const validFolders = ['desktop', 'documents', 'downloads']

  if (!validFolders.includes(folder)) {
    throw new TypeError(`${folder} is not a valid protected folder`)
  }

  return permissions.askForFoldersAccess.call(this, folder)
}

function askForCalendarAccess(accessLevel = 'write-only') {
  if (!['write-only', 'full'].includes(accessLevel)) {
    throw new TypeError(`${accessLevel} must be one of either 'write-only' or 'full'`)
  }

  return permissions.askForCalendarAccess.call(this, accessLevel)
}

function askForLocationAccess(accessLevel = 'when-in-use') {
  if (!['when-in-use', 'always'].includes(accessLevel)) {
    throw new TypeError(`${accessLevel} must be one of either 'when-in-use' or 'always'`)
  }

  return permissions.askForLocationAccess.call(this, accessLevel)
}

function askForScreenCaptureAccess(openPreferences = false) {
  if (typeof openPreferences !== 'boolean') {
    throw new TypeError('openPreferences must be a boolean')
  }

  return permissions.askForScreenCaptureAccess.call(this, openPreferences)
}

function askForPhotosAccess(accessLevel = 'add-only') {
  if (!['add-only', 'read-write'].includes(accessLevel)) {
    throw new TypeError(`${accessLevel} must be one of either 'add-only' or 'read-write'`)
  }

  return permissions.askForPhotosAccess.call(this, accessLevel)
}

function askForInputMonitoringAccess(accessLevel = 'listen') {
  if (!['listen', 'post'].includes(accessLevel)) {
    throw new TypeError(`${accessLevel} must be one of either 'listen' or 'post'`)
  }

  return permissions.askForInputMonitoringAccess.call(this, accessLevel)
}

function askForAppleEventsAccess(targetAppBundleId, shouldPrompt = true) {
  if (typeof targetAppBundleId !== 'string') {
    throw new TypeError('targetAppBundleId must be a string')
  }

  if (typeof shouldPrompt !== 'boolean') {
    throw new TypeError('shouldPrompt must be a boolean')
  }

  return permissions.askForAppleEventsAccess.call(this, targetAppBundleId, shouldPrompt)
}

module.exports = {
  askForAppleEventsAccess: askForAppleEventsAccess,
  askForAccessibilityAccess: permissions.askForAccessibilityAccess,
  askForCalendarAccess: askForCalendarAccess,
  askForLocationAccess: askForLocationAccess,
  askForCameraAccess: permissions.askForCameraAccess,
  askForContactsAccess: permissions.askForContactsAccess,
  askForFoldersAccess,
  askForFullDiskAccess: permissions.askForFullDiskAccess,
  askForInputMonitoringAccess,
  askForRemindersAccess: permissions.askForRemindersAccess,
  askForMicrophoneAccess: permissions.askForMicrophoneAccess,
  askForMusicLibraryAccess: permissions.askForMusicLibraryAccess,
  askForPhotosAccess,
  askForSpeechRecognitionAccess: permissions.askForSpeechRecognitionAccess,
  askForScreenCaptureAccess,
  getAuthStatus,
}
