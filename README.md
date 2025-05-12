# 🚀 MultiMantra – One Mantra, Many Solutions

![MultiMantra Banner](https://img.shields.io/badge/MultiMantra-Digital%20Utility%20Hub-800080?style=for-the-badge&logo=vercel&logoColor=white)

> **MultiMantra** is your one-stop solution to simplify your digital life. Whether you want to shorten links, accept donations, share all your links at one place, or write and share blogs — we’ve got it covered.

---

## 🔥 Features

- 🔗 **MantraShort** – Shorten and share URLs easily  
- 💰 **Donation** – Accept payments via Razorpay  
- 🌐 **MultiLinks** – Create your own linktree-style page  
- ✍️ **WriteMantra** – Write, edit, and publish blogs

---

## 🛠️ Tech Stack

| Tech         | Description                          |
|--------------|--------------------------------------|
| ![Next.js](https://img.shields.io/badge/Next.js-black?style=flat&logo=next.js) | Frontend Framework |
| ![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express) | Server-side Framework |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) | Backend Runtime |
| ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white) | Database |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) | Styling Framework |
| 🔐 **Authentication** – Secure login/signup |
| ![Razorpay](https://img.shields.io/badge/Razorpay-02042B?style=flat&logo=razorpay&logoColor=blue) | Payment Gateway Integration |

---

## 📸 Preview

### 🧑‍💻 About Us Section
![About](./assets/about-us.png)

### 💡 Features Section
![Features](./assets/features.png)

> ⚠️ Make sure to place the screenshots in a folder named `assets` in your root directory, or update the image path accordingly.

---

## 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/MultiMantra.git

# Navigate into the directory
cd MultiMantra

# Install dependencies
npm install

# Run development server
npm run dev

📁 Environment Setup
Create a .env file and add the following:

# MongoDB Local URI
MONGODB_URI=mongodb://localhost:27017

# App Host & Public URLs
NEXT_PUBLIC_HOST=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_URL=http://localhost:3000

# GitHub OAuth Credentials
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# Razorpay API Keys
KEY_ID=your_razorpay_key_id
KEY_SECRET=your_razorpay_key_secret

