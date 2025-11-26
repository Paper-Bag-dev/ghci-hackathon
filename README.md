# FinChorus: Voice First AI Banking Assistant

FinChorus is a voice-driven banking assistant built for natural, fast and secure financial interactions.  
Made for Theme Statement 4: AI Voice Assistant for Financial Operations.  
This project shows a complete end to end conversational banking experience powered by real-time voice tech and a modern AI stack.

![WhatsApp Image 2025-11-23 at 22 35 41_a7be34c3](https://github.com/user-attachments/assets/7eb77324-a2b6-4b71-b2c3-a7161fb25a68)

<img width="1916" height="967" alt="image" src="https://github.com/user-attachments/assets/381f5867-77c7-412d-bcb3-fbe78e3c303a" />



## 🎯 Project Overview

Banking apps today are packed with features but still make users dig through menus for basic tasks.  
FinChorus fixes that by letting users talk to their bank directly using natural voice commands.

It brings together real-time audio streaming, solid backend systems and smart reasoning to create a smooth, almost human experience.

### Sys Architecture:   
<img width="1236" height="660" alt="file_2025-11-23_10 30 37 1" src="https://github.com/user-attachments/assets/7b2948ca-45ae-4370-acfc-d1ab1c43e0bc" />
architecture explaination: https://drive.google.com/file/d/1-gRD_t1zeTwdNjJJUZ-7EFJMr7leKOht/view?usp=sharing

## 🧩 Core Features

### 1. Voice Based Banking
FinChorus understands everyday language for tasks like:

- Checking balances
- Guiding and controlling the interface
- Mock fund transfers
- Viewing recent transactions
- Asking about loans, interest rates or credit limits
- Setting reminders or alerts
- Automatically understand and perform actions in the user's language.

### 2. Real Time Conversational Intelligence
- STT: AssemblyAI Universal Streaming  
- LLM: OpenAI GPT 4.1 mini with tool calling  
- TTS: Cartesia Sonic 3 for quick natural voice  
- Audio transport: LiveKit Agents for low latency

### 3. Secure User Authentication
- Clerk for identity and sessions  
- Backend validation for sensitive operations  
- Safe mock data so users can test freely

### 4. Modular Architecture
FinChorus is split into clean, independent services that can be deployed and tested separately.  
This keeps everything simple, scalable and easy for judges to understand.



## ⚙️ Tech Stack

### Agent Service (Python)
- LiveKit Agents  
- GPT 4.1 mini  
- AssemblyAI STT  
- Cartesia Sonic 3  
- Backend tool integration
- Server 
### Backend (Node + Express)
- REST APIs for accounts, balances and transactions  
- MongoDB for mock data  
- Clerk auth  
- CORS and session handling

### Frontend (Next.js + Clerk)
- Voice room interface  
- LiveKit client components  
- Secure login  
- Real time responses
- Updates via voice commands for each user scalabely



## 🔐 Environment Configuration

### Agent Service (.env)
```
LIVEKIT_URL=
LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=

STT=assemblyai/universal-streaming
LLM=openai/gpt-4.1-mini
TTS=cartesia/sonic-3:9626c31c-bec5-4cca-baa8-f8ba9e84c8bc

BACKEND_URL=http://localhost:5000
CLERK_ID=
```

### Frontend (.env.local)
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

WEBHOOK_SECRET=
BACKEND_URL=http://localhost:5000

LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
LIVEKIT_URL=

NEXT_PUBLIC_LIVEKIT_URL=
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```
### Backend (.env)
```
MONGO_URI=mongodb://localhost:27017
PORT=5000
FRONTEND_URL=http://localhost:3000

CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERKID=
```


## 🧠 How It Works

1. User speaks and LiveKit streams the audio  
2. AssemblyAI converts audio to text  
3. GPT 4.1 mini understands intent and triggers tools  
4. Backend performs the requested operation  
5. Cartesia Sonic 3 generates a natural voice response  
6. LiveKit streams it back instantly  

Everything works in real time and feels smooth to use.



## 🏁 Conclusion

FinChorus shows how voice tech and AI can make banking faster and more approachable.  
By combining secure backend flows with smart voice reasoning, it brings a more natural way to interact with financial services.
