# Deploying to XAMPP (htdocs)

To run this full project inside XAMPP, follow these steps:

## 1. Prepare the Folders
1.  Navigate to your XAMPP installation directory (usually `C:\xampp\htdocs`).
2.  Create a new folder named `Python-Detective-Game`.
3.  Copy the **entire contents** of your project folder into `C:\xampp\htdocs\Python-Detective-Game`.

Structure should look like:
```
C:\xampp\htdocs\Python-Detective-Game\
  ├── api\
  ├── client\
  ├── sql\
  └── ...
```

## 2. Build the Frontend
Since React needs to be compiled, run the build command:
1.  Open terminal in `C:\xampp\htdocs\Python-Detective-Game\client`.
2.  Run:
    ```powershell
    npm run build
    ```
    This creates a `dist` folder inside `client`.

## 3. Access the Game
1.  Make sure Apache and MySQL are running in XAMPP Control Panel.
2.  Open your browser and go to:
    **http://localhost/Python-Detective-Game/client/dist/**

## Troubleshooting
- **API Errors**: Ensure the `api` folder requires no extra configuration. If `database.php` has correct credentials (root, empty password), it will work.
- **404 on Refresh**: React Router handles routing on the client. If you refresh on a sub-page (e.g., `/login`), Apache might return 404. Ideally, you should configure `.htaccess` in the build folder, but for simple testing, just navigate from the root.

### Optional: Fix 404 on Refresh
Create a file named `.htaccess` inside `client/dist/` with this content:
```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```
