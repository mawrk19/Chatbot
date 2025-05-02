// app/api/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const body = await req.json();
  
    const messagesWithSystem = [
      { role: 'system', content: "You are a compassionate mental health support assistant, specializing in helping people with anxiety. Respond with empathy, offer coping strategies, and encourage users, but do not give medical advice or diagnose. If someone is in crisis, suggest reaching out to a professional or a helpline." },
      ...body.messages
    ];
  
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat:free',
        messages: messagesWithSystem,
      }),
    });
  
    const data = await res.json();
    return NextResponse.json(data);
  }
    