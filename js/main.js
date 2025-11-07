// small JS: current year and smooth scrolling
document.getElementById('year')?.innerText = new Date().getFullYear();
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))?.scrollIntoView({behavior:'smooth'});
  })
});

// Show success message after Netlify redirect
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const msg = document.getElementById("success-message");

  if (params.get("success") === "true") {
    msg.style.display = "block";
    // remove success param from URL (so it doesn't stay visible on refresh)
    history.replaceState({}, "", "index.html");
  }
});
