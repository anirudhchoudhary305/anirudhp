const folderId = "1ee0KcAsDHykBPeH0FGnqErY8Ano-QBXp"; 
const apiKey = "AIzaSyC_nZRFgofsum14EG8xyAw0Zdagm2oGOpg";

const list = document.getElementById("research-list");

function getIcon(mime) {
  if (mime.includes("pdf")) return "📄";
  if (mime.includes("msword") || mime.includes("document")) return "📝";
  if (mime.includes("presentation") || mime.includes("ppt")) return "📊";
  return "📁";
}

fetch(`https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}&fields=files(id,name,mimeType,modifiedTime)&orderBy=modifiedTime desc&supportsAllDrives=true`)
  .then(r => r.json())
  .then(data => {
    if (!data.files || data.files.length === 0) {
      list.innerHTML = "<p>No research documents uploaded yet.</p>";
      return;
    }

    list.innerHTML = ""; // Clear existing

    data.files.forEach(file => {
      const viewLink = `https://drive.google.com/file/d/${file.id}/view`;
      const downloadLink = `https://drive.google.com/uc?export=download&id=${file.id}`;
      const icon = getIcon(file.mimeType);

      list.innerHTML += `
        <li class="research-card">
          <span class="icon">${icon}</span>
          <div class="file-info">
            <strong>${file.name}</strong>
            <div class="file-actions">
              <a href="${viewLink}" target="_blank">View</a>
              <a href="${downloadLink}" target="_blank">Download</a>
            </div>
          </div>
        </li>
      `;
    });
  })
  .catch(err => {
    list.innerHTML = "<p>⚠️ Could not load research files.</p>";
    console.error("Google Drive API Error:", err);
  });
