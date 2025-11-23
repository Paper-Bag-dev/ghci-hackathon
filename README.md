# FinChorus – Voice-First AI Banking Assistant  

FinChorus is a voice-driven AI banking assistant designed for seamless, natural, and secure financial interactions.  
Built for Theme Statement 4: **AI Voice Assistant for Financial Operations**, this project showcases a fully functional conversational banking experience powered by modern AI infrastructure and real-time voice technology.
![WhatsApp Image 2025-11-23 at 22 35 41_a7be34c3](https://github.com/user-attachments/assets/7eb77324-a2b6-4b71-b2c3-a7161fb25a68)

<img width="1916" height="967" alt="image" src="https://github.com/user-attachments/assets/381f5867-77c7-412d-bcb3-fbe78e3c303a" />

---

## 🎯 Project Overview

In the modern digital banking landscape, users expect instant, intuitive, and personalized interactions. Yet even simple tasks—checking balances, transferring funds, viewing statements—often require navigating complex interfaces.

FinChorus solves this by enabling users to perform financial tasks through **natural voice interaction**.  
It combines:

- Real-time audio streaming  
- NLP-based reasoning  
- Secure authentication  
- Banking microservices  

…into a smooth, human-like voice banking experience.

---

## 🧩 Core Features

### **1. Voice-Based Banking Operations**
FinChorus understands and processes natural language commands for tasks such as:

- Checking account balances 
- Control and guide user through the interface
- Making mock fund transfers  
- Viewing recent transactions  
- Inquiring about loans, interest rates, or credit limits 
- Setting reminders or payment alerts  

### **2. Real-Time Conversational Intelligence**
- **STT:** AssemblyAI Universal Streaming  
- **LLM:** OpenAI GPT-4.1-mini for reasoning + tool calling  
- **TTS:** Cartesia Sonic-3 for fast, natural responses  
- **Voice transport:** LiveKit Agents (low-latency audio)

### **3. Secure User Authentication**
- Clerk-based identity and session gating  
- Backend validation for financial operations  
- Minimal mock data for safe sandbox interactions

### **4. Modular Architecture**
FinChorus is built as a clean multi-service system:


Each service is independently deployable for clarity, scalability, and ease of judging.

---

## ⚙️ Technology Stack

### **Agent Service (Python)**
- LiveKit Agents  
- GPT-4.1-mini  
- AssemblyAI STT  
- Cartesia Sonic-3 TTS  
- Tool-based backend integration  

### **Backend (Node + Express)**
- REST API layer for account, balance, and transaction data  
- MongoDB for mock persistence  
- Clerk for auth  
- CORS and session management  

### **Frontend (Next.js + Clerk)**
- Voice room interface  
- LiveKit client components  
- Secure user login  
- Real-time feedback UI  

---

## 🔐 Environment Configuration

### **Agent Service (.env)**  

```
LIVEKIT_URL=wss://test-project-7fa0i3iz.livekit.cloud
LIVEKIT_API_KEY=API5vLYzmKr3RsW
LIVEKIT_API_SECRET=x0G4gMAS9pfZMXFXs1I1fh8pwVAKWZ1WpKVMfk1UQe7B

STT=assemblyai/universal-streaming
LLM=openai/gpt-4.1-mini
TTS=cartesia/sonic-3:9626c31c-bec5-4cca-baa8-f8ba9e84c8bc

BACKEND_URL=http://localhost:5000

CLERK_ID=user_35n5MPjm6HTLT3zsAB2drmbwmMi
```


### **Frontend (.env.local)**  

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

WEBHOOK_SECRET=whsec_...
BACKEND_URL=http://localhost:5000

LIVEKIT_API_KEY=API5vLYzmKr3RsW
LIVEKIT_API_SECRET=x0G4gMAS9pfZMXFXs1I1fh8pwVAKWZ1WpKVMfk1UQe7B
LIVEKIT_URL=wss://test-project-7fa0i3iz.livekit.cloud

NEXT_PUBLIC_LIVEKIT_URL=wss://test-project-7fa0i3iz.livekit.cloud
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

### **Backend (.env)**  

```
MONGO_URI=mongodb://localhost:27017
PORT=5000
FRONTEND_URL=http://localhost:3000

CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERKID=user_35n5MPjm6HTLT3zsAB2drmbwmMi
```


---

## 🧠 How It Works (Flow)

1. User speaks → LiveKit streams audio  
2. AssemblyAI converts speech → text  
3. GPT-4.1 interprets intent + calls appropriate tools  
4. Backend executes banking operations  
5. Response is synthesized via Sonic-3 TTS  
6. LiveKit streams audio back to the user  

The entire pipeline operates in **real-time**, creating a fluid and human-like conversational experience.

---

## 🏁 Conclusion

FinChorus demonstrates how AI + voice tech can reshape financial interactions into something fast, friendly, and accessible.  
By blending secure backend operations with intelligent voice reasoning, it delivers the future of digital banking—now.

---
