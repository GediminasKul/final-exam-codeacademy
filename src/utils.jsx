export async function myFetch(url, method = 'GET', data = null) {
  try {
    const options = {
      headers: { 'Content-Type': 'application/json' },
    };
    options.method = method === 'POST' ? 'POST' : 'GET';
    options.body = data ? JSON.stringify(data) : null;
    const resp = await fetch(url, options);
    const dataInJs = await resp.json();
    return dataInJs;
  } catch (error) {
    throw new Error('Error myFetch', error);
  }
}

export async function myFetchAuth(url, method = 'GET', token, data = null) {
  try {
    const options = {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${token}`,
      },
    };
    options.method = method === 'POST' ? 'POST' : 'GET';
    options.body = data ? JSON.stringify(data) : null;
    const resp = await fetch(url, options);
    const dataInJs = await resp.json();
    return dataInJs;
  } catch (error) {
    throw new Error('Error myFetchAuth', error);
  }
}

export async function myDeleteAuth(url, method = 'GET', token, data = null) {
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    options.method = method === 'DELETE' ? 'DELETE' : 'GET';
    options.body = data ? JSON.stringify(data) : null;
    const resp = await fetch(url, options);
    const dataInJs = await resp.json();
    return dataInJs;
  } catch (error) {
    throw new Error('Error myFetchAuth', error);
  }
}

export async function myFetchAnswerAuth(url, token, id) {
  try {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const resp = await fetch(url, options);
    const dataInJs = await resp.json();
    return dataInJs;
  } catch (error) {
    throw new Error('Error myFetchAnswerAuth', error);
  }
}

export async function myPatchAuth(url, method = 'GET', token, data = null) {
  try {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    options.method = method === 'PATCH' ? 'PATCH' : 'GET';
    options.body = data ? JSON.stringify(data) : null;
    const resp = await fetch(url, options);
    const dataInJs = await resp.json();
    return dataInJs;
  } catch (error) {
    throw new Error('Error myPatchAuth', error);
  }
}

export const baseUrl = 'http://localhost:5001';
if (!baseUrl) throw new Error('baseUrl not found');
