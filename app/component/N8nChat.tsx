"use client"

import { useEffect, useState } from "react"
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';
export default function N8nChat(){


   useEffect(() => {
		createChat({
			webhookUrl: 'http://localhost:5678/webhook/b23c69a6-44f6-44dd-8745-707df74074c2/chat'
		});
	}, []);

    return null;
    
}