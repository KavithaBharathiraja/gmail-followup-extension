console.log('Gmail Follow-up extension loaded');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'sendFollowups') {
    sendFollowups(request.message);
    sendResponse({status: 'started'});
  }
  return true;
});

async function sendFollowups(msg) {
  console.log('=== AUTO-SEND FOLLOW-UP MODE ===');

  try {
    // New Gmail UI: checkbox is inside div[role="checkbox"]
    const checked = document.querySelectorAll('div[role="checkbox"][aria-checked="true"]');
    console.log("Checked count:", checked.length);

    let emailRows = [];

    checked.forEach((cb, i) => {
      console.log("\n--- Checkbox", i, "---");

      // In new Gmail UI → row = closest .zA (email list row)
      const row = cb.closest('.zA');

      if (!row) {
        console.log("❌ No .zA row found");
        return;
      }

      // Make sure this is an actual email item
      const hasRecipient = row.innerText.toLowerCase().includes("to:");
      const longEnough = row.innerText.length > 20;

      console.log("Has recipient:", hasRecipient, "Length:", longEnough);

      if (hasRecipient && longEnough) {
        emailRows.push(row);
        console.log("✅ Added email row");
      } else {
        console.log("❌ Skipped");
      }
    });

    if (emailRows.length === 0) {
      alert("No valid emails selected.\nMake sure:\n✔ You are in SENT folder\n✔ You clicked the checkbox on each email");
      return;
    }

    if (!confirm("Send follow-up to " + emailRows.length + " email(s)?")) return;

    let sent = 0, failed = 0;

    for (let i = 0; i < emailRows.length; i++) {
      try {
        console.log(`Opening email ${i + 1} / ${emailRows.length}`);

        emailRows[i].click();
        await sleep(2500);

        let replyBtn = document.querySelector('[aria-label="Reply"]');

        if (!replyBtn) {
          console.log("❌ Reply not found");
          failed++;
          pressEscape();
          await sleep(1000);
          continue;
        }

        replyBtn.click();
        await sleep(2000);

        let editor = null;
        for (let k = 0; k < 20; k++) {
          editor = document.querySelector('div[role="textbox"]');
          if (editor) break;
          await sleep(150);
        }

        if (!editor) {
          console.log("❌ Editor not found");
          failed++;
          pressEscape();
          await sleep(1000);
          continue;
        }

        editor.innerHTML = msg.replace(/\n/g, '<br>');
        editor.dispatchEvent(new Event("input", { bubbles: true }));

        await sleep(1500);

        const sendBtn = document.querySelector('div[aria-label="Send ‪(⌘Enter)‬"]') ||
                        document.querySelector('div[aria-label="Send"]');

        if (!sendBtn) {
          console.log("❌ Send not found");
          failed++;
          pressEscape();
          continue;
        }

        sendBtn.click();
        sent++;
        console.log("✅ Sent", sent);

        await sleep(3000);
        pressEscape();
        await sleep(1000);

      } catch (err) {
        console.log("ERROR:", err);
        failed++;
        pressEscape();
        await sleep(1000);
      }
    }

    alert(`Completed!\nSent: ${sent}\nFailed: ${failed}`);

  } catch (err) {
    alert("Error: " + err.message);
  }
}

function pressEscape() {
  document.dispatchEvent(new KeyboardEvent("keydown", {
    key: "Escape",
    keyCode: 27,
    bubbles: true
  }));
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}
