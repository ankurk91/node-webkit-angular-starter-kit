; SEE THE DOCUMENTATION FOR DETAILS ON CREATING INNO SETUP SCRIPT FILES!
; http://www.jrsoftware.org/isinfo.php

; {{ }} will replaced by gulp task at runtime, will get from package.json

#define MyAppName "{{appName}}"
#define MyAppVersion "{{appVersion}}"
#define MyAppPublisher "{{appPublisher}}"
#define MyAppURL "{{appUrl}}"
#define MyAppExeName "{{appExeName}}"
#define OutputBaseFilename "{{setupFileName}}"
#define OutputDir "{{outputDir}}"
#define AppSourceDir "./source/*"


[Setup]
; NOTE: The value of AppId uniquely identifies only this application.
; Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={{8E768A11-78C7-4EB2-9A1B-70515096A5F1}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppVerName={#MyAppName} {#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName={pf}\{#MyAppName}
DefaultGroupName={#MyAppName}
DisableProgramGroupPage=yes
DisableStartupPrompt=yes
Compression=lzma2/ultra
SolidCompression=yes
SetupIconFile=setup-icon.ico
UninstallDisplayIcon={app}\{#MyAppExeName}
LicenseFile=license.txt
InfoBeforeFile=info-before-setup.txt
PrivilegesRequired=admin
; 164x314 pixel bitmap image
WizardImageFile=wizard-image.bmp
; 55x58 pixel bitmap image
WizardSmallImageFile=wizard-image-small.bmp
OutputBaseFilename={#OutputBaseFilename}
OutputDir = {#OutputDir}


[Languages]
; Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked

[Files]
Source: {#AppSourceDir}; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs
; NOTE: Don't use "Flags: ignoreversion" on any shared system files

[Icons]
Name: "{group}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{group}\{cm:UninstallProgram,{#MyAppName}}"; Filename: "{uninstallexe}"
Name: "{commondesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent

[Registry]

[UninstallDelete]

[UninstallRun]
