export const launchGus = async formData => {
  const postFormData = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(formData).toString(),
  };

  const res = await fetch('/', postFormData);
  if (!res.ok) {
    const { status, statusText } = res;
    return await Promise.reject({ status, statusText });
  }

  return await res.json();
};
