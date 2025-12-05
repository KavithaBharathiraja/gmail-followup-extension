📬 Gmail Follow-Up Sender

A Chrome extension that automatically sends follow-up emails to selected recipients in the Gmail Sent folder.

Ideal for recruiters, sales teams, cold outreach, and anyone who sends repeated follow-ups manually.

⭐ Features

✔ Works with the new Gmail UI (2024–2025)
✔ Select multiple emails in the Sent folder
✔ Automatically opens each email
✔ Clicks Reply
✔ Inserts your custom follow-up message
✔ Sends the email
✔ Skips invalid selections
✔ Shows a final summary: sent, failed
✔ 100% privacy — runs only in your browser

📌 How It Works

Go to Gmail → Sent

Check the emails you want to follow up on

Open the extension

Type your follow-up message

Click Send Follow-Ups

The extension automatically replies to each selected email

📁 Project Structure
gmail-followup-extension/
│── manifest.json
│── content.js
│── popup.html
│── popup.js
│── README.md
└── icons/

🔧 Installation (Developer Mode)

Clone or download this repository

Open Chrome and navigate to:
chrome://extensions/

Enable Developer Mode (top right)

Click Load unpacked

Select this project folder

The extension will appear in your Chrome toolbar

🧠 Technical Details
Uses content script injection

The extension injects content.js into Gmail tabs to:

detect checked emails

open each email thread

click reply

locate Gmail’s editor

insert message

click send

Required permissions
"permissions": ["activeTab", "tabs", "scripting"],
"host_permissions": ["https://mail.google.com/*"]

Supports dynamic Gmail DOM

The content script uses updated selectors that match Gmail’s newest HTML structure (.zA, role="checkbox", aria-checked, etc.).

🐞 Troubleshooting

If emails are not being detected:

Make sure you are in Sent folder

Make sure emails are actually checked

Refresh Gmail and try again

Open DevTools → Console for debug messages

If Gmail UI updates again, selectors may need small updates.

🔐 Privacy & Security

No data is sent to any server

No tracking

No external APIs

Runs entirely in your browser

Only interacts with Gmail DOM

📈 Future Enhancements (optional)

Delay timer between sending emails

Randomized delay to avoid rate limits

Detect emails that already have follow-ups

Message templates

🤝 Contributing

Pull requests are welcome!
For major updates, please open an issue first.

📄 License

MIT License — free for personal and commercial use.

👩‍💻 Author

Kavitha Bharathiraja
Creator of the Gmail Follow-Up Chrome Extension
📍 California, USA
📧 kavitha.bharathiraja@gmail.com 

