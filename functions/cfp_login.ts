import { CFP_COOKIE_MAX_AGE } from './constants';
import { sha256, getCookieKeyValue } from './utils';

export async function onRequestPost(context: { request: Request; env: { CFP_PASSWORD?: string }; }): Promise<Response> {
  const { request, env } = context;
  const body = await request.formData();
  const { password, redirect } = Object.fromEntries(body);
  const hashedPassword = await sha256(password.toString());

  const redirectPath = redirect.toString() || '/';

  if (!env.CFP_PASSWORD) {
    // Handle the case where CFP_PASSWORD is undefined
    return new Response('', {
      status: 302,
      headers: {
        'Cache-Control': 'no-cache',
        Location: `${redirectPath}?error=1`
      }
    });
  }

  const hashedCfpPassword = await sha256(env.CFP_PASSWORD);

  if (hashedPassword === hashedCfpPassword) {
    const cookieKeyValue = await getCookieKeyValue(env.CFP_PASSWORD);

    return new Response('', {
      status: 302,
      headers: {
        'Set-Cookie': `${cookieKeyValue}; Max-Age=${CFP_COOKIE_MAX_AGE}; Path=/; HttpOnly; Secure`,
        'Cache-Control': 'no-cache',
        Location: redirectPath
      }
    });
  } else {
    return new Response('', {
      status: 302,
      headers: {
        'Cache-Control': 'no-cache',
        Location: `${redirectPath}?error=1`
      }
    });
  }
}
