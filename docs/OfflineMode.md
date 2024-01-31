# Offline Mode

The application requires an internet connection the first time it is launched per Windows user.

If the application cannot connect to the backend server, assuming a user has previously logged into it, it can be
accessed in an offline mode as the last logged-in user. We ultimately rely on the Windows user account to protect the
locally-stored data required for offline mode to function. We operate under the assumption that a UKPID user should
never log into the application while logged into a Windows user account which does not belong to them, i.e. UKPID user
John should not be logged into the application on Janet's Windows account.

The locally-stored data required for offline mode to function will be minimal and related to enquiry entry only. This
will include basic user account info (e.g. name, user id, role, location), and enquiry form markup (e.g. form fields,
agent code, etc.) Other features of the application, such as reports and buddy checking will not be accessible in
offline mode. To protect any data which has not been synced to the server, the user will be unable to log out of the
application until the connection is restored.

When the connection to the backend server is restored, the application will sync any offline data to the server and full
functionality will be restored. The application will run in the background to sync this data as soon as possible even
when the application is not open.
