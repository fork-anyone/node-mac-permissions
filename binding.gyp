{
  "targets": [{
    "target_name": "<(module_name)",
    "sources": [ ],
    "conditions": [
      ['OS=="mac"', {
        "sources": [
          "permissions.mm"
        ],
      }]
    ],
    'include_dirs': [
      "<!@(node -p \"require('node-addon-api').include\")"
    ],
    'libraries': [],
    'dependencies': [
      "<!(node -p \"require('node-addon-api').gyp\")"
    ],
    'defines': [ 
      'NAPI_DISABLE_CPP_EXCEPTIONS',
       'PACKAGE_VERSION="<!(node -p \"require(\\\"./package.json\\\").version\")"'
    ],
    "xcode_settings": {
      "MACOSX_DEPLOYMENT_TARGET": "10.15",
      "SYSTEM_VERSION_COMPAT": 1,
      "OTHER_CPLUSPLUSFLAGS": ["-std=c++20", "-stdlib=libc++"],
      "OTHER_LDFLAGS": [
        "-framework AppKit",
        "-framework AVFoundation",
        "-framework CoreBluetooth",
        "-framework CoreFoundation",
        "-framework CoreLocation",
        "-framework CoreGraphics",
        "-framework Contacts",
        "-framework EventKit",
        "-framework IOKit",
        "-framework Photos",
        "-framework Speech",
        "-framework StoreKit",
        "-framework UserNotifications",
      ]
    }
  },
  {
      "target_name": "action_after_build",
      "type": "none",
      "dependencies": [ "<(module_name)" ],
      "copies": [
        {
          "files": [ "<(PRODUCT_DIR)/<(module_name).node" ],
          "destination": "<(module_path)"
        }
      ]
    }
  ]
}
