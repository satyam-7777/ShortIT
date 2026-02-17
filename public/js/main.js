let shortenBtn = document.getElementById("shortenBtn");
let urlEl = document.getElementById("urlInput");
let errorText = document.getElementById("error");
let resultEl = document.getElementById("result");
let shortUrlEl = document.getElementById("shortUrl");
let copyBtnEl = document.getElementById("copyBtn");
let resetEl = document.getElementById("resetBtn");
let loadingEl = document.getElementById("loading");

const BASE_URL = window.location.origin;

urlEl.addEventListener("input", () => {
  hideShortUrl();
  let input = urlEl.value.trim();
  if (input.length > 0) {
    shortenBtn.disabled = false;
  } else {
    shortenBtn.disabled = true;
  }
});

const clearErrorMessage = () => {
  errorText.textContent = "";
};

const clearTextInput = () => {
  urlEl.value = "";
  shortenBtn.disabled = true;
};

const showErrorMessage = (message) => {
  errorText.textContent = message;
};

const showShortUrl = (apiRes) => {
  resultEl.classList.remove("hidden");
  shortUrlEl.textContent = apiRes.data.shortUrl;
  shortUrlEl.href = apiRes.data.shortUrl;
  shortenBtn.disabled = true;
};

const hideShortUrl = () => {
  resultEl.classList.add("hidden");
};

const copyShortUrl = async () => {
  await navigator.clipboard.writeText(shortUrlEl.href);
  copyBtnEl.textContent = "Copied";
  setTimeout(() => {
    copyBtnEl.textContent = "Copy";
  }, 1000);
};

const shortenUrlRequest = async (url) => {
  const shortenResponse = await fetch(`${BASE_URL}/shorten`, {
    method: "POST",
    body: JSON.stringify({ url }),
    headers: {
      "Content-type": "application/json",
    },
  });
  const jsonResponse = await shortenResponse.json();
  if (!shortenResponse.ok) {
    throw new Error(jsonResponse.error || "request failed");
  }
  return jsonResponse;
};

shortenBtn.addEventListener("click", async () => {
  try {
    // clear any error message
    clearErrorMessage();
    let url = urlEl.value.trim();
    const apiRes = await shortenUrlRequest(url);
    showShortUrl(apiRes);
  } catch (err) {
    showErrorMessage(err.message);
  }
});

copyBtnEl.addEventListener("click", async () => {
  try {
    await copyShortUrl();
  } catch (err) {
    showErrorMessage(err.message || "something went wrong");
  }
});

resetEl.addEventListener("click", () => {
  clearErrorMessage();
  clearTextInput();
  hideShortUrl();
});
