; SEE THE DOCUMENTATION FOR DETAILS ON CREATING INNO SETUP SCRIPT FILES!
; http://www.jrsoftware.org/isinfo.php

; {{ }} will replaced by gulp task at runtime, will get from package.json

#define AppId "{8E768A11-78C7-4EB2-9A1B-70515096A5F1}"
#define AppName "{{appName}}"
#define AppVersion "{{appVersion}}"
#define AppPublisher "{{appPublisher}}"
#define AppURL "{{appUrl}}"
#define AppExeName "{{appExeName}}"
#define OutputBaseFilename "{{setupFileName}}"
#define OutputDir "{{outputDir}}"
#define AppSourceDir "./source/*"


[Setup]
; NOTE: The value of AppId uniquely identifies only this application.
; Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={{#AppId}
AppName={#AppName}
AppVersion={#AppVersion}
VersionInfoVersion={#AppVersion}
AppVerName={#AppName} {#AppVersion}
AppPublisher={#AppPublisher}
AppPublisherURL={#AppURL}
AppSupportURL={#AppURL}
AppUpdatesURL={#AppURL}
DefaultDirName={pf}\{#AppName}
DefaultGroupName={#AppName}
DisableProgramGroupPage=yes
DisableStartupPrompt=yes
Compression=lzma2/ultra
SolidCompression=yes
SetupIconFile=setup-icon.ico
SetupLogging=yes
UninstallDisplayIcon={app}\{#AppExeName}
LicenseFile=license.txt
InfoBeforeFile=info-before-setup.txt
PrivilegesRequired=admin
; 164x314 pixel bitmap image
WizardImageFile=wizard-image.bmp
; 55x58 pixel bitmap image
WizardSmallImageFile=wizard-image-small.bmp
OutputBaseFilename={#OutputBaseFilename}
OutputDir = {#OutputDir}
;This will cause the installer to hide destination folder screen if app is already installed
DisableDirPage=auto



[Languages]
; Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked

[Files]
Source: {#AppSourceDir}; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs
; NOTE: Don't use "Flags: ignoreversion" on any shared system files

[Icons]
Name: "{group}\{#AppName}"; Filename: "{app}\{#AppExeName}"
Name: "{group}\{cm:UninstallProgram,{#AppName}}"; Filename: "{uninstallexe}"
Name: "{commondesktop}\{#AppName}"; Filename: "{app}\{#AppExeName}"; Tasks: desktopicon

[Run]
Filename: "{app}\{#AppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(AppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent

[Registry]

[UninstallDelete]

[UninstallRun]


[CustomMessages]
english.NewerVersionExists=A newer version of {#AppName} is already installed.%n%nInstaller version: {#AppVersion}%nCurrent version:

[Code]
// Find current version before installation
// https://gist.github.com/mistic100/acb3484464e29f28279c
function InitializeSetup: Boolean;
var Version: String;
begin
  if RegValueExists(HKEY_LOCAL_MACHINE,'Software\Microsoft\Windows\CurrentVersion\Uninstall\{#AppId}_is1', 'DisplayVersion') then
    begin
      RegQueryStringValue(HKEY_LOCAL_MACHINE,'Software\Microsoft\Windows\CurrentVersion\Uninstall\{#AppId}_is1', 'DisplayVersion', Version);
      if Version > '{#AppVersion}' then
        begin
          MsgBox(ExpandConstant('{cm:NewerVersionExists} '+Version), mbInformation, MB_OK);
          Result := False;
        end
      else
        begin
          Result := True;
        end
    end
  else
    begin
      Result := True;
    end
end;
