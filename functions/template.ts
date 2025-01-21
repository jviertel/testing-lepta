export function getTemplate({ redirectPath, withError }: { redirectPath: string; withError: boolean; }): string {
  return `<!doctype html>
  <html lang="en" data-theme="dark">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Password Protected Site</title>
      <meta name="description" content="This site is password protected.">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@700&display=swap');
        
       body {
          background-color: #c5d9de;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }

        body > main {
          font-family: "Open Sans", system-ui, -apple-system, sans-serif;
          color: #1d2a2e;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 30vh;
          padding: 2rem 1rem;
          max-width: 600px;
          text-align: center;
          background-color: #11abc3;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }

        .error {
          background: white;
          border-radius: 11px;
          color: var(--del-color);
          padding: 0.5em 1em;
          margin-top: 1rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h1 {
          margin-bottom: 0.5rem;
        }

        input[type="password"] {
          padding: 0.5em;
          margin: 1rem 0;
          border: 1px solid #1d2a2e;
          border-radius: 5px;
          width: 100%;
          max-width: 300px;
        }
        button {
          padding: 0.5em 1em;
          background-color: #1d2a2e;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: #163238;
        }
      </style>
    </head>
    <body>
      <main>
        <article>
          <h1>Please enter your password for this site.</h2>
          ${withError ? `<p class="error">Incorrect password, please try again.</p>` : ''}
          <form method="post" action="/cfp_login">
            <input type="hidden" name="redirect" value="${redirectPath}" />
            <input type="password" name="password" placeholder="Password" aria-label="Password" autocomplete="current-password" required autofocus>
            <button type="submit" class="contrast">Login</button>
          </form>
        </article>
      </main>
    </body>
  </html>`;
}