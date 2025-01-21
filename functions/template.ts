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
        }

        body > main {
          font-family: "Open Sans", system-ui, -apple-system, sans-serif;
          color: color: #1d2a2e;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: calc(100vh - 7rem);
          padding: 1rem 0;
          max-width: 600px;
          margin: 0 auto;
        }
        .error {
          background: white;
          border-radius: 11px;
          color: var(--del-color);
          padding: 0.5em 1em;
        }
        h2 { color: #1d2a2e; }
      </style>
    </head>
    <body>
      <main>
        <article>
          <hgroup>
            <h1>Password</h1>
            <h2>Please enter your password for this site.</h2>
          </hgroup>
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