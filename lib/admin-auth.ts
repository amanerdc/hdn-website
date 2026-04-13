import 'server-only';

import { createHmac, timingSafeEqual } from 'node:crypto';

const SESSION_COOKIE = 'hdn_admin_session';
const SESSION_MAX_AGE = 60 * 60 * 12;

type SessionPayload = {
  username: string;
  exp: number;
};

function toBase64Url(value: string) {
  return Buffer.from(value).toString('base64url');
}

function fromBase64Url<T>(value: string): T | null {
  try {
    return JSON.parse(Buffer.from(value, 'base64url').toString('utf8')) as T;
  } catch {
    return null;
  }
}

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET is missing.');
  }

  return secret;
}

function sign(value: string) {
  return createHmac('sha256', getSessionSecret()).update(value).digest('base64url');
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function getAdminSessionCookieName() {
  return SESSION_COOKIE;
}

export function getAdminSessionMaxAge() {
  return SESSION_MAX_AGE;
}

export function isAdminCredentialsValid(username: string, password: string) {
  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedUsername || !expectedPassword) {
    return false;
  }

  return safeCompare(username, expectedUsername) && safeCompare(password, expectedPassword);
}

export function createAdminSessionToken(username: string) {
  const payload: SessionPayload = {
    username,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
  };
  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = sign(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function verifyAdminSessionToken(token: string | undefined | null) {
  if (!token) {
    return null;
  }

  const [encodedPayload, signature] = token.split('.');

  if (!encodedPayload || !signature) {
    return null;
  }

  if (!safeCompare(signature, sign(encodedPayload))) {
    return null;
  }

  const payload = fromBase64Url<SessionPayload>(encodedPayload);

  if (!payload || payload.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  return payload;
}
