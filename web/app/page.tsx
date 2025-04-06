export default function Home() {
  if (typeof window !== 'undefined') {
    // Redirect to static HTML
    window.location.href = '/index.html';
  }

  return null; // This will render nothing because we are redirecting
}